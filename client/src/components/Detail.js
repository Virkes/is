function Detail(props) {
  return (
    <div className="sheltersTable">
      <div className="singleDetail">
        <div>{props.data.broj_cipa}</div>
        <div>{props.data.vrsta}</div>
        <div>{props.data.pasmina}</div>
        <div>{props.data.spol}</div>
        <div>{props.data.stanje}</div>
        <div>{props.data.datum_rodenja}</div>
        <div className="actionBtnsContainer">
          <button onClick={() => props.openEdit(props.data.broj_cipa)}>
            Uredi
          </button>
          <button onClick={() => props.deleteDetail(props.data.broj_cipa)}>
            Izbriši
          </button>
        </div>
      </div>
    </div>
  );
}
export default Detail;
