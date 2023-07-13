import React from 'react'
import MobileTopNav from '../../components/MobileTopNav'
import MobileBottomNav from '../../components/MobileBottomNav'

const MainLayout = ({children}:any) => {
  return (

    <div className='flex flex-col w-screen md:flex-row md:flex'>
     <div className='fixed top-0 z-50 w-full md:hidden'><MobileTopNav/></div>

     <main className='min-h-screen pt-12 bg-black md:w-11/12'>{children}
     </main>

     
<div className='fixed bottom-0 w-full md:left-0 md:fixed md:h-screen md:w-1/12 md:border-r md:border-[#0B0B0B] md:min-w-fit'> <MobileBottomNav/></div>


    </div>
  )
}

export default MainLayout