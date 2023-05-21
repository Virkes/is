function Detail(props) {
  return (
    <div className="sheltersTable">
      <div className="singleDetail">
        <div data-testid="cip">{props.data.broj_cipa}</div>
        <div data-testid="vrsta">{props.data.vrsta}</div>
        <div data-testid="pasmina">{props.data.pasmina}</div>
        <div data-testid="spol">{props.data.spol.toUpperCase()}</div>
        <div data-testid="stanje">{props.data.stanje}</div>
        <div data-testid="datum">{props.data.datum_rodenja}</div>
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
