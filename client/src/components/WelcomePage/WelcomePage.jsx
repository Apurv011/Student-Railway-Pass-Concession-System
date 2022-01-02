import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "./WelcomePage.module.css";
import { Row, Col, Container } from 'react-bootstrap';


const WelcomePage = React.forwardRef((props, ref) => {

  let history = useHistory();

  const [admin, setAdmin] = useState({
      id: "",
      adminPassword:""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setAdmin((preValues) => {
      return {
        ...preValues,
        [name]: value
      };
    });
  }

  function adminLogin(event) {
    if(admin.id==="VJTI_123" && admin.adminPassword==="SRC_college@543"){
        localStorage.clear();
        history.push({pathname: "/adminPage", state: {adminId: "VJTI_123", adminPassword: "SRC_college@543"}});
    }
    setAdmin({
      id: "",
      adminPassword:""
    });
    event.preventDefault();
  }

  function login() {
      history.push("/login");
  }

  function signup() {
    history.push("/signup");
  }

  function guest() {
    history.push({
          pathname: '/searchTrain',
          state: { guest: true}
      });
  }

  return (
    <div className={`${styles.center}`}>
    <div style={{marginTop:"150px"}}>
      <h1
        className="text-light text-center"
        style={{fontSize: "75px"}}
      >
        Reservation System
      </h1>
      <div className="text-center">
        <button type="button" onClick={guest} className="btn">
          <p className="text-light"
          className={`${styles.bottom}`} style={{color:"#ffffff", fontSize: "30px", marginTop: "35px" , marginBottom:"40px"}}>
            Get Railway Information
          </p>
        </button>
      </div>

        <div style={{margin:"0 auto", display:"table", marginBottom:"40px"}}>
          <button type="button" onClick={signup} className="btn btn-lg btn-outline-light mr-3">
            Sign-Up
          </button>
          <button type="button" onClick={login} className="btn btn-lg btn-outline-light ml-3">
            Login
          </button>
        </div>

      <div className="text-center">
        <button data-toggle="modal"
                data-target="#exampleModalCenter"
                type="button"
                className="btn btn-lg btn-outline-light"
                style={{marginBottom: "40px"}}
                >
                College Admin Login
        </button>
      </div>
      <div className="text-center">
        <button type="button" onClick={()=> history.push("/about")} className="btn">
          <p className="text-light"
          className={`${styles.bottom}`} style={{color:"#ffffff", fontSize: "15px", marginTop: "15px" , marginBottom:"40px"}}>
            About Us
          </p>
        </button>
      </div>
      <div className="modal fade" id="exampleModalCenter">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">👤Admin Login</h5>
            </div>
            <div className="modal-body">
              <label>
                <b>✉Enter Admin ID</b>
              </label>
              <div className="form-inline">
                <input
                  type="text"
                  name="id"
                  value={admin.id}
                  onChange={handleChange}
                  className="form-control mr-sm-2 mb-3"
                />
              </div>
              <label className="mt-3">
                <b>🔑Enter Password</b>
              </label>
              <div className="form-inline">
                <input
                  type="password"
                  name="adminPassword"
                  value={admin.adminPassword}
                  onChange={handleChange}
                  className="form-control mr-sm-2"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={adminLogin}
                data-dismiss="modal"
              >
                Login
              </button>
              <button
                type="button"
                className="btn btn-outline-dark"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
});

export default WelcomePage;
