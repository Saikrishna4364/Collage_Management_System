import '../Styles/Dashboard.css'
import { Link } from 'react-router-dom';
import React from 'react';
import {BrowserRouter, Routes, Route, useNavigate,Switch} from 'react-router-dom';
import Managestudents from './Managestudents';
import {Markattendence} from './Markattendence';
import Attendencesheet from './Attendencesheet';
import Login from './Login';
import Getattendence from './Getattendence';
import FrontPage from './FrontPage';

function Dashboard(){

    return(
       <>
       <nav className="navbar navbar-expand-lg navbar-light bg-dark">
  <Link className="navbar-brand text-white" to="#">IMS</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <Link className="nav-link text-white " to="/dashboard/FrontPage">Home <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to=""></Link>
      </li>
      {/* <li className="nav-item">
        <Link className="nav-link" to="">Pricing</Link>
      </li> */}
      <li className="nav-item dropdown">
        <Link className="nav-link dropdown-toggle text-white p-2" to="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Students
        </Link>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <Link className="dropdown-item" to="/dashboard/Managestudents">Manage Students</Link>
          <Link className="dropdown-item" to="/dashboard/Markattendence/">Mark Attendence</Link>
          <Link className="dropdown-item" to="/dashboard/Getattendence">Get Attendence</Link>
          <Link className="dropdown-item" to="/dashboard/AttendanceReport">Get Report</Link>
        </div>
      </li>
      <li className="nav-item dropdown">
        <Link className="nav-link dropdown-toggle text-white" to="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Management
        </Link>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <Link className="dropdown-item" to="/dashboard/Notifications">Create Notification</Link>
          <Link className="dropdown-item" to="/dashboard/RegSubjects">Register Subjects</Link>
          <Link className="dropdown-item" to="/dashboard/PostMarks">Post Marks</Link>

        </div>
      </li>
    </ul>
  </div>
</nav>
   
 
       </>
    )
}
export default Dashboard;