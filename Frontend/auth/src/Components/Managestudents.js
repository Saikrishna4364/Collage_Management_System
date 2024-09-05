import axios from "axios";
import Dashboard from "./Dashboard";
import React from "react";
import {useState} from 'react';
const Managestudents=()=>{
    const [student, setStudent] = useState({
        studentName: "",
        studentRollno: "",
        studentEmail: "",
        studentSection: "",
      });
      const handleSubmit = (e) => {
        e.preventDefault()
          const studentData={
        studentName:student.studentName,
            studentRollno:student.studentRollno,
            studentEmail:student.studentEmail,
            studentSection:student.studentSection
          }
    
        axios.post('http://localhost:5000/auth/Managestudents', studentData)
        .then(result => {
            if(result.data.Status) {
                alert("Student added sucessfully");
                
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
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
                    <label for="StudentName">Name</label>
                    <input 
                    type="text" 
                    class="form-control" 
                    id="studentName"
                     placeholder="name"
                     onChange={(e) =>
                        setStudent({ ...student, studentName: e.target.value })
                      }
                     />
                </div>
                <div class="form-group">
                    <label for="StudentRoll">Roll NO</label>
                    <input 
                    type="text" 
                    class="form-control" 
                    id="studentRollno" 
                    placeholder="add-rollno"
                    onChange={(e) =>
                        setStudent({ ...student, studentRollno: e.target.value })
                      }/>
                </div>
                <div class="form-group">
                    <label for="studentEmail">Email address</label>
                    <input 
                    type="email" 
                    class="form-control" 
                    id="studentEmail"
                     placeholder="name@example.com"
                     onChange={(e) =>
                        setStudent({ ...student, studentEmail: e.target.value })
                      }/>
                </div>
                <div class="form-group">
                    <label for="selectSection">Example select</label>
                    <select class="form-control" id="selectSection"
                    onChange={(e) =>
                        setStudent({ ...student, studentSection: e.target.value })
                      }>
                        <option selected>Open this select menu</option>
                        <option>Section A</option>
                        <option>Section B</option>
                        <option>Section C</option>
                        <option>Section C</option>
                        <option>Section D</option>
                    </select>
                </div>
                <div class="form-group">
                <button type="submit" class="btn btn-primary">Sign in</button>
                </div>
            </form>
            </div>
        </div>
        
    </>
    )
}

export default Managestudents;