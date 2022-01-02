import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import styles from "../UserQuery/UserQuery.module.css";

function AdminQuery(props){

  const location = useLocation();
  let history = useHistory();

  const [ansQueries, setAnsQueries] = useState([]);
  const [unansQueries, setUnansQueries] = useState([]);
  const [isAnsQuery, setIsAnsQuery] = useState(false);
  const [isUnansQuery, setIsUnansQuery] = useState(false);

  const [newAns, setNewAns] = useState("");
  const [q, setQ] = useState("");
  const [queryId, setQueryId] = useState("");


  const loggedInUser = localStorage.getItem("userData");

  useEffect(() => {

    if (location.state.adminId!=="VJTI_123" || location.state.adminPassword!=="SRC_college@543") {
      history.push("/");
    }
    else{
      axios.get(`http://localhost:5000/query/ans`).then(res => {
        console.log(res.data);

        if(res.data.count>0){
            setAnsQueries(res.data.queries);
            setIsAnsQuery(true);
        }
      }).catch((error) => {
        history.push("/login");
      });

      axios.get(`http://localhost:5000/query/unAns`).then(res => {
        console.log(res.data);

        if(res.data.count>0){
            setUnansQueries(res.data.queries);
            setIsUnansQuery(true);
        }
      }).catch((error) => {
        history.push("/login");
      });
    }

  }, [history]);

  function handleChange(event) {
    setNewAns(event.target.value);
  }

  function selectQ(id, q){
    setQ(q);
    setQueryId(id);
  }

  function submitAnswer(event){
    console.log(newAns);

    const data = {
      "ans": newAns,
      "isAns": true
    };

    axios.patch(`http://localhost:5000/query/${queryId}`, data).then(response => {
      console.log(response.data);
      alert("Answer Posted");
      axios.get(`http://localhost:5000/query/ans`).then(res => {
        console.log(res.data);

        if(res.data.count>0){
            setAnsQueries(res.data.queries);
            setIsAnsQuery(true);
        }
      }).catch((error) => {
        history.push("/login");
      });
      if(unansQueries.length===1){
        setIsUnansQuery(false);
      }

      setUnansQueries((preValues) => {
        return unansQueries.filter((query, index) => {
          return query._id !== queryId;
        });
      });

      //history.push({pathname: "/adminPage", state: {adminId: location.state.adminId, adminPassword: location.state.adminPassword}});
    }).catch((error) => {
      console.log(error);
      history.push("/login");
    });

    setNewAns("");
    event.preventDefault();

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
            <button onClick={perVerification} className="nav-link btn btn-link">Student Verification</button>
          </li>
          <li className="nav-item">
            <button onClick={passVerification} className="nav-link btn btn-link">Pass Verification</button>
          </li>
          <li className="nav-item">
            <button onClick={stats} className="nav-link btn btn-link">Check Statistical Data</button>
          </li>
          <li className="nav-item">
            <button onClick={logout} className="nav-link btn btn-link">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
    <div className={`${styles.completeQuery}`} style={{padding: "50px"}}>
    <Tabs defaultActiveKey="first">
      <Tab eventKey="first" title="Un-Answerd Queries">
      {
        isUnansQuery
        ?
        <div className={`${styles.unAsnQuery} col-md-9 col-sm-12`}>
          {
            unansQueries.reverse().map((query, index) => {
              return (
                <div className="mt-2">
                  <div className="d-flex flex-row align-items-center">
                  <div className="user-info">
                    <h5 className="mr-2">{query.que}</h5>
                    <p className="text-muted">{query.userName},  {query.branch}</p>
                  </div>
                    <span style={{marginRight: "35px", position: "absolute", right: "0", top: "10"}}>{query.date}</span>
                  </div>
                  <div>
                    <span>
                      <p onClick={()=>selectQ(query._id, query.que)} className="text-info font-weight-bold" data-toggle="modal" data-target="#exampleModalCenter" style={{cursor:"pointer"}}>Answer Now</p>
                    </span>
                  </div>
                  <hr />
                </div>
              );
            })
          }
        </div>
        :
        <div className="text-center" style={{paddingTop: "50px"}}>
          <h1 style={{paddingBottom: "20px"}}>No Queries!</h1>
        </div>
      }
      </Tab>
      <Tab eventKey="second" title="Answerd Queries">
      {
        isAnsQuery
        ?
        <div className={`${styles.completeQuery} col-md-9 col-sm-12`}>
          {
            ansQueries.reverse().map((query, index) => {
              return (
                <div className="mt-2">
                  <div className="d-flex flex-row align-items-center">
                    <div className="user-info">
                      <h5 className="mr-2">{query.que}</h5>
                      <p className="text-muted">{query.userName},  {query.branch}</p>
                    </div>
                    <span style={{marginRight: "35px", position: "absolute", right: "0", top: "10"}}>{query.date}</span>
                  </div>
                  <div>
                    <span>
                      {query.ans}
                    </span>
                  </div>
                  <hr />
                </div>
              );
            })
          }
        </div>
        :
        <div className="text-center" style={{paddingTop: "50px"}}>
          <h1 style={{paddingBottom: "20px"}}>No Queries!</h1>
        </div>
      }
      </Tab>
    </Tabs>
    </div>

    <div className="modal fade" id="exampleModalCenter">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Post Naswer</h5>
          </div>
          <div className="modal-body">
            <label>
              <b>Query</b>
            </label>
            <p>{q}</p>
            <label>
              <b>Enter Answer</b>
            </label>
            <div className="form-inline">
              <textarea
                cols="50"
                rows="4"
                type="text"
                name="que"
                value={newAns}
                onChange={handleChange}
                className="form-control mr-sm-2 mb-3"
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={submitAnswer}
              data-dismiss="modal"
            >
              Post
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


export default AdminQuery;
