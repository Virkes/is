function Shelter(props) {
  return (
    <div className="singleShelter">
      <div data-testid="name" className="shelterName">
        {props.data.naziv}
      </div>
      <div data-testid="address" className="shelterAddress">
        {props.data.adresa}
      </div>
      <div data-testid="place" className="shelterTownContainer">
        {props.data.naziv_mjesta}
      </div>
      <div className="actionBtnsContainer">
        <button onClick={() => props.loadMD(props.data.id)}>
          Više detalja
        </button>
        <button onClick={() => props.openEdit(props.data.id)}>Uredi</button>
        <button
          data-testid="delete"
          onClick={() => props.deleteShelter(props.data.id)}
        >
          Izbriši
        </button>
      </div>
    </div>
  );
}
export default Shelter;
