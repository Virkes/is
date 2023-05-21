# Sklonište životinja

Za instalaciju aplikacije na računalo potrebni su PostgreSQL verzije 14. ili više te Python 3.7 ili više. Repozitorij se klonira naredbom _git clone_.

## Baza podataka

Baza se stvara kopiranjem prve linije _SklonisteZivotinja-StvaranjeBaze.txt_. Nakon otvaranja stvorene baze kopira se ostatak datoteke za stvaranje tablica. Punjenje baze moguće je kopiranjem datoteke _SklonisteZivotinja-PunjenjeBaze.txt_.

## Backend

Za pokretanje backend dijela aplikacije potrebno jest definirati lozinku za pristup bazi podataka. Pozicioniranjem u direktorij backend-a potrebno je izvršiti naredbu _pip install -r requirements.txt_. Nakon toga je moguće pokretanje naredbom _python app.py_. Testiranje se izvršava iz istog direktorija naredbom _python -m pytest ./tests/_.

## Frontend

Pre-requisites

1. Instaliran Node.js
2. Instaliran create-react-app paket (naredba _npm i create-react-app_)

Koraci za pokretanje

1. U client folderu izvršiti naredbu _npm install_ kako bi se instalirali svi potrebni paketi iz package.json datoteke
2. U client folderu izvršiti naredbu _npm start_ za pokretanje frontend dijela aplikacije

Testiranje

1. U client folderu izvršiti naredbu _npm test_ za pokretanje testova
