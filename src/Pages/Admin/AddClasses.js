import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddClasses() {
  const navigate = useNavigate();
  //----------------state for storing courses--------------
  const [courses, setCourses] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [ogChapter,setOgChapter] = useState([]);
  //-----------------states for storing details------------
  const [values, setValues] = useState({
    className: "",
    date: "",
    courseName: "",
    seats: ""
  })

  //------------fuction for changing the value----------------
  function changeValue(e) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  //------------fuction for changing the date ----------------
  const handleDateChange = (e) => {
    if(new Date((e.target.value)) <= new Date())alert("Please select a valid day")
    else setValues({ ...values, date: e.target.value });
    console.log(values);

  };

  //------------fuction for changing the course---------------
  function changeCourse(e) {
    setValues({ ...values, courseName: e.target.value });
    console.log(values);
  };
  useEffect(()=>{
    setOgChapter(
      chapters.filter((item)=>{    
      if(item.courseName == values.courseName)
      {
        return item
      }
    }))
  },[values])

  function changeChapter(e) {
    setValues({ ...values, chapterName: e.target.value });
    console.log(values);
  };

  //---------------------- for getting courses--------------------
  useEffect(() => {
    axios.get('http://localhost:4000/admin/course/',{withCredentials:true}).then(data => {
      setCourses(data.data.details);
    })
      .catch(error => console.log(error))

      axios.get("http://localhost:4000/admin/chapter", { withCredentials: true }).then((data) => {
        setChapters(data.data.details);
      })
      .catch((error) => console.log(error));
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
      if (!values.courseName) generateError("Please provide a courseName")
      else if (!values.chapterName) generateError("Please provide a chapterName")
      else if (!values.date) generateError("Please provide a date")
      else if (!values.seats) generateError("No of seats are mandatory")
      else if (!values.courseName == 'default') generateError("Course Name are mandatory")
      else {
        const { data } = await axios.post('http://localhost:4000/admin/class/create', { ...values },{withCredentials:true});
        if (data.created) navigate('/admin/classes');
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
            <h2 className="text-center text-primary">Schedule  New  Class</h2>
          </div>
        </div>
        <div class="card  m-3">
          <div class="card-body">
            <div>
              <form onSubmit={handleSubmit}>
                <div className='d-flex col-md-10 mt-4'>
                  <label for="seats" className='col-md-3 text-primary'>No of seats</label>
                  <input type="number"
                    className='form-control'
                    id='seats'
                    name='seats'
                    min='1'
                    placeholder='eg : 25'
                    value={values.seats}
                    onChange={changeValue}
                  />

                  <div className='d-flex col-md-6 ms-5'>
                    <label for="date" className='col-md-3 text-primary'>Hosting Date</label>
                    <input type="date"
                      className='form-control '
                      id='seats'
                      name='date'
                      min='1'
                      placeholder='eg : 25'
                      onChange={handleDateChange}
                      value={values.date}
                    />
                  </div>
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

                <div className='d-flex col-md-10 mt-5'>
                  <label for="chapterName" className='col-md-3 text-primary'>Select the Lesson</label>
                  <select class="form-select form-select-lg mb-3" onChange={changeChapter} value={values.chapterName}>
                    <option className='' value="default">
                      Please select a chapter
                    </option>
                    {ogChapter.map((item) => (
                      <option key={item._id} value={item.chapterName}>
                        {item.chapterName}
                      </option>
                    ))}
                  </select>
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

export default AddClasses
