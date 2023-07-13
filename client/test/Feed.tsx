import { PageContext } from '../pages/context/AuthContext';
import { MockedProvider } from "@apollo/client/testing";
import { FINDME,CONVOLIST, SEARCHUSER, GETFEED} from '../graphql/quaries'
// Wrap the component with a test provider
import {Home} from '../pages/index'
import { Feeds } from '../components/Feeds';

import React from 'react';
import { render, screen, waitFor , fireEvent, act} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';





const mockPageContext = {
  user: {
    _id: '62f886f66d3e42bd697be79c',
    userName: 'testuser',
    profilePicture: '/profile.jpg',
  },
};


// Mocked data
const mockUser = {
  _id: '62f886f66d3e42bd697be79c',
  userName: 'testUser',
  profilePicture: '/testProfilePicture.jpg',
};


const mockSearchedUser = [
  {
      _id: "647dca1a1fb0765f0c7be844",
      userName: "Brain",
      email: "Brain@yahoo.com",
      followers: [],
      following: [],
      profilePicture: "/1685965429939.jpeg",
      backgroundPicture: "/instagram-defaul_propic.jpeg"
  }]

const mockConvo = [
  {
    _id: '1',
    lastestMessages: {
      receiver: '1',
      read: false,
    },
  },
];

const mockFeeds =
  {
    _id :"647dca1a1fb0765f0c7be8456",
  media:"/post.jpeg",
  likes:[],
  text:"new kicks",
  user:"647dca1a1fb0765f0c7be846",
  comment:"",
  comments:[],
  owner:{
      _id:"647dca1a1fb0765f0c7be846",
      profilePicture:"/testProfilePicture.jpg",
      userName:"swag",
 

  }
}



const mocks = [
  {
    request: {
      query: FINDME,
    },
    result: {
      data: {
        findMe: mockUser,
      },
    },
  },
  {
    request: {
      query: CONVOLIST,
    },
    result: {
      data: {
        getConversations: mockConvo,
      },
    },
  },

  {
    request: {
      query: SEARCHUSER,
      variables: {
        input:{
          phrase:""
       }
 
      }
    },
    result: {
      data: {
        searchUser: mockSearchedUser,
      },
    },
  },
  {
    request: {
      query: GETFEED,
    },
    result: {
      data: {
        getFeed: mockFeeds,
      },
    },
  },

];

describe('test Feed', () => {
  it('renders the component', async () => {



    render(




        
    <PageContext.Provider value={mockPageContext}>
      <MockedProvider mocks={mocks} addTypename={false}>

     
      <Feeds e={mockFeeds} />
 
     </MockedProvider>
   </PageContext.Provider>  
    );





           expect(  screen.getByText('new kicks')).toBeDefined();



  });
});