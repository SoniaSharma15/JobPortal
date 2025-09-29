import React from 'react'
import { NavLink } from 'react-router-dom'
function Footer() {
  return (
<footer className='border-t border-t-gray-200 py-6 w-full'>
  <div className='flex flex-col md:flex-row justify-between items-center px-4'>
    <h2 className='text-xl font-bold text-[#f84a1a]'>Rise <span className='text-[#6a38c2]'>Hire</span></h2>
    <p className='text-neutral-800 font-semibold'><span className="font-bold">&copy;</span> 2025 Sonia Sharma | All rights reserved.</p>
  </div>
  {/* <div className='flex space-x-4 mt-4'>
      <NavLink to={"https://youtube.com"}>
      </NavLink>
  </div> */}

</footer>  )
}

export default Footer