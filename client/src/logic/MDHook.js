import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MDHook = () => {
  const navigate = useNavigate();
  const [editFormIsOpen, setEditFormIsOpen] = useState(false);
  const [editPlaces, setEditPlaces] = useState([]);

  const [master, setMaster] = useState({});
  const [details, setDetails] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const [detail, setDetail] = useState({});
  const [stanja, setStanja] = useState([]);
  const [novaStanja, setNovaStanja] = useState([]);
  const [editDetailFormIsOpen, setEditDetailFormIsOpen] = useState(false);
  const [brojCipa, setBrojCipa] = useState("");
  const [vrsta, setVrsta] = useState("");
  const [pasmina, setPasmina] = useState("");
  const [spol, setSpol] = useState("");
  const [stanje, setStanje] = useState("");
  const [datum_rodenja, setDatumRodenja] = useState("");
  const [newDetailFormIsOpen, setNewDetailFormIsOpen] = useState(false);
  const [shelters, setShelters] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/skloniste/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response.json().then((data) => {
          setMaster(data[0]);
          fetch("http://127.0.0.1:5000/skloniste/" + id + "/zivotinje", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              response.json().then((data) => {
                setDetails(data);
                fetch("http://127.0.0.1:5000/", {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                })
                  .then((response) => {
                    response.json().then((data) => {
                      setShelters(data);
                    });
                  })
                  .catch((error) =>
                    alert("Došlo je do pogreške pri obradi zahtjeva")
                  );
              });
            })
            .catch((error) =>
              alert("Došlo je do pogreške pri obradi zahtjeva")
            );
        });
      })
      .catch((error) => alert("Došlo je do pogreške pri obradi zahtjeva"));
  }, [updated, deleted]);

  const editMaster = (shelter) => {
    fetch("http://127.0.0.1:5000/skloniste/" + shelter.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shelter),
    })
      .then((response) => {
        response.json().then(() => {
          setUpdated(!updated);
          closeForm();
        });
      })
      .catch((error) => alert("Došlo je do pogreške pri obradi zahtjeva"));
  };

  const openEditMasterForm = () => {
    fetch("http://127.0.0.1:5000/mjesta", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response.json().then((data) => {
          setEditPlaces(data);
          setEditFormIsOpen(true);
        });
      })
      .catch((error) => alert("Došlo je do pogreške pri obradi zahtjeva"));
  };

  const closeForm = () => {
    setEditFormIsOpen(false);
  };

  const addNewDetail = (detail) => {
    if (checkValidation(detail)) {
      fetch(
        "http://127.0.0.1:5000/skloniste/" + detail.id_sklonista + "/zivotinja",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(detail),
        }
      )
        .then((response) => {
          response.json().then((data) => {
            setUpdated(!updated);
            setNewDetailFormIsOpen(false);
          });
        })
        .catch((error) => alert("Došlo je do pogreške pri obradi zahtjeva"));
    }
  };

  const abortEditShelter = () => {
    closeForm();
  };

  const abortEditDetail = () => {
    setEditDetailFormIsOpen(false);
  };

  const abortNewDetail = () => {
    setNewDetailFormIsOpen(false);
  };

  const openEditDetailForm = (id) => {
    fetch("http://127.0.0.1:5000/zivotinja/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response.json().then((data) => {
          setDetail(data[0]);
          fetch("http://127.0.0.1:5000/stanja", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              response.json().then((data) => {
                setStanja(data);
                setEditDetailFormIsOpen(true);
              });
            })
            .catch((error) =>
              alert("Došlo je do pogreške pri obradi zahtjeva")
            );
        });
      })
      .catch((error) => alert("Došlo je do pogreške pri obradi zahtjeva"));
  };

  const editDetail = (detail) => {
    if (checkValidation(detail)) {
      fetch("http://127.0.0.1:5000/zivotinja/" + detail.broj_cipa, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(detail),
      })
        .then((response) => {
          response.json().then((data) => {
            setEditDetailFormIsOpen(false);
            setUpdated(!updated);
          });
        })
        .catch((error) => alert("Došlo je do pogreške pri obradi zahtjeva"));
    }
  };

  const deleteDetail = (id) => {
    if (window.confirm("Jeste li sigurni da želite izbrisati životinju?")) {
      fetch("http://127.0.0.1:5000/zivotinja/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          response.json().then(() => {
            setDeleted(!deleted);
          });
        })
        .catch((error) => alert("Došlo je do pogreške pri obradi zahtjeva"));
    }
  };

  const openNewDetailForm = () => {
    fetch("http://127.0.0.1:5000/stanja", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response.json().then((data) => {
          setNovaStanja(data);
          setNewDetailFormIsOpen(true);
        });
      })
      .catch((error) => alert("Došlo je do pogreške pri obradi zahtjeva"));
  };

  function calculateID(currentID, down) {
    let retID = 0;
    let sorted = shelters.sort((a, b) => a.id - b.id);
    let len = Object.keys(sorted).length;
    for (let i = 0; i < len; i++) {
      if (sorted[i].id === currentID) {
        if (!down) {
          if (sorted[i + 1]) {
            retID = sorted[i + 1].id;
            navigate("/masterdetail/" + retID);
            setUpdated(!updated);
          } else {
            alert("Ne postoji sljedeći zapis");
          }
        } else {
          if (sorted[i - 1]) {
            retID = sorted[i - 1].id;
            navigate("/masterdetail/" + retID);
            setUpdated(!updated);
          } else {
            alert("Ne postoji prethodni zapis");
          }
        }
      }
    }
  }

  function checkValidation(detail) {
    let retValue = true;
    if (detail.broj_cipa === "") {
      alert("Morate unijeti broj čipa");
      retValue = false;
    } else if (!Number.isInteger(parseInt(detail.broj_cipa))) {
      alert("Broj čipa mora biti cijeli broj");
      retValue = false;
    } else if (detail.vrsta === "") {
      alert("Morate unijeti vrstu");
      retValue = false;
    } else if (detail.pasmina === "") {
      alert("Morate unijeti pasminu");
      retValue = false;
    } else if (detail.spol === "") {
      alert("Morate unijeti spol");
      retValue = false;
    } else if (detail.id_stanja === "") {
      alert("Morate odabrati stanje");
      retValue = false;
    } else if (detail.datum_rodenja === "") {
      alert("Morate unijeti datum");
      retValue = false;
    } else if (
      detail.spol.toUpperCase() !== "M" &&
      detail.spol.toUpperCase() !== "F"
    ) {
      alert("Morate unijeti ispravan spol (M/F)");
      retValue = false;
    } else {
      let dateString = detail.datum_rodenja;
      var regEx = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateString.match(regEx)) {
        retValue = false;
        alert("Morate unijeti datum u ispravnom obliku - YYYY-MM-DD");
      } else {
        var d = new Date(dateString);
        var dNum = d.getTime();
        if (!dNum && dNum !== 0) {
          retValue = false;
          alert("Morate unijeti ispravan datum");
        }
      }
    }
    return retValue;
  }

  return {
    abortEditShelter,
    editFormIsOpen,
    editPlaces,
    openEditMasterForm,
    master,
    details,
    editMaster,
    detail,
    stanja,
    editDetailFormIsOpen,
    openEditDetailForm,
    brojCipa,
    vrsta,
    pasmina,
    spol,
    stanje,
    datum_rodenja,
    setBrojCipa,
    setVrsta,
    setPasmina,
    setSpol,
    setStanje,
    setDatumRodenja,
    editDetail,
    abortEditDetail,
    deleteDetail,
    newDetailFormIsOpen,
    openNewDetailForm,
    addNewDetail,
    abortNewDetail,
    novaStanja,
    calculateID,
  };
};

export default MDHook;
