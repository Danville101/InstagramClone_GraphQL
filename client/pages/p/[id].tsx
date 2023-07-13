import React, { useRef, useState , useEffect} from 'react'
import { useQuery } from '@apollo/client'
import { CREATETWEETCOMMENT, GETDETAILTWEET,  LIKETWEET, UNTWEET, CREATETWEETCOMMENTLIKE, CREATETWEETCOMMENTUNLIKE } from '../../graphql/quaries'
import { useRouter } from 'next/router'
import Image from 'next/image'
import withApollo from '../../libs/withApollo'
import { UilUserPlus, UilSetting, UilThLarge, UilHeart, UilComment, UilTelegramAlt, UilPlay , UilVolumeMute,UilVolume} from '@iconscout/react-unicons'
import { FaBeer , FaPlay, FaHeart, FaRegHeart } from 'react-icons/fa'
import { useContext } from 'react'
import { PageContext } from '../context/AuthContext'
import { useMutation } from '@apollo/client'
import { NextPageContext } from 'next'

const DetailPost = () => {
     const { user}:any = useContext(PageContext)
     const router = useRouter()

     const id =  router.query.id



    const  {loading , error, data}=useQuery(GETDETAILTWEET,{variables:
          {
               input:{
                   postId:id
               }
           }
     
     })
     const [text , setText]=  useState("")

     const textRef= useRef<any>(null)
    

     const [createComment]= useMutation(CREATETWEETCOMMENT,{refetchQueries:[GETDETAILTWEET]})

     const createCommentHandler=(id:string)=>{
          createComment({variables:{
               input:{
                    postId:id,
                    text:text
               }
           }})

           textRef.current.value = ""
         
     }

     const [createCommentLike]= useMutation(CREATETWEETCOMMENTLIKE,{refetchQueries:[GETDETAILTWEET]})
 
     const [unLikeComment]= useMutation(CREATETWEETCOMMENTUNLIKE,{refetchQueries:[GETDETAILTWEET]})
    
    
       const likeCommentHandler=(id:any)=>{
        
        createCommentLike({variables:{
          input:{
              id:id
          }
      }})
       }
       
       const unLikeCommentHandler=(id:any)=>{
        
          unLikeComment({variables:{
          input:{
              id:id
          }
      }})
       }
      



       const [createLike]= useMutation(LIKETWEET,{refetchQueries:[GETDETAILTWEET]})
 
       const [unLike]= useMutation(UNTWEET,{refetchQueries:[GETDETAILTWEET]})
      
      
         const likeHandler=(id:any)=>{
          
          createLike({variables:{
            input:{
                postId:id
            }
        }})
         }
         
         const unLikeHandler=(id:any)=>{
          
          unLike({variables:{
            input:{
                postId:id
            }
        }})
         }

         let mutedState:any

         useEffect(()=>{
        const mutedState = localStorage.getItem("muted")
       
           
         })
       

         
        
         const [showeComments, setShowComments]= useState(false)

         const  setMuted=()=>{
          if (mutedState=="true"){
            localStorage.setItem("mute","false")
          }else{
            localStorage.setItem("mute","true")
          }
        }
      
        
        const videoRef = useRef<any>(null)
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
      

     if(loading){
          return(<div className='relative flex items-center justify-center w-screen h-screen py-20 text-white'>
          <Image src={'/loading.svg'} layout='fill' alt='' />
        </div>)
     }

  return (
    <div className="flex flex-row items-center justify-center w-screen h-screen px-20 py-20 text-white rounded-lg md:py-12">

    

     <div className='flex flex-col h-auto overflow-y-scroll w-96 md:px-4 md:h-screen md:py-12 md:flex md:flex-row md:justify-center md:items-center md:w-screen'>



     <div className='order-2 md:order-1'>
          { 
          String(data.findPost.media).includes("mp4")?       
          
          <div className='relative flex items-center justify-center w-full h-full hover:cursor-pointer md:order-first md:place-self-start' onClick={play}> 
      <video  ref={videoRef}  loop className='object-contain overflow-clip' muted={mutedState=="true"} >

              <source src={`http://${process.env.NEXT_PUBLIC_IMAGE_URL}:4040${data.findPost.media}`}  type='video/mp4'/>
            </video>

            <FaPlay className={`absolute text-white opacity-90 w-20 h-20 ${!paused?"scale-0":"scale-100"} duration-300`}/>
          
          </div>
          



           :   <div className='relative md:w-[60vw] md:h-[80vh] h-[50vh]'>       <Image src={`http://${process.env.NEXT_PUBLIC_IMAGE_URL}:4040${data.findPost.media}`} layout='fill' alt=''  />  </div>

               }
         
</div>
     

      
          
          <div className='bg-[#1A1A1A] w-full h-12 rounded-t-lg px-4 md:bg-black md:border-b md:border-[#1B1B1B] md:px-0 order-1 md:hidden  '>
               
               <div className='flex items-center py-2 space-x-2 '>
                    <Image src={data.findPost.owner.profilePicture} width={30} height={30} alt=''  className='rounded-full'/>
                    <div className='flex flex-col'>
                         <p className='text-xs'>{data.findPost.owner.userName}</p>
                    </div>
                    
               </div>
          </div>


          


     <div className='flex flex-col order-2 md:w-[40vw] md:border-l md:px-2 md:border-[#1B1B1B]  '>

     <div className='bg-[#1A1A1A] w-full h-12 rounded-t-lg px-4 md:bg-black md:border-b md:border-[#1B1B1B] md:px-0 hidden md:block  '>
               
               <div className='flex items-center py-2 space-x-2 '>
                    <Image src={data.findPost.owner.profilePicture} width={30} height={30} alt=''  className='rounded-full'/>
                    <div className='flex flex-col'>
                         <p className='text-xs'>{data.findPost.owner.userName}</p>
                    </div>
                    
               </div>
          </div>


             <div className='px-2 pt-4 bg-black'>
               <div className='md:hidden'>
                    {showeComments ?  
                         <button className='text-xs text-[#8E8E8E] ' onClick={()=>setShowComments(false)}>hide comments</button> :
                         <button className='text-xs text-[#8E8E8E]' onClick={()=>setShowComments(true)}>show comments</button>
                       
                    }
               </div>
             </div>
             <div className={`flex flex-col  mt-4 space-y-1 overflow-y-scroll h-[20vh] ${!showeComments && "hidden md:flex md:flex-col" } md:h-[56vh] md:overflow-y-scroll `}>
                  {data.findPost.comments.map((e:any,i:number)=>(
               <div className="flex flex-col " key={i}>
                    <div className='relative flex items-center'>
                         <Image src={e.findUser.profilePicture} height={30} width={30} alt='' className='rounded-full'/>
                    <p className="ml-4 text-xs">{e.findUser.userName}</p>
                         <p className="ml-1 text-sm">{e.text}</p>

                         <div className='absolute right-4'>                              
                         { e.likes.includes(user._id)?
<FaHeart className='w-2 h-2 text-red-600 hover:cursor-pointer'  onClick={()=>unLikeCommentHandler(e.id)}/>:<FaRegHeart className='w-2 h-2 hover:cursor-pointer' onClick={()=>  likeCommentHandler(e.id)} />


            }
                         </div>
                    </div>

                    <div className='flex ml-12 space-x-2'>
                         <p className={`text-xs text-[#8E8E8E]  `}>2h</p>
                         <p className={`text-xs text-[#8E8E8E] ${e.likes.length==0 && "hidden"} `}>{e.likes.length} like</p>
                    </div>
               </div>
             ))}

             
             
             </div>
             
             <div className='flex items-center mt-2 space-x-3 '>
            { data.findPost.likes.includes(user._id)?
<FaHeart className='w-5 h-5 text-red-600 hover:cursor-pointer'  onClick={()=>unLikeHandler(data.findPost._id)}/>:<FaRegHeart className='w-5 h-5 hover:cursor-pointer' onClick={()=>likeHandler(data.findPost._id )} />


            }


<div><UilComment className='w-5 h-5 hover:cursor-pointer '/></div>   

            <UilTelegramAlt className='w-5 h-5 '/>
          </div>
          
          <p className='mt-2 mb-5 ml-2 text-xs'>Linked by</p>
          <div className='mx-2 border-t border-[#1B1B1B]  '>
      
             </div>
                 <div className='flex mt-2 '>
                             <textarea className='flex-wrap w-full pl-2 text-xs bg-transparent outline-none resize-none' placeholder='Add a comment'  onChange={(e)=>setText(e.target.value)} ref={textRef}/>
               <input type='submit' value={"Post"} className='text-[#ABD1F4] text-xs'  onClick={()=>createCommentHandler(data.findPost._id)}/>
          </div>
             
             
          </div>
     </div>

     
    </div>
  )
}


export default  DetailPost 

export async function getServerSideProps(context:NextPageContext) {
     
     const {id}=context.query


     return {
       props: {id}, // will be passed to the page component as props
     }
   }