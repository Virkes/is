from dotenv import load_dotenv
import psycopg2
import os
from flask import Flask, jsonify, make_response, request
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
    SELECT row_to_json(r, true)
    FROM ( SELECT
    s.id, s.naziv, s.adresa, s.id_mjesta, m.naziv as naziv_mjesta
    FROM skloniste s
    JOIN mjesto m
    ON s.id_mjesta = m.id)
    as r
    '''
    cursor.execute(sql)
    result = cursor.fetchall()
    result_dict = []
    for row in result:
        result_dict.extend(row)
    return make_response(jsonify(result_dict), 200)


@app.route('/skloniste', methods=['POST'])
def createSkloniste():
    request_data = request.get_json()

    sql = f'''
    INSERT INTO skloniste(naziv, adresa, id_mjesta)
    VALUES('{request_data["naziv"]}',
    '{request_data["adresa"]}', {request_data["id_mjesta"]})
    '''
    cursor.execute(sql)
    conn.commit()
    return make_response(jsonify(""), 201)


@app.route('/skloniste/<int:id_sklonista>')
def getSkloniste(id_sklonista):
    sql = f'''
    SELECT row_to_json(r, true)
    FROM ( SELECT
    s.id, s.naziv, s.adresa, s.id_mjesta, m.naziv as naziv_mjesta
    FROM skloniste s
    JOIN mjesto m
    ON s.id_mjesta = m.id
    WHERE s.id = {id_sklonista})
    as r
    '''
    cursor.execute(sql)
    result = cursor.fetchone()
    return make_response(jsonify(result), 200)


@app.route('/skloniste/<int:id_sklonista>', methods=['PUT'])
def updateSkloniste(id_sklonista):
    request_data = request.get_json()

    sql = f'''
    UPDATE skloniste
    SET naziv = '{request_data["naziv"]}',
    adresa = '{request_data["adresa"]}',
    id_mjesta = {request_data["id_mjesta"]}
    WHERE id = {id_sklonista}
    '''
    cursor.execute(sql)
    conn.commit()
    return make_response(jsonify(""), 200)


@app.route('/skloniste/<int:id_sklonista>', methods=['DELETE'])
def deleteSkloniste(id_sklonista):
    sql = f'''
    DELETE FROM skloniste
    WHERE id = {id_sklonista}
    '''
    cursor.execute(sql)
    conn.commit()
    return make_response(jsonify(""), 200)


@app.route('/skloniste/<int:id_sklonista>/zivotinje')
def getZivotinjeSklonista(id_sklonista):
    sql = f'''
    SELECT row_to_json(r, true)
    FROM ( SELECT
    z.broj_cipa, z.vrsta, z.datum_rodenja,
    z.spol, z.pasmina, z.id_stanja, s.stanje
    FROM zivotinja z
    JOIN stanje_zivotinje s
    ON z.id_stanja = s.id
    WHERE z.id_sklonista = {id_sklonista})
    as r
    '''
    cursor.execute(sql)
    result = cursor.fetchall()
    result_dict = []
    for row in result:
        result_dict.extend(row)
    return make_response(jsonify(result_dict), 200)


@app.route('/zivotinja/<int:broj_cipa>')
def getZivotinja(broj_cipa):
    sql = f'''
    SELECT row_to_json(r, true)
    FROM ( SELECT
    z.broj_cipa, z.vrsta, z.spol,
    z.datum_rodenja,
    z.pasmina, z.id_stanja, s.stanje
    FROM zivotinja z
    JOIN stanje_zivotinje s
    ON z.id_stanja = s.id
    WHERE z.broj_cipa = {broj_cipa})
    as r
    '''
    cursor.execute(sql)
    result = cursor.fetchone()
    return make_response(jsonify(result), 200)


@app.route('/skloniste/<int:id_sklonista>/zivotinja', methods=['POST'])
def createZivotinja(id_sklonista):
    request_data = request.get_json()

    sql = f'''
    INSERT INTO zivotinja(broj_cipa, vrsta, spol, datum_rodenja,
    pasmina, id_sklonista, id_stanja)
    VALUES({request_data["broj_cipa"]}, '{request_data["vrsta"]}',
    '{request_data["spol"]}', '{request_data["datum_rodenja"]}',
    '{request_data["pasmina"]}', {id_sklonista}, {request_data["id_stanja"]})
    '''
    cursor.execute(sql)
    conn.commit()
    return make_response(jsonify(""), 201)


@app.route('/zivotinja/<int:broj_cipa>', methods=['PUT'])
def updateZivotinja(broj_cipa):
    request_data = request.get_json()

    sql = f'''
    UPDATE zivotinja
    SET vrsta = '{request_data["vrsta"]}',
    spol = '{request_data["spol"]}',
    datum_rodenja = '{request_data["datum_rodenja"]}',
    pasmina = '{request_data["pasmina"]}',
    id_stanja = {request_data["id_stanja"]}
    WHERE broj_cipa = {broj_cipa}
    '''
    cursor.execute(sql)
    conn.commit()
    return make_response(jsonify(""), 200)


@app.route('/zivotinja/<int:broj_cipa>', methods=['DELETE'])
def deleteZivotinja(broj_cipa):
    sql = f'''
    DELETE FROM zivotinja
    WHERE broj_cipa = {broj_cipa}
    '''
    cursor.execute(sql)
    conn.commit()
    return make_response(jsonify(""), 200)


@app.route('/mjesta')
def getAllMjesta():
    sql = '''
    SELECT json_agg(mjesto)::jsonb FROM mjesto
    '''
    cursor.execute(sql)
    result = cursor.fetchall()
    result_dict = []
    for row in result:
        result_dict.extend(row)
    return make_response(jsonify(result_dict[0]), 200)


@app.route('/mjesto/<int:id_mjesta>')
def getMjesto(id_mjesta):
    sql = f'''
    SELECT json_agg(mjesto)::jsonb FROM mjesto
    WHERE id = {id_mjesta}
    '''
    cursor.execute(sql)
    result = cursor.fetchone()
    return make_response(jsonify(result), 200)


@app.route('/stanja')
def getAllStanja():
    sql = '''
    SELECT json_agg(stanje_zivotinje)::jsonb FROM stanje_zivotinje
    '''
    cursor.execute(sql)
    result = cursor.fetchall()
    result_dict = []
    for row in result:
        result_dict.extend(row)
    return make_response(jsonify(result_dict[0]), 200)


@app.route('/stanje/<int:id_stanja>')
def getStanje(id_stanja):
    sql = f'''
    SELECT json_agg(stanje_zivotinje)::jsonb FROM stanje_zivotinje
    WHERE id = {id_stanja}
    '''
    cursor.execute(sql)
    result = cursor.fetchone()
    return make_response(jsonify(result), 200)



if __name__ == "__main__":
    app.run(debug=True)