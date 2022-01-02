import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory, useLocation } from 'react-router-dom';
import CaptchaTextGenerator from 'captcha-text-generator';
import { FaHome } from "react-icons/fa";

function LogInForm(){

  const location = useLocation();
  let history = useHistory();

  const [user, setUser] = useState({
      email: "",
      password:""
  });

  const [captcha, setCaptcha] = useState("");
  const [captchaVal, setCaptchaVal] = useState("");

  function loginUser(event) {

    if(captcha===captchaVal){
      axios.post("http://localhost:5000/user/login", user).then(response => {
            localStorage.setItem('userData', JSON.stringify(response.data));
            localStorage.setItem('isVerified', response.data.user.isVerified);
            history.push('/userHome');
      });

      setUser({
        email: "",
        password:""
      });
    }
    else{
      alert("Invalid Captcha!");
      window.location.reload();
    }
    event.preventDefault();
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((preValues) => {
      return {
        ...preValues,
        [name]: value
      };
    });
  }

  function handleCaptchaChange(event){
      setCaptcha(event.target.value);
  }

  function result(text){
    setCaptchaVal(text);
  }

  return (
    <div className="container">
      <h1 className="text-dark" style={{fontSize:"75px", textAlign:"center", marginTop: "3rem"}}>Log In</h1>
        <div className="row justify-content-center">
            <div className="col-md-9 col-lg-12 col-xl-10">
                <div className="card shadow-lg o-hidden border-0 my-5">
                    <div className="card-body p-0">
                        <div className="row">
                          <div className="col-lg-5 d-none d-lg-flex">
                              <div className="flex-grow-1 bg-login-image" style={{backgroundImage: "url(https://images.unsplash.com/photo-1590400238706-19a48b6b171f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80)"}}>
                              </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h4 className="">Welcome Back!</h4>
                                    </div>
                                    <form className="user">
                                        <div className="mb-3">
                                          <input onChange={handleChange} className="form-control form-control-user" type="email" id="exampleFirstName" placeholder="Email" name="email" value={user.email} />
                                        </div>
                                        <div className="mb-3">
                                          <input onChange={handleChange} className="form-control form-control-user" type="password" id="examplePasswordInput" placeholder="Password" name="password" value={user.password}/>
                                        </div>
                                        <div className="mb-3">
                                          <CaptchaTextGenerator
                                            height="30px"
                                            textColor="#2d3436"
                                            paddingTop="22px"
                                            background="#ffffff"
                                            result={result}
                                          />
                                        </div>
                                        <div className="mb-3">
                                          <input onChange={handleCaptchaChange} className="form-control form-control-user" type="text" id="examplePasswordInput" placeholder="Enter Captcha" name="captcha" value={captcha}/>
                                        </div>
                                          <button onClick={loginUser} className="btn btn-primary d-block btn-user w-100" type="submit">Login</button>
                                        <hr/>
                                    </form>
                                    <div className="text-center">
                                      <Link style={{color:"#000000"}} to="/">
                                        <FaHome style={{color:"#000000"}} className="small"/>
                                      </Link>
                                      <span className="small" style={{marginLeft: "10px", marginRight: "10px"}}>|</span>
                                      <span className="small">
                                        <Link style={{color:"#000000"}} to="/signup">Don't have an Account? Create Now!</Link>
                                      </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

  );
}

export default LogInForm;
