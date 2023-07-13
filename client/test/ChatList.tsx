import { PageContext } from '../pages/context/AuthContext';
import { MockedProvider } from "@apollo/client/testing";
import { GETCONVO, CONVOLIST } from '../graphql/quaries'
// Wrap the component with a test provider
import { Feeds } from '../components/Feeds';
import {Chatlist} from '../components/Chatlist';

import React from 'react';
import { render, screen, waitFor , fireEvent, act} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';





const mockPageContext = {
  user: {
    _id: '62f886f66d3e42bd697be79c',
    userName: 'testuser500',
    profilePicture: '/profile.jpg',
  },
};


// Mocked data


const mockConvos = [
    { updatedAt :"2023-03-16T20:05:44.846+00:00",
        id :"62f886f66d3e42bd697be79c",
        creator :"62f886f66d3e42bd697be796",
        participant :"62f886f66d3e42bd697be79y",
        hasUnread :false,
        lastestMessages:{
            text :"hey Bro",
        },
        
        participantUser:{
            _id :"62f886f66d3e42bd697be79y",
            profilePicture :"/profile.jpg",
            userName :"testuser500z",

        },

        creatorUser:{
             _id :"62f886f66d3e42bd697be79c",
            profilePicture :"/profile.jpg",
            userName :"testuser500",
        }

      
        
    }
];


const mockConvo =  {
     userName :"testuser500z",
     email  :"testuser@yahoo.vom",
     followers :[],
     following :[],
     profilePicture :"/profile.jpg",
     backgroundPicture :"/profile.jpg"

 }





const mocks = [
 
  {
    request: {
      query: CONVOLIST,
    },
    result: {
      data: {
        getConversations: mockConvos,
      },
    },
  },
 
  {
    request: {
      query: GETCONVO,
    },
    result: {
      data: {
          getConversation: mockConvo,
      },
    },
  },

 
  

];

describe('test Feed', () => {
  it('renders the component', async () => {



    render(




        
    <PageContext.Provider value={mockPageContext}>
      <MockedProvider mocks={mocks} addTypename={false}>

     
      <Chatlist/>
 
     </MockedProvider>
   </PageContext.Provider>  
    );


    await waitFor(()=>{

     expect(  screen.getByText('hey Bro')).toBeDefined();
    })


  



  });
});