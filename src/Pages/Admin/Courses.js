import React,{useEffect,useState} from "react";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";


function Courses() {
  const navigate = useNavigate();
  //----------------state for stoting courses ---------
  const [courses,setCourses] = useState([]);

  //--------------------- delete course ---------------
  const deleteCourse = (id) => {
    try {
      axios.delete('http://localhost:4000/admin/course/delete', {data:{id}})
      .then(() => {
        setCourses(
          courses.filter((course)=>{
      if(course._id !== id){return course}}))
    })
      .catch(error =>console.log(error))
    } catch (error) {console.error(error)}
  }

  //----------------------- Edit course -----------------
  const editCourse = (id) => {navigate('/admin/course/edit',{state:id});}
  
  useEffect(()=>{
    axios.get('http://localhost:4000/admin/course/',{withCredentials:true}).then(data => {setCourses(data.data.details);})
    .catch(error => console.log(error))
  },[])

  return (
    <div>
      <Navbar />
      <div>
        <div className="mt-5 ">..</div>
        <div className="card mt-5">
          <div className="card-body">
            <h2 className="text-center text-primary">List of courses</h2>
          </div>
        </div>
        <div className="card m-3 bg-light">
          <div className="card-body">
            <div className="d-flex justify-content-end">
                <Link className="bi bi-plus-circle-fill mt-2" to="/admin/course/add"></Link>
                <Link className="nav-link" to="/admin/course/add">Add Course</Link>
            </div>
          </div>
          <div className="row m-3">
             {courses.map((course,index)=>{
              return (
                <div className="col-sm-4 mt-3" key={course._id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title ">{index+1} . {course.name}</h5>
                    <p className="card-text">{course.discription}.</p>
                    <div className="d-flex justify-content-center bg-light p-2">
                    <h5 className="bi bi-pencil-square text-warning me-5" onClick={()=>{editCourse(course._id)}}></h5>
                    <h5 className="bi bi-trash-fill text-danger" onClick={()=>{deleteCourse(course._id)}}></h5>
                    </div>
                  </div>
                </div>
              </div>
              )
            })} 
</div>
        </div>
      </div>
    </div>
  );
}

export default Courses;
