import React, { useState } from 'react'
import withApollo from '../../libs/withApollo';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { useMutation } from '@apollo/client';
import {LOGIN} from '../../graphql/quaries'
import { useRouter } from 'next/router'
import Image from 'next/image';
import Link from 'next/dist/client/link';

import { signIn } from "next-auth/react";


const Login = () => {
  

  const [login, {error, data}]= useMutation(LOGIN,{
    onCompleted: (data) => {
      // Check the response status code and redirect accordingly
   console.log(data)
   router.push("/")
    },
  })
  const router = useRouter()



  const [email ,setEmail]= useState("")
  const [password ,setPassword]= useState("")




//const handleSubmit = async (e) => {
//  // validate your userinfo
//  e.preventDefault();
//
//  const status = await signIn('credentials', {
//    redirect: false,
//    email: email,
//    password: password,
//    callbackUrl: "/"
//})
//
//if(status.ok) router.push(status.url)
//
//}
//
const autherize = async(e:any)=>{

  e.preventDefault()

  const results = await login({
    variables:{
      input:{
        userName_Email:email,
        password:password
      }
    }
  })
  console.log("look yah",results)
  //router.push("/feed")
  //await router.replace(router.asPath)

}
  return (
    <div className='flex w-screen h-screen md:justify-center'>

    <div className='hidden md:block'>
      <Image src={"/LoginBackground.png"} layout='fill' alt="logBackground"/>
    </div>
    
    
    <div className='relative flex flex-col md:my-10 md:bg-white md:rounded-lg md:pb-8 md:pgap-x-20'>

<div className='self-center mt-2'>
        <Image src={"/PostIcon.svg"} width={"40px"} height={"40px"} alt="instagram-icon"/>
      </div>
    
      
    <div className='absolute left-6 top-5 md:left-8'>
      <Link href='/'><Image src={"/closer.svg"} height={"15px"} width={"15px"} alt="closer"/></Link>
    
    </div>


    
     <div className='mt-48 ml-10 md:mt-12'>
      

    <div className='text-3xl font-bold'>Sing in to Instagram</div>



    
    <form onSubmit={autherize} 

className='flex flex-col mt-10 space-y-6 rounded-xl w-96'>


      <input className='py-4 pl-2 border-2 rounded-md outline-none w-80 focus:border-sky-500' value={email} onChange={(e)=>setEmail(e.target.value)}  type="text" placeholder='Email or Username'/>
      <input className='py-4 pl-2 border-2 rounded-md outline-none w-80 focus:border-sky-500'  value={password} onChange={(e)=>setPassword(e.target.value)}  type="password" placeholder='Password'/>


      <div className='flex justify-between w-80' >
        
</div>
<div className='w-80 -mt-20 flex justify-center items-center'>
  {error && <p className='text-red-500 text-sm'>{error.message}</p>}
</div>

       
      <input type='submit' value="Next" className='px-1 py-4 text-white duration-500 bg-black rounded-full hover:opacity-70 active:scale-90 w-80'  />
      
    </form>
      <div>
     
      <div className='flex mt-10'>Dont have an account? 
     
    
        <div className='ml-1 text-sky-500'>  <Link href={'/register'}>SignUp</Link></div>
      </div>
      
      </div>
      
      </div>

      </div>
  </div>
  )
}

export default withApollo( Login,{getDataFromTree});