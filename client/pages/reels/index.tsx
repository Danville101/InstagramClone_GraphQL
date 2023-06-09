import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { FINDREELS, GETREELBYID, CREATETWEETCOMMENT } from '../../graphql/quaries'
import withApollo from '../../libs/withApollo'
import { getDataFromTree } from '@apollo/client/react/ssr'
import MobileBottomNav from '../components/MobileBottomNav'
import { useRef } from 'react'
import { useState } from 'react'
import { UilUserPlus, UilSetting, UilThLarge, UilHeart, UilComment, UilTelegramAlt, UilPlay } from '@iconscout/react-unicons'
import { FaBeer , FaPlay } from 'react-icons/fa'
import ReelPage from '../components/ReelPage'
import Image from 'next/image'
import { useContext } from 'react'
import { PageContext } from '../context/AuthContext'
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'


const Reels = () => {

     const router = useRouter()

     const [list, setList]=useState([])

     const {loading , error, data}=useQuery(FINDREELS,{
          onCompleted(data) {

               setList(    data.getReel)
           

               
       
          },
     })



     useEffect(()=>{
      if(data){
           router.replace(`reels/${list[0]["_id"]}`)
      }
   
        
        

     })
 
       if(loading){
          return(<div className='relative flex items-center justify-center w-screen h-screen py-20 text-white'>
          <Image src={'/loading.svg'} layout='fill' alt='' />
        </div>)
       }
   

}



export default withApollo( Reels )




