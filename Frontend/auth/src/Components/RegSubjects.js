import React,{useState} from 'react';
import Dashboard from './Dashboard';
import axios from 'axios';
import '../Styles/RegSubjects.css';

function RegSubjects(){
    const [sectionName, setSectionName] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [dataType, setDataType] = useState('');
  const[testType,setTestType]=useState('');
  const handleSelect=(e)=>{
    setTestType(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/auth/RegSubjects', {
        sectionName,
        subjectName,
        dataType,
        testType
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error adding subject:', error);
    }
}
    return(
        <>
        <Dashboard/>
        <h3 className="heading-styles">Register Section students to Subjects</h3>
        <div className="centered-form">
        <div className="form-container">
        <form onSubmit={handleSubmit}>
      <div>
      <select class="form-select custom-styles-select" aria-label="Default select example" onChange={(e) => setSectionName(e.target.value)}>
        <option selected>Select Section</option>
        <option value="Section A">Section A</option>
        <option value="Section B">Section B</option>
        <option value="Section C">Section C</option>
        <option value ="Section D">Section D</option>
    </select>
      </div>
      <div>
        <label>Subject Name:</label>
        <input  className='custom-styles-text'
          type="text"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Data Type:</label>
        <input className='custom-styles-text'
          type="text"
          value={dataType}
          onChange={(e) => setDataType(e.target.value)}
          required
        />
      </div>
      <select class="form-select custom-styles-select" aria-label="Default select example" onChange={handleSelect}>
        <option selected>Type of exam</option>
        <option value="week">Weekly Test</option>
        <option value="Mid">Mid Term </option>
        <option value="Lab">Lab</option>
        <option value ="Sem">Sem</option>
    </select>
      <button className='custom-styles-button' type="submit">Submit</button>
    </form>
    </div>
    </div>
</>

    );


}
export default RegSubjects;