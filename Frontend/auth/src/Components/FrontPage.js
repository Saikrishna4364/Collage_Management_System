import React,{useState}   from 'react';
import { useEffect } from 'react';
import Dashboard from './Dashboard';
import axios from 'axios';
import '../Styles/FrontPage.css';
function FrontPage(){
    const [data1, setData1] = useState([{presentees_count : 0}]);
    const [data2, setData2] = useState([{absentees_count : 0}]);
    const [data3,setData3]=useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState([]);
    const [data4,setData4]=useState([]);
    const [data5,setData5]=useState([]);
    const [notifications,setData6]=useState([]);
    useEffect(() => {
        // Define the fetch functions
        const fetchData1 = async () => {
            try {
                const response = await axios.get('http://localhost:5000/auth/presentees/count');
                console.log(response.data);
                setData1(response.data);
            } catch (err) {
                setError(err);
            }
        };

        const fetchData2 = async () => {
            try {
                const response = await axios.get('http://localhost:5000/auth/absentees/count');
                setData2(response.data);
            } catch (err) {
                setError(err);
            }
        };
        const fetchData3 = async () => {
            try {
                const response = await axios.get('http://localhost:5000/auth/staff/count');
                setData3(response.data);
            } catch (err) {
                setError(err);
            }
        };
        const fetchData4 = async () => {
            try {
                const response = await axios.get('http://localhost:5000/auth/hod');
                setData4(response.data);
            } catch (err) {
                setError(err);
            }
        };
        const fetchData5 = async () => {
            try {
                const response = await axios.get('http://localhost:5000/auth/staff');
                setData5(response.data);
            } catch (err) {
                setError(err);
            }
        };
        const fetchData6 = async () => {
            try {
                const response = await axios.get('http://localhost:5000/auth/Notification');
                setData6(response.data);
            } catch (err) {
                setError(err);
            }
        };
        
        
         
        const fetchData = async () => {
            await Promise.all([fetchData1(), fetchData2(),fetchData3(),fetchData4(),fetchData5(),fetchData6()]);
            setLoading(false);
        };

        fetchData();
    }, []); 
    return(
        <>
        <div>
        <Dashboard/>
        </div>
        <div className="container my-4">
        <div className="row">
            
            <div className="col-md-4">
                <div className="card custom-card">
                    <div className="card-body">
                        <h5 className="card-title">Total presentess</h5>
                        <p className="card-text">{data1.map((data1, index) => (
                    <h1 key={index}>{data1.presentees_count}</h1>
                ))}</p>
                    </div>
                </div>
            </div>
           
            <div className="col-md-4">
                <div className="card custom-card">
                    <div className="card-body">
                        <h5 className="card-title">Total absentees</h5>
                        <p className="card-text">{data2.map((data2, index) => (
                    <h1 key={index}>{data2.absentees_count}</h1>
                ))}</p>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card custom-card">
                    <div className="card-body">
                        <h5 className="card-title">Total staff</h5>
                        <p className="card-text">{data3.map((data3, index) => (
                    <h1 key={index}>{data3.staff_count}</h1>
                ))}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="container">

        <div className="ui-widgets">
            <div className="ui-values">{Math.ceil(((data1[0].presentees_count)/(data1[0].presentees_count+data2[0].absentees_count))*100)}%</div>
            <div className="ui-labels">Present%</div>
        </div>
 
        <div className="ui-widgets">
            <div className="ui-values">{100-Math.ceil(((data1[0].presentees_count)/(data1[0].presentees_count+data2[0].absentees_count))*100)}%</div>
            <div className="ui-labels">absent%</div>
        </div>
        <div className="ui-widgets">
            <div className="ui-values">100%</div>
            <div className="ui-labels">Satff Present%</div>
        </div>
    </div>
    <div className='container mt-5'>
    <table className="table table-success table-striped-columns">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Department</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
          </tr>
        </thead>
        <tbody>
          {data4.map((hod, index) => (
            <tr key={index}>
              <td>{hod.staff_id}</td>
              <td>{hod.hod_name}</td>
              <td>{hod.hod_department}</td>
              <td>{hod.hod_email}</td>
              <td>{hod.hod_mno}</td>
              <td>{hod.hod_designation}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
    <div className='container mt-5'>
    <table className="table table-success table-striped-columns">
        <thead>
          <tr>
            <th>Name</th>
            <th>Id</th>
            <th>Gender</th>
            <th>Subjects</th>
            <th>Email</th>
            <th>Mobile No</th>
          </tr>
        </thead>
        <tbody>
          {data5.map((staff, index) => (
            <tr key={index}>
              <td>{staff.staff_name}</td>
              <td>{staff.staff_id}</td>
              <td>{staff.staff_gender}</td>
              <td>{staff.staff_subject}</td>
              <td>{staff.staff_email}</td>
              <td>{staff.staff_phone_number}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
    <div className="container">
    <div className="row">
      <div className="col-md-12 p-3 mb-2 bg-light border">
	  {notifications.map((notification, index) => (
       <morquee><p className="mb-0 custom_styles" key={notification.notification_id}>
		*{notification.notification_description}
		 [Posted By : - {notification.notification_department} on : {notification.posted_date}]</p></morquee>
		))}
      </div>
  
      

    </div>
    </div>

        </>
    )
}
    export default FrontPage;