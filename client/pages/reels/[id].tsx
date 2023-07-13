import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { FINDREELS, GETREELBYID, CREATETWEETCOMMENT } from '../../graphql/quaries'
import withApollo from '../../libs/withApollo'
import { getDataFromTree } from '@apollo/client/react/ssr'
import MobileBottomNav from '../../components/MobileBottomNav'
import { useRef } from 'react'
import { useState } from 'react'
import { UilUserPlus, UilSetting, UilThLarge, UilHeart, UilComment, UilTelegramAlt, UilPlay } from '@iconscout/react-unicons'
import { FaBeer , FaPlay } from 'react-icons/fa'
import ReelPage from '../../components/ReelPage'
import Image from 'next/image'
import { useContext } from 'react'
import { PageContext } from '../context/AuthContext'
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { NextPageContext } from 'next'


const Reels = ({id}:any) => {

     const router = useRouter()

     const [list, setList]=useState([])

     const { ref, inView, entry } = useInView();
     const {loading:loadingArray , error:erroArray, data:dataArray}=useQuery(FINDREELS,{
          onCompleted(data) {

               setList(    data.getReel)
           

               
       
          },
     })


     let num =0
     

     const {loading , error, data}=useQuery(GETREELBYID,{
          variables:{
               input:{
                    reelId:id

               }
          }
     })
     const {overflowScroll, setOverflowScroll, reelIndex, setReelIndex}=useContext<any>(PageContext)


     const push=()=>{

          
          setReelIndex(reelIndex +1)
          router.replace(`${list[reelIndex]["_id"]}`)
        
          
     }




     useEffect(()=>{
        
         
         if(inView && reelIndex <list.length){

          setTimeout(
               push
               
               , 300);
           

              
           
                  
         }


 
        console.log(reelIndex)

     })
 
       if(loading){
          return(<div className='relative flex items-center justify-center w-screen h-screen py-20 text-white'>
          <Image src={'/loading.svg'} layout='fill' alt='' />
        </div>)
       }
   
  return (
    <div className='overflow-y-scroll text-white'>
       <div className='' >
      </div>
   
      <div className='flex flex-col h-screen py-4 mb-14 snap-y snap-mandatory'>
        
       

            <div className="flex-col snap-center">

                 <ReelPage e={data.getReelbyId}  />
            </div>
       


      </div>

      <div className='mb-16' ref={ref}> </div>
   

      <div className='fixed bottom-0 w-full md:left-0 md:fixed md:h-screen md:w-1/12 md:border-r md:border-[#0B0B0B] md:min-w-fit'> <MobileBottomNav/></div>

    </div>
  )
}



export default  Reels 





export async function getServerSideProps(context:NextPageContext) {

     const {id}= context.query


     
     return {
          
       props: {id}, // will be passed to the page component as props
     }
   }