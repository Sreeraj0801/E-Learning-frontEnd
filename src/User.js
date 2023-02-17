import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Register from './Pages/user/Register/Register'
import Login from './Pages/user/Login/Login'

function User() {
  return (
    <div>
      <Routes>
       <Route exact path ="/register" element={<Register/>}/>
       <Route exact path ="/" element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default User
