import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2';
import {Bar, Doughnut, Pie} from 'react-chartjs-2';
import { Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Stat() {

  const location = useLocation();
  let history = useHistory();

  const [ numMStudents, setNumMStudents ] = useState(0);
  const [ numFStudents, setNumFStudents ] = useState(0);

  const [ numFirstCls, setNumFirstCls ] = useState(0);
  const [ numSecCls, setNumSecCls ] = useState(0);

  var dest = ["Dadar", "Matunga", "Wadala"];
  const [ numDest, setNumDest ] = useState({
    d : 0,
    m : 0,
    w : 0
  });

  const [ num1M, setNum1M ] = useState(0);
  const [ num3M, setNum3M ] = useState(0);

  var branches = [
    "Computer%20Engineering",
    "Information%20Technology",
    "Electronics%20&%20Tele%20â€“%20Communication%20Engineering",
    "Electronics%20Engineering",
    "Electrical%20Engineering",
    "Mechanical%20Engineering",
    "Production%20Engineering",
    "Civil%20Engineering",
    "Textile%20Technology"
  ];
  const [ numBranchM, setNumBranchM ] = useState({
    CE : 0,
    IT : 0,
    ExTC : 0,
    Tronics : 0,
    Trical : 0,
    Mech : 0,
    Prod : 0,
    Civil : 0,
    Textile : 0
  });
  const [ numBranchF, setNumBranchF ] = useState({
    CE : 0,
    IT : 0,
    ExTC : 0,
    Tronics : 0,
    Trical : 0,
    Mech : 0,
    Prod : 0,
    Civil : 0,
    Textile : 0
  });

    useEffect(() => {

      if (location.state.adminId!=="VJTI_123" || location.state.adminPassword!=="SRC_college@543") {
        history.push("/");
      }
      else{
        axios.get(`http://localhost:5000/pass/gender/male`).then(res => {
          setNumMStudents(res.data.count);
        }).catch((error) => {
          history.push("/");
        });

        axios.get(`http://localhost:5000/pass/gender/female`).then(res => {
          setNumFStudents(res.data.count);
        }).catch((error) => {
          history.push("/");
        });

        for(let i=0; i<branches.length; i++){
          axios.get(`http://localhost:5000/pass/gender-branch/male/${branches[i]}`).then(res => {
            switch(i) {
            case 0:
              setNumBranchM((preValues) => {
                return {
                  ...preValues,
                  CE: res.data.count
                };
              });
              break;
            case 1:
              setNumBranchM((preValues) => {
                return {
                  ...preValues,
                  IT: res.data.count
                };
              });
              break;
            case 2:
              setNumBranchM((preValues) => {
                return {
                  ...preValues,
                  ExTC: res.data.count
                };
              });
              break;
            case 3:
              setNumBranchM((preValues) => {
                return {
                  ...preValues,
                  Tronics: res.data.count
                };
              });
              break;
            case 4:
              setNumBranchM((preValues) => {
                return {
                  ...preValues,
                  Trical: res.data.count
                };
              });
              break;
            case 5:
              setNumBranchM((preValues) => {
                return {
                  ...preValues,
                  Mech: res.data.count
                };
              });
              break;
            case 6:
              setNumBranchM((preValues) => {
                return {
                  ...preValues,
                  Prod: res.data.count
                };
              });
              break;
            case 7:
              setNumBranchM((preValues) => {
                return {
                  ...preValues,
                  Civil: res.data.count
                };
              });
              break;
            case 8:
              setNumBranchM((preValues) => {
                return {
                  ...preValues,
                  Textile: res.data.count
                };
              });
              break;
            default:
              console.log("Error")
              break;
          }
          }).catch((error) => {
            history.push("/");
          });
        }

        for(let i=0; i<branches.length; i++){
          axios.get(`http://localhost:5000/pass/gender-branch/female/${branches[i]}`).then(res => {
            switch(i) {
            case 0:
              setNumBranchF((preValues) => {
                return {
                  ...preValues,
                  CE: res.data.count
                };
              });
              break;
            case 1:
              setNumBranchF((preValues) => {
                return {
                  ...preValues,
                  IT: res.data.count
                };
              });
              break;
            case 2:
              setNumBranchF((preValues) => {
                return {
                  ...preValues,
                  ExTC: res.data.count
                };
              });
              break;
            case 3:
              setNumBranchF((preValues) => {
                return {
                  ...preValues,
                  Tronics: res.data.count
                };
              });
              break;
            case 4:
              setNumBranchF((preValues) => {
                return {
                  ...preValues,
                  Trical: res.data.count
                };
              });
              break;
            case 5:
              setNumBranchF((preValues) => {
                return {
                  ...preValues,
                  Mech: res.data.count
                };
              });
              break;
            case 6:
              setNumBranchF((preValues) => {
                return {
                  ...preValues,
                  Prod: res.data.count
                };
              });
              break;
            case 7:
              setNumBranchF((preValues) => {
                return {
                  ...preValues,
                  Civil: res.data.count
                };
              });
              break;
            case 8:
              setNumBranchF((preValues) => {
                return {
                  ...preValues,
                  Textile: res.data.count
                };
              });
              break;
            default:
              console.log("Error")
              break;
          }
          }).catch((error) => {
            history.push("/");
          });
        }


        axios.get(`http://localhost:5000/pass/class/First%20Class`).then(res => {
          setNumFirstCls(res.data.count);
        }).catch((error) => {
          history.push("/");
        });

        axios.get(`http://localhost:5000/pass/class/Second%20Class`).then(res => {
          setNumSecCls(res.data.count);
        }).catch((error) => {
          history.push("/");
        });

        for(let i=0; i<dest.length; i++){
          axios.get(`http://localhost:5000/pass/destination/${dest[i]}`).then(res => {
            switch(i) {
            case 0:
              setNumDest((preValues) => {
                return {
                  ...preValues,
                  d: res.data.count
                };
              });
              break;
            case 1:
              setNumDest((preValues) => {
                return {
                  ...preValues,
                  m: res.data.count
                };
              });
              break;
            case 2:
              setNumDest((preValues) => {
                return {
                  ...preValues,
                  w: res.data.count
                };
              });
              break;
            default:
              console.log("Error")
              break;
          }
          }).catch((error) => {
            history.push("/");
          });
        }

        axios.get(`http://localhost:5000/pass/duration/1%20Month`).then(res => {
          setNum1M(res.data.count);
        }).catch((error) => {
          history.push("/");
        });

        axios.get(`http://localhost:5000/pass/duration/3%20Months`).then(res => {
          setNum3M(res.data.count);
        }).catch((error) => {
          history.push("/");
        });

      }

    }, [history]);

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
            <button onClick={logout} className="nav-link btn btn-link">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
<h1 className="text-center mt-3">Statistical Data of Student Passes</h1>
      <div>
      <Container>
  <Row style={{marginTop: "40px"}} className="justify-content-md-center">
    <Col sm="4">
    <Bar style={{height: "400px"}}
        data={{
          labels: ['Male', 'Female'],
          datasets:[     {
          label:'Number of Students',
          data:[
            numMStudents,
            numFStudents
          ],
          backgroundColor:[
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 99, 132, 0.8)'
          ]
        }
      ]
    }
  }
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins:{
            title: {
              display: true,
              text: 'Gender-wise Students who Travel by Local',
              position: "bottom",
              padding: {
                top: 40
              },
              font: {
                size: 20
              }
            }
          }
        }}
      />
    </Col>
    <Col sm="8">
    <Bar style={{height: "400px"}}
          data={{
            labels: ['CE', 'IT', 'ExTC', 'Tronics', 'Trical', 'Mech', 'Prod', 'Civil', 'Textile'],
            datasets:[
            {
              label:'Male',
              data:[
                numBranchM.CE,
                numBranchM.IT,
                numBranchM.ExTC,
                numBranchM.Tronics,
                numBranchM.Trical,
                numBranchM.Mech,
                numBranchM.Prod,
                numBranchM.Civil,
                numBranchM.Textile
              ],
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
            },
            {
              label:'Female',
              data:[
                numBranchF.CE,
                numBranchF.IT,
                numBranchF.ExTC,
                numBranchF.Tronics,
                numBranchF.Trical,
                numBranchF.Mech,
                numBranchF.Prod,
                numBranchF.Civil,
                numBranchF.Textile
              ],
              backgroundColor:[
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 99, 132, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 99, 132, 0.6)'
              ]
            }
          ]
      }
    }
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins:{
              title: {
                display: true,
                text: 'Branch-wise Students who Travel by Local',
                position: "bottom",
                padding: {
                  top: 40
                },
                font: {
                  size: 20
                }
              },
            },
            scales: {
             x: {
               stacked: true,
             },
             y: {
               stacked: true
             }
           }
          }}
        />
    </Col>
  </Row>

  <hr/>

  <Row style={{marginTop: "40px", marginBottom: "50px"}}>

    <Col sm="4">
    <Pie style={{height: "400px"}}
          data={{
            labels: ['First Class', 'Second Class'],
            datasets:[     {
            label:'Number of Students',
            data:[
              numFirstCls,
              numSecCls
            ],
            backgroundColor:[
              'rgba(255, 159, 64, 0.8)',
              'rgba(153, 102, 255, 0.8)',
            ]
          }
        ]
      }
    }
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins:{
              title: {
                display: true,
                text: 'Class-wise Students Distribution',
                position: "bottom",
                padding: {
                  top: 40
                },
                font: {
                  size: 20
                }
              }
            }
          }}
        />
    </Col>

    <Col sm="4">
    <Doughnut style={{height: "400px"}}
          data={{
            labels: ['Dadar', 'Matunga', 'Wadala'],
            datasets:[     {
            label:'Number of Students',
            data:[
              numDest.d,
              numDest.m,
              numDest.w,
            ],
            backgroundColor:[
              'rgba(75, 192, 192, 0.8)',
              'rgba(255, 99, 132, 0.8)',
              'rgba(255, 206, 86, 0.8)'
            ]
          }
        ]
      }
    }
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins:{
              title: {
                display: true,
                text: 'Destination-wise Students Distribution',
                position: "bottom",
                padding: {
                  top: 40
                },
                font: {
                  size: 20
                }
              }
            }
          }}
        />

    </Col>

    <Col sm="4">

    <Pie style={{height: "400px"}}
          data={{
            labels: ['1 Month', '3 Months'],
            datasets:[     {
            label:'Number of Students',
            data:[
              num1M,
              num3M
            ],
            backgroundColor:[
              'rgba(54, 162, 235, 0.8)',
              'rgba(255, 206, 86, 0.8)'
            ]
          }
        ]
      }
    }
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins:{
              title: {
                display: true,
                text: 'Pass Duration-wise Students Distribution',
                position: "bottom",
                padding: {
                  top: 40
                },
                font: {
                  size: 20
                }
              }
            }
          }}
        />


    </Col>

  </Row>

</Container>








</div>
                    </div>

  );
}

export default Stat;
