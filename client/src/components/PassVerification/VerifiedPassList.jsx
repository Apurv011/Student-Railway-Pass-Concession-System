import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import Header from '../Header/Header';
import { saveAs } from "file-saver";
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import PassForm from "../PassForm/PassForm";


function VerifiedPassList(props){

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  function saveFile(url, file_name){
    saveAs(
      url,
      file_name
    );
  };

  return (
    <tbody>
      <tr className="table-info">
        <td rowspan={props.pass.collegeID}>
          <b>{props.pass.collegeID}</b>
        </td>
        <td rowspan={props.pass.name}>
          <b>{props.pass.name}</b>
        </td>
        <td rowspan={props.pass.email}>
          <b>{props.pass.email}</b>
        </td>
        <td rowspan={props.pass.contactNo}>
          <b>{props.pass.contactNo}</b>
        </td>
        <td rowspan={props.pass.age}>
          <b>{props.pass.age}</b>
        </td>
        <td rowspan={props.pass.gender}>
          <b>{props.pass.gender}</b>
        </td>
        <td rowspan={props.pass.source}>
          <b>{props.pass.source}</b>
        </td>
        <td rowspan={props.pass.destination}>
          <b>{props.pass.destination}</b>
        </td>
        <td rowspan={props.pass.class}>
          <b>{props.pass.class}</b>
        </td>
        <td rowspan={props.pass.duration}>
          <b>{props.pass.duration}</b>
        </td>
        <td>
          <button
            onClick={()=>{saveFile(`http://localhost:5000/${props.pass.collegeIDImage}`, `${Date.now()}.${props.pass.collegeIDImage.split('.').at(-1)}`)}}
            className="btn btn-sm btn-dark"
            >
              Download
          </button>
        </td>
        <td>
        <div style={{ display: "none" }}>
          <PassForm ref={componentRef} pass={props.pass}/>
        </div>
        <ReactToPrint
          trigger={() =>
            <button type="button" className="btn btn-sm btn-dark">
              Print
            </button>
            }
          content={() => componentRef.current}
        />
        </td>
      </tr>
    </tbody>
  );
}

export default VerifiedPassList;
