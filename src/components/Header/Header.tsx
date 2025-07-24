// import 'Header.css'

export default function Header() {
    return (
        <header className="header">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container ">
                    <a className="navbar-brand" href="#">Read2Geda</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link active" href="#">Discover</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">My Shelf</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Highlights</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">How it works</a>
                            </li>
                        </ul>

                        <button className="btn btn-outline-success m-md-2 my-sm-0" type="submit">Login / Register</button>

                    </div>
                    
                </div>
            </nav>
        </header>
    )
}