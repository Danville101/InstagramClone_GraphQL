import React, { useState } from 'react'
import { UilSearch, UilHeart } from '@iconscout/react-unicons'
import { SEARCHUSER } from '../graphql/quaries'
import { useQuery } from '@apollo/client'
import Image from 'next/image'
import withApollo from '../libs/withApollo'
import { getDataFromTree } from '@apollo/client/react/ssr'
import Link from 'next/link'
const MobileTopNav = () => {

     const [searchDrop, setSearchDrop]=useState(false)
     const [phrase, setPhrase]=useState("")


     const {loading, error,data} = useQuery(SEARCHUSER,
          
          {variables:{input:{
               phrase:phrase
            }}, onCompleted(data) {
               }
          
          }
            )

            
  return (
     <div>
    <div className='flex items-center justify-between h-12 px-4 py-4 text-white bg-black border-b border-[#363636]'>
     <p className="text-4xl">Insta</p>
     <form className='flex items-center'>
          <UilSearch className="translate-x-8"/>
          <input placeholder='Search' className='outline-none w-80 bg-[#262626] rounded-md h-8 pl-10' onClick={()=>setSearchDrop(true)}  onChange={(e)=>setPhrase(e.target.value)}/>
     </form>
     <UilHeart/>
    </div>
    <div className={`w-80 text-white h-96 bg-[#262626] absolute right-14 ${searchDrop?"":"hidden"} px-4 py-4 overflow-y-scrol flex space-y-4 flex-col`}  onMouseLeave={()=>setSearchDrop(false)}>

     
     {loading? <div className="flex items-center justify-center">
  <div className="w-16 h-16 border-4 border-gray-200 border-opacity-50 rounded-full animate-spin"></div>
</div>
     
     
     :data.searchUser.map((e:any,i:number)=>(
          
          <div key={i} className='' >
              
               <Link href={`/${e.userName}`}  className=""> 
               <div className='flex items-center space-x-2'>           
                  <Image src={e.profilePicture} height={40} width={40} alt='user' className='rounded-full'/>
                  <div className='flex flex-col space-y-0.5 text-xs'>
                    <p  className='font-extrabold'>{e.userName}</p>
                    <p>{e.email}</p>
                  </div>
               </div></Link>

          </div>
     ))}
    </div>
    </div>
  )
}




export default  MobileTopNav


