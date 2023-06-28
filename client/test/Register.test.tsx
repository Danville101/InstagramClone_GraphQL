import { PageContext } from '../pages/context/AuthContext';
import { MockedProvider } from "@apollo/client/testing";
import { GETCONVO, CONVOLIST, CREATE_USER } from '../graphql/quaries'
import { useRouter } from 'next/router';
// Wrap the component with a test provider
import { Feeds } from '../pages/components/Feeds';
import {Chatlist} from '../pages/components/Chatlist';
import { Register } from '../pages/register';

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



const mockNewUser = {_id:'62f886f66d3e42bd697be79c',
email: "mark.grfamxmy@gmail.com",
userName: "Mar_102355",
profilePicture: "http://127.0.0.1:4040/media/1678233937364.jpg",
backgroundPicture:"http://localhost:8080/public/twitter-defaul_propic.jpeg",
password: "$2b$10$x.dbAeLhw1ZcJmZ2k3I/VezFOeTY58ESENDjyK6U8HmSx4KxA0O.m",

dateOfBirth: '1905-March-5',

followers: [],

following: []}



const mocks = [
 
  {
    request: {
      query: CREATE_USER,
      variables:{
          input:{
               userName:'Mar_102355',
   email:'mark.grfamxmy@gmail.com',
   password:'password',
   password2:'password',
   dateOfBirth: '1905-March-5'

          }
      }
    },
    result: {
      data: {
          create: mockNewUser,
      },
    },
  }
 
  

];

describe('test Register', () => {
  it('renders the component', async () => {


     const pushMock = jest.fn(); 
     const replaceMock = jest.fn()
     jest.spyOn(require('next/router'), 'useRouter').mockImplementation(() => ({
       push: pushMock,
       replace: replaceMock
     }));
 



    render(




        
    <PageContext.Provider value={mockPageContext}>
      <MockedProvider mocks={mocks} addTypename={false}>

     
      <Register/>
 
     </MockedProvider>
   </PageContext.Provider>  
    );


    const nameInput = screen.getByPlaceholderText("Name")
    const emailInput = screen.getByPlaceholderText("Email")
    const password1Input = screen.getByTestId("Password1")
    const password2Input = screen.getByTestId("Password2")
    const monthInput = screen.getByPlaceholderText("Month")
    const dayInput = screen.getByPlaceholderText("Day")
    const yearInput = screen.getByPlaceholderText("Year")
    const submit = screen.getByTestId("submit")

    fireEvent.change(nameInput, { target: { value: 'Mar_102355' } });
    fireEvent.change(emailInput, { target: { value: 'mark.grfamxmy@gmail.com' } });
    fireEvent.change(password1Input, { target: { value: 'password' } });
    fireEvent.change(password2Input, { target: { value: 'password' } });
    fireEvent.change(monthInput, { target: { value: 'March' } });
    fireEvent.change(dayInput, { target: { value: '5' } });
    fireEvent.change(yearInput, { target: { value: '1905' } });


    fireEvent.click(submit)
 



    await waitFor(() => 
    expect(pushMock).toHaveBeenCalledTimes(1));

    // Assert that the router push was called with the expected URL
 expect(pushMock).toHaveBeenCalledWith('/login');
  



  });
});









