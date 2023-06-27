import React from 'react'
import { useQuery } from '@apollo/client'
import { FINDREELS , CREATETWEETCOMMENT,GETREELBYID, CREATETWEETCOMMENTLIKE, CREATETWEETCOMMENTUNLIKE, LIKEREEL, UNLIKEREEL} from '../../graphql/quaries'
import withApollo from '../../libs/withApollo'
import { getDataFromTree } from '@apollo/client/react/ssr'
import MobileBottomNav from '../components/MobileBottomNav'
import { useRef } from 'react'
import { useState } from 'react'
import { UilUserPlus, UilSetting, UilThLarge, UilHeart, UilComment, UilTelegramAlt, UilPlay, UilVolume, UilVolumeMute, UilTimes } from '@iconscout/react-unicons'
import { method } from 'express/lib/request'
import Image from 'next/image'
import { useContext, useEffect } from 'react'
import { PageContext } from '../context/AuthContext'
import { useMutation } from '@apollo/client'
import { FaBeer , FaPlay, FaHeart, FaRegHeart } from 'react-icons/fa'


const ReelPage = ({e}) => {

    const {user, overflowScroll, setOverflowScroll}=useContext(PageContext)



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

       const monuseOnHandle=()=>{
        if(!paused){
              videoRef.current.play()
        }
    
       }

       const [mute, setMute]=useState(false)

       const muteHandler=()=>{
        setMute(!mute)
        
        
       }
 const[showeComments, setShowComments]=useState(false)

 
       const showeCommentsHandlerUp=()=>{
        setOverflowScroll(false);
        setShowComments(true)
        document.body.style.overflowY = "hidden";
        
       }

      
       const showeCommentsHandlerDown=()=>{
        setOverflowScroll(true);
        setShowComments(false)
        document.body.style.overflowY = "auto";
        
       }



  //     const [comment, setComment]=useState("")

  



    const [createLike]= useMutation(LIKEREEL,{refetchQueries:[GETREELBYID]})

    
    const [unLike]= useMutation(UNLIKEREEL,{refetchQueries:[GETREELBYID]})


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
     





    
    const [createCommentLike]= useMutation(CREATETWEETCOMMENTLIKE,{refetchQueries:[GETREELBYID]})
 
    const [unLikeComment]= useMutation(CREATETWEETCOMMENTUNLIKE,{refetchQueries:[GETREELBYID]})
   
   
      const likeCommentHandler=(id)=>{
       
       createCommentLike({variables:{
         input:{
             id:id
         }
     }})
      }
      
      const unLikeCommentHandler=(id)=>{
       
         unLikeComment({variables:{
         input:{
             id:id
         }
     }})
      }
     
     




    const textRef= useRef(null)

    const [text, setText]=useState("")
   

    const [createComment]= useMutation(CREATETWEETCOMMENT,{refetchQueries:[GETREELBYID]})

    const createCommentHandler=(id)=>{
         createComment({variables:{
              input:{
                   postId:id,
                   text:text
              }
          }})

          textRef.current.value = ""
          setTextEnterded(false) 
        
    }

    const [textEnterd, setTextEnterded]=useState(false)


    const textHandeler=(e)=>{

         setText(e.target.value)
            if(textRef.current.value!=""){
        setTextEnterded(true)  
      }else{
        setTextEnterded(false) 
      }
    }

     
   
  return (


          <div className='text-white ' >

<div className={`absolute z-20 flex items-center justify-center w-screen h-screen pt-4  pb-24 bg-white/10 ${showeComments?"":"hidden"}  ${overflowScroll && "overflow-hidden "}`}>

  <div className='bg-[#262626] w-1/2 h-2/3 rounded-md flex flex-col relative '>
    <div className='flex items-center justify-between w-full px-2 py-2 border-b border-[#2E2E2E]'>
      <div></div>
      <p className='text-sm'>Comments</p>
      <UilTimes onClick={()=>showeCommentsHandlerDown()}/>
    </div>


<div className='w-full h-full px-4 py-4'>

<div className='h-[90%] overflow-y-auto'>
  {e.comments.map((e,i)=>(
       <div className="flex flex-col space-y-2 " key={i}>
       <div className='relative flex items-center'>
            <Image src={e.findUser.profilePicture} height={30} width={30} alt='' className='rounded-full'/>
            <div className='flex flex-col ml-2'>
              <div className='flex flex-row space-x-2'>   <p className="text-xs font-semibold ">{e.findUser.userName}</p>
              <p className={`text-xs text-[#8E8E8E]  `}>2h</p>
              </div>
                
            <p className="text-xs font-thin ">{e.text}</p>  
            </div>


            <div className='absolute right-4'>  
            <div className='flex flex-col items-center justify-center'>                            
            { e.likes.includes(user._id)?
            
<FaHeart className='w-2 h-2 text-red-600 hover:cursor-pointer'  onClick={()=>unLikeCommentHandler(e.id)}/>:<FaRegHeart className='w-2 h-2 hover:cursor-pointer' onClick={()=>  likeCommentHandler(e.id)} />


}

<p className={`text-xs text-[#8E8E8E] ${e.likes.length==0 && "hidden"} `}>{e.likes.length} </p>

</div>
            </div>
       </div>

       <div className='flex ml-12 space-x-2'>
 
 
       </div>
  </div>
    
  ))}
</div>

  
</div>




<div className='absolute flex items-center w-full px-4 bottom-0 py-2 bg-[#262626]'>

  
<div className='flex items-center justify-center w-12 h-10 translate-x-1 bg-black border border-t border-r-0 rounded-l-full'> 
  
  <Image src={user.profilePicture} width={20} height={20} className='rounded-full ' alt=""/>

  </div>
  
  <textarea className='flex items-center w-full h-10 py-2 pl-2 text-xs bg-black outline-none resize-none border-y' placeholder='Add comment..' onChange={(e)=>textHandeler(e)} ref={textRef}/>



  <div className='flex items-center justify-center w-12 h-10 pr-2 bg-black border border-t border-l-0 rounded-r-full'> 
  
  <button className={`text-[#298DE7]  text-xs ${textEnterd?"text-[#298DE7] ":"text-[#298DE7]/40"} `} onClick={()=>createCommentHandler(e._id)} disabled={!textEnterd}>Post</button>

  </div>
</div>


  </div>
</div>

<div className={`relative flex items-center justify-center w-full h-full py-2 pl-4 pr-12 text-white hover:cursor-pointer `} onMouseEnter={monuseOnHandle}
onMouseLeave={()=>{videoRef.current.pause()}}
> 


<div className='relative flex items-center justify-center'  >



<div className='absolute opacity-80 right-8 top-14'>
  { mute?  <UilVolumeMute className="" onClick={muteHandler}/>:

  <UilVolume className="" onClick={muteHandler}/>


  }
</div>


            <video  ref={videoRef}  className='h-screen rounded-lg' playsInline loop  muted={mute}  >

              <source src={`http://${process.env.NEXT_PUBLIC_IMAGE_URL}:4040${e.video}`}  type='video/mp4'/>
            </video>

            <div onClick={play} className='absolute w-full h-[80%] flex justify-center items-center'>
                <FaPlay className={`absolute text-white opacity-90 w-20 h-20 ${!paused?"scale-0":"scale-100"} duration-300`}/>
            </div>
          
          
            <div className='absolute flex flex-col justify-center space-y-4 -right-8 bottom-20 '>
  <div className='flex flex-col items-center'>{e.likes.includes(user._id)? <FaHeart className='w-6 h-6 text-red-600 hover:cursor-pointer'  onClick={()=>unLikeHandler(e._id)}/> :<FaRegHeart className='w-6 h-6 hover:cursor-pointer' onClick={()=>likeHandler(e._id)}/>}
  <p className='text-xs'>{e.likes.length}</p>
  </div>
  <div className='flex flex-col items-center '> <UilComment onClick={()=>showeCommentsHandlerUp()}/>
  <p className='text-xs'>{e.comments.length}</p>
  </div>
  <UilTelegramAlt/>
  <div className='h-6'></div>
  <div className=''>  <Image src={e.owner.profilePicture} width={20} height={20} className='rounded-md ' alt={e.text}/></div>

 
</div>



<div className='absolute flex items-center space-x-2 bottom-14 left-6'>
  <Image src={e.owner.profilePicture} width={30} height={30} className='rounded-full' alt={e.text}/>
  <p className='text-sm'>{e.owner.userName}</p>
  
</div>



</div>





          </div>   
          </div>
   



  )
}



export default withApollo( ReelPage ,{getDataFromTree})