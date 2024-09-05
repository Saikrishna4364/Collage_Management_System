import React,{useState} from 'react';
import Dashboard from './Dashboard';
import axios from 'axios';
import { useEffect } from "react";



const PostMarks=()=>{
    const[section,setSection]=useState('');
const[examType,setExamType]=useState('');
const [data, setData] = useState([]);
    const [editedData, setEditedData] = useState([]);

const handleSection=(e)=>{
 setSection(e.target.value);
}
const handleExam=(e)=>{
    setExamType(e.target.value);
}
useEffect(() => {
    
      // Define query parameters
      const params = {
        section,
        examType,
      };

      axios.get('http://localhost:5000/auth/PostMarks', { params })
        .then(response => {
            setData(response.data);
                setEditedData(response.data.map(row => ({ ...row })));
        })
        .catch(error => {
          console.error('There was an error fetching the student data!', error);
        });
    }, [section, examType]);
    const handleInputChange = (e, index, key) => {
        const newData = [...editedData];
        newData[index][key] = e.target.value;
        setEditedData(newData);
    };



    const handleSubmit = () => {
        console.log(editedData);
        axios.post('http://localhost:5000/auth/UpdateMarks', editedData)
            .then(response => {
                console.log('Data saved successfully:', response.data);
            })
            .catch(error => {
                console.error('There was an error saving the data!', error);
            });
    };

    return(
        <>
        <Dashboard/>
        <div className="container mt-5">
        <select class="form-select form-control-lg mb-2" aria-label="Default select example" onChange={handleSection}>
            <option selected>Select Section</option>
            <option value="Section A">Section A</option>
            <option value="Section B">Setion B</option>
            <option value="Section C">Section C</option>
        </select>
        <div>
        <select class="form-select form-control-lg" aria-label="Default select example" onChange={handleExam}>
            <option selected>Type of exam</option>
            <option value="week">Weekly Test</option>
            <option value="Mid">Mid Term</option>
            <option value="Sem">Semister</option>
        </select>
        </div>
        </div>
        <div>
        <table>
            <thead>
                <tr>
                    <th>Roll Number</th>
                    <th>Section</th>
                    <th>Exam Type</th>
                    <th>AI & ML</th>
                    <th>Computer Networks</th>
                    {/* Add more subject headers if needed */}
                </tr>
            </thead>
            <tbody>
                {editedData.map((row, index) => (
                    <tr key={row.student_rollno}>
                        <td>{row.student_rollno}</td>
                        <td>{row.student_section}</td>
                        <td>{row.test_type}</td>
                        <td>
                            <input
                                type="number"
                                value={row.AI|| ''}
                                onChange={(e) => handleInputChange(e, index, 'AI')}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                value={row.CNN || ''}
                                onChange={(e) => handleInputChange(e, index, 'CNN')}
                            />
                        </td>
                        {/* Add more subject fields if needed */}
                    </tr>
                ))}
            </tbody>
            <button onClick={handleSubmit}>Save Data</button>
        </table>
        </div>

        </>
    )
}

export default PostMarks;

