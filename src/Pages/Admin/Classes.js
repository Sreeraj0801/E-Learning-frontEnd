import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Classes() {
   //----------------state for stoting classes ---------
   const [classes,setClasses] = useState([]);
   const [date,setDate] = useState()
   const [original,setOriginal] = useState([]);
  //------------fuction for changing the date ----------------
  function parseDate(date){
    date = new Date(date)
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return (`${day}/${month}/${year}`)
    }
    
  const handleDateChange = async (e) => {
    let a = await parseDate(e.target.value);
    setDate(a)
  };
  useEffect(()=>{
  setOriginal(
  classes.filter((item)=>{    
  if(item.formatDate == date)
  {
    return item
  }
}))
  },[date])

   useEffect(()=>{
    axios.get('http://localhost:4000/admin/class',{withCredentials:true}).then(data => {setClasses(data.data.details); setOriginal(data.data.details)})
    .catch(error => console.log(error))
  },[])
  return (
    <div>
      <Navbar />
      <div className="mt-3">..</div>
      <div className="card mt-5">
        <div className="card-body">
          <h2 className="text-center text-primary">List of Classes</h2>
        </div>
        <div>
          <div className="card m-3 bg-light">
            <div className="card-body">
              <div className="d-flex justify-content-end">
                <Link className="bi bi-plus-circle-fill mt-2" to="/admin/classes/add"></Link>
                <Link className="nav-link" to="/admin/classes/add">schedule new  class</Link>
              </div>
              <div className="d-flex col-md-3">
                <h5 className="ms-5 col-md-4">Date : </h5>
                <input type="date" className="form-control " 
                onChange={handleDateChange}/>
              </div>
              <div className="row m-md-4 " >
                {original[0]? <h4 className="text-center text-success">List of classes on {date}</h4>:<h4 className="text-center text-danger">No classes available on {date}</h4>}
              {
                original.map((item,index)=>{
                  return(
                    <div className="card m-md-4 " key={item._id}>
                    <div className="card-body">
                      <h3>{index+1}.&nbsp;   &nbsp;{item.chapterName}</h3>
                      <div>
                        <p className="text-success ms-5">{item.discription}</p>
                      </div>
                      <div className="d-md-flex justify-content-center">
                        <h5 className="text-warning me-5">On : <span className="text-dark">{item.formatDate}</span></h5>
                        <h5 className="ms-md-5">Course : <span className="text-primary">{item.courseName}</span></h5>
                        <h5 className=" ms-md-5"> No of Seats : <span className="text-danger">{item.seats}</span></h5>
                      </div>
                    </div>
                  </div>
                  )
                })
              }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Classes
