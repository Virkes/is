function Shelter(props) {
  return (
    <div className="singleShelter">
      <div className="shelterName">{props.data.naziv}</div>
      <div className="shelterAddress">{props.data.adresa}</div>
      <div className="shelterTownContainer">{props.data.naziv_mjesta}</div>
      <div className="actionBtnsContainer">
        <button onClick={() => props.loadMD(props.data.id)}>
          Više detalja
        </button>
        <button onClick={() => props.openEdit(props.data.id)}>Uredi</button>
        <button onClick={() => props.deleteShelter(props.data.id)}>
          Izbriši
        </button>
      </div>
    </div>
  );
}
export default Shelter;
