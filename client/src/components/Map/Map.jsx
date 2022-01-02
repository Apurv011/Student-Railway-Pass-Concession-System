import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { FaMapMarkerAlt } from "react-icons/fa";

function Map() {

  const location = useLocation();
  let history = useHistory();

  const [viewport, setViewport] = useState({
    latitude: 19.164692,
    longitude: 72.992948,
    zoom: 9.8
  });

  const [selectedPark, setSelectedPark] = useState(null);

  useEffect(() => {

    if (location.state.adminId!=="VJTI_123" || location.state.adminPassword!=="SRC_college@543") {
      history.push("/");
    }
    else{
      console.log(location.state.stations);
    }

  }, []);

  function adminHome(){
    history.push({pathname: "/adminPage", state: {adminId: "VJTI_123", adminPassword: "SRC_college@543"}});
  }

  function personalVerification(){
    history.push({pathname: "/personalVerification", state: {adminId: location.state.adminId, adminPassword: location.state.adminPassword}});
  }

  function passVerification(){
    history.push({pathname: "/passVerification", state: {adminId: location.state.adminId, adminPassword: location.state.adminPassword}});
  }

  function stat(){
    history.push({pathname: "/stat", state: {adminId: location.state.adminId, adminPassword: location.state.adminPassword}});
  }

  function logout(){
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="row">
      <div className="col">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <button className="btn btn-link navbar-brand">Pass Generation System</button>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <button onClick={adminHome} className="nav-link btn btn-link">Home</button>
              </li>
              <li className="nav-item">
                <button onClick={personalVerification} className="nav-link btn btn-link">Student Verification</button>
              </li>
              <li className="nav-item">
                <button onClick={passVerification} className="nav-link btn btn-link">Student Verification</button>
              </li>
              <li className="nav-item">
                <button onClick={stat} className="nav-link btn btn-link">Check Statistical Data</button>
              </li>
              <li className="nav-item">
                <button onClick={logout} className="nav-link btn btn-link">Logout</button>
              </li>
            </ul>
          </div>
        </nav>
        <h1 className="text-center" style={{padding: "10px"}}>Location-wise Students Data</h1>
        <ReactMapGL
          style={{margin: "auto", paddingBottom:"40px"}}
          className="col-lg-12"
          {...viewport}
          width="80%"
          height="660px"
          mapboxApiAccessToken="pk.eyJ1IjoiYXB1cnYxMSIsImEiOiJja20yNGg1NWMwNXVrMndvenZmdWo1OXJqIn0.vYZwHwi6YCF6Eknusw0zOA"
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onViewportChange={(viewport) => {
            setViewport(viewport);
          }}
        >
        {location.state.stations.map((station) => (
          <Marker
            key={station.id}
            latitude={station.coordinates[0]}
            longitude={station.coordinates[1]}
          >
          <FaMapMarkerAlt
          color="red"
          size="20px"
            onClick={(e) => {
                e.preventDefault();
                setSelectedPark(station);
              }}
            />
          </Marker>
        ))}

        {selectedPark ? (
          <Popup
            latitude={selectedPark.coordinates[0]}
            longitude={selectedPark.coordinates[1]}
            onClose={() => {
              setSelectedPark(null);
            }}
          >
            <div>
              <h5>{selectedPark.name}</h5>
              <h6>Male Students: {selectedPark.male}</h6>
              <h6>Female Students: {selectedPark.female}</h6>
              <h6>Total Students: {parseInt(selectedPark.male) + parseInt(selectedPark.female)}</h6>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  </div>
  );
}

export default Map;
