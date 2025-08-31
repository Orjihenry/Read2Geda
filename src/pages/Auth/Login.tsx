import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import read2gedaLogo from "../../assets/read2geda.ico"

export default function Login() {

    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errorMsg, setErrorMsg ] = useState('');
    const [ success, setSuccess ] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        userRef.current?.focus();
    }, [])

    useEffect(() => {
        setErrorMsg('');
    }, [email, password])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
          setErrorMsg("User not found! Please register first.");
          return
        }

        const { email: storedEmail, pwd: storedPassword } = JSON.parse(storedUser);

        if (email === storedEmail && password === storedPassword) {
          localStorage.setItem("isLoggedIn", "true");
          setEmail('');
          setPassword('');
          setSuccess(true);
          navigate("/highlights")
        } else {
          setErrorMsg("Invalid credentials. Please try again!");
        }
    }

    return (
        <>
          <section className="vh-100">
            <div className="container-fluid h-100">
              <div className="row h-100">
                
                <div className="col-md-6 d-flex justify-content-center align-items-center bg-light shadow">
                  <div className="col-sm-10 col-md-8 col-lg-7">
                    <div className="card shadow-sm border-0">
                      <div className="card-header text-center bg-dark text-light border-0">
                        <a href="/" className="navbar-brand p-3 fs-2 logo-glass d-flex justify-content-center align-items-center">
                          <img className="rounded rounded-circle me-2" src={read2gedaLogo} alt="logo" style={{ width: "40px "}} />
                          Read2Geda
                        </a>
                      </div>
                      <div className="card-body px-4 py-5 pt-3">
                        <h3 className="fw-normal fs-6 mb-0 text-center">Log in</h3>
                        <p className="text-center mb-4">Welcome back!</p>
                        
                        <p ref={errRef} className={errorMsg ? "text-danger" : "d-none"} aria-live="assertive">
                          {errorMsg}
                        </p>
                        {success && <p className="text-success text-center">Login successful! 🎉</p>}
                        <form onSubmit={handleSubmit}>
                          <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" id="email" className="form-control" ref={userRef} autoComplete="off" onChange={(e) => setEmail(e.target.value)} value={email} required />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" id="password" className="form-control" autoComplete="off" onChange={(e) => setPassword(e.target.value)} value={password} required />
                          </div>
                          <div className="form-check mb-3">
                            <input type="checkbox" id="remember" className="form-check-input" />
                            <label htmlFor="remember" className="form-check-label">Remember me</label>
                          </div>
                          <button type="submit" className="btn btn-outline-success w-100 mb-3">
                            Sign in
                          </button>
                          <div className="text-center">
                            <p>Not a member? <NavLink to="/register">Sign up</NavLink></p>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 d-none d-md-block p-0">
                    <div className="h-100 w-100 bg-success"></div>
                </div>
              </div>
            </div>
          </section>
        </>
    )
}