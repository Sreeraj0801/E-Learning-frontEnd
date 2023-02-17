import React from 'react'
import {Routes,Route} from 'react-router-dom'

import AdminLogin from './Pages/Admin/Login/Login';
import AdminHome from './Pages/Admin/Home';
import AdminCourse from './Pages/Admin/Courses'
import AddCourse from './Pages/Admin/AddCourse';
import EditCourse from './Pages/Admin/EditCourse';
import Classes from './Pages/Admin/Classes';
import AddClasses from './Pages/Admin/AddClasses';
import Chapter from './Pages/Admin/Chapter';
import AddChapter from './Pages/Admin/AddChapter';
import UserRequest from './Pages/Admin/userRequest';
import UserApproved from './Pages/Admin/userApproved';
function Admin() {
  return (
    <div>
       <Routes>
       <Route exact path ="/admin" element={<AdminLogin/>}/>
       <Route exact path ="/admin/home" element={<AdminHome/>} />
       <Route exact path='/admin/course' element={<AdminCourse/>}/>
       <Route exact path='/admin/course/add' element={<AddCourse/>}/>
       <Route exact path='/admin/course/edit/' element={<EditCourse/>}/>
       <Route exact path='/admin/course/edit/:id' element={<AddCourse/>}/>
       <Route exact path='/admin/classes' element={<Classes/>}/>
       <Route exact path='/admin/classes/add' element={<AddClasses/>}/>

       <Route exact path='/admin/chapter' element={<Chapter/>}/>
       <Route exact path='/admin/chapter/add' element={<AddChapter/>}/>
       <Route exact path='/admin/users/request' element={<UserRequest/>}/>
       <Route exact path='/admin/users/approved' element={<UserApproved/>}/>
       <Route exact path ="/admin/*" element={<h1>404 Admin page not found</h1>} />
      </Routes>

    </div>
  )
}

export default Admin
