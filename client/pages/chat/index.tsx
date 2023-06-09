import React, { useEffect, useState } from 'react'
import { useMutation, useQuery, useSubscription } from '@apollo/client'
import { MESSAGE_SUB, CREATE_MESSAGE, GET_MESSAGES} from '../../graphql/quaries'
import withApollo from '../../libs/withApollo'
import { getDataFromTree } from '@apollo/client/react/ssr'
import MainLayout from '../layout/MainLayout'
import { useRouter } from 'next/router'




const Chat = ({session}) => {

    
     const {loading, error,data} = useQuery(GET_MESSAGES,
          
          {variables:{input:{
                 sender:"630a713cec406393f2fb6d40",
                 receiver:"6307ab5e0995fa698529c8a5"
            }}})

     
            
       

     
    const [sendMessage]= useMutation(CREATE_MESSAGE, {refetchQueries:[GET_MESSAGES], onCompleted(data) {

     const mek = [...messages,data]
     setMessage(mek)
     console.log("look yah suh",data)
        
    },}
   )
    
   const router = useRouter()
   const [messages ,setMessage] = useState<any[]>([])
   const [messager ,setMessager] = useState<any[]>([])
   const [text, setText]= useState("")
   


   useEffect(()=>{
     let message= data.getMessage
     setMessage(message)

   
   },[])




   

   

   
    const chat = (e:any)=>{
     e.preventDefault()

        sendMessage({
          variables:{
               input:{
                    text:text,
                    receiver:"6307ab5e0995fa698529c8a5"
               }
          }
        })
        router.replace(router.asPath)
  
    }
    

   useSubscription(MESSAGE_SUB,{
     onSubscriptionData(data) {
      const mek = [...messages,data.subscriptionData.data.messageAdded]
        setMessage(mek)
   
       
     }, variables:{
          recipientId: "6307ab5e0995fa698529c8a5"
     }
    })




  return (
     <MainLayout>


    <div className='flex flex-col items-center w-screen h-screen'>
    
    <div className='border w-[80vw] h-[80vh] my-40 rounded-lg border-emerald-800 overflow-y-scroll '>

    {messages.map((e:any,i:any)=>(
     <div className=" border-t-green-700" key={i}>
          <div className='flex flex-col w-[80vw] ' >
          <div className={`flex items-center px-2 my-4 rounded-xl w-auto break-all ${e.receiver== "630a713cec406393f2fb6d40"? "bg-red-500 self-end rounded-br-[2px]":"bg-stone-600 self-start rounded-bl-[2px] "} max-w-[10%] mx-4`} >
               {e.text}
     
          </div>
          
          
          </div>
     </div>))}
    </div>
     
   
     <form className='flex flex-col' onSubmit={chat}  >
          <input className='caret-violet-500' onChange={(e)=>setText(e.target.value)} value={text} type="text" placeholder='Chat'/>
          <input className='text-purple-600 cursor-pointer' type="submit" value="send"  />
     </form>
    </div>

</MainLayout>
  )
  
}

 export default withApollo( Chat,{getDataFromTree})