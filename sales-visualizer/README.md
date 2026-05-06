# Window Depot Milwaukee VisualQuote App

Production-style full workflow app scaffold with auth, uploads, masking, product selections, summaries, and proposal generation.

## Implemented end-to-end flow
1. Login (`/auth/login`) using seeded rep user: `rep@windowdepot.local` / `demo123`
2. Create project
3. Upload photo file
4. Auto-detect or manually create masks
5. Add products to catalog
6. Assign products to masks
7. Generate project summary with totals
8. Generate proposal document file

## Run
```bash
cd sales-visualizer/backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

## Test
```bash
cd sales-visualizer/backend
pytest -q
```
