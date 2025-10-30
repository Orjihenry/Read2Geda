import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import Button from "../Button";
import "./Header.css";

export default function Header() {
  const { logout, currentUser } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container ">
          <a className="navbar-brand p-3 logo-glass" href="/">
            Read2Geda
          </a>
          <Button
            className="navbar-toggler"
            type="button"
            dataBsToggle="collapse"
            dataBsTarget="#navbarSupportedContent"
            ariaExpanded={false}
            ariaControls="navbarSupportedContent"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </Button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink to="/clubs" className={({ isActive }) => isActive ? "nav-link active" : "nav-link" }>
                  Book Clubs
                </NavLink>
              </li>
              <li className="nav-item">
                 <NavLink to="/my_shelf" className={({ isActive }) => isActive ? "nav-link active" : "nav-link" }>
                  My Shelf
                </NavLink>
              </li>
              <li className="nav-item">
                 <NavLink to="/highlights" className={({ isActive }) => isActive ? "nav-link active" : "nav-link" }>
                  Highlights
                </NavLink>
              </li>
              <li className="nav-item">
                 <NavLink to="/how_it_works" className={({ isActive }) => isActive ? "nav-link active" : "nav-link" }>
                  How it works
                </NavLink>
              </li>
            </ul>

            { currentUser ? (
              <Button className={"btn-outline-success m-md-2 my-sm-0" } onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <NavLink to="/login" className={({ isActive }) => isActive ? "btn btn-outline-success m-md-2 my-sm-0 active" : "btn btn-outline-success m-md-2 my-sm-0" }>
                Login / Register
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
