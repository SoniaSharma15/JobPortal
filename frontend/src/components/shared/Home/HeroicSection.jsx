import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
function HeroicSection() {

  useGetAllAdminJobs();
  const dispatch=useDispatch();
  const [query,setQuery]=useState("")

const {searchedQuery}=useSelector((store)=>store.job)
const searchJobHandler=()=>{
  dispatch(setSearchedQuery(query));
}

  return (
    <div className='text-center'>
        <div className='flex flex-col gap-5'>

        <span className='px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium mx-auto'>No. 1 Job Hunt Website</span>
        <h1 className='text-5xl font-bold'>Search, Apply & <br/> Get Your <span className='text-[#6a38c2]'> Dream Jobs</span></h1>
       <p className='px-3 md:mx-28 text-justify'>Discover thousands of opportunities tailored to your skills and ambitions. Whether you're a fresh graduate or a seasoned professional, our platform connects you with top employers across industries. Start your journey today and take the next step toward your dream career.</p>
        <div className='flex md:w-[40%]  shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
            <input type="text" placeholder='Find your Dream Jobs' onChange={(e)=>setQuery(e.target.value)}
            className='outline-none border-none w-full' />
            <Button className="rounded-r-full bg-[#6A38C2]" onClick={searchJobHandler}>
                <Search className="h-5 w-5"/> 
            </Button>
        </div>
    </div>
    </div>

  )
}

export default HeroicSection