import React from "react";
import SignUpForm from "./LoginSignup/SignUpForm";
import LogInForm from "./LoginSignup/LogInForm";
import SearchTrain from "./SearchTrain/SearchTrain";
import ResultTrains from "./ResultTrains/ResultTrains";
import PersonalVerification from "./PersonalVerification/PersonalVerification";
import PassVerification from "./PassVerification/PassVerification";
import AdminPage from "./AdminPage/AdminPage";
import UserPass from "./UserPass/UserPass";
import TrainSchedule from "./TrainSchedule/TrainSchedule";
import WelcomePage from "./WelcomePage/WelcomePage";
import UserHome from "./UserHome/UserHome";
import PassGen from "./PassGen/PassGen";
import RailwayStat from "./RailwayStat/RailwayStat";
import PassForm from "./PassForm/PassForm";
import About from "./About/About";
import Map from "./Map/Map";
import UserQuery from "./UserQuery/UserQuery";
import AdminQuery from "./AdminQuery/AdminQuery";
import Stat from "./Stat/Stat";
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Route path="/" exact>
        <WelcomePage />
      </Route>

      <Route path="/userHome" exact>
        <UserHome />
      </Route>

      <Route path="/signup" exact>
        <SignUpForm />
      </Route>

      <Route path="/login" exact>
        <LogInForm />
      </Route>

      <Route path="/searchTrain" exact>
        <SearchTrain />
      </Route>

      <Route path="/resultTrains" exact>
        <ResultTrains />
      </Route>

      <Route path="/passVerification" exact>
        <PassVerification />
      </Route>

      <Route path="/personalVerification" exact>
        <PersonalVerification />
      </Route>

      <Route path="/adminPage" exact>
        <AdminPage />
      </Route>

      <Route path="/trainSchedule" exact>
        <TrainSchedule />
      </Route>

      <Route path="/myPass" exact>
        <UserPass />
      </Route>

      <Route path="/passGen" exact>
        <PassGen />
      </Route>

      <Route path="/stat" exact>
        <Stat />
      </Route>

      <Route path="/map" exact>
        <Map />
      </Route>

      <Route path="/railwayStat" exact>
        <RailwayStat />
      </Route>

      <Route path="/about" exact>
        <About />
      </Route>

      <Route path="/passForm" exact>
        <PassForm />
      </Route>

      <Route path="/userQuery" exact>
        <UserQuery />
      </Route>

      <Route path="/adminQuery" exact>
        <AdminQuery />
      </Route>

    </Router>
  );
}

export default App;
