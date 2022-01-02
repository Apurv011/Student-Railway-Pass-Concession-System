import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import { saveAs } from "file-saver";


function UserHome() {

  const location = useLocation();
  let history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [gender, setGender] = useState("");
  const [userId, setUserId] = useState("");
  const [isVerified, setIsVerified] = useState("");
  const [userInfo, setUserInfo] = useState({
    userId: "",
    email: "",
    gender: "",
    branch: "",
    semester: "",
    contactNo: "",
    collegeID: "",
    collegeIDImage: "",
    name: "",
    age: ""
  });

  useEffect(() => {
    const loggedInUser = localStorage.getItem("userData");

    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
        const config = {
          headers: { Authorization: "Bearer " + foundUser.token }
        };

        axios
          .get(`http://localhost:5000/user/${foundUser.user._id}`, config)
          .then((res) => {
            setName(res.data.user.name);
            setEmail(res.data.user.email);
            setContactNo(res.data.user.contactNo);
            setGender(res.data.user.gender);
            setUserId(res.data.user._id);
            setIsVerified(res.data.user.isVerified);
            setUserInfo({
              userId: foundUser.user._id,
              remark: res.data.user.remark,
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
    } else {
      history.push("/login");
    }
  }, [history]);

  function handleChange(event) {
    const { name, value } = event.target;
    setUserInfo((preValues) => {
      return {
        ...preValues,
        [name]: value
      };
    });
  }

  function saveFile(url, file_name){
    saveAs(
      url,
      file_name
    );
  };

  function upload(event){
    const { name, value } = event.target;
    setUserInfo((preValues) => {
      return {
        ...preValues,
        [name]: value,
        collegeIDImage: event.target.files[0]
      };
    });
  }

  function update() {
    const loggedInUser = localStorage.getItem("userData");

    if (loggedInUser) {
      console.log(userInfo);
      const foundUser = JSON.parse(loggedInUser);

      const config = {
        headers: { Authorization: "Bearer " + foundUser.token }
      };

      const formData = new FormData();

      formData.append("name", userInfo.name);
      formData.append("email", userInfo.email);
      formData.append("semester", userInfo.semester);
      formData.append("contactNo", userInfo.contactNo);
      formData.append("collegeIDImage", userInfo.collegeIDImage);

      axios
        .patch(`http://localhost:5000/user/${foundUser.user._id}`, formData)
        .then((response) => {
          console.log(response.data);
          axios
            .get(`http://localhost:5000/user/${foundUser.user._id}`, config)
            .then((res) => {
              setName(res.data.user.name);
              setEmail(res.data.user.email);
              setContactNo(res.data.user.contactNo);
              setGender(res.data.user.gender);
              setUserId(res.data.user._id);
              setUserInfo({
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
              history.push("/login");
            });
        });
    }
    else {
      history.push("/login");
    }
  }

  return (
    <div>
      <Header page="User Home" user={userInfo} isVerified={isVerified}/>
      <div style={{paddingTop:"50px", marginBottom: "50px"}} className="d-flex justify-content-center ">
        <div style={{ width: "450px"}} className="card bg-light ">
          <div className="card-header bg-dark">
            <h3 style={{color: "#ffffff"}} className="d-flex justify-content-center">Account Details</h3>
          </div>
          <div className="card-body">
            <h5 className="card-title">
              <form>
                <div className="form-row ">
                  <div className="col" align="center">
                    <h4>
                      <label>Name</label>
                      <br />
                      <b>{name}</b>
                    </h4>
                  </div>

                  <div className="col" align="center">
                    <h4>
                      <label>Gender</label>
                      <br />
                      <b>{gender}</b>
                    </h4>
                  </div>
                </div>

                <hr />
                <div className="col">
                  <h4 className="d-flex justify-content-center">
                    <label htmlFor="trainName">Email</label>
                  </h4>
                  <h3 className="d-flex justify-content-center">
                    <b>{email}</b>
                  </h3>
                </div>

                <hr />
                <div className="col">
                  <h4 className="d-flex justify-content-center">
                    <label htmlFor="trainName">Contact Number</label>
                  </h4>
                  <h3 className="d-flex justify-content-center">
                    <b>{contactNo}</b>
                  </h3>
                </div>

                <hr />

                <div className="form-row ">
                  <div className="col" align="center">
                    <h4 className="d-flex justify-content-center">
                      <label htmlFor="trainName">Branch</label>
                    </h4>
                    <h3 className="d-flex justify-content-center">
                      <b>{userInfo.branch}</b>
                    </h3>
                  </div>

                  <div className="col" align="center">
                    <h4 className="d-flex justify-content-center">
                      <label htmlFor="trainName">Semester</label>
                    </h4>
                    <h3 className="d-flex justify-content-center">
                      <b>{userInfo.semester}</b>
                    </h3>
                  </div>
                </div>


                <hr />
                <div className="col">
                  <h4 className="d-flex justify-content-center">
                    <label htmlFor="trainName">College ID</label>
                  </h4>
                  <h3 className="d-flex justify-content-center">
                    <b>{userInfo.collegeID}</b>
                  </h3>
                </div>

                <hr />
                <div className="col text-center">
                  <span style={{marginRight:"10px"}}>View College ID</span>
                  <button
                    onClick={()=>{saveFile(`http://localhost:5000/${userInfo.collegeIDImage}`, `${Date.now()}.${userInfo.collegeIDImage.split('.').at(-1)}`)}}
                    className="btn btn-sm btn-dark"
                    >
                    Download
                </button>
                </div>

              </form>
            </h5>
          </div>
          <button type="button"
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                  className="btn btn-dark btn-lg btn-block">
            Update Details
          </button>

          <button type="button"
                  data-toggle="modal"
                  data-target="#exampleModalCenter2"
                  className="btn btn-dark btn-lg btn-block">
            Re-upload College ID
          </button>
        </div>
      </div>
      <div className="modal fade" id="exampleModalCenter">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Your Details</h5>
            </div>
            <div className="modal-body">
              <label>
                <b>Change Name</b>
              </label>
              <input
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleChange}
                className="form-control"
              />
              <label style={{ marginTop: "20px" }}>
                <b>Change Email</b>
              </label>
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                className="form-control"
              />
              <label style={{ marginTop: "20px" }}>
                <b>Change Contact Number</b>
              </label>
              <input
                type="tel"
                name="contactNo"
                value={userInfo.contactNo}
                onChange={handleChange}
                className="form-control"
              />
              <label style={{ marginTop: "20px" }}>
                <b>Change Semester</b>
              </label>
              <select name="semester" onChange={handleChange} value={userInfo.semester} className="form-control">
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
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={update}
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
              <h5 className="modal-title">Update Your College ID</h5>
            </div>
            <div className="modal-body">
            {isVerified==="true" ?
              <p>Your deatils are verified successful, cannot update College ID</p>
                :
              <div>
                <label style={{ marginTop: "20px", marginRight: "15px" }}>
                  <b>Update College ID</b>
                </label>
                <input type="file" multiple name="collegeIDImage" onChange={upload} />
              </div>
            }
            </div>
            <div className="modal-footer">
              {
                isVerified!=="true" &&
                <button type="button" className="btn btn-outline-success" onClick={update} data-dismiss="modal">Done</button>
              }
              <button type="button" className="btn btn-outline-dark" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default UserHome;
