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

  const [user, setUser] = useState({
    email: "",
    gender: "",
    branch: "",
    semester: "",
    contactNo: "",
    collegeID: "",
    collegeIDImage: "",
    name: "",
    dob: "",
    age: ""
  });

  useEffect(() => {

      if (loggedInUser) {
        console.log(location.state.isVerified);
        console.log(isVerified);
        setUserRemark(location.state.user.remark);
        const foundUser = JSON.parse(loggedInUser);

        const config = {
          headers: { "Authorization": "Bearer " + foundUser.token }
        };

        axios
          .get(`http://localhost:5000/user/${foundUser.user._id}`, config)
          .then((res) => {
            setUser({
              gender: res.data.user.gender,
              branch: res.data.user.branch,
              semester: res.data.user.semester,
              collegeID: res.data.user.collegeID,
              collegeIDImage: res.data.user.collegeIDImage,
              age: res.data.user.age,
              name: res.data.user.name,
              email: res.data.user.email,
              dob: res.data.user.dob,
              contactNo: res.data.user.contactNo
            });
          })
          .catch((error) => {
            history.push("/login");
          });

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

  function handleChange(event) {

    const { name, value } = event.target;
    if(value!=="select"){
      setUser((preValues) => {
        return {
          ...preValues,
          [name]: value
        };
      });
    }
  }

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

  function setDate(event) {
    const value = event.target.value;
    if (value!=="select"){
      const dObj =  new Date(value);
      var today = new Date();
      const diffTime = dObj.getTime() - today.getTime();
      const diffDays = (diffTime / (1000 * 60 * 60 * 24));
      const temp = value.split("-")
      const d = temp[2] + "-" + temp[1] + "-" + temp[0];
      setUser((preValues) => {
        return {
          ...preValues,
          dob: d
        };
      });
    }
  }

  function update() {
    const loggedInUser = localStorage.getItem("userData");

    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);

      const config = {
        headers: { Authorization: "Bearer " + foundUser.token }
      };

      const formData = new FormData();

      formData.append("name", user.name);
      formData.append("age", user.age);
      formData.append("gender", user.gender);
      formData.append("email", user.email);
      formData.append("branch", user.branch);
      formData.append("semester", user.semester);
      formData.append("collegeID", user.collegeID);
      formData.append("contactNo", user.contactNo);
      formData.append("collegeIDImage", user.collegeIDImage);
      formData.append("dob", user.dob);

      axios
        .patch(`http://localhost:5000/user/${foundUser.user._id}`, formData)
        .then((response) => {
          console.log(response.data);
          axios
            .get(`http://localhost:5000/user/${foundUser.user._id}`, config)
            .then((res) => {
              setUser({
                userId: foundUser.user._id,
                gender: res.data.user.gender,
                remark: res.data.user.remark,
                branch: res.data.user.branch,
                semester: res.data.user.semester,
                collegeID: res.data.user.collegeID,
                collegeIDImage: res.data.user.collegeIDImage,
                dob: res.data.user.dob,
                age: res.data.user.age,
                name: res.data.user.name,
                email: res.data.user.email,
                contactNo: res.data.user.contactNo
              });
            })
            .catch((error) => {
              history.push("/");
            });
        });
    }
    else {
      history.push("/");
    }
  }

   function reApplyForPersonal(){

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

   function upload(event){
     const { name, value } = event.target;
     setUser((preValues) => {
       return {
         ...preValues,
         [name]: value,
         collegeIDImage: event.target.files[0]
       };
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
        <h3 style={{paddingBottom: "20px"}}>Update Your Details and Re-Apply</h3>
        <button style={{marginBottom: "20px"}} data-toggle="modal" data-target="#exampleModalCenter" className="btn btn-lg btn-outline-dark">Update Details</button>
        <br/>
        <button style={{marginBottom: "20px"}} data-toggle="modal" data-target="#exampleModalCenter2" className="btn btn-lg btn-outline-dark">Re-upload College ID</button>
        <br />
        <button onClick={reApplyForPersonal} className="btn btn-lg btn-outline-dark">Re-Apply</button>
      </div>
    }

    <div className="modal fade" id="exampleModalCenter">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Your Details</h5>
          </div>
          <div className="modal-body">
          <form className="user">
            <div className="mb-3">
              <label>Name</label>
              <input onChange={handleChange} className="form-control form-control-user" type="text" id="exampleFirstName" placeholder="Name" name="name" value={user.name}/>
            </div>
            <div className="row mb-3">
              <div className="col-sm-6">
                <label>Email</label>
                <input onChange={handleChange} className="form-control form-control-user" type="email" id="exampleFirstName" placeholder="Email" name="email" value={user.email} />
              </div>
              <div className="col-sm-6">
                <label>Contact Number</label>
                <input onChange={handleChange} className="form-control form-control-user" type="tel" id="exampleFirstName" placeholder="Contact Number" name="contactNo" value={user.contactNo} />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-6">
                <label>Gender</label>
                <select name="gender" onChange={handleChange} value={user.gender} className="form-control">
                  <option value="select">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="col-sm-6">
                <label>Age</label>
                <input onChange={handleChange} className="form-control form-control-user" type="number" id="examplePasswordInput" placeholder="Age" name="age" value={user.age}/>
              </div>
            </div>
            <div className="mb-3">
              <label style={{marginRight: "15px"}}>Date of Birth ({user.dob})</label>
              <input type="date" onChange={setDate} name="dob" />
            </div>
            <div className="mb-3">
              <label>College ID</label>
              <input onChange={handleChange} className="form-control form-control-user" id="examplePasswordInput" placeholder="College ID" name="collegeID" value={user.collegeID}/>
            </div>
            <div className="row mb-3">
              <div className="col-sm-6">
                <label>Semester</label>
                <select name="semester" onChange={handleChange} value={user.semester} className="form-control">
                  <option value="select">Select Semester</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
              </div>
              <div className="col-sm-6">
                <label>Branch</label>
                <select name="branch" onChange={handleChange} value={user.branch} className="form-control">
                  <option value="select">Select Branch</option>
                  <option value="Computer Engineering">Computer Engineering</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Electronics & Tele – Communication Engineering">Electronics & Tele – Communication Engineering</option>
                  <option value="Electronics Engineering">Electronics Engineering	</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Production Engineering">Production Engineering </option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Textile Technology">Textile Technology</option>
                </select>
              </div>
            </div>
            <hr/>
          </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-success" onClick={update} data-dismiss="modal">Done</button>
            <button type="button" className="btn btn-outline-dark" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <div className="modal fade" id="exampleModalCenter2">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Your College ID</h5>
          </div>
          <div className="modal-body">
            <div>
              <label style={{ marginTop: "20px", marginRight: "15px" }}>
                <b>Update College ID</b>
              </label>
              <input type="file" multiple name="collegeIDImage" onChange={upload} />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" onClick={update} className="btn btn-outline-success" data-dismiss="modal">Done</button>
            <button type="button" className="btn btn-outline-dark" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    </div>
    );
}

export default UserPass;
