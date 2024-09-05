import React, { useState } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';
import '../Styles/AttendanceReport.css'

const AttendanceReport = () => {
  const [section, setSection] = useState('');
  const [date, setDate] = useState('');

  const handleDownload = async () => {
    try {
      const response = await axios.get('http://localhost:5000/auth/api/generate-pdf', {
        params: { section, date },
        responseType: 'blob', 
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `attendance_${section}_${date}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading the PDF:', error);
    }
  };

  return (
    <div>
      <Dashboard/>
      <h3 className='header-styles'>Generate Attendance Report</h3>
        <div className="centered-form">
      <div className='form-container'>

      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <select class="form-select custom-styles-select" aria-label="Default select example" onChange={(e) => setSection(e.target.value)}>
        <option selected>Select Section</option>
        <option value="Section A">Section A</option>
        <option value="Section B">Section B</option>
        <option value="Section C">Section C</option>
        <option value ="Section D">Section D</option>
    </select>
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button type="submit" onClick={handleDownload}>
          Download PDF
        </button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default AttendanceReport;
