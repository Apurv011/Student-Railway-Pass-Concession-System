import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import Header from '../Header/Header';
import { saveAs } from "file-saver";

function UserPass(props){

  const location = useLocation();
  let history = useHistory();

  const [passes, setPasses] = useState([]);
  const [isPass, setIsPass] = useState(false);
  const [isVerified, setIsVerified] = useState(location.state.isVerified);
  const [userRemark, setUserRemark] = useState("");

  const loggedInUser = localStorage.getItem("userData");

  useEffect(() => {

      if (loggedInUser) {
        console.log(location.state.isVerified);
        console.log(isVerified);
        setUserRemark(location.state.user.remark);
        const foundUser = JSON.parse(loggedInUser);

        const config = {
          headers: { "Authorization": "Bearer " + foundUser.token }
        };

        if(location.state.isVerified!=="pending"){
          console.log(foundUser.user._id);
          axios.get(`http://localhost:5000/pass/user/${foundUser.user._id}`, config).then(res => {
            console.log(res.data);

            if(res.data.length>0){
              console.log("AAA")
                setPasses(res.data);
                setIsPass(true);
            }
            }).catch((error) => {
              history.push("/login");
          });
        }
      }
  }, [history]);

  function reApplyForPass(id){

      var change = {"status": "Re-Applied, To be verified by college", "remark": ""};
      const foundUser = JSON.parse(loggedInUser);
      const config = {
        headers: { "Authorization": "Bearer " + foundUser.token }
      };
      axios.patch(`http://localhost:5000/pass/${id}`, change).then(response => {
        axios.get(`http://localhost:5000/pass/user/${foundUser.user._id}`, config).then(res => {
          if(res.data.length>0){
              setPasses(res.data);
              setIsPass(true);
          }
          }).catch((error) => {
            history.push("/login");
        });
         console.log(response.data);
      });

  }

   function reApplyForPersonal(id){

       var change = {"isVerified": "pending", "remark": ""};
       const foundUser = JSON.parse(loggedInUser);
       const config = {
         headers: { "Authorization": "Bearer " + foundUser.token }
       };
       axios.patch(`http://localhost:5000/user/${foundUser.user._id}`, change).then(response => {
          console.log(response.data);
          setIsVerified("pending");
       });

   }

  return (
    <div>
    <Header page="My Pass" isVerified={location.state.isVerified} user={location.state.user}/>
    {
      isVerified==="true" ?
      isPass ?
      passes.reverse().map((pass, index) => {
        return(
          <div className="table-responsive" style={{padding:"25px"}}>
      <table className="table table-hover table-dark">
        <thead>
            <tr className="bg-dark">
              <th style={{color:"#ffffff"}}>College ID</th>
              <th style={{color:"#ffffff"}}>Student Name</th>
              <th style={{color:"#ffffff"}}>Email</th>
              <th style={{color:"#ffffff"}}>Contact Number</th>
              <th style={{color:"#ffffff"}}>Age</th>
              <th style={{color:"#ffffff"}}>Gender</th>
              <th style={{color:"#ffffff"}}>Source</th>
              <th style={{color:"#ffffff"}}>Destination</th>
              <th style={{color:"#ffffff"}}>Class</th>
              <th style={{color:"#ffffff"}}>Duration</th>
              <th style={{color:"#ffffff"}}>Status</th>
              {pass.status==="Rejected by college" &&
              <th style={{color:"#ffffff"}}>Remark</th>
              }
              {pass.status==="Rejected by college" &&
              <th style={{color:"#ffffff"}}>Re-Apply</th>
              }
          </tr>
        </thead>

      <tbody>
        <tr className="table-info">
          <td rowspan={pass.collegeID}>
            <b>{pass.collegeID}</b>
          </td>
          <td rowspan={pass.name}>
            <b>{pass.name}</b>
          </td>
          <td rowspan={pass.email}>
            <b>{pass.email}</b>
          </td>
          <td rowspan={pass.contactNo}>
            <b>{pass.contactNo}</b>
          </td>
          <td rowspan={pass.age}>
            <b>{pass.age}</b>
          </td>
          <td rowspan={pass.gender}>
            <b>{pass.gender}</b>
          </td>
          <td rowspan={pass.source}>
            <b>{pass.source}</b>
          </td>
          <td rowspan={pass.destination}>
            <b>{pass.destination}</b>
          </td>
          <td rowspan={pass.class}>
            <b>{pass.class}</b>
          </td>
          <td rowspan={pass.duration}>
            <b>{pass.duration}</b>
          </td>
          <td rowspan={pass.status}>
            <b>{pass.status}</b>
          </td>
          {pass.status==="Rejected by college" &&
          <td>
            <b>{pass.remark}</b>
          </td>
          }
          {pass.status==="Rejected by college" &&
          <td>
            <button
              onClick={()=>{reApplyForPass(pass._id)}}
              className="btn btn-sm btn-dark"
              >
                Re-Apply
            </button>
          </td>
          }
          </tr>
      </tbody>
  </table>
  </div>

        );
      })

       :
       <div className="text-center" style={{paddingTop: "50px"}}>
         <h1 style={{paddingBottom: "20px"}}>No Pass Generated Yet!</h1>
         <button type="button" className="btn btn-dark btn-lg" onClick={() => history.push({pathname: "/passGen", state:{isVerified: location.state.isVerified, user: location.state.user}})}>Generate Your Pass Now!</button>
       </div>
      :
      isVerified==="pending" ?
      <div className="text-center" style={{paddingTop: "50px"}}>
        <h1 style={{paddingBottom: "20px"}}>Personal Deatils are yet to be verified by College!</h1>
      </div>
      :
      <div className="text-center" style={{paddingTop: "50px"}}>
        <h1 style={{paddingBottom: "20px"}}>Personal Deatils rejected by College!</h1>
        <h3 style={{paddingBottom: "20px"}}>Remark: {userRemark}</h3>
        <button onClick={reApplyForPersonal} className="btn btn-lg btn-outline-dark">Re-Apply</button>
      </div>
    }
    </div>
    );
}

export default UserPass;
