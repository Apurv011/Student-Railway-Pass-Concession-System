import React from "react";
import { useHistory } from 'react-router-dom';
import { FaHome } from "react-icons/fa";

function Header(props){

  let history = useHistory();

  function logout(){
    localStorage.clear();
    history.push('/');
  }

  function myPass(){
    history.push({
        pathname: '/myPass',
        state: { isVerified: props.isVerified, user: props.user}
    });
  }

  function userQuery(){
    history.push({
        pathname: '/userQuery',
        state: { isVerified: props.isVerified, user: props.user}
    });
  }

  function searchPage(){
    history.push({
        pathname: '/searchTrain',
        state: { guest: props.guest}
    });
  }

  function userHome(){
    history.push({
        pathname: '/userHome',
        state: { isVerified: props.isVerified}
    });
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button className="btn btn-link navbar-brand" onClick={searchPage}>Indian Railway Information</button>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
        {props.guest!==true &&
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            {props.page!=="User Home" && <button onClick={userHome} className="nav-link btn btn-link">Home</button> }
          </li>
          <li className="nav-item">
            {props.page!=="My Pass" && <button onClick={myPass} className="nav-link btn btn-link">My Pass</button> }
          </li>
          <li className="nav-item">
            {props.page!=="My Query" && <button onClick={userQuery} className="nav-link btn btn-link">My Queries</button> }
          </li>
          <li className="nav-item">
            <button onClick={logout} className="nav-link btn btn-link">Logout</button>
          </li>
        </ul>
        }
        {
          props.page==="Home" &&
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <button onClick={() => history.push("/")} className="nav-link btn btn-link"><FaHome size="20px"/></button>
            </li>
          </ul>
        }
      </div>
    </nav>
  </div>
  );
}

export default Header;
