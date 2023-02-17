import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddChapter() {
  const navigate = useNavigate();
  //----------------state for storing courses--------------
  const [courses, setCourses] = useState([]);
  //-----------------states for storing details------------
  const [values, setValues] = useState({
    chapterName: "",
    courseName : '',
    discription: "",
  })

  //------------fuction for changing the value----------------
  function changeValue(e) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  //------------fuction for changing the course---------------
  function changeCourse(e) {
    setValues({ ...values, courseName: e.target.value });
  };

  //---------------------- for getting courses--------------------
  useEffect(() => {
    axios.get('http://localhost:4000/admin/course/',{withCredentials:true}).then(data => {
      setCourses(data.data.details);
    })
      .catch(error => console.log(error))
  }, [])
  //-----------------------------------------

  //-----------toas for error handling ---------------------
  const generateError = (err) => toast.error(err, {
    position: 'top-right',
  })


  //---------------- to handle submit function ---------------- 
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(values);
      if (!values.chapterName) generateError("chapter name is mandatory")
      else if (!values.courseName) generateError("Please provide a courseName")
      else if (!values.discription) generateError("Please provide a Discription")
      else {
        const { data } = await axios.post('http://localhost:4000/admin/chapter/create', { ...values },{withCredentials:true});
        if (data.created) navigate('/admin/chapter');
        else generateError(data.message)
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <Navbar />
      <div>
        <div className="mt-5 ">.</div>
        <div class="card mt-5">
          <div class="card-body">
            <h2 className="text-center text-primary">Add Chapter</h2>
          </div>
        </div>
        <div class="card  m-3">
          <div class="card-body">
            <div>
              <form onSubmit={handleSubmit}>
                <div className='d-flex col-md-10'>
                  <label for="name" className='col-md-3 text-primary'>Chapter name</label>
                  <input type="text"
                    className='form-control '
                    id='chapterName'
                    name='chapterName'
                    placeholder='eg : introduction for js .'
                    onChange={changeValue}
                    value={values.chapterName}
                  />
                </div>
                <div className='d-flex col-md-10 mt-5'>
                  <label for="name" className='col-md-3 text-primary'>Select the Course</label>
                  <select class="form-select form-select-lg mb-3" onChange={changeCourse} value={values.courseName}>
                    <option className='' value="default">
                      Please select a Course
                    </option>
                    {courses.map((item) => (
                      <option key={item._id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='d-flex col-md-10'>
                  <label for="name" className='col-md-3 text-primary'>Discription</label>
                  <textarea type="text"
                    className='form-control '
                    id='discription'
                    name='discription'
                    placeholder='eg : better class for learning js from scratch .'
                    onChange={changeValue}
                    value={values.discription}
                  />
                </div>
                <div className='text-center mt-5'>
                  <button className='btn btn-success '>Create Class</button>
                </div>
              </form>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddChapter
