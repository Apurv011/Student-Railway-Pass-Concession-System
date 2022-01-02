import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Header from '../Header/Header';

function ResultTrains(props){

  const location = useLocation();
  let history = useHistory();

  const [allTrains, setAllTrains] = useState([]);
  const [dur, setDur] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [b, setB] = useState(false);
  const [atFrom, setAtFrom] = useState("");
  const [atTo, setAtTo] = useState("");

  useEffect(() => {

    setFrom(location.state.from);
    setTo(location.state.to);

    axios.get(`http://localhost:5000/trains/stations/${location.state.from}/${location.state.to}`).then(res => {
      if(res.data.length>0) setB(true);
      setAllTrains(res.data);
      let t1;
      let t2;
      for(let i=0; i<res.data.length; i++){
        for(let j=0; j<res.data[i].schedule.length; j++){
          if(res.data[i].schedule[j].Station===location.state.from){
            t1 = res.data[i].schedule[j].DT;
            setAtFrom(res.data[i].schedule[j].DT);
          }
          if(res.data[i].schedule[j].Station===location.state.to){
            t2 = res.data[i].schedule[j].DT;
            setAtTo(res.data[i].schedule[j].AT);
          }
        }

        var date1 = new Date(2000, 0, 1, t1.split(":")[0], t1.split(":")[1]);
        var date2 = new Date(2000, 0, 1, t2.split(":")[0], t2.split(":")[1]);

        if (date2 < date1) {
          date2.setDate(date2.getDate() + 1);
        }

        var diff = date2 - date1;
        var hh = Math.ceil(diff / 1000 / 60 / 60);
        setDur(preValues =>
            [
              ...preValues,
              {
                name: res.data[i].trainName,
                number: res.data[i].trainNumber,
                count: res.data.length,
                time: hh
              }
          ]
        );
      }
      }).catch((error) => {
      history.push("/login");
    });
  }, [location.state.from, location.state.to, history]);

  function schedule(trainId, trainNumber){

    console.log(dur.length);
    console.log(dur);
    history.push({
          pathname: '/trainSchedule',
          state: { trainId: trainId, from: from, to: to, trainNumber: trainNumber, guest: location.state.guest}
      });
  }

  function railwayStat(){
    history.push({
          pathname: '/railwayStat',
          state: { guest: location.state.guest, data: dur, from: from, to: to}
      });
  }

  return (
    <div>
    <Header guest={location.state.guest}/>
    {
      b ?
      <div className="container">
      <div className="container" style={{padding:"30px"}}>
        <h3 className="d-flex justify-content-center">Source Station: {from}</h3>
        <h3 className="d-flex justify-content-center">Destination Station: {to}</h3>
        <h3 style={{marginTop:"20px"}} className="d-flex justify-content-center">
        <button type="button" className="btn btn-lg btn-outline-dark" onClick={railwayStat}>
          Get Trains Statistics
        </button>
        </h3>
      </div>
      <div className="table-responsive">
      <table className="table table-hover bg-dark">
        <thead>
          <tr>
            <th style={{color:"#ffffff"}} scope="col">Train Number</th>
            <th style={{color:"#ffffff"}} scope="col">Train Name</th>
            <th style={{color:"#ffffff"}} scope="col">From</th>
            <th style={{color:"#ffffff"}} scope="col">To</th>
            <th style={{color:"#ffffff"}} scope="col">Departure Time At {from}</th>
            <th style={{color:"#ffffff"}} scope="col">Arrival Time At {to}</th>
            <th style={{color:"#ffffff"}} scope="col">Train First Station</th>
            <th style={{color:"#ffffff"}} scope="col">Train Last Station</th>
            <th style={{color:"#ffffff"}} scope="col">Schedule</th>
          </tr>
        </thead>
      {allTrains.map((train, index) => {
          return (
            <tbody>
              <tr className="table-info">
                <td>
                  <b>{train.trainNumber}</b>
                </td>
                <td>
                  <b>{train.trainName}</b>
                </td>
                <td>
                  <b>{from}</b>
                </td>
                <td>
                  <b>{to}</b>
                </td>
                <td>
                  <b>{atFrom}</b>
                </td>
                <td>
                  <b>{atTo}</b>
                </td>
                <td>
                  <b>{train.sourceStationName}</b>
                </td>
                <td>
                  <b>{train.destinationStationName}</b>
                </td>
                <td>
                  <button onClick={() => schedule(train._id, train.trainNumber)} className="btn btn-sm btn-outline-dark">Schedule</button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
      </div>
      </div>
      :
      <div className="container" style={{padding:"30px"}}>
        <h3 className="d-flex justify-content-center">No Trains Found!</h3>
      </div>
    }
    </div>
  );
}

export default ResultTrains;
