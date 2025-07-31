import NavButton from "../NavButton";
import Button from "../Button";
import "./Header.css"

export default function Header() {
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
              <li className="nav-item active">
                <a className="nav-link active" href="/discover">
                  Discover
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/my_shelf">
                  My Shelf
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/highlights">
                  Highlights
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  How it works
                </a>
              </li>
            </ul>

            <NavButton
              href="/login"
              className=" m-md-2 my-sm-0"
              label="Login / Register"
            />
          </div>
        </div>
      </nav>
    </header>
  );
}
