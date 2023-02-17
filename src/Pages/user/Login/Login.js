import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './Login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


function Login() {
    const navigate = useNavigate();
    const [values,setValues] = useState([]);
  //------------------------------------------------------------------------
  function changeValue(e) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
//--------------------------------------------------------------------------
  const generateError = (err) => toast.error(err, {
    position: 'top-right',
  })
//-------------------------------------------------------------------------
    const handleSubmit = async (e)=>{
        try {
            e.preventDefault();
            if (!values.email) generateError("Please provide a Email")
            else if (!values.pword) generateError("Password is mandatory");
            else{
              const { data } = await axios.post('http://localhost:4000/login', { ...values },{withCredentials:true});;
              if (data.created) navigate('/home');
              else generateError(data.message)
            }
          } catch (error) {
            console.error(error);
          }
    }
  return (
    <div className="d-flex justify-content-center mt-3 ">
      <div className="card-Login card border-danger col-md-6 ">
        <div className="card-body card-body-Login">
          <h2 className="text-center my-4">LOGIN</h2>
          <h4 className="text-center text-primary mb-4 ">E-LEARNING</h4>

          <form className="ms-5" onSubmit={handleSubmit}>
            <div className="mb-3 d-flex col-md-6 mt-4">
              <h5 className="col-md-5 me-2 mt-2">email id</h5>
              <input
                type="email"
                className="form-control col-md-5"
                id="email"
                name="email"
                onChange={changeValue}
              />
            </div>
            <div className="mb-3 d-flex col-md-6 mt-4">
              <h5 className="col-md-5 me-2 mt-2">password</h5>
              <input
                type="password"
                className="form-control col-md-5"
                id="password"
                name="pword"
                onChange={changeValue}
              />
            </div>
            <div className="text-center mb-5">
              <button type="submit" className="btn btn-primary border-dark">
                Submit
              </button>
            </div>
            <div className="text-end me-5 col-md-9">
              <Link to="/register"> want to register ? Register </Link>
            </div>
          </form>
          <ToastContainer/>
        </div>
      </div>
    </div>
  )
}

export default Login
