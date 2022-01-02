import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from 'react-router-dom';
import Header from '../Header/Header';

function SearchTrain(props){

  const location = useLocation();


  let history = useHistory();

  const [allStations, setAllStations] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
       const loggedInUser = localStorage.getItem("userData");
       if (loggedInUser) {
         const foundUser = JSON.parse(loggedInUser);

         const config = {
           headers: { "Authorization": "Bearer " + foundUser.token }
         };

         axios.get("http://localhost:5000/stations/").then(res => {
           setAllStations(res.data.stations);
           }).catch((error) => {
           history.push("/login");
         });
       }
       else{
         axios.get("http://localhost:5000/stations/").then(res => {
           setAllStations(res.data.stations);
           }).catch((error) => {
           history.push("/login");
         });
       }
   }, [history]);

  function updateFrom(event) {
    const value = event.target.value;
    if(value==="select"){
        setFrom("");
    }
    else{
      setFrom(value);
    }
  }

  function updateTo(event) {
    const value = event.target.value;
    if (value==="select"){
      setTo("");
    }
    else{
      setTo(value);
    }
  }

  function search(){
    history.push({
          pathname: '/resultTrains',
          state: { from: from, to: to, guest: location.state.guest}
      });
  }

  return (
    <div>
    <Header guest={location.state.guest} page="Home"/>
    <h1 style={{ padding: "40px", textAlign: "center" }}>Welcome</h1>
    <div className="container" style={{marginTop: "20px"}}>
      <div className="d-flex justify-content-center">
          <div className="card bg-light mb-3">
            <div className="card-header bg-dark">
              <h3 style={{color:"#ffffff"}} className="d-flex justify-content-center">
                Your Journey is Here
              </h3>
            </div>
            <div className="card-body">
              <h5 className="card-title">
                <form>
                  <div className="form-row">
                    <div className="col">
                      <div className="d-flex justify-content-between">
                        <div className="col">
                          <label htmlFor="inputState">From</label>
                          <select onChange={updateFrom} value={from} className="form-control">
                          <option value="select">Select</option>
                          {allStations.map((station, index) => {
                              return (
                                <option value={station.stationName}>{station.stationName}</option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="col">
                        <label htmlFor="inputState">To</label>
                        <select onChange={updateTo} value={to} className="form-control">
                        <option value="select">Select</option>
                        {allStations.filter(st => st.stationName !== from).map((station, index) => {
                            return (
                              <option value={station.stationName}>{station.stationName}</option>
                            );
                          })}
                        </select>
                        </div>
                      </div>
                      <br />
                      <div>
                        <div style={{padding: "20px"}}>
                      </div>
                      <button type="submit" onClick={search} value="createTicket" className="btn btn-outline-dark btn-lg btn-block" >
                        Search Train
                      </button>
                      </div>
                    </div>
                  </div>
                </form>
              </h5>
            </div>
            {from!=="" && to!=="" &&
            <div>
              <hr/>
              <div className="container">
                <h3>Source Station: {from}</h3>
                <h3>Destination Station: {to}</h3>
              </div>
            </div>
          }
          </div>
        </div>
        </div>
        </div>
  );
}

export default SearchTrain;
