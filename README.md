# Sklonište životinja

Za instalaciju aplikacije na računalo potrebni su PostgreSQL verzije 14. ili više te Python 3.7 ili više. Repozitorij se klonira naredbom *git clone*.

## Baza podataka

Baza se stvara kopiranjem prve linije *SklonisteZivotinja-StvaranjeBaze.txt*. Nakon otvaranja stvorene baze kopira se ostatak datoteke za stvaranje tablica. Punjenje baze moguće je kopiranjem datoteke *SklonisteZivotinja-PunjenjeBaze.txt*.

## Backend

Za pokretanje backend dijela aplikacije potrebno jest definirati lozinku za pristup bazi podataka. Pozicioniranjem u direktorij backend-a potrebno je izvršiti naredbu *pip install -r requirements.txt*. Nakon toga je moguće pokretanje naredbom *python app.py*. Testiranje se izvršava iz istog direktorija naredbom *python -m pytest ./tests/*.