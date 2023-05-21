import MDHook from "../logic/MDHook";

function NewDetailForm(props) {
  const {
    brojCipa,
    setBrojCipa,
    pasmina,
    setPasmina,
    stanje,
    setStanje,
    vrsta,
    setVrsta,
    datum_rodenja,
    setDatumRodenja,
    spol,
    setSpol,
  } = MDHook();

  return (
    <div className="editShelterFormContainer">
      <form className="editDetailForm">
        <label className="">
          Broj čipa
          <input
            type="number"
            name="cip"
            value={brojCipa}
            onChange={(e) => setBrojCipa(e.target.value)}
          />
        </label>
        <label className="">
          Vrsta
          <input
            type="text"
            name="vrsta"
            value={vrsta}
            onChange={(e) => setVrsta(e.target.value)}
          />
        </label>
        <label className="">
          Pasmina
          <input
            type="text"
            name="pasmina"
            value={pasmina}
            onChange={(e) => setPasmina(e.target.value)}
          />
        </label>
        <label className="">
          Spol
          <input
            type="text"
            name="spol"
            value={spol}
            onChange={(e) => setSpol(e.target.value)}
            placeholder="M/F"
          />
        </label>
        <label className="">
          Stanje
          <select
            name="stanje"
            value={stanje}
            onChange={(e) => setStanje(e.target.value)}
          >
            <option key={0} value={0}>
              Odaberite stanje
            </option>
            {props.stanja.map((stanje) => (
              <option key={stanje.id} value={stanje.id}>
                {stanje.stanje}
              </option>
            ))}
          </select>
        </label>
        <label className="">
          Datum
          <input
            type="text"
            name="datum"
            value={datum_rodenja}
            onChange={(e) => setDatumRodenja(e.target.value)}
            placeholder="yyyy-mm-dd"
          />
        </label>
      </form>
      <div className="formActionBtns">
        <button
          onClick={() =>
            props.add({
              broj_cipa: brojCipa,
              vrsta: vrsta,
              pasmina: pasmina,
              spol: spol,
              id_stanja: stanje,
              datum_rodenja: datum_rodenja,
              id_sklonista: props.sklonisteID,
            })
          }
        >
          Dodajte životinju
        </button>
        <button onClick={props.abort}>Odustanite</button>
      </div>
    </div>
  );
}
export default NewDetailForm;
