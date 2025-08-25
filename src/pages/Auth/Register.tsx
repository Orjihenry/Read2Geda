import { NavLink } from "react-router-dom";

export default function Register() {
    return (
        <>
          <section className="vh-100">
            <div className="container-fluid h-100">
              <div className="row h-100">

                <div className="col-md-6 d-none d-md-block p-0">
                  <div className="h-100 w-100 bg-success"></div>
                </div>
                
                <div className="col-md-6 d-flex justify-content-center align-items-center bg-light shadow">
                  <div className="col-sm-10 col-md-8 col-lg-7">
                    <div className="card shadow-sm border-0">
                      <div className="card-header text-center bg-dark text-light border-0">
                        <a href="/" className="navbar-brand p-3 fs-2 logo-glass d-flex justify-content-center align-items-center">
                          <img className="rounded rounded-circle me-2" src="/src/assets/read2geda.ico" alt="logo" style={{ width: "40px "}} />
                          Read2Geda
                        </a>
                      </div>
                      <div className="card-body px-4 py-5 pt-3">
                        <h3 className="fw-normal fs-6 mb-0 text-center">Sign up</h3>
                        <p className="text-center mb-4">Open an account to enjoy exciting features!</p>
                        <form>
                          <div className="mb-3">
                            <label htmlFor="first_name" className="form-label">First Name</label>
                            <input type="text" id="first_name" className="form-control" />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" id="email" className="form-control" />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" id="password" className="form-control" />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="confirm" className="form-label">Confirm Password</label>
                            <input type="password" id="confirm" className="form-control" />
                          </div>
                          <div className="form-check mb-3">
                            <input type="checkbox" id="remember" className="form-check-input" />
                            <label htmlFor="remember" className="form-check-label">Agree to <a href="#">terms of service</a></label>
                          </div>
                          <button type="submit" className="btn btn-outline-success w-100 mb-3">
                            Sign up
                          </button>
                          <div className="text-center">
                            <p>Already a member? <NavLink to="/login">Sign in</NavLink></p>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
    )
}