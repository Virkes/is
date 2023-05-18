import "./App.css";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import SheltersPage from "./pages/Shelters";
import StatePage from "./pages/State";
import HomePage from "./pages/Home";
import MasterDetailPage from "./pages/MasterDetail";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/state" element={<StatePage />} />
        <Route path="/shelters" element={<SheltersPage />} />
        <Route path="/masterdetail/:id" element={<MasterDetailPage />} />
      </Routes>
    </>
  );
};

export default App;
