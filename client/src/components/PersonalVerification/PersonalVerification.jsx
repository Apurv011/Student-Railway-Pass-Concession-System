import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import Header from '../Header/Header';
import { saveAs } from "file-saver";
import { FaSearch } from "react-icons/fa";

function PersonalVerification(props){

  const location = useLocation();
  let history = useHistory();

  const [verifiedUsers, setVerifiedUsers] = useState([]);
  const [unVerifiedUsers, setUnVerifiedUsers] = useState([]);
  const [rejectedUsers, setRejectedUsers] = useState([]);
  const [verifiedUsers2, setVerifiedUsers2] = useState([]);
  const [unVerifiedUsers2, setUnVerifiedUsers2] = useState([]);
  const [rejectedUsers2, setRejectedUsers2] = useState([]);
  const [currId, setCurrId] = useState("");
  const [remark, setRemark] = useState("");

  const [mail, setMail] = useState({
    to: "",
    subject: "",
    text: ""
  });

  useEffect(() => {

    if (location.state.adminId!=="VJTI_123" || location.state.adminPassword!=="SRC_college@543") {
      history.push("/");
    }
    else{
      getAllUsers();
    }
  }, [history]);

  function getAllUsers(){
    axios.get(`http://localhost:5000/user/verified`).then(res => {
      setVerifiedUsers(res.data.users);
      setVerifiedUsers2(res.data.users);
    }).catch((error) => {
      history.push("/");
    });

    axios.get(`http://localhost:5000/user/rejected`).then(res => {
      setRejectedUsers(res.data.users);
      setRejectedUsers2(res.data.users);
    }).catch((error) => {
      history.push("/");
    });

    axios.get(`http://localhost:5000/user/unVerified`).then(res => {
      setUnVerifiedUsers(res.data.users);
      setUnVerifiedUsers2(res.data.users);
    }).catch((error) => {
      history.push("/");
    });
  }

  function getMail(id, email){
    console.log(id);
    setCurrId(id);

    setMail((preValues) => {
      return {
        ...preValues,
        subject: "Personal Details Verified",
        text: `Your Personal Details are verified Successfully.
    You can apply for pass.`,
        to: email
      };
    });

  }

  function getRejMail(id, email){
    setCurrId(id);

    setMail((preValues) => {
      return {
        ...preValues,
        subject: "Wrong Personal Details",
        text: `You have submitted worng Personal Details.`,
        to: email
      };
    });
  }

  function verify(id, email){

    var change = {"isVerified": "true"};

    axios.patch(`http://localhost:5000/user/${id}`, change).then(response => {
        console.log(response.data);
        axios.get(`http://localhost:5000/user/verified`).then(res => {
          setVerifiedUsers(res.data.users);
          setVerifiedUsers2(res.data.users);
        }).catch((error) => {
          history.push("/");
        });
    });

    setUnVerifiedUsers((preValues) => {
      return unVerifiedUsers.filter((user, index) => {
        return user._id !== id;
      });
    });
    setUnVerifiedUsers2((preValues) => {
      return unVerifiedUsers.filter((user, index) => {
        return user._id !== id;
      });
    });

    axios.post("http://localhost:5000/user/sendMail", mail).then((response) => {
      console.log(response.data);
    });

  }

function handleChange(event){
  setRemark(event.target.value);
}

  function reject(id, email){
    var change = {"isVerified": "false", "remark": remark};

    axios.patch(`http://localhost:5000/user/${id}`, change).then(response => {
        console.log(response.data);
        axios.get(`http://localhost:5000/user/rejected`).then(res => {
          setRejectedUsers(res.data.users);
          setRejectedUsers2(res.data.users);
        }).catch((error) => {
          history.push("/");
        });
    });

    setUnVerifiedUsers((preValues) => {
      return unVerifiedUsers.filter((user, index) => {
        return user._id !== id;
      });
    });
    setUnVerifiedUsers2((preValues) => {
      return unVerifiedUsers.filter((user, index) => {
        return user._id !== id;
      });
    });

    axios.post("http://localhost:5000/user/sendMail", mail).then((response) => {
      console.log(response.data);
    });

  }

  function searchUser(event){
    if(event.target.value===""){
      getAllUsers();
    }
    else{
      var key = event.keyCode || event.charCode;
      if(key===8){
        setVerifiedUsers(verifiedUsers2);
        setRejectedUsers(rejectedUsers2);
        setUnVerifiedUsers(unVerifiedUsers2);
      }
      else{
        setUnVerifiedUsers((preValues) => {
          return unVerifiedUsers.filter((user, index) => {
            return user.name.toLowerCase().includes(event.target.value.toLowerCase());
          });
        });

        setVerifiedUsers((preValues) => {
          return verifiedUsers.filter((user, index) => {
            return user.name.toLowerCase().includes(event.target.value.toLowerCase());
          });
        });

        setRejectedUsers((preValues) => {
          return rejectedUsers.filter((user, index) => {
            return user.name.toLowerCase().includes(event.target.value.toLowerCase());
          });
        });
      }
    }
  }

  function saveFile(url, file_name){
    saveAs(
      url,
      file_name
    );
  };

  function logout(){
    localStorage.clear();
    history.push('/');
  }

  function adminHome(){
    history.push({pathname: "/adminPage", state: {adminId: "VJTI_123", adminPassword: "SRC_college@543"}});
  }

  function passVerification(){
    history.push({pathname: "/passVerification", state: {adminId: location.state.adminId, adminPassword: location.state.adminPassword}});
  }

  function stats(){
    history.push({pathname: "/stat", state: {adminId: location.state.adminId, adminPassword: location.state.adminPassword}});
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
              <button onClick={adminHome} className="nav-link btn btn-link">Home</button>
            </li>
            <li className="nav-item">
              <button onClick={stats} className="nav-link btn btn-link">Check Statistical Data</button>
            </li>
            <li className="nav-item">
              <button onClick={passVerification} className="nav-link btn btn-link">Pass Verification</button>
            </li>
            <li className="nav-item">
              <button onClick={logout} className="nav-link btn btn-link">Logout</button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="form-inline float-right" style={{margin: "20px"}}>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text"><FaSearch /></span>
          </div>
          <input
            className="form-control mr-sm-2"
            placeholder="Search Student Name"
            name="sName"
            onChange={searchUser}
            onKeyDown={searchUser}
          />
        </div>
      </div>

      <h1 style={{ paddingLeft:"25px", paddingTop:"70px", color: props.color }}>Requested Applications</h1>
      {unVerifiedUsers.length<1 && <h5 style={{paddingLeft: "25px"}}>No Requests</h5>}
        {unVerifiedUsers.length>=1 &&
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
              <th style={{color:"#ffffff"}}>Semester</th>
              <th style={{color:"#ffffff"}}>Branch</th>
              <th style={{color:"#ffffff"}}>Download College ID</th>
              <th style={{color:"#ffffff"}}>Verify</th>
              <th style={{color:"#ffffff"}}>Reject</th>
            </tr>
          </thead>
        {unVerifiedUsers.map((user, index) => {
            return (
        <tbody>
          <tr className="table-info">
            <td rowspan={user.collegeID}>
              <b>{user.collegeID}</b>
            </td>
            <td rowspan={user.name}>
              <b>{user.name}</b>
            </td>
            <td rowspan={user.email}>
              <b>{user.email}</b>
            </td>
            <td rowspan={user.contactNo}>
              <b>{user.contactNo}</b>
            </td>
            <td rowspan={user.age}>
              <b>{user.age}</b>
            </td>
            <td rowspan={user.gender}>
              <b>{user.gender}</b>
            </td>
            <td rowspan={user.semester}>
              <b>{user.semester}</b>
            </td>
            <td rowspan={user.branch}>
              <b>{user.branch}</b>
            </td>
            <td>
              <button
                onClick={()=>{saveFile(`http://localhost:5000/${user.collegeIDImage}`, `${Date.now()}.${user.collegeIDImage.split('.').at(-1)}`)}}
                className="btn btn-sm btn-dark"
                >
                  Download
              </button>
            </td>
            <td>
              <button
                data-toggle="modal" data-target="#exampleModalCenter2"
                onClick={() => getMail(user._id, user.email)}
                className="btn btn-sm btn-success"
              >
                Verify
              </button>
            </td>
            <td>
              <button
              data-toggle="modal" data-target="#exampleModalCenter"
              onClick={() => getRejMail(user._id, user.email)}
              className="btn btn-sm btn-danger"
              >
                Reject
              </button>
            </td>
          </tr>
        </tbody>
      );
    })}
    </table>
    </div>
  }

  <h1 style={{ paddingLeft:"25px", paddingTop:"25px", color: props.color }}>Verified Students</h1>
  {verifiedUsers.length<1 && <h5 style={{paddingLeft: "25px"}}>No Students</h5>}
    {verifiedUsers.length>=1 &&
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
        <th style={{color:"#ffffff"}}>Semester</th>
        <th style={{color:"#ffffff"}}>Branch</th>
        <th style={{color:"#ffffff"}}>Download College ID</th>
        </tr>
      </thead>
    {verifiedUsers.map((user, index) => {
        return (
          <tbody>
            <tr className="table-info">
              <td rowspan={user.collegeID}>
                <b>{user.collegeID}</b>
              </td>
              <td rowspan={user.name}>
                <b>{user.name}</b>
              </td>
              <td rowspan={user.email}>
                <b>{user.email}</b>
              </td>
              <td rowspan={user.contactNo}>
                <b>{user.contactNo}</b>
              </td>
              <td rowspan={user.age}>
                <b>{user.age}</b>
              </td>
              <td rowspan={user.gender}>
                <b>{user.gender}</b>
              </td>
              <td rowspan={user.semester}>
                <b>{user.semester}</b>
              </td>
              <td rowspan={user.branch}>
                <b>{user.branch}</b>
              </td>
              <td>
                <button
                  onClick={()=>{saveFile(`http://localhost:5000/${user.collegeIDImage}`, `${Date.now()}.${user.collegeIDImage.split('.').at(-1)}`)}}
                  className="btn btn-sm btn-dark"
                  >
                    Download
                </button>
              </td>
            </tr>
          </tbody>
  );
  })}
  </table>
  </div>
  }

  <h1 style={{ paddingLeft:"25px", paddingTop:"25px", color: props.color }}>Rejected Students</h1>
  {rejectedUsers.length<1 && <h5 style={{paddingLeft: "25px"}}>No Students</h5>}
    {rejectedUsers.length>=1 &&
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
        <th style={{color:"#ffffff"}}>Semester</th>
        <th style={{color:"#ffffff"}}>Branch</th>
        <th style={{color:"#ffffff"}}>Remark</th>
        <th style={{color:"#ffffff"}}>Download College ID</th>
        </tr>
      </thead>
    {rejectedUsers.map((user, index) => {
        return (
          <tbody>
            <tr className="table-info">
              <td rowspan={user.collegeID}>
                <b>{user.collegeID}</b>
              </td>
              <td rowspan={user.name}>
                <b>{user.name}</b>
              </td>
              <td rowspan={user.email}>
                <b>{user.email}</b>
              </td>
              <td rowspan={user.contactNo}>
                <b>{user.contactNo}</b>
              </td>
              <td rowspan={user.age}>
                <b>{user.age}</b>
              </td>
              <td rowspan={user.gender}>
                <b>{user.gender}</b>
              </td>
              <td rowspan={user.semester}>
                <b>{user.semester}</b>
              </td>
              <td rowspan={user.branch}>
                <b>{user.branch}</b>
              </td>
              <td rowspan={user.remark}>
                <b>{user.remark}</b>
              </td>
              <td>
                <button
                  onClick={()=>{saveFile(`http://localhost:5000/${user.collegeIDImage}`, `${Date.now()}.${user.collegeIDImage.split('.').at(-1)}`)}}
                  className="btn btn-sm btn-dark"
                  >
                    Download
                </button>
              </td>
            </tr>
          </tbody>
    );
})}
</table>
</div>
}



  <div className="modal fade" id="exampleModalCenter">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Write Remark</h5>
        </div>
        <div className="modal-body">
          <label>
            <b>Remark</b>
          </label>
          <input
            type="text"
            name="remark"
            value={remark}
            onChange={handleChange}
            className="form-control"
          />
          </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={()=>reject(currId)}
            data-dismiss="modal"
          >
            Done
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

  <div className="modal fade" id="exampleModalCenter2">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Verify Details</h5>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={()=>verify(currId)}
            data-dismiss="modal"
          >
            Verify
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

export default PersonalVerification;
