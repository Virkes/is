from flask_testing import TestCase
from flask import Flask
from app import app

class AppTest(TestCase):

    def create_app(self):
        app.config['TESTING'] = True
        return app
    