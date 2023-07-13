import { PageContext } from '../pages/context/AuthContext';
import {MobileBottomNav} from '../components/MobileBottomNav';
import { MockedProvider } from "@apollo/client/testing";
import {  FINDDUSERBYUSERNAME, FINDPOSTBYUSERNAME} from '../graphql/quaries'
// Wrap the component with a test provider
import React from 'react';
import { render, screen, waitFor , fireEvent, act} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { UserProfile } from '../components/UserProfile';




const mockPageContext = {
  user: {
    _id: '62f886f66d3e42bd697be79c',
    userName: 'swag_boy',
    profilePicture: '/profile.jpg',
  },
};


// Mocked data

const mockPosts = [
  {

_id: '640824159dadc5b073413690',
text : "`Selling these ones",
media : "/media/posts/1678255125310.jpg",
user : "6307ab5e0995fa698529c8a5",
likes: [],
comment : [],
  },
  {

_id: '640824159dadc5b073413690',
text : "`Selling these ones",
media : "/media/posts/1678255125310.jpg",
user : "6307ab5e0995fa698529c8a5",
likes: [],
comment : [],
  }
]

const mockUser = 


     {
          _id:"62f886f66d3e42bd697be79c",
          profilePicture:"/profilePic.jpg",
          followers:[],
          following:[],
          userName:"swag_boy",
      }





const mocks = [
  {
    request: {
      query: FINDPOSTBYUSERNAME ,
      variables:{

          input:{
               username:"swag_boy"
           }
      }
      
    },
    result: {
      data: {
           finePostsByUsername: mockPosts,
      },
    },
  },
 
  {
    request: {
      query: FINDDUSERBYUSERNAME ,
      variables:{

          input:{
               username:"swag_boy"
           }
      }
      
    },
    result: {
      data: {
          findUserByUsername: mockUser,
      },
    },
  },
 
];




jest.mock("next/router", () => ({
     useRouter() {
         return {
             route: "/",
             pathname: "",
             query: "",
             asPath: "",
         };
     },
 }));


 
describe('Testing MobileBottomNav', () => {
  it('renders the component', async () => {



    render(     
    <PageContext.Provider value={mockPageContext}>
      <MockedProvider mocks={mocks} addTypename={false}>

     
      <UserProfile username={"swag_boy"} />
 
     </MockedProvider>
   </PageContext.Provider>  
    );



    await waitFor(() => {



     expect(screen.getByText('followers')).toBeDefined();

    
    });




  });
});