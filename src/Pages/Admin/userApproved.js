import React, { useState ,useEffect} from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import { Link } from "react-router-dom";
function UserApproved() {
    const [users,setUsers] = useState([]);
    const approveUser = (userId) => {
        try {
            axios.get('http://localhost:4000/admin/user/approve',{userId},{withCredentials:true}).then(data => {
                setUsers(
                    users.filter((user)=>{
                if(user._id !== userId){return user}}))
        }).catch((err)=>console.error(err))
        } catch (error) {
            
        }
    }
    useEffect(() => {
        axios.get('http://localhost:4000/admin/user/approved',{withCredentials:true}).then(data => {
            setUsers(data.data);
        }).catch((err)=>console.error(err))},[])
  return (
    <div>
      <Navbar />
      <div className="mt-5 ">.</div>
      <div class="card m-5 ">
        <div className="card-body">
          <h3 className="text-center text-primary my-4">List of aprroved user</h3>
          
            {
                users.map((user,index)=>{
                    return(
                        <div className="card mt-5">
                        <div className="card-body " key={user._id}>
                        <div className="d-md-flex justify-content-between col-md-10 ">
                            <h5 className="ms-md-5 text-danger">{index+1}  . {user.uname}</h5>
                            <h5>{user.email}</h5>
                            <h5>+91 &nbsp; {user.mobile}</h5>
                        </div>
                        </div>
                        </div>
                    )
                })
            }
          
        </div>
      </div>
    </div>
  );
}

export default UserApproved;
