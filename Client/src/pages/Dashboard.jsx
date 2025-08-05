import React from 'react'
// import Navbar from '../components/Layout/Navbar'
import Sidebar from '../components/Layout/Sidebar'

function Dashboard() {
  return (
    <>
    {/* <Navbar /> */}
    <div className="flex h-screen ">
      <Sidebar />
      <main className="flex-1 p-8   bg-gray-50 ">
        Dashboard
      </main>
    </div>
    </>
  )
}

export default Dashboard