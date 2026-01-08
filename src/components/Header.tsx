import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Button from "./Button";
import { FaUser } from "react-icons/fa";
import "../styles/Header.css";

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
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/clubs"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Book Clubs
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  About Us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/how_it_works"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  How it works
                </NavLink>
              </li>
            </ul>

            {currentUser ? (
              <div className="dropdown">
                <button
                  className="btn btn-outline-light d-flex align-items-center justify-content-center m-md-2 my-sm-0"
                  type="button"
                  id="userMenuDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ borderRadius: "50%", width: "40px", height: "40px", padding: 0 }}
                  title={currentUser.name}
                >
                  <FaUser />
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenuDropdown">
                  <li>
                    <div className="dropdown-item-text">
                      <small className="text-muted">Signed in as</small>
                      <div className="fw-semibold text-truncate" style={{ maxWidth: "200px" }}>
                        {currentUser.name}
                      </div>
                    </div>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <NavLink
                      to="/profile"
                      className={({ isActive }) =>
                        `dropdown-item ${isActive ? "active" : ""}`
                      }
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/my_shelf"
                      className={({ isActive }) =>
                        `dropdown-item ${isActive ? "active" : ""}`
                      }
                    >
                      Book Shelf
                    </NavLink>
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-outline-success m-md-2 my-sm-0 active"
                    : "btn btn-outline-success m-md-2 my-sm-0"
                }
              >
                Login / Register
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
