import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Managestudents from './Components/Managestudents';
import {Markattendence} from './Components/Markattendence';
import Attendencesheet from './Components/Attendencesheet';
import Getattendence from './Components/Getattendence';
import AttendanceReport from './Components/AttendanceReport';
import FrontPage from './Components/FrontPage';
import Notifications from './Components/Notifications';
import RegSubjects from './Components/RegSubjects';
import PostMarks from './Components/PostMarks';

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path='/dashboard/FrontPage' element={
          <FrontPage/>
      }></Route>
       <Route path="/dashboard/Managestudents" element={<Managestudents/>}></Route>
       <Route path="/dashboard/Markattendence" element={<Markattendence/>}></Route>
       <Route path="/Markattendence/Attendencesheet/:section" element={<Attendencesheet/>}></Route>
       <Route path="/dashboard/Getattendence" element={<Getattendence/>}></Route>
       <Route path="/dashboard/AttendanceReport" element={<AttendanceReport/>}></Route>
       <Route path="/dashboard/Notifications" element={<Notifications/>}></Route>
       <Route path="/dashboard/RegSubjects" element={<RegSubjects/>}></Route>
       <Route path="/dashboard/PostMarks" element={<PostMarks/>}></Route>




     </Routes>
      
    </BrowserRouter>
  );
}

export default App;
