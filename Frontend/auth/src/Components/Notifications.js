import React ,{useState}from 'react';
import Dashboard from './Dashboard';
import axios from 'axios';

function Notification(){

    const[nid,setNid]=useState();
    const[branch,setBranch]=useState();
    const[date,setDate]=useState();
    const[text,setText]=useState();
    const[cid,setCid]=useState();
    const handleNid=(e)=>{
       setNid(e.target.value);
    }
    const handleBranch=(e)=>{
       setBranch(e.target.value);
    }
    const handleText=(e)=>{
        setText(e.target.value);
    }
    const handleCreator=(e)=>{
        setCid(e.target.value);
    }
    const handleDate=(e)=>{
        setDate(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Create an object with the state variables
        const postData = {
          nid,
          branch,
          text,
          cid,
          date
          
        };
    
        try {
          const response = await axios.post('http://localhost:5000/auth/Notification', postData);
          console.log('Response:', response.data);
        } catch (error) {
          console.error('Error:', error);
        }
      };
    





return(
    <>
    <Dashboard/>
    <div className='container'>
        <form onSubmit={handleSubmit}>
            <div class="mb-3">
            <label  class="form-label">Notification Id</label>
            <input type="number" class="form-control" id="exampleFormControlInput1" onChange={handleNid}/>
            </div>
            <select class="form-select" aria-label="Default select example" onChange={handleBranch}>
             <option selected>Select Branch</option>
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="IT">IT</option>
            </select>
            <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Notification Text</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={handleText}></textarea>
            </div>
            <div class="mb-3">
            <label for="" class="form-label">Creator ID</label>
            <input type="number" class="form-control" id="exampleFormControlInput1"  onChange={handleCreator}/>
            </div>
            <div class="mb-3">
                <label for="dateInput">Select Date</label>
                <input type="date" class="form-control" id="dateInput" name="date" onChange={handleDate}/>
            </div>
            <button type="submit" class="btn btn-primary" >Submit</button>
       </form>

    </div>
    </>
)
}

export default Notification;
