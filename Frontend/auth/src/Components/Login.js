import React,{useState} from 'react';
import axios from 'axios';
import '../Styles/Login.css';
import { useNavigate } from 'react-router-dom';
const Login=()=>{
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:5000/auth/adminlogin', values)
        .then(result => {
            if(result.data.loginStatus) {
                localStorage.setItem("valid", true)
                navigate('/dashboard/FrontPage')
            } else {
                setError(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }
    return (
        <div className='back-ground'>
        <div className="container-fluid">
        <div className="d-flex  row justify-content-center align-items-center vh-100 border-2 border-white">
            
            <form onSubmit={handleSubmit} className="bg-white p-5">
            <div>
                <h1 className='text-black'>LOGIN</h1>
            </div>
                <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                     onChange={(e) => setValues({...values, email : e.target.value})}/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                    onChange={(e) => setValues({...values, password : e.target.value})}/>
                </div>
  
                    <button type="submit" className="btn btn-primary">Login</button>
            </form>
            </div>
            
        </div>
        </div>
    )
};

export default Login ;