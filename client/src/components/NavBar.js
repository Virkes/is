// NavBar.js
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul className="navList">
        <li>
          <NavLink to="/">NASLOVNICA</NavLink>
        </li>
        <li>
          <NavLink to="/state">STANJA ŽIVOTINJA</NavLink>
        </li>
        <li>
          <NavLink to="/shelters">SKLONIŠTA</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
