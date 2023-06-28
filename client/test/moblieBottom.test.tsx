 import { PageContext } from '../pages/context/AuthContext';
import {MobileBottomNav} from '../pages/components/MobileBottomNav';
import { MockedProvider } from "@apollo/client/testing";
import { FINDME,CONVOLIST, SEARCHUSER} from '../graphql/quaries'
// Wrap the component with a test provider
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


const searchedUser = [
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
        searchUser: searchedUser,
      },
    },
  },

];





describe('Testing MobileBottomNav', () => {
  it('renders the component', async () => {



    render(




        
    <PageContext.Provider value={mockPageContext}>
      <MockedProvider mocks={mocks} addTypename={false}>

     
      <MobileBottomNav />
 
     </MockedProvider>
   </PageContext.Provider>  
    );



    await waitFor(() => {



     expect(screen.getByText('Home').className).toContain("hidden lg:block");
      expect(screen.getByText('Insta')).toBeDefined();
    
    });




  });
});