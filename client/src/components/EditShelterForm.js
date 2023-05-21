import { useEffect } from "react";
import ShelterHook from "../logic/ShelterHook";

function EditShelterForm(props) {
  const { name, setName, address, setAddress, place, setPlace } = ShelterHook();

  useEffect(() => {
    setName(props.data.naziv);
    setAddress(props.data.adresa);
    setPlace(props.data.id_mjesta);
  }, []);

  return (
    <div className="editShelterFormContainer">
      <form className="editShelterForm">
        <label>
          Naziv skloništa
          <input
            data-testid="nameInput"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Adresa skloništa
          <input
            data-testid="addressInput"
            name="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <label>
          Mjesto skloništa
          <select
            data-testid="placeInput"
            name="place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          >
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
            props.edit({
              id: props.data.id,
              naziv: name,
              adresa: address,
              id_mjesta: place,
            })
          }
        >
          Uredite sklonište
        </button>
        <button onClick={props.abort}>Odustanite</button>
      </div>
    </div>
  );
}
export default EditShelterForm;
