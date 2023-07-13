
import React, { useEffect, useState, useRef } from 'react'
import { useMutation, useQuery, useSubscription } from '@apollo/client'
import { MESSAGE_SUB, CREATE_MESSAGE, GET_MESSAGES ,FINDUSER, GETCONVO, CONVOLIST, READ} from '../graphql/quaries'
import withApollo from '../libs/withApollo'
import { getDataFromTree } from '@apollo/client/react/ssr'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { useContext } from 'react'
import { PageContext } from '../pages/context/AuthContext'
// @ts-nocheck
import { UilImage } from '@iconscout/react-unicons'
import { FindUserType } from '../interfaces'


const Converstion = ({receiver}:any) => {
     const { user}:any = useContext(PageContext)
     
     const checktext=()=>{
          if(textRef.current && (textRef.current as HTMLInputElement).value.trim() == ''){
               setTextLength(false)  
          }
         else{
               setTextLength(true)  
          }
        }
  
  const [messages ,setMessage] = useState<any[]>([])

     const {loading, error,data, refetch} = useQuery(GET_MESSAGES,  
          
          {variables:{input:{
                 receiver:receiver
            }}, onCompleted(data) {
                setMessage(data.getMessage)
            },
          
          
          }
            
            )

     
    const [sendMessage]= useMutation(CREATE_MESSAGE, {refetchQueries:[GET_MESSAGES, CONVOLIST], onCompleted(data) {

     const mek = [...messages,data]
     setMessage(mek)
    
        
    },}
   )
    
   const router = useRouter()
 
   const [text, setText]= useState("")
   
   
    const chat = (e:any)=>{
     e.preventDefault()

        sendMessage({
          variables:{
               input:{
                    sender:user._id,
                    text:text,
                    receiver: receiver
               }
          }
        })

 
        setText('')
        checktext()
      
  
    }
    
    const chatWindowRef = useRef();
    const textRef = useRef(null);
    const bottomRef = useRef(null);


   useSubscription(MESSAGE_SUB, 

     {

     variables:{
          recipientId: user._id,
     }, onData(options) {

          if(receiver == options.data.data.messageAdded.sender){

              const mek = [...messages,options.data.data.messageAdded]
          setMessage(mek)
          refetch()
  
     
          
       }
          
     }
    }, )


    useEffect(() => { 
     refetch() 
})




    
    
    const uploadMessgaeImage = async (event:any) => {


     event.preventDefault();


      if(event.target.files[0]){
           const formData =  new FormData();
     formData.append('image', event.target.files[0]);

 
          const res =   await fetch("http://localhost:4040/messageImage",{
         method:"POST",
         credentials:"include",
         keepalive: true,
         body: formData
       })
       const json = await res.json()
   

       sendMessage({
          variables:{
               input:{
                    sender: user._id,
                    text:json,
                    receiver: receiver
               }
          }
        })
       
     
     

      } else{

          return
     
    
     
 

 
      
}
     
  
   };

   const[textlength, setTextLength] = useState(false)



   useEffect(() => {
     if (chatWindowRef.current) {
          (chatWindowRef.current as HTMLInputElement ).scrollTop = (chatWindowRef.current as HTMLInputElement ).scrollHeight
     }
   }, [])

   const[userMessageer , setUserMessageer]=useState<FindUserType >({profilePicture:"", userName:"", _id:""})

   const {loading:userLoading, data:userData} = useQuery(FINDUSER,  
          
     {variables:{input:{
            _id:receiver
       }}, onCompleted(data) {
          setUserMessageer(data.findUser)
      },
    
     
     
     }
       
       )


  const [readMessage]= useMutation(READ, {refetchQueries:[GET_MESSAGES, CONVOLIST]})

 
  useEffect(()=>{

     const lastMessage= messages.at(-1)
     const id = lastMessage?.id
     const read= lastMessage?.read
     const receiver = lastMessage?.receiver

     
     console.log(id, read, receiver)

     if(receiver== user._id && read == false){
          readMessage({variables:{
               input:{
                    id:id
               }
          }})
          
     }

},[messages, readMessage, user])





   




     
  return (

 
     <div className='bg-black h-screen justify-center items-center flex w-60 border-l-[#262626] border-l flex-col text-white relative  overflow-hidden md:w-[40vw] md:h-[95vh]  '>
          {userLoading? 
          <div className='flex w-full items-center h-12 px-6 space-x-4 border-b-[#262626] border-b  py-2'>
          <div className='w-8 h-8 bg-[#222222] rounded-full'> </div>

          </div> :
          <div className='flex w-full items-center h-12 px-6 space-x-4 border-b-[#262626] border-b mt-1.5'>
          <Image src={userMessageer.profilePicture} width={25} height={25} alt={userMessageer.userName} className={`rounded-full `}/>
          <p>
          {userMessageer.userName}
          </p>

          </div>}
    
     <div className=' w-full h-[90vh]   overflow-y-auto px-2 ' >
 
     { loading && userLoading?<div className='flex flex-col items-center justify-center w-full h-full space-y-4'>

          <div className='w-40 h-6 rounded-md bg-[#222222]'></div>
          <div className='w-40 h-6 rounded-md bg-[#222222]'></div>
          <div className='w-40 h-6 rounded-md bg-[#222222]'></div>
          <div className='w-40 h-6 rounded-md bg-[#222222]'></div>
          <div className='w-40 h-6 rounded-md bg-[#222222]'></div>
   
     </div>:
     
     
     
     
     messages.map((e:any,i:any)=>(
      <div className=" border-t-green-700" key={i}>
           <div className='flex flex-col w-full ' >{
               String(e.text).includes(`4040/media/message/`)?
                
                
                
                
               <div className={`flex items-center px-2 my-4 rounded-xl w-auto break-all ${e.receiver=== receiver ? "self-end ":"self-start"} max-w-[55%] max-h-[50%] mx-4`}>
           <div className="" >


                     <Image src={e.text} width={300} height={800}  alt={e.text}  className='self-end rounded-xl'  /> 
                     <div className={`rounded-full ${e.receiver=== receiver ?"hidden":""} -translate-x-6 -translate-y-2 `} >   <Image src={userMessageer.profilePicture} width={25} height={25} alt={userMessageer.userName} className={`rounded-full `}/>  </div>

</div>
      

           </div> :
           

           <div className={`flex items-center px-2 my-4 rounded-xl w-auto break-all ${e.receiver=== receiver ? " self-end rounded-br-[2px]":"self-start rounded-bl-[2px]  "} max-w-[60%] mx-4`} >
               <div className='flex flex-col'>
                    {e.receiver == receiver?
                    <div className={`flex items-center px-2 my-4 py-2 rounded-xl w-auto break-all bg-[#222222] self-end rounded-br-[2px] max-w-full  `} >
                         {e.text}
                    </div>: 

                    
                    <div > <div className={`flex items-center px-2 my-4 py-2 rounded-xl w-auto break-all self-start rounded-bl-[2px] border border-white/20 max-w-full `} >{e.text}</div>
                <div className={`rounded-full ${e.receiver=== receiver ?"hidden":""} -translate-x-6 -translate-y-4 `} >   <Image src={userMessageer.profilePicture} width={20} height={20} alt={userMessageer.userName} className={`rounded-full `}/>  </div>


</div>
                    
               
               }
                
               </div>
         

      
           </div>}
           
           
           </div>
      </div>
      
      
      ))
      
      }
      <div className='h-2'></div>
<div className='h-8' ref={bottomRef}></div>
         
     </div>
      

      <form className='flex   bg-black w-full h-[8vh] items-center relative px-2 mb-16 md:mb-0'   >
           <textarea className='justify-center w-full h-12 pt-3 pl-6 pr-12 bg-black border border-white rounded-full outline-none resize-none caret-white' onChange={(e)=>setText(e.target.value)} value={text}   placeholder='Message' ref={textRef} onChangeCapture={checktext}/>
           
           <input className={`absolute text-blue-600 cursor-pointer right-4 ${textlength?"":"hidden"}`} type="submit" value="send"  onClick={chat}  />
           <label className={`absolute right-4 ${textlength?"hidden":""}` }>
               <UilImage/>
                         <input className={`absolute text-blue-600 cursor-pointer right-4 hidden`} type="file"  onChange={uploadMessgaeImage} /> 
           </label>

      </form>
     </div>
  )
}


export default Converstion 