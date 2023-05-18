import Detail from "./Detail";

function DetailsList(props) {
  return (
    <div className="sheltersTable">
      {props.data.map((detail) => (
        <Detail
          data={detail}
          key={detail.broj_cipa}
          openEdit={props.openEdit}
          deleteDetail={props.deleteDetail}
        />
      ))}
    </div>
  );
}
export default DetailsList;
