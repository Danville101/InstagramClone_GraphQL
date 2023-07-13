import React from 'react'
import Chatlist from '../../components/Chatlist'
import MobileBottomNav from '../../components/MobileBottomNav'
const ChatLayout = ({children}:any) => {
  return (
    <div className='flex flex-col m-0 overflow-x-hidden md:flex md:justify-center md:item'>

      
    <div className='flex h-screen md:justify-center md:items-center  md:bg-[#121212]  justify-center items-center'>
    <Chatlist />

<main className='md:border-[#262626] border border-l-0 '>{children}</main>

    </div>
    

         
<div className='fixed bottom-0 w-full md:left-0 md:fixed md:h-screen md:w-[10vw] md:border-r md:border-[#0B0B0B] md:min-w-fit overflow-x-hidden'> <MobileBottomNav/></div>

    
    </div>
  )
}

export default ChatLayout