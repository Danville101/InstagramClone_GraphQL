import React, { useEffect } from 'react'
import withApollo from '../libs/withApollo'
import { getDataFromTree } from '@apollo/client/react/ssr'
import MainLayout from './layout/MainLayout'
import { useMutation, useQuery } from '@apollo/client'
import { GETFEED, LIKETWEET, UNTWEET } from '../graphql/quaries'
import Image from 'next/image'
import { useRef } from 'react'
import { useState } from 'react'
import { UilUserPlus, UilSetting, UilThLarge, UilHeart, UilComment, UilTelegramAlt, UilPlay , UilVolumeMute,UilVolume} from '@iconscout/react-unicons'
import { FaBeer , FaPlay, FaHeart, FaRegHeart } from 'react-icons/fa'
import { useContext } from 'react'
import { PageContext } from './context/AuthContext'
import Feeds from './components/Feeds'
import withAuth from '../libs/withAuth'

import { useRouter } from 'next/router'

const Home = () => {

  const router = useRouter()

  const { user} = useContext(PageContext)

  const {loading, error,data, refetch}= useQuery(GETFEED)


 //if(error){
 //  router.replace("/login")
 //  setTimeout(() => {
 //  router.reload()
 //  }, 1000);


 //}

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
useEffect(()=>{
  refetch()
})

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
  
    if(loading){
      return(<div className='relative flex items-center justify-center w-screen h-screen py-20 text-white'>
        <Image src={'/loading.svg'} layout='fill' alt='' />
      </div>)
   }




  return (
    <MainLayout>
<div className='py-12 '>

  
            {data.getFeed.map((e,i)=>(

                 <Feeds e={e} key={i}/>  
            ))}
</div>

    </MainLayout>
  )
}


export default withApollo(  Home ,{getDataFromTree})