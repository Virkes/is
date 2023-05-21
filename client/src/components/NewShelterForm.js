import ShelterHook from "../logic/ShelterHook";

function NewShelterForm(props) {
  const { name, setName, address, setAddress, place, setPlace } = ShelterHook();
  return (
    <div className="newShelterFormContainer">
      <form className="newShelterForm">
        <label>
          Naziv skloništa
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Adresa skloništa
          <input
            type="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <label>
          Mjesto skloništa
          <select
            name="place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          >
            <option key={0} value={0}>
              Odaberite mjesto
            </option>
            {props.places.map((place) => (
              <option key={place.id} value={place.id}>
                {place.naziv}
              </option>
            ))}
          </select>
        </label>
      </form>
      <div className="formActionBtns">
        <button
          onClick={() =>
            props.add({ naziv: name, adresa: address, id_mjesta: place })
          }
        >
          Dodajte sklonište
        </button>
        <button onClick={props.abort}>Odustanite</button>
      </div>
    </div>
  );
}
export default NewShelterForm;
