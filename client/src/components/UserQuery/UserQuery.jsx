import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import Header from '../Header/Header';
import 'bootstrap/dist/css/bootstrap.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import styles from "./UserQuery.module.css";

function UserQuery(props){

  const location = useLocation();
  let history = useHistory();

  const [queries, setQueries] = useState([]);
  const [allQueries, setAllQueries] = useState([]);
  const [isQuery, setIsQuery] = useState(false);
  const [isAnyQuery, setIsAnyQuery] = useState(false);

  const [newQue, setNewQue] = useState({
    userId: location.state.user.userId,
    userName: location.state.user.name,
    que: "",
    email: location.state.user.email,
    branch: location.state.user.branch
  });

  const loggedInUser = localStorage.getItem("userData");

  useEffect(() => {

      if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);

        const config = {
          headers: { "Authorization": "Bearer " + foundUser.token }
        };

          console.log(foundUser.user._id);
          getQueriesList();
      }
  }, [history]);

  function getQueriesList(){

    const foundUser = JSON.parse(loggedInUser);

    axios.get(`http://localhost:5000/query/user/${foundUser.user._id}`).then(res => {
      console.log(res.data);

      if(res.data.count>0){
          setQueries(res.data.queries);
          setIsQuery(true);
      }
      }).catch((error) => {
        history.push("/login");
    });
    axios.get(`http://localhost:5000/query/`).then(res => {
      console.log(res.data);

      if(res.data.count>0){
          setAllQueries(res.data.queries);
          setIsAnyQuery(true);
      }
      }).catch((error) => {
        history.push("/login");
    });

  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNewQue((preValues) => {
      return {
        ...preValues,
        [name]: value
      };
    });
  }

  function submitQuery(event){
    console.log(newQue);

    axios.post("http://localhost:5000/query", newQue).then(response => {
      console.log(response.data);
      alert("Query Posted");
      getQueriesList();
    });

    setNewQue({
      userId: location.state.user.userId,
      userName: location.state.user.name,
      que: "",
      email: location.state.user.email,
      branch: location.state.user.branch,
    });

    event.preventDefault();
  }


  return (
    <div>
    <Header page="My Query" isVerified={location.state.isVerified} user={location.state.user}/>
    <div className={`${styles.completeQuery}`} style={{padding: "50px"}}>
    <Tabs defaultActiveKey="first">
      <Tab eventKey="first" title="My Queries">
      {
        isQuery
        ?
        <div className={`${styles.completeQuery} col-md-9 col-sm-12`}>
          {
            queries.reverse().map((query, index) => {
              return (
                <div className="mt-2">
                  <div className="d-flex flex-row align-items-center">
                    <h5 className="mr-2">{query.que}</h5>
                    <span style={{marginRight: "35px", position: "absolute", right: "0", top: "10"}}>{query.date}</span>
                  </div>
                  <div>
                    <span style={!query.isAns ? {color: "red"} : {color: "black"}}>
                      {query.isAns ? query.ans : "Yet to be Answered!"}
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
      <div className="text-center" style={{paddingTop: "10px"}}>
        <button type="button" data-toggle="modal" data-target="#exampleModalCenter" className="btn btn-outline-dark btn-lg">Post new Query</button>
      </div>
      </Tab>

      <Tab eventKey="second" title="All Queries">
      {
        isAnyQuery
        ?
        <div className={`${styles.completeQuery} col-md-9 col-sm-12`}>
          {
            allQueries.reverse().map((query, index) => {
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
                    <span style={!query.isAns ? {color: "red"} : {color: "black"}}>
                      {query.isAns ? query.ans : "Yet to be Answered!"}
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
            <h5 className="modal-title">Submit New Query</h5>
          </div>
          <div className="modal-body">
            <label>
              <b>Enter Query</b>
            </label>
            <div className="form-inline">
              <textarea
                cols="50"
                rows="4"
                type="text"
                name="que"
                value={newQue.que}
                onChange={handleChange}
                className="form-control mr-sm-2 mb-3"
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={submitQuery}
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


export default UserQuery;
