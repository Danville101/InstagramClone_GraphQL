import React from 'react'
import MobileBottomNav from '../../../components/MobileBottomNav'
import { UilAngleLeftB } from '@iconscout/react-unicons'
import { useContext, useState } from 'react'
import { PageContext } from '../../context/AuthContext'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Edit = () => {



     const [text, setText] = useState('');
     const [image, setImage] = useState(null);
   
   
   
   
   
   
   
     const [text2, setText2] = useState('');
     const [image2, setImage2] = useState(null);
     const router =useRouter()
   
   
   
   
      const handleSubmit = async (event:any) => {
       event.preventDefault();
   
       const formData = new FormData();
       if (image !== null) {
          formData.append('image', image);
        }
    
   
   
        await fetch("http://localhost:4040/profilePic",{
           method:"POST",
           mode:"no-cors",
           credentials:"include",
           body: formData
         })
   
         router.reload()
   
        
         
       
    
     };
   
   
   
     const handleImageChange = (event:any) => {
       setImage(event.target.files[0]);
     };












     const {user}:any= useContext(PageContext)
     const [imageDropDown , setImageDropdown ]= useState(false)


     const [changeInfo, setChangeInfro]=useState({
          username:user.userName
     })
  return (
    <div className='flex flex-col text-white'>
     <div className='  flex justify-center items-center  w-screen  text-white border-b border-[#363636]  py-2  px-4 h-8  '>
          <UilAngleLeftB className="absolute left-4 hover:cursor-pointer" onClick={()=>router.back()}/>

          <p className='text-sm font-bold '>Edit Profile</p>
          

     </div>
     <div className='flex justify-between w-full '><div className='mx-2 my-8 border  border-[#363636] h-screen overflow-y-scroll  w-screen px-4 py-6' >
          <div className="flex items-center">
               <Image src={user.profilePicture} height={30} width={30} alt={user.userName} className='rounded-full'/>
               <div className='flex flex-col ml-4 -space-y-1'>
                    <p className='text-sm ' >{user.userName}</p>
                    <button className='text-[#2C96F6] text-sm' onClick={()=>setImageDropdown(true)}>Change profile photo</button>
                  
               </div>
               
          </div>
          <div className={`${imageDropDown?"":"hidden"} w-80 flex flex-col relative space-y-4`}>
                         <button className={`${imageDropDown?"":"hidden"} absolute right-0`} onClick={()=>setImageDropdown(false)}>x</button>
                         <div className='pt-4 '>
      <form className='flex items-center justify-center space-x-20' onSubmit={handleSubmit}>
      <label htmlFor="profilePic-upload" className="px-3 py-2 text-xs font-medium text-black bg-white rounded-md appearance-none focus:outline-none">
Select From Device
</label>
        <input className='hidden ' id="profilePic-upload" type='file' onChange={handleImageChange}/>
        <input  type='submit' className='bg-[#2C96F6] text-xs py-2 px-3 rounded-md' />
      </form>
</div>
                    </div>
          <form className='py-4'>
               <label htmlFor="" className='flex flex-col'>
                    Username
                    <input className='bg-transparent border outline-none border-[#363636] rounded-sm px-2  w-80' placeholder='Username' onChange={(e)=>setChangeInfro({...changeInfo, username:e.target.value})} type='text'/>
                    <p className='mt-4 mb-4 text-xs w-80'>
                    In most cases, you will be able to change your username back to dopeboyvilly for another 14 days. Learn more
                    </p>
               </label>
               <input type='submit' className='w-24 bg-[#2C96F6] rounded-md ' value={'Submit'}/>
          </form>
          
          
          <form className='flex flex-col py-4 space-y-2' >
               <div className=''>
                    <p>Change Password</p>
               </div>

               <div className='flex flex-col space-x-2'>
                    
               </div>
               <label htmlFor="" className='flex flex-col'>
                    Old password
                    <input className='bg-[#333333] border outline-none border-[#363636] rounded-md px-2  w-80 h-10 '  onChange={(e)=>setChangeInfro({...changeInfo, username:e.target.value})} type='text'/>
                    <p className='text-xs w-80'>

                    </p>
               </label>
               <label htmlFor="" className='flex flex-col'>
                    New password
                    <input className='bg-[#333333] border outline-none border-[#363636] rounded-md px-2  w-80 h-10 '  onChange={(e)=>setChangeInfro({...changeInfo, username:e.target.value})} type='text'/>
                    <p className='text-xs w-80'>

                    </p>
               </label>
               <label htmlFor="" className='flex flex-col'>
                    Confirm new password
                    <input className='bg-[#333333] border outline-none border-[#363636] rounded-md px-2  w-80 h-10 '  onChange={(e)=>setChangeInfro({...changeInfo, username:e.target.value})} type='text'/>
                    <p className='text-xs w-80'>

                    </p>
               </label>
               <input type='submit' value={'Change Password'} className='w-40 bg-[#2C96F6] rounded-md '/>
               <p className='text-xs text-[#2C96F6]'>Forgot your password?</p>
          </form>
          
          </div></div>


       <MobileBottomNav/>


    </div>
  )
}

export default Edit