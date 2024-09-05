import React,{createContext}from "react";
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import axios from 'axios';
import '../Styles/Attendencesheet.css'

const Attendencesheet=()=>{
const {section}=useParams();

const [rollNumbers, setRollNumbers] = useState([]);
const[selectHour,setHour]=useState('');
const[selectDate,setDate]=useState('');
  const [selectedRollNumbers, setSelectedRollNumbers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/auth/Markattendence/'+section)
        .then(result => {
            if(result.data.Status) {
                setRollNumbers(result.data.Result);
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
      }, [section]);

      const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
          setSelectedRollNumbers((prevSelected) => [...prevSelected, value]);
        } else {
          setSelectedRollNumbers((prevSelected) =>
            prevSelected.filter((rollNumber) => rollNumber !== value)
          );
        }
      };

      const handleClick=(e)=>{
        setHour(e.target.value);
      }
      const handleClickTime=(e)=>{
        setDate(e.target.value);
      }
      const handleSubmit = async () => {
        const absentees = rollNumbers.filter(rollNumber => !selectedRollNumbers.includes(rollNumber.studentRollno));
        try {
          const response = await axios.post('http://localhost:5000/auth/Attendencesheet/'+section, {
            presentees: selectedRollNumbers,
            absentees: absentees.map(rollNumber => rollNumber.studentRollno),
            hours:selectHour,
            dates:selectDate
          });
          alert("Attendence marked successfully");
        window.location.reload();
        } catch (error) {
          console.error('Error submitting attendance:', error);
        }
      };
    
    

    return(
        <>
        <h3>Mark attendence for {section}</h3>
        <div className='grid-container'>
        {rollNumbers.map((rollNumber) => (
          <li key={rollNumber.studentRollno}>
            <input
              type="checkbox"
              value={rollNumber.studentRollno}
              checked={selectedRollNumbers.includes(rollNumber.studentRollno)}
              onChange={handleCheckboxChange}
            />
            {rollNumber.studentRollno}
          </li>
        ))}
         <div>
      <select className="form-select" aria-label="Default select example" onChange={handleClick}>
        <option selected>Open this select menu</option>
        <option value="1">1st hour</option>
        <option value="2">2cond hour</option>
        <option value="3">3rd hour</option>
      </select>
      </div>
      <div>
      <label for="datetime">Select Date and Time:</label>
      <input type="datetime-local" id="datetime" name="datetime" onChange={handleClickTime}/>

      </div>
      <div>
       <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Submit Attendence</button>
      </div>
     </div>
<p>Selected Roll Numbers: {selectedRollNumbers.join(', ')}</p>
    </>
    )
}
export default Attendencesheet;
