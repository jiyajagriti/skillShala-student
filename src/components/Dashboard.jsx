import React from 'react'

const Dashboard = () => {
  return (
    <div className='flex h-screen w-screen justify-center px-4 mt-16'>
        <div className='relative bg-blue-800 w-full max-w-md h-40 sm:h-48 rounded-xl mx-10 shadow-2xl'>
           <label className='absolute bg-gray-300 top-3 right-3 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-lg flex justify-center items-center cursor-pointer overflow-hidden'>
            <input type="file" className='hidden' />
            <span className='text-sm sm:text-sm text-blue-800 '>Upload</span>
            </label>
            <div className='text-white p-4'>
                <p className='text-xl'>Your Profile:</p>
                <p>Active Courses: 03</p>
                <p>Total XPs Gained: 2240</p>
            </div>
        </div>
    </div>
  )
}

export default Dashboard
