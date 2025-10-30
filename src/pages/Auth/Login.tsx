import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

import read2gedaLogo from "../../assets/read2geda.ico"
import Swal from "sweetalert2";

export default function Login() {
  const { login, currentUser } = useAuthContext();
  const navigate = useNavigate();

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [ email, setEmail ] = useState('');
  const [ pwd, setPwd ] = useState('');
  const [ errorMsg, setErrorMsg ] = useState('');
  const [ success, setSuccess ] = useState(false);

  useEffect(() => {
    if (currentUser) {
      navigate("/profile");
      return;
    }

    userRef.current?.focus();
  }, [currentUser, navigate])

  useEffect(() => {
      setErrorMsg('');
  }, [email, pwd])

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      const success = login(email, pwd)

      if (success) {
        setEmail('');
        setPwd('');
        setSuccess(true);
        navigate("/profile");
      }
  }

  const dummyAccounts = () => {
    const accounts = [
      { name: "Alice", email: "alice@example.com" },
      { name: "Bob", email: "bob@example.com" },
      { name: "Carol", email: "carol@example.com" },
      { name: "David", email: "david@example.com" },
      { name: "Emma", email: "emma@example.com" },
      { name: "Frank", email: "frank@example.com" },
      { name: "Grace", email: "grace@example.com" },
      { name: "Henry", email: "henry@example.com" },
      { name: "Isabella", email: "isabella@example.com" },
      { name: "Jack", email: "jack@example.com" },
      { name: "Kate", email: "kate@example.com" },
      { name: "Luke", email: "luke@example.com" },
      { name: "Maya", email: "maya@example.com" },
      { name: "Nathan", email: "nathan@example.com" },
      { name: "Olivia", email: "olivia@example.com" },
    ];

    const accountList = accounts.map(acc => 
      `<tr class="border-bottom">
        <td class="fw-bold">${acc.name}</td>
        <td><code class="text-primary">${acc.email}</code></td>
        <td><code class="text-muted">password</code></td>
      </tr>`
    ).join('');

    Swal.fire({
      icon: "info",
      title: "Dummy Accounts Available",
      html: `
        <div class="text-start">
          <p class="mb-3 text-center">Use any of the following dummy accounts:</p>
          <div style="max-height: 400px; overflow-y: auto;">
            <table class="table table-sm table-borderless mb-0">
              <thead class="table-light">
                <tr class="border-bottom">
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                </tr>
              </thead>
              <tbody>
                ${accountList}
              </tbody>
            </table>
          </div>
        </div>
      `,
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: "Got it!",
      confirmButtonAriaLabel: "Understood",
      width: '800px',
      customClass: {
        confirmButton: "btn btn-outline-success",
        popup: "rounded-3 shadow-lg"
      },
      buttonsStyling: false
    });
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
                          <input type="password" id="password" className="form-control" autoComplete="off" onChange={(e) => setPwd(e.target.value)} value={pwd} required />
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
                          <p>
                            Alternatively, you can login with one of the following <a href="#" onClick={dummyAccounts}>dummy accounts</a>: 
                          </p>
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