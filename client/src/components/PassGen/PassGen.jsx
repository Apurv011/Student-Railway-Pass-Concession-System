import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";

function PassGen(props) {

  let history = useHistory();
  const location = useLocation();
  const [allStations, setAllStations] = useState([]);
  const loggedInUser = localStorage.getItem("userData");
  const [src, setSrc] = useState("");
  const [pass, setPass] = useState({
    userId: location.state.user.userId,
    branch: location.state.user.branch,
    name: location.state.user.name,
    age: location.state.user.age,
    gender: location.state.user.gender,
    class: "",
    source: "",
    destination: "",
    duration: "",
    email: location.state.user.email,
    collegeID: location.state.user.collegeID,
    contactNo: location.state.user.contactNo,
    collegeIDImage: location.state.user.collegeIDImage,
    dob: location.state.user.dob,
    status: ""
  });

  const [isPass, setIsPass] = useState(false);

  useEffect(() => {

    console.log(pass);
    console.log(location.state.user.dob);

     if (loggedInUser) {
       const foundUser = JSON.parse(loggedInUser);

       const config = {
         headers: { "Authorization": "Bearer " + foundUser.token }
       };

       axios.get(`http://localhost:5000/pass/user/${foundUser.user._id}`).then(res => {
         if(res.data.length>0){
           if(res.data[0].status!=="Re-Applied"){
             setIsPass(true);
           }
         }
         }).catch((error) => {
         history.push("/");
       });

       setPass((preValues) => {
         return {
           ...preValues,
           status: "To be verified by college"
         };
       });

       axios.get("http://localhost:5000/localStations/").then(res => {
         setAllStations(res.data.stations);
         }).catch((error) => {
           console.log("A")
           console.log(error);
           history.push("/login");
       });

     }
     else{
       history.push("/");
     }
   }, [history]);


  function requestPass(event){
    console.log(pass);

    const loggedInUser = localStorage.getItem("userData");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);

      const config = {
        headers: { "Authorization": "Bearer " + foundUser.token }
      };

      axios.post("http://localhost:5000/pass", pass).then(response => {
          console.log(response.data);
          alert("Pass Requested");
          history.push('/userHome');
      });

      setPass({
        userId: location.state.user._id,
        name: location.state.user.name,
        age: location.state.user.age,
        gender: location.state.user.gender,
        branch: location.state.user.branch,
        class: "",
        source: "",
        destination: "",
        duration: "",
        email: location.state.user.email,
        collegeID: location.state.user.collegeID,
        contactNo: location.state.user.contactNo,
        collegeIDImage: location.state.user.collegeIDImage,
        dob: location.state.user.dob,
        status: ""
      });
    }
    event.preventDefault();
  }


  function handleChange(event) {
    const { name, value } = event.target;

    setPass((preValues) => {
      return {
        ...preValues,
        [name]: value
      };
    });
    if(name==="source"){
      setSrc(value);
    }
  }

  return (
    <div>
    {!isPass ?
      <div className="container">
        <h1
          className="text-dark"
          style={{ fontSize: "65px", textAlign: "center", marginTop: "5rem" }}
        >
          Pass Generation System
        </h1>
        <div className="card shadow-lg o-hidden border-0 my-5">
          <div className="card-body p-0">
            <div className="row">
              <div className="col-lg-5 d-none d-lg-flex">
                <div
                  className="flex-grow-1 bg-register-image"
                  style={{
                    backgroundImage:
                      "url(https://images.moneycontrol.com/static-mcnews/2018/09/561559-railway-012917-770x433.jpg?impolicy=website&width=770&height=431)"
                  }}
                ></div>
              </div>
              <div className="col-lg-7">
                <div className="p-5">
                  <div className="text-center">
                    <h4 className="text-dark mb-4">Create a Pass</h4>
                  </div>
                  <form className="user">

                    <div className="row mb-3">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <label htmlFor="inputState">Source</label>
                        <select name="source" onChange={handleChange} value={pass.source} className="form-control">
                          <option value="select">Select</option>
                          {allStations.map((station, index) => {
                            return (
                              <option value={station.stationName}>{station.stationName}</option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor="inputState">Destination</label>
                        <select name="destination" onChange={handleChange} value={pass.destination} className="form-control">
                          <option value="select">Select</option>
                          {src!=="Dadar" && <option value="Dadar">Dadar</option>}
                          {src!=="Wadala" && <option value="Wadala">Wadala</option>}
                          {src!=="Matunga" && <option value="Matunga">Matunga</option>}
                        </select>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label>Duration</label>
                      <select name="duration" onChange={handleChange} value={pass.duration} className="form-control">
                        <option value="select">Select</option>
                        <option value="1 Month">1 Month</option>
                        <option value="3 Months">3 Months</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label>Class</label>
                      <select name="class" onChange={handleChange} value={pass.class} className="form-control">
                        <option value="select">Select</option>
                        <option value="First Class">First Class</option>
                        <option value="Second Class">Second Class</option>
                      </select>
                    </div>

                    <button
                      onClick={requestPass}
                      className="btn btn-primary d-block btn-user w-100"
                      type="submit"
                    >
                      Generate Pass
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      :
      <div className="text-center" style={{paddingTop: "50px"}}>
        <h1 style={{paddingBottom: "20px"}}>Pass Already Requested!</h1>
        <button type="button" className="btn btn-dark btn-lg" onClick={() => history.push("/passDetails")}>Check Your Pass Status</button>
      </div>
    }
    </div>
  );
}

export default PassGen;
