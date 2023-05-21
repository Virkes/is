function States(props) {
  return (
    <div className="stateContainer">
      {props.data &&
        props.data.map((state) => (
          <div data-testid="state" className="stateRow" key={state.stanje}>
            <div className="stateID">{state.id}</div>
            <div className="stateName">{state.stanje}</div>
          </div>
        ))}
    </div>
  );
}
export default States;
