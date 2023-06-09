import React from 'react'

import { useMutation, useQuery, useSubscription } from '@apollo/client'
import { UPLOADPROFILEPIC } from '../../graphql/quaries'
import withApollo from '../../libs/withApollo'
import { getDataFromTree } from '@apollo/client/react/ssr'
import { useState } from 'react'
import { useRouter } from 'next/router'

import MainLayout from '../layout/MainLayout'
const Profile = () => {

  const [text, setText] = useState('');
  const [image, setImage] = useState(null);







  const [text2, setText2] = useState('');
  const [image2, setImage2] = useState(null);
  const router =useRouter()




   const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', image);


     await fetch("http://localhost:4040/profilePic",{
        method:"POST",
        mode:"no-cors",
        credentials:"include",
        body: formData
      })

      router.replace(router.asPath)

     
      
    
 
  };



  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleImageChange2 = (event) => {
    setImage2(event.target.files[0]);
  };




   const handSubmit2 = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', image2);
    formData.append('text', text2);


     await fetch("http://localhost:4040/post",{
        method:"POST",
        mode:"no-cors",
        credentials:"include",
        body: formData
      })

      router.replace(router.asPath)

     
      
    
 
  };














  http://localhost:4040/profilePic"




  return (
 <MainLayout>

      <div className='pt-4 px-72 bg-white'>
      <form onSubmit={handleSubmit}>
        <input type='file' onChange={handleImageChange}/>
        <input type='submit' />
      </form>


      <form onSubmit={handSubmit2} className="mt-40">
        <input type='file' onChange={handleImageChange2}/>
        <input type='text' onChange={(e)=>setText2(e.target.value)}/>
        <input type='submit' />
      </form>
    </div>
 </MainLayout>

  )
}


export default withApollo(Profile ,{getDataFromTree})