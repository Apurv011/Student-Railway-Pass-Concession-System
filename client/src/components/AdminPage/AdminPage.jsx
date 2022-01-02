import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import Header from '../Header/Header';
import { saveAs } from "file-saver";
import styles from "../WelcomePage/WelcomePage.module.css";

function AdminPage(props){

  const location = useLocation();
  let history = useHistory();

  const [sstations, setSstations] = useState([]);

  useEffect(() => {
    if (location.state.adminId!=="VJTI_123" || location.state.adminPassword!=="SRC_college@543") {
      history.push("/");
    }
  }, [history]);

  function personalVerification(){
    history.push({pathname: "/personalVerification", state: {adminId: location.state.adminId, adminPassword: location.state.adminPassword}});
  }

  function passVerification(){
    history.push({pathname: "/passVerification", state: {adminId: location.state.adminId, adminPassword: location.state.adminPassword}});
  }

  function stat(){
    history.push({pathname: "/stat", state: {adminId: location.state.adminId, adminPassword: location.state.adminPassword}});
  }

  function queries(){
    history.push({pathname: "/adminQuery", state: {adminId: location.state.adminId, adminPassword: location.state.adminPassword}});
  }

  function openMap(){
    history.push({
      pathname: "/map",
      state: {
        adminId: location.state.adminId,
        adminPassword: location.state.adminPassword,
        stations: sstations
      }
    });
  }

  async function map(){
    await axios.get("http://localhost:5000/localStations/").then(res => {
        for(let i=0; i<res.data.count; i++){
          let m = 0;
          axios.get(`http://localhost:5000/pass/source-gender/${res.data.stations[i].stationName.replace(" ", "%20")}/male`).then(resp => {
            m = resp.data.count;
            axios.get(`http://localhost:5000/pass/source-gender/${res.data.stations[i].stationName.replace(" ", "%20")}/female`).then(respp => {
              setSstations(preValues => [...preValues, {
                                                          id: i,
                                                          name: res.data.stations[i].stationName,
                                                          coordinates: [
                                                                        parseFloat(res.data.stations[i].lat),
                                                                        parseFloat(res.data.stations[i].long)
                                                                      ],
                                                          male: resp.data.count,
                                                          female: respp.data.count
                                                        }
                                          ]);
            }).catch((error) => {
              console.log(error);
              //continue;
            });
          }).catch((error) => {
            console.log(error);
          });
        }
       }).catch((error) => {
         console.log("A")
         console.log(error);
       });
  }

  function logout(){
    localStorage.clear();
    history.push('/');
  }

  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button className="btn btn-link navbar-brand">Pass Generation System</button>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <button onClick={queries} className="nav-link btn btn-link">Check Queries</button>
            </li>
            <li className="nav-item">
              <button onClick={stat} className="nav-link btn btn-link">Check Statistical Data</button>
            </li>
            <li className="nav-item">
              <button data-toggle="modal" data-target="#exampleModalCenter" onClick={map} className="nav-link btn btn-link">
                Check Map
              </button>
            </li>
            <li className="nav-item">
              <button onClick={logout} className="nav-link btn btn-link">Logout</button>
            </li>
          </ul>
        </div>
      </nav>
      <div>
      <img style={{paddingTop:"20px", margin: "auto", width:"100%", height: "250px"}} src="https://iconape.com/wp-content/files/ey/190883/svg/190883.svg"/>
    <h1
      className="text-dark"
      style={{marginTop:"40px", textAlign: "center", fontSize: "75px" }}
    >
      Welcome, VJTI Admin
    </h1>
    <div style={{marginTop:"40px"}} className="text-center">
      <button onClick={personalVerification} style={{marginBottom:"7px"}} className="btn btn-lg btn-outline-dark">
        Student Details Verification
      </button>
      <br />
      <button onClick={passVerification} style={{marginTop:"7px", marginBottom:"60px"}} className="btn btn-lg btn-outline-dark">
        Pass Verification
      </button>
    </div>
    </div>

    <div className="modal fade" id="exampleModalCenter">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Check Location-wise Student Data</h5>
          </div>
          <div className="modal-body">
            <img style={{marginLeft:"20%"}} src="https://t3.ftcdn.net/jpg/02/84/08/78/360_F_284087814_HEm5b9VpeCMxfSBrLLNcAed2iGAL8iNG.jpg"/>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={openMap}
              data-dismiss="modal"
            >
              Go
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
  );
}

export default AdminPage;
