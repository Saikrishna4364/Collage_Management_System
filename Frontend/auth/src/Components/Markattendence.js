import React,{createContext}from "react";
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import { Link } from 'react-router-dom';

import Dashboard from "./Dashboard";

import axios from 'axios';



const Markattendence=()=>{

        const[studentSection,setSection]=useState('');
      
        const handleClick = (e) => {
          setSection(e.target.value);
        };


    const handleSubmit = (e) => {
        alert("Attendence marked successfully");
        window.location.reload();
        
    
        // axios.get('http://localhost:5000/auth/Markattendence/'+section)
        // .then(result => {
        //     if(result.data.Status) {
        //         alert("attendence form is getting ready");
                
        //     } else {
        //         alert(result.data.Error)
        //     }
        // })
        // .catch(err => console.log(err))
      }
    


    return(
        <>
        <div>
            <Dashboard/>
        </div>
        <div className="container">
            <div calssName="d-flex align-items-center justify-content-center">
            <form onSubmit={handleSubmit}>
                
                <div class="form-group">
                    <label for="selectSection">select Section</label>
                    <select class="form-control" id="selectSection"
                    onChange={handleClick}>
                        <option selected>Open this select menu</option>
                        <option>Section A</option>
                        <option>Section B</option>
                        <option>Section C</option>
                        <option>Section C</option>
                        <option>Section D</option>
                    </select>
                </div>
                <div class="form-group">
                    <Link to={'/Markattendence/Attendencesheet/'+studentSection}>
                <button type="submit" class="btn btn-primary">submit</button>
                </Link>
                </div>
            </form>
            </div>
        </div>
        
    </>
        
    )
}
export {Markattendence};