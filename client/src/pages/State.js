import States from "../components/States";
import StateHook from "../logic/StateHook";

function StatePage() {
  let { states } = StateHook();
  return (
    <div>
      <States data={states} />
    </div>
  );
}

export default StatePage;
