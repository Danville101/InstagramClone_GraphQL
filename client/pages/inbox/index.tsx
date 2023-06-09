import React from 'react'
import ChatLayout from '../layout/ChatLayout'
import MainLayout from '../layout/MainLayout'
import MobileBottomNav from '../components/MobileBottomNav'
import { UilCommentAdd, UilTelegramAlt } from '@iconscout/react-unicons'
import withApollo from '../../libs/withApollo'
import { getDataFromTree } from '@apollo/client/react/ssr'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
const index = () => {
  return (
    <div className='flex justify-center items-center md:bg-[#121212] w-screen md:px-10 '>
     <ChatLayout>
          <div className='bg-black h-screen justify-center items-center flex w-60 border-l-[#262626] border-l px-4 md:w-[40vw] md:h-[95vh]  '>


            <div className='flex flex-col items-center justify-center text-center text-white'>
              <div className='flex items-center justify-between p-2 mb-4 border border-white rounded-full '>
                    <UilCommentAdd className="w-20 h-20"/>
              </div>
          
              <p>Your messages</p>
<p className='text-xs'>Send private photos and messages to a friend or group</p>
<button className='bg-[#2C96F6] px-2 py-1 text-sm rounded-md mt-4'>Send message</button>

            </div>
          </div>
     </ChatLayout>



</div>
  )
}






export default withApollo( index )


