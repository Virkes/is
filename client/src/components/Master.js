function Master(props) {
  return (
    <div className="sheltersTable">
      <div className="singleShelter">
        <div>{props.data.naziv}</div>
        <div>{props.data.adresa}</div>
        <div>{props.data.naziv_mjesta}</div>
        <button onClick={props.openEdit}>Uredi</button>
      </div>
    </div>
  );
}
export default Master;
