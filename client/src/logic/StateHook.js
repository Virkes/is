import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StateHook = () => {
  const [states, setStates] = useState();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/stanja", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((data) => {
        setStates(data);
      });
    });
  }, []);
  return {
    states,
  };
};

export default StateHook;
