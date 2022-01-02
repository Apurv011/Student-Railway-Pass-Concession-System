import React, { useRef } from 'react';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import WelcomePage from "../WelcomePage/WelcomePage";
import Header from '../Header/Header';
import { useHistory, useLocation } from "react-router-dom";

const PassForm = React.forwardRef((props, ref) => {

  let history = useHistory();

  function getDate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0
    var yyyy = today.getFullYear();

    today = dd + "-" + mm + "-" + yyyy;

    return today;
  }

    return (
      <div ref={ref} style={{margin:"40px"}}>
      <table border="0">
         <tr>
            <th colSpan="15">&nbsp;</th>
         </tr>

         <tr>
            <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;</td>
            <td colSpan="4">{props.pass.name}</td>
            <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;</td>
            <td colSpan="5">{props.pass.name}</td>
            <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;</td>
         </tr>

         <tr>
            <td colSpan="2">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</td>
            <td colSpan="3">{props.pass.dob}</td>
            <td>&nbsp; &nbsp; &nbsp; &nbsp;</td>
            <td>&nbsp; &nbsp; &nbsp; &nbsp;</td>
            <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;</td>
            <td>{props.pass.age}</td>
            <td>&nbsp; &nbsp; &nbsp; &nbsp;</td>
            <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</td>
            <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;</td>
         </tr>

         <tr>
            <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;</td>
            <td colSpan="4">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;</td>
            <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;</td>
            <td colSpan="5">{props.pass.dob}</td>
            <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;</td>
         </tr>

         <tr>
            <th colSpan="15">&nbsp;</th>
         </tr>

         <tr>
            <th colSpan="15">&nbsp;</th>
         </tr>

         <tr>
            <th colSpan="15">&nbsp;</th>
         </tr>

         <tr>
            <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;</td>
            <td colSpan="2">{props.pass.duration}</td>
            <td colSpan="2" rowSpan="2">{props.pass.destination}</td>
            <td colSpan="4">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;</td>
            <td colSpan="1">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;</td>
            <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;</td>
         </tr>

         <tr>
            <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;</td>
            <td colSpan="2">{props.pass.class}</td>
            <td colSpan="4">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;</td>
            <td colSpan="2">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;</td>
            <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;</td>
         </tr>

         <tr>
            <th colSpan="15">&nbsp;</th>
         </tr>

         <tr>
            <th colSpan="15">&nbsp;</th>
         </tr>

         <tr>
            <th colSpan="15">&nbsp;</th>
         </tr>

         <tr>
            <th colSpan="15">&nbsp;</th>
         </tr>

         <tr>
            <th colSpan="15">&nbsp;</th>
         </tr>

         <tr>
            <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;</td>
            <td colSpan="5">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;</td>
            <td colSpan="1" rowSpan="3">{props.pass.duration}</td>
            <td colSpan="1" rowSpan="3">{props.pass.source}</td>
            <td colSpan="1" rowSpan="3">{props.pass.destination}</td>
            <td rowSpan="3">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;</td>
            <td rowSpan="3">{props.pass.class}</td>
         </tr>

         <tr>
            <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;</td>
            <td colSpan="5">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;</td>
            <td colSpan="1">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;</td>
         </tr>

         <tr>
            <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;</td>
            <td colSpan="5">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;</td>
            <td colSpan="1">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;</td>
         </tr>

         <tr>
            <th colSpan="15">&nbsp;</th>
         </tr>

         <tr>
            <th colSpan="15">&nbsp;</th>
         </tr>

         <tr>
            <th colSpan="15">&nbsp;</th>
         </tr>

         <tr>
            <th colSpan="15">&nbsp;</th>
         </tr>

         <tr>
            <th colSpan="15">&nbsp;</th>
         </tr>

         <tr>
            <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;</td>
            <td colSpan="4">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;</td>
            <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;</td>
            <td colSpan="5">{props.pass.destination}</td>
            <td>{props.pass.source}</td>
         </tr>

         <tr>
            <th colSpan="15">&nbsp;</th>
         </tr>

         <tr>
            <th colSpan="15">&nbsp;</th>
         </tr>

         <tr>
            <th colSpan="15">&nbsp;</th>
         </tr>

         <tr>
            <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;</td>
            <td colSpan="4">{getDate()}</td>
            <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;</td>
            <td colSpan="5">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;</td>
            <td>{getDate()}</td>
         </tr>

      </table>
      </div>
    );
});

export default PassForm;
