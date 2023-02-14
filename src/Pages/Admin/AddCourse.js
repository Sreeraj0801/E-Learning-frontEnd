import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddCourse() {
    const navigate = useNavigate();
    const [values,setValues] = useState({
        name:"",
        discription:""
    })
    //fuction for changing the value
    function changeValue(e){
        setValues({...values,[e.target.name]:e.target.value})
      }

  //-----------toas for error handlin ----
   const generateError = (err) => toast.error(err,{
   position:'top-right',
   })
      //to handle submit function 
      const handleSubmit = async (e)=> {
        try {
            e.preventDefault();
            console.log(values);
            if(!values.name)generateError("course name is mandatory")
            if(!values.discription)generateError("Please provide a discription")
            else{
            const {data} = await axios.post('http://localhost:3000/admin/course/create',{...values});
            if(data.created) navigate('/admin/course');
            else generateError(data.message)
            }
        } catch (error) {
            console.error(error);
        }
      }
  return (
    <div>
        <Navbar/>
        <div>
        <div className="mt-5 ">.</div>
        <div class="card mt-5">
          <div class="card-body">
            <h2 className="text-center text-primary">Add Courses</h2>
          </div>
        </div>
        <div class="card m-3">
          <div class="card-body">
            <div>
                <form onSubmit={handleSubmit}>
                    <div className='d-flex col-md-10'>
                        <label for="name" className='col-md-3 text-primary'>Course Name</label>
                        <input type="text" 
                        className='form-control ' 
                        id='name'
                        name='name'
                        placeholder='eg : javascript'
                        value={values.name}
                        onChange={changeValue}
                        />
                    </div>
                    <div className='d-flex col-md-10 mt-5'>
                        <label  className='col-md-3 text-primary'>Discription</label>
                        <textarea type="text" 
                        className='form-control ' 
                        name='discription'
                        placeholder='eg : Discription for the class '
                        value={values.discription}
                        onChange={changeValue}
                        />
                    </div>
                    <div className='text-center mt-5'>
                    <button className='btn btn-success '>Create course</button>
                    </div>
                    <ToastContainer/>
                </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddCourse
