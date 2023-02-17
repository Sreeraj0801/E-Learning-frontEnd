import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';
import { Navigate,useNavigate,Link } from "react-router-dom";

import './Login.css'
function Login() {
    //navigation 
    const navigate = useNavigate();
  //const [cookies] = useCookies(['adminToken']);
  //for managing username and password
  const [values,setValues] = useState({
    username:"",
    password:""
  })

  function changeValue(e){
    setValues({...values,[e.target.name]:e.target.value})
  }

  //-----------toas for error handlin ----
  const generateError = (err) => toast.error(err,{
    position:'top-right',
  })
  //--------handle submit-----------------
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.post('http://localhost:4000/admin',{...values},{withCredentials:true});
      if(data.created){ 
        navigate('/admin/home')
      }else{
        generateError(data)
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <div className='outline'>
        <>
        <p id='heading'>Admin Login</p>
        <form onSubmit={handleSubmit}>
          <div className='emailDiv'>
            <label htmlFor="Email">Email</label>
            <input 
            type="email"
            name='username'
            value={values.username}
            onChange={(e)=>{changeValue(e)}}
            placeholder='email'
             />
          </div>
          <div className='emailDiv'>
            <label  htmlFor="password">Password</label>
            <input 
            type="password"
            name='password'
            onChange={(e)=>{changeValue(e)}}
            value={values.password}
            placeholder='password' />
          </div>
          <div className="d-flex justify-content-center">
        <button 
        className="btn btn-success btn-lg">
          Submit</button>
          </div>
        </form>
        </>
      </div>
          <ToastContainer/>
          <div>
    </div>
    </div>
  )
}

export default Login
