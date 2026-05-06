from __future__ import annotations

import hashlib
import json
import secrets
import sqlite3
from pathlib import Path
from typing import Any, Optional

from fastapi import Depends, FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

BASE_DIR = Path(__file__).parent
DB_PATH = BASE_DIR / "app.db"
UPLOADS_DIR = BASE_DIR / "uploads"
PROPOSALS_DIR = BASE_DIR / "proposals"
UPLOADS_DIR.mkdir(exist_ok=True)
PROPOSALS_DIR.mkdir(exist_ok=True)

app = FastAPI(title="Window Depot Visual Sales Tool API", version="1.0.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])


def hash_pw(v: str) -> str:
    return hashlib.sha256(v.encode()).hexdigest()


def get_conn() -> sqlite3.Connection:
    c = sqlite3.connect(DB_PATH)
    c.row_factory = sqlite3.Row
    c.execute("PRAGMA foreign_keys = ON")
    return c


def init_db() -> None:
    with get_conn() as c:
        c.executescript(
            """
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                full_name TEXT NOT NULL,
                role TEXT NOT NULL DEFAULT 'rep',
                password_hash TEXT NOT NULL,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            );
            CREATE TABLE IF NOT EXISTS sessions (
                token TEXT PRIMARY KEY,
                user_id INTEGER NOT NULL,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
            );
            CREATE TABLE IF NOT EXISTS projects (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                customer_name TEXT NOT NULL,
                phone TEXT,
                email TEXT,
                address TEXT,
                project_type TEXT,
                notes TEXT,
                created_by INTEGER,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(created_by) REFERENCES users(id)
            );
            CREATE TABLE IF NOT EXISTS photos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                project_id INTEGER NOT NULL,
                url TEXT NOT NULL,
                label TEXT DEFAULT '',
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE
            );
            CREATE TABLE IF NOT EXISTS masks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                photo_id INTEGER NOT NULL,
                label TEXT NOT NULL,
                category TEXT NOT NULL,
                geometry_json TEXT NOT NULL,
                source TEXT NOT NULL DEFAULT 'manual',
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(photo_id) REFERENCES photos(id) ON DELETE CASCADE
            );
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                manufacturer TEXT NOT NULL,
                line TEXT NOT NULL,
                category TEXT NOT NULL,
                name TEXT NOT NULL,
                color TEXT,
                style TEXT,
                price REAL DEFAULT 0,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            );
            CREATE TABLE IF NOT EXISTS selections (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                mask_id INTEGER NOT NULL,
                product_id INTEGER NOT NULL,
                option_set TEXT NOT NULL DEFAULT 'Option 1',
                notes TEXT DEFAULT '',
                FOREIGN KEY(mask_id) REFERENCES masks(id) ON DELETE CASCADE,
                FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
            );
            """
        )
        existing = c.execute("SELECT id FROM users LIMIT 1").fetchone()
        if not existing:
            c.execute("INSERT INTO users(email, full_name, role, password_hash) VALUES(?,?,?,?)", ("rep@windowdepot.local", "Default Rep", "rep", hash_pw("demo123")))


@app.on_event("startup")
def startup() -> None:
    init_db()


class RegisterIn(BaseModel):
    email: str
    full_name: str
    password: str
    role: str = "rep"


class LoginIn(BaseModel):
    email: str
    password: str


class ProjectIn(BaseModel):
    customer_name: str
    phone: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    project_type: Optional[str] = None
    notes: Optional[str] = None


class MaskIn(BaseModel):
    photo_id: int
    label: str
    category: str
    geometry: dict[str, Any] = Field(default_factory=dict)
    source: str = "manual"


class ProductIn(BaseModel):
    manufacturer: str
    line: str
    category: str
    name: str
    color: Optional[str] = None
    style: Optional[str] = None
    price: float = 0


class SelectionIn(BaseModel):
    mask_id: int
    product_id: int
    option_set: str = "Option 1"
    notes: Optional[str] = ""


def must_get(c: sqlite3.Connection, q: str, p: tuple, msg: str):
    row = c.execute(q, p).fetchone()
    if not row:
        raise HTTPException(404, msg)
    return row


def current_user(token: str) -> sqlite3.Row:
    with get_conn() as c:
        s = must_get(c, "SELECT user_id FROM sessions WHERE token=?", (token,), "Unauthorized")
        return must_get(c, "SELECT * FROM users WHERE id=?", (s["user_id"],), "Unauthorized")


@app.get('/health')
def health():
    return {"ok": True}


@app.post('/auth/register')
def register(payload: RegisterIn):
    with get_conn() as c:
        try:
            cur = c.execute("INSERT INTO users(email, full_name, role, password_hash) VALUES(?,?,?,?)", (payload.email, payload.full_name, payload.role, hash_pw(payload.password)))
        except sqlite3.IntegrityError:
            raise HTTPException(400, "Email already exists")
        return {"id": cur.lastrowid, "email": payload.email, "role": payload.role}


@app.post('/auth/login')
def login(payload: LoginIn):
    with get_conn() as c:
        u = c.execute("SELECT * FROM users WHERE email=? AND password_hash=?", (payload.email, hash_pw(payload.password))).fetchone()
        if not u:
            raise HTTPException(401, "Invalid credentials")
        token = secrets.token_hex(24)
        c.execute("INSERT INTO sessions(token, user_id) VALUES(?,?)", (token, u["id"]))
        return {"token": token, "user": {"id": u["id"], "email": u["email"], "role": u["role"]}}


@app.post('/projects')
def create_project(payload: ProjectIn, token: str):
    user = current_user(token)
    with get_conn() as c:
        cur = c.execute(
            "INSERT INTO projects(customer_name, phone, email, address, project_type, notes, created_by) VALUES(?,?,?,?,?,?,?)",
            (payload.customer_name, payload.phone, payload.email, payload.address, payload.project_type, payload.notes, user["id"]),
        )
        return {"id": cur.lastrowid, **payload.model_dump()}


@app.get('/projects')
def list_projects(token: str):
    current_user(token)
    with get_conn() as c:
        return [dict(r) for r in c.execute("SELECT * FROM projects ORDER BY id DESC").fetchall()]


@app.post('/photos/upload')
async def upload_photo(project_id: int = Form(...), label: str = Form(""), token: str = Form(...), file: UploadFile = File(...)):
    current_user(token)
    ext = Path(file.filename).suffix or '.jpg'
    fname = f"{secrets.token_hex(8)}{ext}"
    target = UPLOADS_DIR / fname
    content = await file.read()
    target.write_bytes(content)
    url = f"/files/{fname}"
    with get_conn() as c:
        must_get(c, "SELECT * FROM projects WHERE id=?", (project_id,), "Project not found")
        cur = c.execute("INSERT INTO photos(project_id, url, label) VALUES(?,?,?)", (project_id, url, label))
        return {"id": cur.lastrowid, "project_id": project_id, "url": url, "label": label}


@app.get('/files/{name}')
def file_link(name: str):
    p = UPLOADS_DIR / name
    if not p.exists():
        raise HTTPException(404, "File not found")
    return {"path": str(p)}


@app.post('/masks')
def create_mask(payload: MaskIn, token: str):
    current_user(token)
    with get_conn() as c:
        must_get(c, "SELECT * FROM photos WHERE id=?", (payload.photo_id,), "Photo not found")
        cur = c.execute("INSERT INTO masks(photo_id, label, category, geometry_json, source) VALUES(?,?,?,?,?)", (payload.photo_id, payload.label, payload.category, json.dumps(payload.geometry), payload.source))
        return {"id": cur.lastrowid, **payload.model_dump()}


@app.post('/photos/{photo_id}/masks/auto-detect')
def auto_detect(photo_id: int, category: str, token: str):
    current_user(token)
    with get_conn() as c:
        must_get(c, "SELECT * FROM photos WHERE id=?", (photo_id,), "Photo not found")
        geometry = {"type": "polygon", "points": [[0.2, 0.2], [0.4, 0.2], [0.4, 0.45], [0.2, 0.45]]}
        cur = c.execute("INSERT INTO masks(photo_id, label, category, geometry_json, source) VALUES(?,?,?,?,?)", (photo_id, f"{category} auto", category, json.dumps(geometry), "auto"))
        return {"id": cur.lastrowid, "photo_id": photo_id, "category": category, "geometry": geometry}


@app.post('/products')
def create_product(payload: ProductIn, token: str):
    current_user(token)
    with get_conn() as c:
        cur = c.execute("INSERT INTO products(manufacturer, line, category, name, color, style, price) VALUES(?,?,?,?,?,?,?)", (payload.manufacturer, payload.line, payload.category, payload.name, payload.color, payload.style, payload.price))
        return {"id": cur.lastrowid, **payload.model_dump()}


@app.get('/products')
def list_products(token: str, category: Optional[str] = None):
    current_user(token)
    with get_conn() as c:
        rows = c.execute("SELECT * FROM products WHERE category=?" if category else "SELECT * FROM products", (category,) if category else ()).fetchall()
        return [dict(r) for r in rows]


@app.post('/selections')
def create_selection(payload: SelectionIn, token: str):
    current_user(token)
    with get_conn() as c:
        must_get(c, "SELECT * FROM masks WHERE id=?", (payload.mask_id,), "Mask not found")
        must_get(c, "SELECT * FROM products WHERE id=?", (payload.product_id,), "Product not found")
        cur = c.execute("INSERT INTO selections(mask_id, product_id, option_set, notes) VALUES(?,?,?,?)", (payload.mask_id, payload.product_id, payload.option_set, payload.notes))
        return {"id": cur.lastrowid, **payload.model_dump()}


@app.get('/projects/{project_id}/summary')
def summary(project_id: int, token: str):
    current_user(token)
    with get_conn() as c:
        project = must_get(c, "SELECT * FROM projects WHERE id=?", (project_id,), "Project not found")
        rows = c.execute(
            """
            SELECT s.option_set, m.category, m.label, p.manufacturer, p.line, p.name, p.color, p.style, p.price
            FROM selections s JOIN masks m ON m.id=s.mask_id
            JOIN photos ph ON ph.id=m.photo_id JOIN products p ON p.id=s.product_id
            WHERE ph.project_id=?
            """,
            (project_id,),
        ).fetchall()
        items = [dict(r) for r in rows]
        total = sum(r["price"] or 0 for r in rows)
        return {"project": dict(project), "items": items, "total": total}


@app.post('/projects/{project_id}/proposal')
def proposal(project_id: int, token: str):
    data = summary(project_id, token)
    f = PROPOSALS_DIR / f"proposal_{project_id}.txt"
    lines = [f"Proposal for {data['project']['customer_name']}", f"Address: {data['project']['address']}", "", "Selections:"]
    for i in data['items']:
        lines.append(f"- {i['category']} {i['label']}: {i['manufacturer']} {i['name']} ({i['color']}) ${i['price']:.2f}")
    lines.append(f"\nTotal: ${data['total']:.2f}")
    f.write_text("\n".join(lines))
    return {"proposal_path": str(f), "total": data["total"]}
