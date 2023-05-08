import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import Header from '../Header/Header';
import { saveAs } from "file-saver";
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import PassForm from "../PassForm/PassForm";
import VerifiedPassList from "./VerifiedPassList";
import { FaSearch } from "react-icons/fa";

function PersonalVerification(props){

  const location = useLocation();
  let history = useHistory();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [i, setI] = useState(0);
  const [verifiedPass, setVerifiedPass] = useState([]);
  const [unVerifiedPass, setUnVerifiedPass] = useState([]);
  const [rejectedPass, setRejectedPass] = useState([]);

  const [verifiedPass2, setVerifiedPass2] = useState([]);
  const [unVerifiedPass2, setUnVerifiedPass2] = useState([]);
  const [rejectedPass2, setRejectedPass2] = useState([]);

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
      getAllPasses();
    }
  }, [history]);

  function getAllPasses(){
    axios.get(`http://localhost:5000/pass/verified`).then(res => {
      setVerifiedPass(res.data.passes);
      setVerifiedPass2(res.data.passes);
    }).catch((error) => {
      history.push("/");
    });

    axios.get(`http://localhost:5000/pass/rejected`).then(res => {
      setRejectedPass(res.data.passes);
      setRejectedPass2(res.data.passes);
    }).catch((error) => {
      history.push("/");
    });

    axios.get(`http://localhost:5000/pass/pending`).then(res => {
      setUnVerifiedPass(res.data.passes);
      setUnVerifiedPass2(res.data.passes);
    }).catch((error) => {
      history.push("/");
    });
  }

  function verify(id){
    
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;

    var change = {"status": "Verified by college", "issuDate": today};

    axios.patch(`http://localhost:5000/pass/${id}`, change).then(response => {
        console.log(response.data);
        axios.get(`http://localhost:5000/pass/verified`).then(res => {
          setVerifiedPass(res.data.passes);
          setVerifiedPass2(res.data.passes);
        }).catch((error) => {
          history.push("/");
        });
    });

    setUnVerifiedPass((preValues) => {
      return unVerifiedPass.filter((pass, index) => {
        return pass._id !== id;
      });
    });
    setUnVerifiedPass2((preValues) => {
      return unVerifiedPass.filter((pass, index) => {
        return pass._id !== id;
      });
    });

    axios.post("http://localhost:5000/user/sendMail", mail).then((response) => {
      console.log(response.data);
    });

  }

  function getMail(id, email){

    setCurrId(id);

    setMail((preValues) => {
      return {
        ...preValues,
        subject: "Pass Verified",
        text: `Your rquest for pass is verified Successfully.
    Collect the form from office.`,
        to: email
      };
    });

  }

  function getRejMail(id, email){
    setCurrId(id);

    setMail((preValues) => {
      return {
        ...preValues,
        subject: "Pass Rejected",
        text: `Your rquest for pass is rejected.`,
        to: email
      };
    });
  }

  function handleChange(event){
    setRemark(event.target.value);
  }

  function searchUser(event){
    if(event.target.value===""){
      getAllPasses();
    }
    else{
      var key = event.keyCode || event.charCode;
      if(key===8){
        setVerifiedPass(verifiedPass2);
        setRejectedPass(rejectedPass2);
        setUnVerifiedPass(unVerifiedPass2);
      }
      else{
        setUnVerifiedPass((preValues) => {
          return unVerifiedPass.filter((pass, index) => {
            return pass.name.toLowerCase().includes(event.target.value.toLowerCase());
          });
        });

        setVerifiedPass((preValues) => {
          return verifiedPass.filter((pass, index) => {
            return pass.name.toLowerCase().includes(event.target.value.toLowerCase());
          });
        });

        setRejectedPass((preValues) => {
          return rejectedPass.filter((pass, index) => {
            return pass.name.toLowerCase().includes(event.target.value.toLowerCase());
          });
        });
      }
    }
  }

  function reject(id, email){
    var change = {"status": "Rejected by college", "remark": remark};

    axios.patch(`http://localhost:5000/pass/${id}`, change).then(response => {
        console.log(response.data);
        axios.get(`http://localhost:5000/pass/rejected`).then(res => {
          setRejectedPass(res.data.passes);
          setRejectedPass2(res.data.passes);
        }).catch((error) => {
          history.push("/");
        });
    });

    setUnVerifiedPass((preValues) => {
      return unVerifiedPass.filter((pass, index) => {
        return pass._id !== id;
      });
    });
    setUnVerifiedPass2((preValues) => {
      return unVerifiedPass.filter((pass, index) => {
        return pass._id !== id;
      });
    });

    axios.post("http://localhost:5000/user/sendMail", mail).then((response) => {
      console.log(response.data);
    });
  }

  function saveFile(url, file_name){
    saveAs(
      url,
      file_name
    );
  };

  function handleChangeSearch(event){
    console.log(event.target.value);
  }

  function logout(){
    localStorage.clear();
    history.push('/');
  }

  function adminHome(){
    history.push({pathname: "/adminPage", state: {adminId: "VJTI_123", adminPassword: "SRC_college@543"}});
  }

  function perVerification(){
    history.push({pathname: "/personalVerification", state: {adminId: location.state.adminId, adminPassword: location.state.adminPassword}});
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
            <button onClick={perVerification} className="nav-link btn btn-link">Student Verification</button>
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
      {unVerifiedPass.length<1 && <h5 style={{paddingLeft: "25px"}}>No Requests</h5>}
        {unVerifiedPass.length>=1 &&
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
              <th style={{color:"#ffffff"}}>Download College ID</th>
              <th style={{color:"#ffffff"}}>Verify</th>
              <th style={{color:"#ffffff"}}>Reject</th>
            </tr>
          </thead>
        {unVerifiedPass.map((pass, index) => {

            return (
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
            <td>
              <button
                onClick={()=>{saveFile(`http://localhost:5000/${pass.collegeIDImage}`, `${Date.now()}.${pass.collegeIDImage.split('.').at(-1)}`)}}
                className="btn btn-sm btn-dark"
                >
                  Download
              </button>
            </td>
            <td>
              <button
                data-toggle="modal" data-target="#exampleModalCenter2"
                onClick={() => getMail(pass._id, pass.email)}
                className="btn btn-sm btn-success"
              >
                Verify
              </button>
            </td>
            <td>
              <button
                data-toggle="modal" data-target="#exampleModalCenter"
                onClick={() => getRejMail(pass._id, pass.email)}
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

  <h1 style={{ paddingLeft:"25px", paddingTop:"25px", color: props.color }}>Verified Passes</h1>
  {verifiedPass.length<1 && <h5 style={{paddingLeft: "25px"}}>No Pass</h5>}
    {verifiedPass.length>=1 &&
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
        <th style={{color:"#ffffff"}}>Expiry Date</th>
        <th style={{color:"#ffffff"}}>Duration</th>
        <th style={{color:"#ffffff"}}>Download College ID</th>
        <th style={{color:"#ffffff"}}>Print</th>
        </tr>
      </thead>
    {verifiedPass.map((pass, index) => {
      return (
        <VerifiedPassList pass={pass} index={index} />
      );
    })}
  </table>
  </div>
  }

  <h1 style={{ paddingLeft:"25px", paddingTop:"25px", color: props.color }}>Rejected Passes</h1>
  {rejectedPass.length<1 && <h5 style={{paddingLeft: "25px"}}>No Pass</h5>}
    {rejectedPass.length>=1 &&
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
          <th style={{color:"#ffffff"}}>Remark</th>
          <th style={{color:"#ffffff"}}>Download College ID</th>
        </tr>
      </thead>
    {rejectedPass.map((pass, index) => {
        return (
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
              <td rowspan={pass.remark}>
                <b>{pass.remark}</b>
              </td>
              <td>
                <button
                  onClick={()=>{saveFile(`http://localhost:5000/${pass.collegeIDImage}`, `${Date.now()}.${pass.collegeIDImage.split('.').at(-1)}`)}}
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
        <h5 className="modal-title">Approve Pass</h5>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={()=>verify(currId)}
          data-dismiss="modal"
        >
          Approve
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
