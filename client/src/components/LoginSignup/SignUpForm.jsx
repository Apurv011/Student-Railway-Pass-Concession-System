import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from 'react-router-dom';
import uniqueString from 'unique-string';
import { FaHome } from "react-icons/fa";
import { Row, Col, Container } from 'react-bootstrap';


function SignUpForm(props){

  let history = useHistory();

  const [mail, setMail] = useState({
    to: "",
    subject: "One Time Password",
    text: ""
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpEnt, setOtpEnt] = useState("");
  const [dob, setDob] = useState("");

  const [user, setUser] = useState({
    email: "",
    password: "",
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

  function setDate(event) {
    const value = event.target.value;
    if (value==="select"){
      setDob("");
    }
    else{
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
      setDob(d);
    }
  }

  function getPassword(){
    axios.post("http://localhost:5000/user/sendMail", mail).then((response) => {
      console.log(response.data);
    });
    setOtpSent(true);
  }

  function registerUser(event) {

    if(otpEnt===otp){
      const formData = new FormData();

      formData.append("name", user.name);
      formData.append("age", user.age);
      formData.append("gender", user.gender);
      formData.append("email", user.email);
      formData.append("password", user.password);
      formData.append("branch", user.branch);
      formData.append("semester", user.semester);
      formData.append("collegeID", user.collegeID);
      formData.append("contactNo", user.contactNo);
      formData.append("collegeIDImage", user.collegeIDImage);
      formData.append("dob", user.dob);

      axios.post("http://localhost:5000/user/signup", formData).then(response => {
        history.push('/login');
      });

      setUser({
        email: "",
        password: "",
        gender: "",
        branch: "",
        semester: "",
        contactNo: "",
        collegeID: "",
        collegeIDImage: "",
        name: "",
        age: 0
      });
    }
    else{
      alert("Wrong OTP!");
      window.location.reload();
    }
    event.preventDefault();

  }

  function handleOtpChange(event){
    setOtpEnt(event.target.value);
  }

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
    if (name === "email") {
      const pass = uniqueString().substring(0,5);
      setOtp(pass);

      var text = `Your Account is being registered
      Your one time password is ${pass}`;
      setMail((preValues) => {
        return {
          ...preValues,
          text: text,
          to: value
        };
      });
    }
  }

  return (
    <Container>
      <h1 className="text-dark" style={{fontSize:"75px", textAlign:"center", marginTop: "3rem"}}>Sign Up</h1>
        <div className="card shadow-lg o-hidden border-0 my-5">
            <div className="card-body p-0">
                <Row>
                    <Col lg="4" style={{overflow:"hidden", margin:"auto", height: "580px"}} className="d-none d-lg-flex">
                        <div className="flex-grow-1 bg-register-image" style={{backgroundImage: "url(https://images.unsplash.com/photo-1603657988428-c2f0b72d513d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80)"}}></div>
                    </Col>
                    <Col lg="7">
                        <div className="p-5">
                            <div className="text-center">
                                <h4 className="text-dark mb-4">Create an Account!</h4>
                            </div>
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
                                <label style={{marginRight: "15px"}}>Date of Birth</label>
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
                              <div className="mb-3">
                                <label>Password</label>
                                <input onChange={handleChange} className="form-control form-control-user" type="password" id="exampleFirstName" placeholder="Password" name="password" value={user.password}/>
                              </div>
                              <div className="mb-3">
                                <label style={{marginRight:"15px"}}>Upload Your College ID</label>
                                <input type="file" multiple name="collegeIDImage" onChange={upload} />
                              </div>
                              {!otpSent &&
                                <button onClick={getPassword} className="btn btn-primary d-block btn-user w-100" type="submit">Get OTP on Email</button>
                              }
                              {otpSent &&
                              <div className="mb-3">
                                <label>Enter OTP</label>
                                <input onChange={handleOtpChange} className="form-control form-control-user" type="password" id="exampleFirstName" placeholder="OTP" name="otpEnt" value={otpEnt}/>
                              </div>
                              }
                              {otpSent && <button onClick={registerUser} className="btn btn-primary d-block btn-user w-100" type="submit">Register Account</button>}
                              <hr/>
                            </form>
                            <div className="text-center">
                                <Link style={{color:"#000000"}} to="/">
                                  <FaHome style={{color:"#000000"}} className="small"/>
                                </Link>
                                <span className="small" style={{marginLeft: "10px", marginRight: "10px"}}>|</span>
                                <span className="small">
                                  <Link style={{color:"#000000"}} to="/login">Already have an account? Login!</Link>
                                </span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    </Container>
  );
}

export default SignUpForm;
