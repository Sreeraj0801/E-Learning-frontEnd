import React,{useState,useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Register() {
  const navigate = useNavigate();
  //-------------------------------------------------------------------
  const [values,setValues] = useState({
    uname:'',
    email:'',
    mobile:'',
    course:'',
    pword:'',
  });

  //------------------------------------------------------------------------
  function changeValue(e) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
//---------------------------------------------------------------------------
const [courses,setCourses] = useState([]);
  //-----------toas for error handling ---------------------
  const generateError = (err) => toast.error(err, {
    position: 'top-right',
  })
  //-----------------------------------------------------------------
  useEffect(()=>{
    axios.get('http://localhost:4000/course/',{withCredentials:true}).then(data => {console.log(data.data.details); setCourses(data.data.details)})
    .catch(error => console.log(error))
  },[])
  //---------------------------------------------------------------------------
  const handleSubmit = async (e)=>{
    try {
      e.preventDefault();
      console.log(values);
      if (!values.uname) generateError("Please provide a User Name")
      else if (!values.email) generateError("Please provide a Email")
      else if (!values.course) generateError("Please select a course")
      else if (!values.mobile) generateError("Please provide a mobile number");
      else if (!values.pword) generateError("Password is mandatory");
      else{
        const { data } = await axios.post('http://localhost:4000/register', { ...values },{withCredentials:true});
        if (data.created) navigate('/');
        else generateError(data.message)
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="d-flex justify-content-center mt-3 ">
      <div className="card card-Register border-danger col-md-6 ">
        <div className="card-body card-body-Register">
        <h2 className="text-center mt-4">REGISTER</h2>
        <h4 className="text-center text-primary mb-4 ">E-LEARNING</h4>
          <form className="ms-5" onSubmit={handleSubmit}>
            <div className="mb-3 d-flex col-md-6">
              <h5 className="col-md-6 mt-2">username</h5>
              <input
                type="text"
                className="form-control col-md-5 border-dark"
                id="username"
                name="uname"
                onChange={changeValue}
              />
            </div>
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
              <h5 className="col-md-6 mt-2">Phone </h5>
              <input
                type="number"
                className="form-control col-md-5 border-dark"
                name="mobile"
                onChange={changeValue}
              />
            </div>
            <div className="mb-3 d-flex col-md-6 mt-4">
              <h5 className="col-md-5 me-2 mt-2">Course</h5>
              <div className="col-md-12 ms-3">
                <select
                  className="form-select border-dark"
                  aria-label="Default select example"
                  name="course"
                  onChange={changeValue}
                  value={values.course}
                >
                  <option > select a course</option>
                  {
                    courses.map((course)=>{
                      return(<option id={course._id} value={course.name}>{course.name}</option>)
                    })
                  }
                </select>
              </div>
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
            <div className="text-center mb-4">
              <button type="submit" className="btn btn-primary border-dark">
                Register
              </button>
            </div>
            <div className="text-end me-5 col-md-9">
              <Link to="/">Already registerd ? Login </Link>
            </div>
          </form>
          <ToastContainer/>
        </div>
      </div>
    </div>
  );
}

export default Register;
