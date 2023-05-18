import { useEffect } from "react";
import MDHook from "../logic/MDHook";

function EditDetailForm(props) {
  const {
    brojCipa,
    setBrojCipa,
    vrsta,
    setVrsta,
    pasmina,
    setPasmina,
    spol,
    setSpol,
    stanje,
    setStanje,
    datum_rodenja,
    setDatumRodenja,
  } = MDHook();

  useEffect(() => {
    setBrojCipa(props.data.broj_cipa);
    setVrsta(props.data.vrsta);
    setPasmina(props.data.pasmina);
    setSpol(props.data.spol);
    setStanje(props.data.id_stanja);
    setDatumRodenja(props.data.datum_rodenja);
  }, []);

  return (
    <div className="editShelterFormContainer">
      <form className="editDetailForm">
        <label>
          Broj čipa
          <input
            type="text"
            value={brojCipa}
            onChange={(e) => setBrojCipa(e.target.value)}
          />
        </label>
        <label>
          Vrsta
          <input
            type="text"
            value={vrsta}
            onChange={(e) => setVrsta(e.target.value)}
          />
        </label>
        <label>
          Psmina
          <input
            type="text"
            value={pasmina}
            onChange={(e) => setPasmina(e.target.value)}
          />
        </label>
        <label>
          Spol
          <input
            type="text"
            value={spol}
            onChange={(e) => setSpol(e.target.value)}
          />
        </label>
        <label>
          Stanje
          <select value={stanje} onChange={(e) => setStanje(e.target.value)}>
            {/* <option key={0} value={0}>
              {props.data.naziv_mjesta}
            </option> */}
            {props.stanja.map((stanje) => (
              <option key={stanje.id} value={stanje.id}>
                {stanje.stanje}
              </option>
            ))}
          </select>
        </label>
        <label>
          Datum
          <input
            type="text"
            value={datum_rodenja}
            onChange={(e) => setDatumRodenja(e.target.value)}
          />
        </label>
      </form>
      <div className="formActionBtns">
        <button
          onClick={() =>
            props.edit({
              broj_cipa: brojCipa,
              vrsta: vrsta,
              pasmina: pasmina,
              spol: spol,
              id_stanja: stanje,
              datum_rodenja: datum_rodenja,
            })
          }
        >
          Uredite životinju
        </button>
        <button onClick={props.abort}>Odustanite</button>
      </div>
    </div>
  );
}
export default EditDetailForm;
