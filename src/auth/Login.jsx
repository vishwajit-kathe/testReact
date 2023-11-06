import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/stephr_logo.png";
import { Postrequestcall } from "../api/PostRequest";
import { LOGIN_USER } from "../constant/Apipath";
import { setLogindata } from "../redux/actions/action";
import { useDispatch } from "react-redux";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowpassword] = useState(false);
    const [inputRequest, setInputrequest] = useState({
        userEmail: "",
        password: ""
    })
    const [error, setError] = useState({
        userEmail: "",
        password: ""
    })

    const inputOnchange = (e, type) => {
        if (type === "password") {
            setInputrequest({
                ...inputRequest,
                password: e.value
            });
            setError({
                ...error,
                password: ""
            })
        } else {
            setInputrequest({
                ...inputRequest,
                [e.target.name]: e.target.value
            });
            setError({
                ...error,
                [e.target.name]: ""
            })
        }
    }

    const iconChange = () => {
        if (showPassword) {
            setShowpassword(false);
        } else {
            setShowpassword(true);
        }
    }

    const checkValidation = () => {
        let value = true;
        if (inputRequest.userEmail === "") {
            error.userEmail = "Enter your email";
            value = false;
        }
        if (inputRequest.password === "") {
            error.password = "Enter your password";
            value = false;
        }
        setError({
            ...error,
            userEmail: error.userEmail,
            password: error.password
        })
        return value;
    }


    const gotoDashboard = async (e) => {
        e.preventDefault();
        if (checkValidation()) {
            let loginData = {
                Username: inputRequest.userEmail,
                userEmail: inputRequest.userEmail,
                password: inputRequest.password
            }
            let loginResponse = await Postrequestcall(LOGIN_USER, loginData);
            console.log("loginResponse", loginResponse);
        
            if (loginResponse.status === 201 && loginResponse?.data?.data?.isAdmin === true) {
                dispatch(setLogindata(loginResponse?.data?.data));
                // const adminId = loginResponse?.data?.data?.id;
                // navigate(`/admin/dashboard/${adminId}`);
                navigate(`/admin/dashboard`);
            }
            else if (loginResponse.status === 201 && loginResponse?.data?.data?.isAdmin === false) {
                const employeeId = loginResponse?.data?.data?.id;
                dispatch(setLogindata(loginResponse?.data?.data));
                navigate(`/employee/profile/${employeeId}`);
            }
        }
    }
    return (
        <main>
            <div className="container">
                <section className="section login min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                                <div className="d-flex justify-content-center py-3">
                                    <a className="logo d-flex align-items-center w-auto" href="/">
                                        <img src={logo} alt="" />
                                    </a>
                                </div>
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="pt-4 pb-2">
                                            <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                                            <p className="text-center small">Enter your username & password to login</p>
                                        </div>

                                        <form className="row g-3 needs-validation" noValidate>

                                            <div className="col-12">
                                                <label htmlFor="yourUsername" className="form-label">Email</label>
                                                <input onChange={inputOnchange} type="text" value={inputRequest.userEmail} name="userEmail" className="form-control" required />
                                                <p className="error-msg">{error.userEmail}</p>
                                            </div>

                                            <div className="col-12">
                                                <label htmlFor="yourPassword" className="form-label">Password</label>
                                                <div className="input-icon-container">
                                                    <input onChange={inputOnchange} type={showPassword ? "text" : "password"} value={inputRequest.password} name="password" className="form-control" required />
                                                    <span className="icon-container" onClick={iconChange}>
                                                        <i className={showPassword ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"}></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <Link to={"/forgot"} className="forgot-pass">Forgot Password ?</Link>
                                            </div>
                                            <div className="col-12">
                                                <button onClick={(e) => gotoDashboard(e)} className="btn btn-primary w-100 login-btn" type="submit">Login</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )

}

