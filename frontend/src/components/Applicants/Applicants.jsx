import React from 'react'
import ApplicantsTable from './ApplicantsTable'
import { toast } from 'sonner'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'

function Applicants() {
 const params=useParams()
 const dispatch=useDispatch()
 const {applicants}=useSelector(store=>store.application)
useEffect(() => {
  const fetchAllApplicants=async()=>{
    try {
      const res=await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`,{withCredentials:true})
      if(res.data.success){
        dispatch(setAllApplicants(res.data.job))
      }
    } catch (error) {
      console.log(error)
      toast.error(error)
    }
  }
  fetchAllApplicants()
}, [])
  return (
    <div className='max-w-7xl mx-2 md:mx-auto'>
        <h1 className='font-bold text-xl my-5'>Applicants ({applicants?.applications?.length})</h1>
        <ApplicantsTable/>
    </div>
  )
}

export default Applicants