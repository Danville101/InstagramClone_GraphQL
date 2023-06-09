import React, { useEffect, useState } from 'react'
import { useMutation, useQuery, useSubscription } from '@apollo/client'
import { gql } from '@apollo/client';
import { getDataFromTree } from '@apollo/client/react/ssr'
import { useRouter } from 'next/router'
import { MESSAGE_SUB, CREATE_MESSAGE, GET_MESSAGES } from '../../../graphql/quaries'
import withApollo from '../../../libs/withApollo'
import ChatLayout from '../../layout/ChatLayout'
import client from '../../../graphql/client';



import { authOptions } from '../../api/auth/[...nextauth]';

import { useSession } from 'next-auth/react'
import Converstion from '../../components/Converstion';
import { getServerSession } from "next-auth/next"

//session?.user.id

const T = ({id}) => {

     
           // const router = useRouter()
            //const { id } = router.query
            
       


  return (
    <div className='overflow-x-hidden'>
        <ChatLayout  >
          <Converstion  receiver={id}/>
          
    </ChatLayout>
    </div>
   
  )
}

export default withApollo(T)



   
   
   

export async function getServerSideProps(context) {

  const id = context.query.id

  return {
    props: {
      id
    }, // will be passed to the page component as props
  }
}




