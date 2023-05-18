import DetailsList from "../components/DetailsList";
import Master from "../components/Master";
import MDHook from "../logic/MDHook";
import EditShelterForm from "../components/EditShelterForm";
import EditDetailForm from "../components/EditDetailForm";
import NewDetailForm from "../components/NewDetailForm";

function MasterDetailPage() {
  const {
    master,
    details,
    editMaster,
    editFormIsOpen,
    abortEditShelter,
    openEditMasterForm,
    editPlaces,
    editDetailFormIsOpen,
    detail,
    stanja,
    novaStanja,
    openEditDetailForm,
    editDetail,
    abortEditDetail,
    deleteDetail,
    newDetailFormIsOpen,
    openNewDetailForm,
    addNewDetail,
    abortNewDetail,
    calculateID,
  } = MDHook();

  return (
    <div>
      <div className="prevNextBtns">
        <button onClick={() => calculateID(master.id, true)}>Prethodni</button>
        <button onClick={() => calculateID(master.id, false)}>Sljedeći</button>
      </div>
      <p>{master.naziv}</p>
      <Master data={master} openEdit={openEditMasterForm} />
      {editFormIsOpen && (
        <EditShelterForm
          data={master}
          places={editPlaces}
          edit={editMaster}
          abort={abortEditShelter}
        />
      )}
      <p>Životinje</p>
      {!newDetailFormIsOpen && !editFormIsOpen && (
        <div className="newAnimalBtnContainer">
          <button onClick={openNewDetailForm}>Nova životinja</button>
        </div>
      )}
      {newDetailFormIsOpen && (
        <NewDetailForm
          stanja={novaStanja}
          add={addNewDetail}
          abort={abortNewDetail}
          sklonisteID={master.id}
        />
      )}
      {editDetailFormIsOpen && (
        <EditDetailForm
          data={detail}
          stanja={stanja}
          edit={editDetail}
          abort={abortEditDetail}
        />
      )}
      <DetailsList
        data={details}
        openEdit={openEditDetailForm}
        deleteDetail={deleteDetail}
      />
    </div>
  );
}

export default MasterDetailPage;
