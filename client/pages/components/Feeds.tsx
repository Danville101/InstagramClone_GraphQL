import React, { useEffect } from 'react'
import withApollo from '../../libs/withApollo'
import { getDataFromTree } from '@apollo/client/react/ssr'

import { useMutation, useQuery } from '@apollo/client'
import {GETFEED , LIKETWEET, UNTWEET } from '../../graphql/quaries'
import Image from 'next/image'
import { useRef } from 'react'
import { useState } from 'react'
import { UilUserPlus, UilSetting, UilThLarge, UilHeart, UilComment, UilTelegramAlt, UilPlay , UilVolumeMute,UilVolume} from '@iconscout/react-unicons'
import { FaBeer , FaPlay, FaHeart, FaRegHeart } from 'react-icons/fa'
import { useContext } from 'react'
import { PageContext } from '../context/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/router'
const Feeds = ({e}) => {

  const router = useRouter()

  

  

  const { user} = useContext(PageContext)


  let mutedState:any

  useEffect(()=>{
 const mutedState = localStorage.getItem("muted")

    
  })

 

  const  setMuted=()=>{
    if (mutedState=="true"){
      localStorage.setItem("mute","false")
    }else{
      localStorage.setItem("mute","true")
    }
  }

  
  const videoRef = useRef(null)
  const [paused , setPaused]= useState(false)

  const play=()=>{
    if(videoRef.current.paused){
      videoRef.current.play()
      setPaused(false)
    }else{
      videoRef.current.pause()
      setPaused(true)
    }

    }


 const [createLike]= useMutation(LIKETWEET,{refetchQueries:[GETFEED]})
 
 const [unLike]= useMutation(UNTWEET,{refetchQueries:[GETFEED]})


   const likeHandler=(id)=>{
    
    createLike({variables:{
      input:{
          postId:id
      }
  }})
   }
   
   const unLikeHandler=(id)=>{
    
    unLike({variables:{
      input:{
          postId:id
      }
  }})
   }

   const goToImge=(id:string)=>{
    
    router.push(`p/${id}`)
    
    
   }
  
  




  return (
    <div className='flex flex-col items-center w-screen pb-4 text-white '>

        <div className=' border-b-2 border-[#131313] w-80 pb-4' >
          <div className="flex items-center mb-2 space-x-2 w-80">
            <Image src={e.owner.profilePicture} width={25} height={25} alt='' className='rounded-full'/>
            <p className='text-xs'>{e.owner.userName}</p>
          </div>
          <div className='h-auto w-80'>
            
          <div className='flex '>{ 
          String(e.media).includes("mp4")?       
          
          <div className='relative flex items-center justify-center w-full h-full hover:cursor-pointer' onClick={play}> 
      <video  ref={videoRef}  loop className='object-contain overflow-clip' muted={mutedState=="true"} >

              <source src={`http://${process.env.NEXT_PUBLIC_IMAGE_URL}:4040/${e.media}`} type='video/mp4'/>
            </video>

            <FaPlay className={`absolute text-white opacity-90 w-20 h-20 ${!paused?"scale-0":"scale-100"} duration-300`}/>
          
          </div>
          



           :   <div className='relative w-full h-96'>
             <Image src={`http://${process.env.NEXT_PUBLIC_IMAGE_URL}:4040/${e.media}`} layout='fill' alt={e.text} className='rounded-md'/>
           </div>   

               }</div>

          <div className='flex items-center mt-2 space-x-3 w-80'>
            { e.likes.includes(user._id)?
<FaHeart className='w-5 h-5 text-red-600 hover:cursor-pointer'  onClick={()=>unLikeHandler(e._id)}/>:<FaRegHeart className='w-5 h-5 hover:cursor-pointer' onClick={()=>likeHandler(e._id )} />


            }

   <UilComment className='w-5 h-5 hover:cursor-pointer ' onClick={()=>goToImge(e._id)}/>

   
 

            <UilTelegramAlt className='w-5 h-5 '/>
          </div>
          <div className='flex flex-col'>   
            <p className='text-xs'>{e.likes.length} likes</p>
          <div className='flex items-center space-x-2'>
          <p className='text-xs font-bold'>{e.owner.userName}</p>
          <p className='text-xs text-ellipsis'>{e.text}</p>
          </div>
          </div>
     
     {e.comments.length > 0 && <button className='text-xs text-[#989898]' onClick={()=>goToImge(e._id)} >{`View all ${e.comments.length} comments`} </button> }
          </div>
        </div>

</div>



     

  )
}


export default withApollo( Feeds ,{getDataFromTree})