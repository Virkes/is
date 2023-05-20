import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ShelterHook = () => {
  const navigate = useNavigate();
  const [deleted, setDeleted] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [place, setPlace] = useState("");
  const [shelter, setShelter] = useState({});
  const [editFormIsOpen, setEditFormIsOpen] = useState(false);
  const [editPlaces, setEditPlaces] = useState([]);
  const [newData, setNewData] = useState(false);
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [newPlaces, setNewPlaces] = useState([]);

  const [searchField, setSearchField] = useState("");
  const [lastFilterValue, setLastFilterValue] = useState(0);
  const [shelters, setShelters] = useState([]);
  const [backupShelters, setBackupShelters] = useState([]);

  const handleSearch = (e) => {
    setSearchField(e.target.value);
    if (e.target.value.length === 1 && lastFilterValue === 0) {
      setBackupShelters(shelters);
    }
    if (e.target.value.length <= lastFilterValue) {
      setShelters(backupShelters);
    }
    const filteredShelters = shelters.filter((shelter) => {
      return (
        shelter.naziv
          .toLocaleLowerCase()
          .includes(searchField.toLocaleLowerCase()) ||
        shelter.adresa
          .toLocaleLowerCase()
          .includes(searchField.toLocaleLowerCase()) ||
        shelter.naziv_mjesta
          .toLocaleLowerCase()
          .includes(searchField.toLocaleLowerCase())
      );
    });
    if (e.target.value.length > lastFilterValue) setShelters(filteredShelters);
    setLastFilterValue(e.target.value.length);
  };

  const loadMD = (id) => {
    navigate("/masterdetail/" + id);
  };

  const deleteShelter = (id) => {
    if (window.confirm("Jeste li sigurni da želite izbrisati sklonište?")) {
      fetch("http://127.0.0.1:5000/skloniste/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          response.json().then(() => {
            setDeleted(!deleted);
            setShelters([]);
          });
        })
        .catch((error) => alert("Došlo je do pogreške pri obradi zahtjeva"));
    }
  };

  useEffect(() => {
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
      .catch((error) => alert("Došlo je do pogreške pri obradi zahtjeva"));
  }, [deleted, newData]);

  const openEditShelterForm = (id) => {
    fetch("http://127.0.0.1:5000/skloniste/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response.json().then((data) => {
          setShelter(data[0]);
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
            .catch((error) =>
              alert("Došlo je do pogreške pri obradi zahtjeva")
            );
        });
      })
      .catch((error) => alert("Došlo je do pogreške pri obradi zahtjeva"));
  };

  const closeForm = () => {
    setEditFormIsOpen(false);
    setFormIsOpen(false);
  };

  const addNewShelter = (shelter) => {
    fetch("http://127.0.0.1:5000/skloniste", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shelter),
    })
      .then((response) => {
        response.json().then(() => {
          setNewData(!newData);
          closeForm();
        });
      })
      .catch((error) => alert("Došlo je do pogreške pri obradi zahtjeva"));
  };

  const abortEditShelter = () => {
    closeForm();
  };

  const editShelter = (shelter) => {
    fetch("http://127.0.0.1:5000/skloniste/" + shelter.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shelter),
    })
      .then((response) => {
        response.json().then((data) => {
          closeForm();
          setNewData(!newData);
        });
      })
      .catch((error) => alert("Došlo je do pogreške pri obradi zahtjeva"));
  };

  const openForm = () => {
    fetch("http://127.0.0.1:5000/mjesta", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response.json().then((data) => {
          setNewPlaces(data);
          setFormIsOpen(true);
        });
      })
      .catch((error) => alert("Došlo je do pogreške pri obradi zahtjeva"));
  };

  const abortNewShelter = (closeForm) => {
    closeForm();
  };

  return {
    shelters,
    loadMD,
    deleteShelter,
    address,
    setAddress,
    name,
    setName,
    addNewShelter,
    abortEditShelter,
    place,
    setPlace,
    editFormIsOpen,
    closeForm,
    shelter,
    editShelter,
    openEditShelterForm,
    editPlaces,
    newData,
    //
    abortNewShelter,
    formIsOpen,
    newPlaces,
    openForm,
    handleSearch,
  };
};

export default ShelterHook;
