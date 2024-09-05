import React from 'react';
import {useState} from 'react';
import { useEffect } from "react";
import axios from 'axios';
import Dashboard  from './Dashboard';
import '../Styles/Getattendence.css';
function Getattendence(){
    const[rollno,setRollno]=useState();
    const[date,setDate]=useState();
    const [students, setStudents] = useState([]);

    useEffect(() => {
        if (rollno && date) {
          // Define query parameters
          const params = {
            rollno,
            date
          };
    
          axios.get('http://localhost:5000/auth/Getattendence', { params })
            .then(response => {
                
              setStudents(response.data);
            })
            .catch(error => {
              console.error('There was an error fetching the student data!', error);
            });
        }
      }, [rollno, date]);

      const handleRollno=(e)=>{
        setRollno(e.target.value);
      }
      const handleDate=(e)=>{
        setDate(e.target.value);
      }
      const handleSubmit=(e)=>{
        e.preventDefault();
      }

return(
    <>
    <div>
        <Dashboard/>
    </div>
   <div className="container">
   <form onSubmit={handleSubmit}>
    <label for="Rollno">Enter Roll no.:</label>
    <input type="text" id="rollno" name="roll no" onChange={handleRollno}/>
    <label for="date">Select a date:</label>
    <input type="date" id="date" name="date" onChange={handleDate}/>
   </form>
   </div>
   <div>
   <table>
        <thead>
          <tr>
            <th>Roll Number</th>
            <th>Date</th>
            <th>Status</th>
            <th>hour</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.studentRollno}</td>
              <td>{student.posted_time}</td>
              <td>{student.attendence_flag}</td>
              <td>{student.posted_hour}</td>
            </tr>
          ))}
        </tbody>
      </table>
   </div>
   </>
)
}
export default Getattendence;