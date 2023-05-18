from app import conn
from app_test import AppTest
import json

BASE_URL = "http://localhost:5000/"

class RouteTest(AppTest):

    def test_get_all_stanista(self):
        response = self.client.get(BASE_URL)

        content = response.get_json()

        self.assertEqual(200, response.status_code)
        self.assertGreater(len(content), 0)

    def test_get_staniste(self):
        url = f'{BASE_URL}skloniste/1'
        response = self.client.get(url)

        content = response.get_json()

        self.assertEqual(200, response.status_code)
        self.assertEqual(len(content), 1)

    def test_get_all_zivotinje_stanjista(self):
        url = f'{BASE_URL}skloniste/1/zivotinje'
        response = self.client.get(url)

        content = response.get_json()

        self.assertEqual(200, response.status_code)
        self.assertGreater(len(content), 0)

    def test_create_zivotinja(self):
        body = {
            "broj_cipa": 100,
            "vrsta": "ptica",
            "spol": "M",
            "datum_rodenja": "2021-09-21",
            "pasmina": "tigrica",
            "id_stanja": 2
        }
        url = f'{BASE_URL}skloniste/1/zivotinja'
        response = self.client.post(url, data=json.dumps(body), content_type='application/json')

        self.assertEqual(201, response.status_code, msg=str(response.data))

    def test_update_zivotinja(self):
        body = {
            "vrsta": "papiga",
            "spol": "M",
            "datum_rodenja": "2021-09-21",
            "pasmina": "tigrica",
            "id_stanja": 2
        }
        url = f'{BASE_URL}zivotinja/100'
        response = self.client.put(url, data=json.dumps(body), content_type='application/json')

        self.assertEqual(200, response.status_code)

    def test_get_zivotinja(self):
        url = f'{BASE_URL}zivotinja/505'
        response = self.client.get(url)

        content = response.get_json()

        self.assertEqual(200, response.status_code)
        self.assertEqual(len(content), 1)

    def test_delete_zivotinja(self):
        url = f'{BASE_URL}zivotinja/100'
        response = self.client.delete(url)

        self.assertEqual(200, response.status_code)


    def test_get_all_stanja(self):
        url = f'{BASE_URL}stanja'
        response = self.client.get(url)

        content = response.get_json()

        self.assertEqual(200, response.status_code)
        self.assertEqual(len(content), 5)

    def test_get_stanje(self):
        url = f'{BASE_URL}stanje/1'
        response = self.client.get(url)

        content = response.get_json()

        self.assertEqual(200, response.status_code)
        self.assertEqual(len(content), 1)

    def test_get_all_mjesta(self):
        url = f'{BASE_URL}mjesta'
        response = self.client.get(url)

        content = response.get_json()

        self.assertEqual(200, response.status_code)
        self.assertEqual(len(content), 5)

    def test_get_mjesto(self):
        url = f'{BASE_URL}mjesto/1'
        response = self.client.get(url)

        content = response.get_json()

        self.assertEqual(200, response.status_code)
        self.assertEqual(len(content), 1)
