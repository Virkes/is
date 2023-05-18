import Shelter from "./Shelter";

function SheltersList(props) {
  return (
    <div className="sheltersTable">
      {props.data.map((shelter) => (
        <Shelter
          data={shelter}
          key={shelter.id}
          openEdit={props.openEdit}
          deleteShelter={props.deleteShelter}
          loadMD={props.loadMD}
        />
      ))}
    </div>
  );
}
export default SheltersList;
