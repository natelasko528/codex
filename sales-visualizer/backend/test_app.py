from pathlib import Path
from fastapi.testclient import TestClient
from main import app, init_db


def login(client: TestClient):
    r = client.post('/auth/login', json={'email': 'rep@windowdepot.local', 'password': 'demo123'})
    assert r.status_code == 200
    return r.json()['token']


def test_complete_app_flow():
    init_db()
    with TestClient(app) as client:
        token = login(client)
        p = client.post('/projects', params={'token': token}, json={'customer_name': 'John Smith', 'address': '123 Main', 'project_type': 'windows'})
        assert p.status_code == 200
        pid = p.json()['id']

        files = {'file': ('home.jpg', b'fake-image-content', 'image/jpeg')}
        photo = client.post('/photos/upload', data={'project_id': pid, 'label': 'Front', 'token': token}, files=files)
        assert photo.status_code == 200
        phid = photo.json()['id']

        mask = client.post(f'/photos/{phid}/masks/auto-detect', params={'token': token, 'category': 'window'})
        assert mask.status_code == 200
        mid = mask.json()['id']

        prod = client.post('/products', params={'token': token}, json={'manufacturer': 'ProVia', 'line': 'Endure', 'category': 'windows', 'name': 'Double Hung', 'color': 'Black', 'price': 1200})
        assert prod.status_code == 200

        sel = client.post('/selections', params={'token': token}, json={'mask_id': mid, 'product_id': prod.json()['id'], 'option_set': 'Option 1'})
        assert sel.status_code == 200

        summary = client.get(f'/projects/{pid}/summary', params={'token': token})
        assert summary.status_code == 200
        assert summary.json()['total'] == 1200

        proposal = client.post(f'/projects/{pid}/proposal', params={'token': token})
        assert proposal.status_code == 200
        assert Path(proposal.json()['proposal_path']).exists()
