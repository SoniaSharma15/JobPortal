import React from 'react'
import Navbar from './components/shared/Navbar'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Home from './components/Pages/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup';
import Footer from './components/shared/Footer'
import Jobs from './components/Pages/Jobs'
import Browse from './components/Pages/Browse'
import Profile from './components/shared/Profile/Profile'
import JobDescription from './components/Pages/JobDescription'
import Companies from './components/shared/Companies/Companies'
import CompanyCreate from './components/shared/Companies/CompanyCreate'
import CompanySetup from './components/shared/Companies/CompanySetup'
import AdminJobs from './components/Admin/AdminJobs'
import PostJob from './components/Admin/postJob'
import Applicants from './components/Applicants/Applicants'
import ProtectedRoute from './components/Admin/ProtectedRoute'
function App() {
  return (
    <BrowserRouter>
        <Navbar/> 
 <Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/jobs' element={<Jobs/>}/>
  <Route path='/browse' element={<Browse/>}/>
  <Route path='/profile' element={<Profile/>}/>
  <Route path='/description/:id' element={<JobDescription/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/signup' element={<Signup/>}/>
  <Route path='/admin/companies' element={<ProtectedRoute><Companies/></ProtectedRoute>}/>
  <Route path='/admin/companies/create' element={<CompanyCreate/>}/>
  <Route path='/admin/jobs' element={<AdminJobs/>}/>
  <Route path='/admin/jobs/:id/applicants' element={<Applicants/>}/>
  <Route path='/admin/jobs/post' element={<PostJob/>}/>
  <Route path='/admin/companies/:id' element={<CompanySetup/>}/>
 </Routes>
 <Footer/>

    </BrowserRouter>
  )
}

export default App