import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getDataFromTree  } from '@apollo/client/react/ssr'
import withApollo from '../../libs/withApollo'
import { useQuery } from '@apollo/client'
import { GETCONVO, CONVOLIST } from '../../graphql/quaries'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import { useSession } from 'next-auth/react'

import { useContext } from 'react'
import { PageContext } from '../context/AuthContext'


const Chatlist = () => {
    
     const router = useRouter()
     const { user} = useContext(PageContext)


     

     const [convo ,setConvo]=useState()


     const {loading, error,data} = useQuery(GETCONVO,  
          
          { onCompleted(data) {
                setConvo(data.getConversation)
            },
          
          
          }
            
            )


     const [convo2 ,setConvo2]=useState()


     const {loading:loading2, error:error2,data:data2} = useQuery(CONVOLIST)


     
  const goTo=(id)=>{

     if(router.asPath.includes("t")){ 
 
     router.push(`${id}`)
 
    
}
    

     else{

          router.push(`inbox/t/${id}`)
    

     }
  }

  

  const getTime=(messageDate)=>{

const date = new Date(messageDate)
const timeElapsed = Date.now() - date?.getTime();

let time;
if (timeElapsed < 60000) { // less than a minute
  time = Math.floor(timeElapsed / 1000) + ' seconds';
} else if (timeElapsed < 3600000) { // less than an hour
  time = Math.floor(timeElapsed / 60000) + ' minutes';
} else if (timeElapsed < 86400000) { // less than a day
  time = Math.floor(timeElapsed / 3600000) + ' hours';
} else { // more than a day
  time = Math.floor(timeElapsed / 86400000) + ' days';
}

return time

  }

     
  return (
     
    <div className='flex-col h-screen pb-16 overflow-y-auto text-white bg-black w-80 md:border-[#262626] md:border md:border-r-0  md:h-[95vh] md:w-[20vw] '>
     <div className='flex items-center justify-center w-full mb-4 border-b-[#262626] border-b h-12'>
          <p>{user.userName}</p>
     </div>

     <div className='flex-col w-full px-4 space-y-4 '>
          

          {
          loading || loading2 ?( <div className="flex flex-col space-y-4 ">
    <div className='flex items-center ' >
          <div   className='rounded-full h-14 w-14 bg-[#222222]'></div>
          <div className='flex-col ml-2 space-y-2'>
         <div className='w-40 h-6 rounded-md bg-[#222222]'></div>
         <div className='w-32 h-6 rounded-md bg-[#222222]'></div>
    </div>
     
     </div>
    <div className='flex items-center ' >
          <div   className='rounded-full h-14 w-14 bg-[#222222]'></div>
          <div className='flex-col ml-2 space-y-2'>
         <div className='w-40 h-6 rounded-md bg-[#222222]'></div>
         <div className='w-32 h-6 rounded-md bg-[#222222]'></div>
    </div>
     
     </div>
    <div className='flex items-center ' >
          <div   className='rounded-full h-14 w-14 bg-[#222222]'></div>
          <div className='flex-col ml-2 space-y-2'>
         <div className='w-40 h-6 rounded-md bg-[#222222]'></div>
         <div className='w-32 h-6 rounded-md bg-[#222222]'></div>
    </div>
     
     </div>

          </div>
               
           ):
          
                data2?.getConversations.map((e,i)=>(
                    
  
                    <div key={i} className='relative flex items-center' onClick={user._id != e.creator?()=>goTo(e.creatorUser._id):()=>goTo(e.participantUser._id)} >

                         <div className='flex flex-row items-center space-x-2 '>{ user._id != e.creator?
                              <Image src={e.creatorUser.profilePicture} height={40} width={40} alt='proPic'  className='rounded-full'/>:
                                                  <Image src={e.participantUser.profilePicture} height={40} width={40} alt='proPic'  className='rounded-full'/>

                              }
                    
                    <div className='flex flex-col text-xs '>{ user._id != e.creator?
                                      <p className='font-bold'>{e.creatorUser.userName}</p>:<p className='font-bold'>{e.participantUser.userName}</p>
                    
                    }
                     
                                
                                             <div className='flex items-center space-x-0.5 w-full'>   
                                             
                                             {String(e.lastestMessages.text).includes("http")?    <p className='text-[#A4A4A4]'>Media sent</p> :
                                                                                    <p className='text-[#A4A4A4]'>{String(e.lastestMessages.text).length>10? `${String(e.lastestMessages.text).substring(0,9)}...`:e.lastestMessages.text }</p>         
                                                                                        }        

                                             
                                             
                                             
                                               <p className='text-[#A4A4A4]'>. {getTime(e.updatedAt)}</p>
                                                
                                               
                                                </div>
                                        
                    </div>
                    { e.lastestMessages.read == false &&  e.lastestMessages.sender != user._id&&            <div className='   w-1.5 h-1.5 bg-[#2C96F6] rounded-full'></div>}





</div>
                  
               </div>






               ))
          
       
          
          }


     
         
     








     </div>


    </div>
  )
}



export default withApollo( Chatlist,)


