import React from 'react';
import { useHistory, useLocation } from "react-router-dom";

export const About = () => {

  let history = useHistory();

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <button className="btn btn-link navbar-brand" onClick={() => history.push("/")}>Pass Generation System</button>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </nav>
        <div style={{margin: "10px 20px 10px 20px"}}>
            <h2 id="about">About</h2>
            <p>Project made under the guidance of Prof. V. B. Nikam in the course – Web Information Management by T.Y. B.Tech. Information Technology students of Group 7:</p>
            <ul>
                <li>191080017 - Mayur Chaudhari</li>
                <li>191080079 - Apurv Kulkarni</li>
                <li>201080908 - Sanket Bhosale</li>
            </ul>
            <hr/>
            <h3 id="problem-statement">Problem Statement</h3>
            <p>
              Local train is the lifeline of people in Mumbai, and students are no exceptions. Education without train travelling is a rarely seen case. Students (below the age of 25) are given a concession facility in their train pass by Central and Western Railway, Mumbai, if they use the local train services for going to their educational institutes. Colleges in Mumbai, provide students the railway train concession forms, issued by the Central and Western Railway, Mumbai, to avail the concession facility. To get railway concession form, students have to wait for hours in a queue. They have to fill the form and submit it to the college authority. The concerned college authority has a cumbersome task of filling the student details manually on the actual form in many colleges. So, after analyzing all the problems and requirements, the need for automation was strongly felt. Student Railway Pass Concession System is a MERN Stack based application which provides students with printed concession form.
            </p>
            <hr/>
            <h3 id="objectives">Objectives</h3>
            <p>
              The main objective of the project is to understand the day to day difficulties faced by the students and the college and to find a solution which is easy to use, efficient, cost effective, environment friendly and easily expandable. Following are the few objectives of this system:
            </p>
            <ul>
                <li><p>To provide very much user friendly GUI, on which most of the work is done only at the clicks of the mouse.</p></li>
                <li><p>Minimizes the paperwork, which is very time consuming and difficult to maintain.</p></li>
                <li><p>Generation of reports as per requirements and according to date, timestamp, etc.</p></li>
                <li><p>To helps in ‘Optimal utilization’ of various resources and provide easy to understand, good management system.</p></li>
                </ul>
            <hr/>
            <p>Tech Stack – MERN Stack (MongoDB, Express.js, React.js, Node.js)</p>
            <hr/>
            <p>More Information about <a href="https://www.irctchelp.in/railway-concession-rules-students-youths/"> Railway Concession Rules for Students & Youths</a></p>
        </div>
      </div>
    );
}

export default About;
