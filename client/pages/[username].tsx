import React from 'react'
import MainLayout from './layout/MainLayout'
import withApollo from '../libs/withApollo'
import { getDataFromTree } from '@apollo/client/react/ssr'
import { useContext } from 'react'
import { PageContext } from './context/AuthContext'
import MobileBottomNav from '../components/MobileBottomNav'
import { useQuery } from '@apollo/client'
import { FINDME , FINDEMYTWEET, FINDDUSERBYUSERNAME, FINDPOSTBYUSERNAME} from '../graphql/quaries'
import Image from 'next/image'
import { useRouter } from 'next/router'
import UserProfile from '../components/UserProfile'
import { NextPageContext } from 'next'

const Username = ({username}:any) => {

  const router = useRouter()

 


  



  return (

         <div className='mb-12'>
         <UserProfile username={username}  />

         <div className='fixed bottom-0 w-full md:left-0 md:fixed md:h-screen md:w-1/12 md:border-r md:border-[#0B0B0B] md:min-w-fit'> <MobileBottomNav/></div>
  
           </div>  
     

  
  )
}




export default ( Username )



export async function getServerSideProps(context:NextPageContext) {

  const username = context.query.username

  return {
    props: {
      username
    }, // will be passed to the page component as props
  }
}