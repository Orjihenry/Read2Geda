import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from 'react'
import { useAuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

import read2gedaLogo from "../../assets/read2geda.ico"

const USER_REGEX = /^[a-zA-z][a-zA-z0-9-_]{2,23}$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$/

export default function Register() {
  const { register, currentUser, isLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (currentUser) {
      navigate("/highlights");
      return
    }
    
    if (!isLoggedIn && !currentUser) {
      Swal.fire({
        icon: "info",
        html: `
          You can sign up with dummy data. No real info needed.<br />
          All details are saved safely in your browser's localStorage only.
        `,
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText: `Gotcha!`,
        confirmButtonAriaLabel: "Thumbs up, gotcha!",
        timer: 6000,
        timerProgressBar: true,
        customClass: {
          confirmButton: "btn btn-outline-success",
          popup: "rounded-3 shadow"
        },
        buttonsStyling: false
      });
    }
    console.log(isLoggedIn);
  }, [isLoggedIn, currentUser]);
  
  useEffect(() =>{
    userRef?.current?.focus();
  }, [])

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user])
  
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email])

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);

    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd])

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user)
    const v2 = EMAIL_REGEX.test(email)

    if (!v1 || !v2) {
      setErrMsg("Invalid Entries")
      return
    }
    
    const success = register(user, email, pwd)

    if (success) {
      setUser('');
      setEmail('');
      setPwd('');
      setMatchPwd('');
      setSuccess(true);
      navigate("/highlights");
    }
  }

  return (
    <>
      <section className="vh-100">
        <div className="container-fluid h-100">
          <div className="row h-100">
            <div className="d-flex justify-content-center align-items-center bg-light shadow">
              <div className="col-md-8 col-lg-7">
                <div className="card shadow-sm border-0">
                  <div className="card-header text-center bg-dark text-light border-0">
                    <a href="/" className="navbar-brand p-3 fs-2 logo-glass d-flex justify-content-center align-items-center">
                      <img className="rounded rounded-circle me-2" src={read2gedaLogo} alt="logo" style={{ width: "40px "}} />
                      Read2Geda
                    </a>
                  </div>
                  <div className="card-body px-4 py-5 pt-3">
                    <h3 className="fw-normal fs-6 mb-0 text-center">Sign up</h3>
                    <p className="text-center mb-4">Open an account to enjoy exciting features!</p>

                    <p ref={errRef} className={errMsg ? "text-danger" : "d-none"} aria-live="assertive">
                      {errMsg}
                    </p>
                    {success && <p className="text-success text-center">Registration successful! 🎉</p>}
                    <form className="row g-3" onSubmit={handleSubmit}>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="first_name" className="form-label">First Name</label>
                        <input type="text" id="first_name" className="form-control" ref={userRef} autoComplete="off" onChange={(e) => setUser(e.target.value)} onFocus={() => setUserFocus(true)} onBlur={() => setUserFocus(false)} required />
                        {userFocus && !validName && (
                          <div className="form-text text-danger small">
                            First Name must be 3-24 chars start with a letter, and can include numbers and underscores.
                          </div>
                        )}
                      </div>
                      
                      <div className="col-md-6 mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" id="email" className="form-control" autoComplete="off" onChange={(e) => setEmail(e.target.value)} onFocus={() => setEmailFocus(true)} onBlur={() => setEmailFocus(false)} required />
                        {emailFocus && !validEmail && (
                          <div className="form-text text-danger small">
                            Please enter a valid email address (e.g., name@example.com).
                          </div>
                        )}
                      </div>
                        
                      <div className="col-md-6 mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" id="password" className={`form-control ${validPwd ? "" : "is-invalid"}`} autoComplete="off" onChange={(e) => setPwd(e.target.value)} minLength={8} maxLength={24} onFocus={() => setPwdFocus(true)} onBlur={() => setPwdFocus(false)} required />
                        {pwdFocus && !validPwd && (
                          <div className="form-text text-danger small">
                            Password must be 8-24 chars, <br /> include uppercase, lowercase, number, <br /> and special character.
                          </div>
                        )}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label htmlFor="confirm" className="form-label">Confirm Password</label>
                        <input type="password" id="confirm" className={`form-control ${validMatch && validPwd ? "" : "is-invalid"}`} autoComplete="off" onChange={(e) => setMatchPwd(e.target.value)} minLength={8} maxLength={24} onFocus={() => setMatchFocus(true)} onBlur={() => setMatchFocus(false)}  required />
                        {matchFocus && !validPwd && (
                          <div className="form-text text-danger small">
                            Passwords cannot be empty and must match.
                          </div>
                        )}
                      </div>

                      <div className="form-check mb-3">
                        <input type="checkbox" id="remember" className="form-check-input" required />
                        <label htmlFor="remember" className="form-check-label">Agree to <a href="#">terms of service</a></label>
                      </div>

                      <div className="col-md-6 m-auto">
                        <button type="submit" className="btn btn-outline-success w-100 mb-3" disabled={!validName || !validEmail || !validPwd || !validMatch ? true : false}>
                          Sign up
                        </button>
                      </div>
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