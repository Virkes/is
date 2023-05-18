import EditShelterForm from "../components/EditShelterForm";
import NewShelterForm from "../components/NewShelterForm";
import SheltersList from "../components/SheltersList";
import ShelterHook from "../logic/ShelterHook";

function SheltersPage() {
  let {
    shelters,
    deleteShelter,
    loadMD,
    shelter,
    editFormIsOpen,
    editShelter,
    abortEditShelter,
    openEditShelterForm,
    editPlaces,
    addNewShelter,
    abortNewShelter,
    openForm,
    formIsOpen,
    closeForm,
    newPlaces,
    handleSearch,
  } = ShelterHook();

  return (
    <div>
      <input
        className="searcher"
        type="search"
        placeholder="Pretražite skloništa po nazivu, adresi ili mjestu"
        onChange={handleSearch}
      />
      <SheltersList
        data={shelters}
        openEdit={openEditShelterForm}
        deleteShelter={deleteShelter}
        loadMD={loadMD}
      />
      <div className="addNewShelterContainer">
        {!formIsOpen && !editFormIsOpen && (
          <button onClick={openForm}>Novo sklonište</button>
        )}

        {formIsOpen && (
          <NewShelterForm
            places={newPlaces}
            add={addNewShelter}
            abort={() => abortNewShelter(closeForm)}
          />
        )}
        {editFormIsOpen && (
          <EditShelterForm
            data={shelter}
            places={editPlaces}
            edit={editShelter}
            abort={abortEditShelter}
          />
        )}
      </div>
    </div>
  );
}

export default SheltersPage;
