import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Chapter() {
  //----------------state for stoting classes ---------
  const [chapters, setChapters] = useState([]);
  const [original,setOriginal] = useState([]);
  const [courses, setCourses] = useState([]);
  const [value, setValues] = useState(null);
//------------------------------------------------------
  const handleSelectionChange = async (event) => {
    setValues(event.target.value);
  };
  //-----------------------------------------------------
  const deleteChpater = (id) => {
    try {
      axios.delete('http://localhost:4000/admin/chapter/delete', {data:{id}})
      .then(() => {
        setOriginal(
          original.filter((chapter)=>{
      if(chapter._id !== id){return chapter}}))
    })
      .catch(error =>console.log(error))
    } catch (error) {console.error(error)}
  }


  //---------------------------------------------------------------
  useEffect(()=>{
    setOriginal(
      chapters.filter((chapter) => {
        if (chapter.courseName === value) {
          return chapter;
        }
      })
    );
  },[original])
  //---------------------------------------------------------------
  useEffect(() => {
    axios.get("http://localhost:4000/admin/chapter", { withCredentials: true }).then((data) => {
        setChapters(data.data.details);
      })
      .catch((error) => console.log(error));
    //to get couses
    axios
      .get("http://localhost:4000/admin/course/", { withCredentials: true })
      .then((data) => {
        setCourses(data.data.details);
      })
      .catch((error) => console.log(error));
  }, []);
  //------------------------------------------------------------------------------
  return (
    <div>
      <Navbar />
      <div className="mt-3">..</div>
      <div className="card mt-5">
        <div className="card-body">
          <h2 className="text-center text-primary">Chapters</h2>
        </div>
      </div>
      <div className="card bg-light m-5">
        <div className="card-body">
          <h4 className="text-center text-success">Select a course</h4>
          <div className="d-flex justify-content-end">
                <Link className="bi bi-plus-circle-fill mt-2" to="/admin/chapter/add"></Link>
                <Link className="nav-link" to="/admin/chapter/add">add new chapter</Link>
              </div>
          <div className="text-center">
          <select className="form-select-md  p-3 text-center border-danger col-6" onChange={handleSelectionChange}>
            <option selected>Select A course</option>
            {courses.map((course) => {
              return (
                <option key={course._id} value={course.name} name={course.name}>
                  <span>{course.name}</span>
                </option>
              );
            })}
          </select>
          </div>
        </div>
      </div>

      <div class="card m-5 bg-light">
        <div class="card-body">
          {original[0] ? (
            <h4 className="text-center mt-5">List of chapters</h4>
          ) : (
            <h4 className="text-center mt-5 text-danger">
              No classes available for  {value?<span className="text-warning">{value}</span>:"this"} course
            </h4>
          )}
          <div  className="">
          {original.map((chapter,index) => {
            return (
              <div>
                <div class="card mt-5 ">
                  <div class="card-body d-flex"><h3>{index+1}. <span className="text-primary">{chapter.chapterName}</span></h3></div>
                  <div className="ms-4">&nbsp;&nbsp;{chapter.discription}</div>
                  <div className="d-flex justify-content-center bg-light p-2">
                    <h5 className="bi bi-pencil-square text-warning me-5" ></h5>
                    <h5 className="bi bi-trash-fill text-danger"></h5>
                    </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chapter;
