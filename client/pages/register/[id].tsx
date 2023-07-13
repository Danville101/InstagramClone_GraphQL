import React from 'react'
import {get} from "lodash"
import withApollo from '../../libs/withApollo'
import {getDataFromTree} from "@apollo/client/react/ssr"
import { useUserQuery } from '../../generated'
import { useDeleteUserMutation } from '../../generated'


const User = ({query}:any) => {
     const [deleted]= useDeleteUserMutation()
     const id= get(query, "id");
     const {data} = useUserQuery({
          variables:{
               id,
          }
     })

  return (
     <div>
<div className='flex justify-center space-x-5 text-sky-600 '>
<div>{data?.user.firstName}</div>
<div>{data?.user.lastName}</div>
<div>{data?.user.email}</div>
<div>{data?.user.id}</div>
 </div>


    <button className="self-center w-40 px-1 py-2 mt-4 duration-500 bg-red-500 rounded-md hover:opacity-70 active:scale-90" onClick={()=>deleted({
     variables:{
          id:data?.user.id as string
     }
    })}>Delete</button>
   
</div>
    

  )
}

export default  User