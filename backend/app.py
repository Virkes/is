from dotenv import load_dotenv
import psycopg2
import os
from flask import Flask, jsonify, make_response
from flask_cors import CORS

load_dotenv()

conn = psycopg2.connect(database="sz",
                        user='postgres',
                        password=os.environ.get('PASSWORD'),
                        host='127.0.0.1',
                        port='5433')

app = Flask(__name__)
CORS(app, supports_credentials=True)

conn.autocommit = True
cursor = conn.cursor()

@app.route('/')
def getAllSlonista():
    sql = '''
    SELECT json_agg(skloniste)::jsonb FROM skloniste
    '''
    cursor.execute(sql)
    result = cursor.fetchall()
    result_dict = []
    for row in result:
        result_dict.extend(row)
    print(result_dict)
    return make_response(jsonify(result_dict[0]), 200)

if __name__ == "__main__":
    app.run(debug=True)