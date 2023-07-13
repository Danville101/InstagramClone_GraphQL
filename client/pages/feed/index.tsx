
import withApollo from '../../libs/withApollo'
import { getDataFromTree } from '@apollo/client/react/ssr'
import { Menu } from '../../interface'
import Link from 'next/link'
import Image from 'next/image'
import { Posticon } from '../../interface'
import { useState } from 'react'




const tweeetIconList:Posticon[]=[
  {icon:"/Play.svg"},
  {icon:"/Image.svg"},
  {icon:"/Gif.svg"},
  {icon:"/Emoji.svg"},
  {icon:"/Poll.svg"},
  {icon:"/Calender.svg"}
]

const menuList:Menu[]= [
  {icon:"/Home.svg", nav:"/feed", name:"Home"},
  {icon:"/Search.svg", nav:"", name:"Explore"},
  {icon:"/Bell.svg", nav:"", name:"Notofications"},
  {icon:"/Message.svg", nav:"", name:"Meesages"}

]



const Feed = () => {
  const [postText, setPostText]= useState("")
  return (
    <div className='relative flex flex-col w-screen h-screen md:grid md:grid-cols-8 md:scroll-smooth md:overflow-hidden'>


      <div className='fixed top-0 flex w-screen py-3 pl-4 backdrop-sepia-0 bg-white/30 md:hidden '>
        <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
        <h1 className='ml-4'>Home</h1>
      </div>


      <div className='fixed bottom-16 right-5 md:hidden' >
             <Image src={"/AddpostIcon.svg"} height={"60px"} width={"60px"} alt="add post" />
            </div>

      <div className='fixed bottom-0 z-50 flex justify-around order-1 w-screen h-10 shadow-black/30 md:flex md:flex-col md:pl-28 md:h-screen md:order-1 '>
 
        <div className='hidden md:block md:-mt-40'>
          <Image src={"/PostIcon.svg"} height={"30px"} width={"30px"} alt=""/>
        </div>
        {
          menuList.map((menu, i)=>(
            <div className="md:-mt-80"key={i}>
              <div className='flex'>
             <Image src={menu.icon} height={"24px"} width={"24px"} alt="" />
             <div className='hidden ml-4 font-bold md:block'>{menu.name}</div>
             </div>
            </div>
          ))
        }     <button className='hidden w-56 py-4 -ml-4 text-white rounded-full bg-sky-500 md:block md:-mt-80'>Post</button>

        <div className='absolute flex bottom-4'>
          <div className='w-10 h-10 rounded-full bg-sky-500'></div>
          <h3 className='mt-1 ml-2'>Name</h3>
        </div>
        
      </div>

      <div className='hidden h-screen md:border-l md:flex-col md:flex md:col-start-3 md:col-end-7 '>
      <div className='fixed top-0 flex h-4 py-3 pl-4 backdrop-sepia-0 bg-white/30'>
        <h1 className='text-xl font-bold '>Home</h1>
      </div>
    
      <div className='flex flex-col h-auto pl-4 mt-10 border-b'>
        <div className='flex'>
        <div className='w-8 h-8 mr-2 bg-blue-500 rounded-full'></div>
        <input className='w-60' placeholder='Whats Happing?' type="text" onChange={(e)=>setPostText(e.target.value)} value={postText} />

        
        </div>

        <div className='relative flex mt-8 space-x-4'>
          {tweeetIconList.map((element,i)=>(
            <div key={i}>
              <Image src={element.icon} height={"20px"} width={"20px"} alt=""/>
            </div>
          ))}

         <button className='absolute bottom-0 px-4 py-2 mb-1 font-bold text-white rounded-full right-4 bg-sky-500'>Post</button>
        </div>
      </div>
      
      </div>
    


      <div className='relative hidden h-screen pt-4 pl-4 mr-28 md:flex-col md:border-l md:flex w-9 md:order-2 md:col-start-7 md:col-span-2'>
        <input className="py-2 pl-4 rounded-full w-72 bg-black/5" type="text" placeholder='Search'/>

        <div className="rounded-xl bg-black/5 h-[80rem] w-72 mt-12 pl-4">
          <h3 className='text-xl font-bold'>What is Happening</h3>
        </div>
     

        <div className="rounded-xl bg-black/5 h-[80rem] w-72 mt-4 pl-4">
          <h3 className='text-xl font-bold'>Who to Follow</h3>
        </div>
     
        <div className='fixed bottom-0 flex justify-between h-12 pl-4 bg-white shadow-sm w-80 contrast-200 brightness-200 shadow-black right-8 rounded-t-2xl'>
          <h3 className="text-xl font-bold">Message</h3>
          <div className='flex pr-4 mt-2 space-x-4'>
             <div> <Image src={"/AddMessage.svg"} height={"20px"} width={"20px"} alt="add post" /></div>
             <div><Image src={"/PullupMessage.svg"} height={"20px"} width={"20px"} alt="add post" /></div>
          </div>
        </div>
     
      </div>

      
    </div>
  )
}

 export default Feed