import React, { useEffect, useState } from 'react'
import withApollo from '../../libs/withApollo'
import { UserInPut, useUsersQuery } from '../../generated'
import {getDataFromTree} from "@apollo/client/react/ssr"
import { useQuery, useMutation } from '@apollo/client'
import Link from "next/link"
import { useRegisterMutation } from '../../generated'
import { USERS_QUERY, CREATE_USER } from '../../graphql/quaries'

import { useRouter } from 'next/router'
import Image from 'next/image'





const Register = () => {
  //const {data} = useUsersQuery();
  const router = useRouter()


  const[registerUser] =useMutation(CREATE_USER, {
    onCompleted: (data) => {
      // Check the response status code and redirect accordingly
    //  if (data.statusCode === 200) {
    //    history.push('/success-page');
    //  } else if (data.statusCode === 401) {
    //    history.push('/unauthorized-page');
    //  } else {
    //    history.push('/error-page');
    //  }
    
    router.push("/login")
    },
  })


  const [userName,  setUserName]= useState("")
  const [email ,setEmail]= useState("")
  const [password ,setPassword]= useState("")
  const [password2 ,setPassword2]= useState("")
 
  const [birthYear, setBirthYear]=useState("")
  const [birthMonth, setBirthMonth]=useState("")
  const [birthDay, setBirthDay]=useState("")
   //const [dateOfBirth, setDateOfBirth]= useState(`${birthYear}-${birthMonth}-${birthDay}`)
   
   const dateOfBirth=`${birthYear}-${birthMonth}-${birthDay}`
  
 
  //const [register] = useRegisterMutation()
 


  const signUp =  async(e:any)=> 
  {
    e.preventDefault()
   
  await registerUser({
variables: {
  input: { userName:userName,
   email:email,
   password:password,
   password2:password2,
   dateOfBirth: dateOfBirth
  }
}
} )
await router.replace(router.asPath)




}
const year = new Date().getFullYear()
const years: string [] = []
const days: string[] = [];
const months: string[]=["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

for(let i=1; i<=31; i++){
  days.push(i.toString())
}
for(let i=1902; i<=year; i++){
  years.push(i.toString())
}
  



  return (
    <div className='flex w-screen h-screen md:justify-center'>

      <div className='hidden md:block'>
        <Image src={"/LoginBackground.png"} layout='fill'/>
      </div>
      
      <div className='relative md:my-10 md:bg-white md:rounded-lg md:pb-8 md:px-20 '>


        
      <div className='absolute left-6 top-5 md:left-14'>
        <Link href='/'><Image src={"/closer.svg"} height={"15px"} width={"15px"}/></Link>
      
      </div>

      
       <div className='mt-12 ml-10'>

      <div className='text-2xl font-bold md:-mt-4'>Create your account</div>



      
      <form onSubmit={signUp} 
  
  className='flex flex-col mt-5 space-y-6 rounded-xl w-96 md:space-y-5'>
        <input className='py-4 pl-2 border-2 rounded-md outline-none w-80 focus:border-sky-500' value={userName} onChange={(e)=>setUserName(e.target.value)}  type="text" placeholder='Name'/>

        <input className='py-4 pl-2 border-2 rounded-md outline-none w-80 focus:border-sky-500' value={email} onChange={(e)=>setEmail(e.target.value)}  type="email" placeholder='Email'/>
        <input className='py-4 pl-2 border-2 rounded-md outline-none w-80 focus:border-sky-500'  value={password} onChange={(e)=>setPassword(e.target.value)}  type="password" placeholder='Password'/>
        <input className='py-4 pl-2 border-2 rounded-md outline-none w-80 focus:border-sky-500'   value={password2} onChange={(e)=>setPassword2(e.target.value)}type="password" placeholder='Password'/> 

        <div className='text-xl font-bold' >Date of birth</div>

        <div className='-mt-10 text-xs w-80 '>This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</div>

        <div className='flex justify-between w-80 ' >
          
          
            <select value={birthMonth} onChange={(e)=>setBirthMonth(e.target.value)} className='w-32 py-4 pl-2 border-2 rounded-md outline-none focus:border-sky-500'  placeholder='Day' defaultValue={""} >

{months.map((month,i)=>(
    <option key={i} value={month}>{month}</option>
))}

</select>
         



         <select value={birthDay} onChange={(e)=>setBirthDay(e.target.value)} className='w-20 py-4 pl-2 border-2 rounded-md outline-none focus:border-sky-500'  placeholder='Day' defaultValue={""} >

          {days.map((day,i)=>(
              <option key={i} value={day}>{day}</option>
          ))}

          </select>

            
          
         <select value={birthYear} onChange={(e)=>setBirthYear(e.target.value)} className='w-20 py-4 pl-2 border-2 rounded-md outline-none focus:border-sky-500'  placeholder='Day' defaultValue={""} >

          {years.map((year,i)=>(
              <option key={i} value={year}>{year}</option>
          ))}

          </select>

       
</div>
         
        <input type='submit' value="Next" className='absolute px-1 py-4 text-white duration-500 bg-gray-500 rounded-full hover:opacity-70 active:scale-90 w-80 bottom-4'  />
        
      </form>
        <div>
        
        </div>
        
        </div>

        </div>
    </div>
  )
}

export default withApollo( Register,{getDataFromTree});

