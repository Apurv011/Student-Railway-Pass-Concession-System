import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import { Chart as ChartJS } from 'chart.js/auto'
import Header from '../Header/Header';
import { Chart }            from 'react-chartjs-2';
import {Bar, Doughnut, Pie} from 'react-chartjs-2';

function RailwayStat() {

  const location = useLocation();
  let history = useHistory();

  const [stations, setStations] = useState([]);
  const [time, setTime] = useState([]);

  useEffect(() => {
    if(location.state.data.length>0){
      setStations([]);
      setTime([]);
      for(let i=0; i<location.state.data[0].count; i++){
        setStations(preValues => [...preValues, location.state.data[i].name]);
        setTime(preValues => [...preValues, location.state.data[i].time]);
      }
    }
    else{
      history.push("/");
    }
  }, []);

  return (
    <div>
      <Header guest={location.state.guest}/>
      <h1 className="text-center mt-3">Statistical Data of Railways</h1>
      <div style={{padding: "40px"}}>
        <Bar style={{height: "575px"}}
              data={{
                labels: stations,
                datasets:[{
                  label:'Estimated Journey Time (in Hours)',
                  data: time,
                  backgroundColor:[
                    'rgba(54, 162, 235, 1.2)',
                    'rgba(255, 99, 132, 1.2)',
                    'rgba(255, 159, 64, 1.2)',
                    'rgba(54, 162, 235, 1.2)',
                    'rgba(255, 206, 86, 1.2)',
                    'rgba(75, 192, 192, 1.2)',
                    'rgba(153, 102, 255, 1.2)',
                    'rgba(255, 159, 64, 1.2)',
                    'rgba(255, 99, 132, 1.2)',
                    'rgba(54, 162, 235, 1.2)',
                    'rgba(255, 99, 132, 1.2)'
                  ]
                }]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins:{
                  title: {
                    display: true,
                    text: `Time taken by Trains from ${location.state.from} to ${location.state.to}`,
                    position: "top",
                    padding: {
                      bottom: 20
                    },
                    font: {
                      size: 30
                    }
                  }
                }
              }}
        />
        </div>
    </div>
  );
}

export default RailwayStat;
