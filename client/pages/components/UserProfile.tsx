import React from 'react'
import MainLayout from '../layout/MainLayout'
import withApollo from '../../libs/withApollo'
import { getDataFromTree } from '@apollo/client/react/ssr'
import { useContext } from 'react'
import { PageContext } from '../context/AuthContext'
import MobileBottomNav from './MobileBottomNav'
import { UilUserPlus, UilSetting, UilThLarge, UilHeart, UilComment ,UilAngleLeft} from '@iconscout/react-unicons'
import { useQuery, useMutation } from '@apollo/client'
import { FINDME , FINDEMYTWEET, FINDDUSERBYUSERNAME, FINDPOSTBYUSERNAME, FOLLOW, UNFOLLOW} from '../../graphql/quaries'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { FaBeer , FaPlay } from 'react-icons/fa'
import { useState } from 'react'
const UserProfile = ({username}) => {
  const router = useRouter()


const[unFollowUser]=useMutation(UNFOLLOW, {refetchQueries:[FINDPOSTBYUSERNAME, FINDDUSERBYUSERNAME  ]})
const removeFollow = (e:any,id:string)=>{
  e.preventDefault()
 
  unFollowUser({
       variables:{
            input:{
              userToFollow:id
            }
       }
     })

 
    }



const[followUser]=useMutation(FOLLOW, {refetchQueries:[FINDPOSTBYUSERNAME, FINDDUSERBYUSERNAME  ]})

  const addFollow = (e:any,id:string)=>{
    e.preventDefault()
   
    followUser({
         variables:{
              input:{
                userToFollow:id
              }
         }
       })
       router.replace(router.asPath)
      }

  
     const { user} = useContext(PageContext)


    const {loading:loading2, error:error2,data:data2}= useQuery(FINDPOSTBYUSERNAME,{
      variables:{
        input:{
          username
        }
      }
    })


    const [immy, setImmy]= useState("")
    
  const {loading, error,data} = useQuery(FINDDUSERBYUSERNAME,{variables:{
    input:{
      username
    }
  }, onCompleted(data) {
    if(process.env.NEXT_PUBLIC_IMAGE_URL != "backend"){
      setImmy(data.findUserByUsername.profilePicture)

 }else{
      let str= String(data.findUserByUsername.profilePicture).replace("127.0.0.1","backend")
      setImmy(str)
 }

      
  },

}
          
      )


      const goToImge=(id:string)=>{
    
        router.push(`p/${id}`)
        
        
       }
      

      if(loading|| loading2){
        return(<div className='relative flex items-center justify-center w-screen h-screen py-20 text-white'>
        <Image src={'/loading.svg'} layout='fill' alt='' />
      </div>)
      }

      


  return (
    < div className='mb-40 md:mb-0 '>
     <div className='bg-black w-full flex  px-4 items-center justify-between h-8 fixed top-0 text-white border-b-[#363636] border-b z-10 md:hidden'>
     {<UilAngleLeft onClick={router.back}/>}
       <div>{data.findUserByUsername.userName}</div>

       {user.userName == username? <UilUserPlus/>:<div></div>}

     </div>
     <div className='w-full min-h-screen mt-8 overflow-y-scroll md:px-[20%]  bg-black overflow-x-hidden'>


<div className='flex items-center pt-4 pl-2 space-x-4 text-white'>
<Image src={immy} height={60} width={60} alt='profilePic' className='rounded-full '/>
<div className='flex flex-col space-y-2'>
<div className='flex space-x-2 font-bold'>  <p>{data.findUserByUsername.userName}</p> 
{user.userName == username?<UilSetting/>:""}

</div>
{user.userName == username?

<Link href={'accounts/edit'}>
  <button className='w-40 py-1 text-sm text-black bg-white rounded-md'>Edit Profile

</button>
</Link>
:
<div className='flex items-center space-x-1'>
{data.findUserByUsername.followers.includes(user._id)? 

<button className='w-20 py-1 text-sm bg-red-500 rounded-md ' onClick={(e)=>removeFollow(e,data.findUserByUsername._id)}>Unfollow</button>:

<button className='w-20  bg-[#2C96F6] text-sm rounded-md py-1 ' onClick={(e)=>addFollow(e,data.findUserByUsername._id)}>Follow</button>
}


<button className='w-20 py-1 text-sm text-black bg-white rounded-md' onClick={()=> router.push(`inbox/t/${data.findUserByUsername._id}`)}>Message</button>
</div>

}

</div>

</div>
<div className='flex flex-col items-center w-auto h-auto'>

hhh
  <div className='border-y-[#363636] border-y py-2 flex justify-between px-8 text-white items-center mt-10 text-xs w-full'> 
<div className='flex flex-col items-center -space-y-1.5'>
<p>{data2.finePostsByUsername.length}</p>
<p className='text-[#A2A2A2]'>posts</p>

</div>
<div className='flex flex-col items-center -space-y-1.5'>
<p>{data.findUserByUsername.followers.length}</p>
<p className='text-[#A2A2A2]'>followers</p>

</div>
<div className='flex flex-col items-center -space-y-1.5'>
<p>{data.findUserByUsername.following.length}</p>
<p className='text-[#A2A2A2]'>following</p>

</div>
</div>

<div className='flex items-center justify-center w-full text-white '>
<div className='flex items-center justify-center w-1/3 py-2 border-t border-white '>     <UilThLarge className="text-[#2C96F6]"/></div>

     </div>

     <div className='grid grid-cols-3 gap-1 mb-12 text-white md:mb-20'>
    
       {data2.finePostsByUsername.map((e,i)=>(
        
         <div key={i} className='group hover:cursor-pointer' onClick={()=>goToImge(e._id)}>
          
           <div className='absolute z-40 flex-col items-center justify-center hidden w-40 h-40 space-y-1 bg-gray-500 md:w-60 md:h-60 bg-opacity-20 group-hover:flex'>
           <div className="flex items-center space-x-1">    < UilHeart/> <p className="text-sm">{e.likes.length}</p></div>
           
          
             <div className="flex items-center space-x-2">  < UilComment/>  <p className="text-sm">{e.comment.length}</p></div>





           </div>
           <div>{ String(e.media).includes("mp4")?     
           
           
           <button className='relative object-cover w-40 h-40 md:w-60 md:h-60 overflow-clip'><video src={`http://${process.env.NEXT_PUBLIC_IMAGE_URL}:4040/${e.media}`}  className=""  >
          
            
            
            </video>

          
            <FaPlay className='absolute opacity-60 top-1 right-2 '/>
   
            
            </button>
           :      
           <div className='relative w-40 h-40 md:w-60 md:h-60'>  <Image src={`http://${process.env.NEXT_PUBLIC_IMAGE_URL}:4040/${e.media}`} layout='fill' alt={e.text} />
</div>
         
               }</div>
    
    
         </div>
       ))}
     </div>
</div>




..

     </div>
     
     </div>
  )
}


export {UserProfile}

export default withApollo( UserProfile ,{getDataFromTree})