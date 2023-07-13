import React, { useEffect, useState } from 'react'
import { UilEstate , UilMessage, UilFocusAdd, UilTelegramAlt, UilFilm, UilUser, UilImage, UilPlayCircle, UilTimes, UilArrowLeft, UilSearch} from '@iconscout/react-unicons'
import { useQuery } from '@apollo/client'
import { FINDME,CONVOLIST ,MESSAGE_SUB, SEARCHUSER} from '../graphql/quaries'
import Image from 'next/image'
import Link from 'next/link'
import { getDataFromTree } from '@apollo/client/react/ssr'
import withApollo from '../libs/withApollo'
import { useContext } from 'react'
import { PageContext } from '../pages/context/AuthContext'
import { useRouter } from 'next/router'
import { useSubscription } from '@apollo/client'
import { useRef } from 'react'
import { FaBeer , FaPlay } from 'react-icons/fa'
import { CONVOLISTType } from '../interfaces'

const MobileBottomNav = () => {

     const { user }:any  = useContext(PageContext)
     const router=useRouter()

     const [userdata, setUser]=useState()

     const[addPost, setAddPost]=useState(false)
     const[text, setText]=useState("")


     const[convo, setConvo]=useState<CONVOLISTType []>([])
     const {loading:loading2, error:error2,data:data2, refetch} = useQuery(CONVOLIST,{
          onCompleted(data) {
              
               setConvo(data.getConversations)
          },
     })
     

     const getUnread=()=>{
          let num = 0
    convo.map((e)=>{
               if(e.lastestMessages.receiver == user._id && e.lastestMessages.read== false){
                    num++
               }
          })

          return num

     }
     



   useSubscription(MESSAGE_SUB,
     { 

     variables:{
          recipientId: user._id
     }, onData(options) {
      refetch()
         
     }, 
    }, )

    const [immy, setImmy]= useState("")


   

     const {loading, error,data} = useQuery(FINDME,
          
          { onCompleted(data) {
               setUser(data.findMe);
           if(process.env.NEXT_PUBLIC_IMAGE_URL != "backend"){
             setImmy(data.findMe.profilePicture)
     
        }else{
             let str= String(data.findMe.profilePicture).replace("127.0.0.1","backend")
             setImmy(str)
        }
          }
          
          }
            )

            const [image, setImage] = useState<string | null>(null)
            const [upload, setUpload] = useState(null)

            const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
              const file :any = event.target.files?.[0]
              if (file) {
               setUpload(file)
                const reader = new FileReader()
                reader.onloadend = () => {
                  setImage(reader.result as string)
                }
                reader.readAsDataURL(file)
              }
            }



            const uploadPost = async (event:any) => {
               event.preventDefault();
               if(upload){
               const formData = new FormData();
               formData.append('image', upload);
               formData.append('text', text);
           
           
                await fetch("http://localhost:4040/post",{
                   method:"POST",
                   mode:"no-cors",
                   credentials:"include",
                   body: formData
                 }).then((res)=>{
                       router.reload()
                 setAddPost(false)
                 })
           
              
           
               }
                 

            
             };




             const vidimge =()=>{
               let input = String(image).includes("video")
               
               if(input){
                    return true
               }
               else{
                    return false
               }
          };

        


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

            useEffect(()=>{

               if(addPost) {
                 document.body.style.overflowY = "hidden";
               } else{
                    document.body.style.overflowY = "initial"
               }
          
             
                
              })
       
              const [searchSlide, setSearchSlide]=useState(false)

              const [phrase, setPhrase]=useState("")


              const {loading:loading3, error:error3,data:data3} = useQuery(SEARCHUSER,
                   
                   {variables:{input:{
                        phrase:phrase
                     }}, onCompleted(data) {
                        }
                   
                   }
                     )
             
          if(loading){
               return(
                    <div>hhh</div>
               )
          }
          
            
     
  return (<div className='overflow-x-hidden md:flex'>   
     <div className={`'w-screen h-screen bg-gray-500 bg-opacity-10 overflow-hidden flex justify-center items-center z-50  text-white ${addPost?"block ":"hidden"} flex justify-center items-center md:absolute md:w-screen `} data-testid="main" >
          <button  data-testid="closeCreate">
                         <UilTimes className="absolute text-white top-24 right-10" onClick={()=>setAddPost(false)}   />
          </button>


          
          <div className={`bg-[#262626] w-80 h-80 rounded-2xl ${image==null?"":"hidden"}`}>
               <div className='w-full justify-center items-center flex py-4 border-b border-[#313131] '>
                    <p>Create new post</p>
               </div>

               <div className='flex flex-col items-center w-full h-full mt-10'>
                    <div className='flex'>            <UilImage className="w-16 h-16 rotate-6"/>
                    <UilPlayCircle className="w-16 h-16 mt-1 -ml-4 -rotate-12"/></div>
                    {image && <Image src={image} alt="Selected Image"  height={200} width={200}/>}
                    

                    <label htmlFor="file-upload" className="bg-[#2C96F6] mt-12  appearance-none    py-2 px-3 rounded-md text-sm font-medium focus:outline-none">
Select From Device
</label>
<input id="file-upload" type="file" className='hidden' onChange={handleFileInputChange}/>
               </div>
          </div>


          







          <div className={`bg-[#262626] w-auto h-auto rounded-2xl ${image==null?"hidden":""}`}>
               <div className='w-full justify-between px-4 items-center flex py-4 border-b border-[#313131] '>
                    <UilArrowLeft onClick={()=>setImage(null)}/>
                    <p className="text-[#2C96F6] hover:cursor-pointer" onClick={uploadPost}>Share</p>
               </div>
<div className='flex '>
               <div className='flex flex-col w-full h-full '>
                    
                
                    {vidimge() && image &&  
                    
                    <div className='flex items-center justify-center' onClick={play} >


                    <video  ref={videoRef}  className='rounded-lg h-96' playsInline loop  >
        
                      <source src={image}  type='video/mp4'/>
                    </video>
        
                    <FaPlay className={`absolute text-white opacity-90 w-20 h-20 ${!paused?"scale-0":"scale-100"} duration-300`}/>
                  
        </div>
              
                    
                    || image && <Image src={image} alt="Selected Image"  height={400} width={400} className="w-full h-full rounded-b-2xl"/>}


               </div>
               <div className='h-[400px] w-[400px] flex flex-col px-4 pt-4 '>
                    <div className='flex space-x-2'>             
                      <Image src={data.findMe.profilePicture} height={30} width={30} alt='profilePic' className='w-10 h-10 rounded-full'/>
                      <p className='text-sm font-bold'>{data.findMe.userName}</p>
                    </div>

                
                   <textarea className='w-full bg-[#262626] outline-none resize-none pt-4' placeholder='Write a caption' onChange={(e)=>setText(e.target.value)}/>

               </div>
               
               
               </div>
          </div>









     </div>
     
     
     
      <div className='flex items-center justify-between px-12 py-2 text-white bg-black md:flex-col md:items-start md:justify-start md:h-screen md:space-y-8 md:pt-12 md:-pl-8 '>

      <p className="hidden text-2xl md:block">Insta</p>
          
          <Link href={"/"}>    
          <button className='flex items-center space-x-2 text-xs'> <UilEstate/>
          <p className='hidden lg:block'>Home</p>
          </button>
          
          </Link>
          

          
          
          <button className='items-center hidden space-x-2 text-xs md:flex' onClick={()=>setSearchSlide(true)}> <UilSearch/>
          <p className='hidden lg:block'>Search</p>
          </button>
          



          
<Link href={"/reels"}>

<button className='flex items-center space-x-2 text-xs'>  <UilFilm/>
          <p className='hidden lg:block'>Reels</p>
          </button>
    
</Link>


<button className='flex items-center space-x-2 text-xs' data-testid="creator">     <UilFocusAdd onClick={()=>setAddPost(true)} />

          <p className='hidden lg:block'>Create</p>
          </button>





<button className='flex items-center space-x-2 text-xs'>
     
     <div  className='relative' onClick={()=>router.push("/inbox")}>
           <UilTelegramAlt /> 
           <div className={`w-5 h-5 bg-red-600 rounded-full absolute -right-2 -top-1 flex justify-center items-center border-black border-2 text-xs ${getUnread()==0?"hidden":""}`}>
               {getUnread()}
            
           </div>
     </div>

     <p className='hidden lg:block'>Messages</p>
     
        </button>

        <button className='flex items-center space-x-2 text-xs'>

     {
          loading? <UilUser/>:
          
     <Link href={`/${data.findMe.userName}`}><div className='relative w-5 h-5'> <Image src={immy} layout='fill' alt='profilePic' className='rounded-full'/></div>
          
           </Link>

          
}


<p className='hidden lg:block'>Profile</p>
</button>
    </div>





    
     
     
      <div className={`hidden md:flex w-0 md:w-60 items-center  py-2 text-white bg-black border-l-[#363636] border-l md:flex-col md:items-start  md:h-screen md:space-y-8 md:pt-12  ${searchSlide?"px-2":"md:w-0 "} duration-500 `}>
<div className='flex flex-row items-center justify-between w-full px-2'>
        <p>Search</p>
        <UilTimes className="text-white hover:cursor-pointer " onClick={()=>setSearchSlide(false)}/>
</div>
 

    <div className='flex items-center h-12 py-4 text-white bg-black border-b border-[#363636] '>

     <form className='flex items-center '>
          <div className=' flex  px-2 items-center justify-center h-8 bg-[#262626] rounded-l-md'>
                 <UilSearch className=""/>
          </div>
        
          <input placeholder='Search' className='outline-none w-full bg-[#262626] rounded-r-md h-8'   onChange={(e)=>setPhrase(e.target.value)}/>
     </form>

    </div>
  



    <div className={` text-white h-96  px-4 py-4 overflow-y-scrol flex space-y-4 flex-col`}  >

     
     {loading3? <div className="flex items-center justify-center">
  <div className="w-16 h-16 border-4 border-gray-200 border-opacity-50 rounded-full animate-spin"></div>
</div>
     
     
     :data3.searchUser.map((e:any,i:number)=>(
          
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
    






    
    
    
    </div>

  )
}


export {MobileBottomNav}

export default MobileBottomNav