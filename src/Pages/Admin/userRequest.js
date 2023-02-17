import React, { useState ,useEffect} from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import { Link } from "react-router-dom";
function UserManage() {
    const [users,setUsers] = useState([]);
    const approveUser = (userId) => {
        try {
            axios.put('http://localhost:4000/admin/user/approve',{userId},{withCredentials:true}).then(data => {
                setUsers(
                    users.filter((user)=>{
                if(user._id !== userId){return user}}))
        }).catch((err)=>console.error(err))
        } catch (error) {
            
        }
    }
    useEffect(() => {
        axios.get('http://localhost:4000/admin/user/request',{withCredentials:true}).then(data => {
            setUsers(data.data);
        }).catch((err)=>console.error(err))},[])
  return (
    <div>
      <Navbar />
      <div className="mt-5 ">.</div>
      <div class="card m-5 ">
        <div className="card-body">
          <h3 className="text-center text-primary my-4">List of user requests</h3>
          <div className="card">
            {
                users.map((user,index)=>{
                    return(
                        <div className="card-body " key={user._id}>
                        <div className="d-md-flex justify-content-between col-md-10 ">
                            <h5 className="ms-md-5 text-danger">{index+1}  . {user.uname}</h5>
                            <h5>{user.email}</h5>
                            <h5>+91 &nbsp; {user.mobile}</h5>
                            <h2 class="bi bi-check-circle-fill text-success"  onClick={()=>{approveUser(user._id)}}></h2>
                        </div>
                        </div>
                    )
                })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserManage;
