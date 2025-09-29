import React from 'react'
import AppliedJobTable from '../shared/Job/AppliedJobTable'
import SavedJobs from '../shared/Job/SavedJobs'
import useGetAppliedJob from '@/hooks/useGetAllAppliedJob'
function Dashboard() {
  useGetAppliedJob()
  return (
  <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl my-1 px-1 md:p-8">
    <div className="max-w-4xl mx-auto bg-white rounded-2xl">
  <h1 className="font-bold text-lg my-5 px-4">Applied Jobs</h1>
  {/* Applied Job Table */}
  <AppliedJobTable/>
  <SavedJobs></SavedJobs>
 </div>
    </div>  )
}

export default Dashboard