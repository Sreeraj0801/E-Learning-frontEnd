import React,{useEffect,useState} from "react";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";

function Classes() {
  return (
    <div>
      <Navbar/>
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
                <Link className="nav-link" to="/admin/classes/add">Add class</Link>
            </div>
          </div>
          </div>
          </div>
        </div>
    </div>
  )
}

export default Classes
