import { PageContext } from '../pages/context/AuthContext';
import { MockedProvider } from "@apollo/client/testing";
import { LOGIN} from '../graphql/quaries'
import { useRouter } from 'next/router';
// Wrap the component with a test provider
import { Feeds } from '../pages/components/Feeds';
import {Chatlist} from '../pages/components/Chatlist';
import { RegiLogiter } from '../pages/register';

import React from 'react';
import { render, screen, waitFor , fireEvent, act} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Login } from '../pages/login';







const mockPageContext = {
  user: {
    _id: '62f886f66d3e42bd697be79c',
    userName: 'testuser500',
    profilePicture: '/profile.jpg',
  },
};


// Mocked data



const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBhNzEzY2VjNDA2MzkzZjJmYjZkNDAiLCJlbWFpbCI6InN3YWdfYm95QGdtYWlsMTAxejU1LmNvbSIsInVzZXJOYW1lIjoic3dhZ19ib3kxMDF6NTUiLCJpYXQiOjE2Nzg4MTg5MTZ9.GMVUdV-xscPuutIF9M5FrGJJ2mY_tcmRFXD8Bp5rQyk'


const mocks = [
 
  {
    request: {
      query: LOGIN,
      variables:{
          input:{
               userName_Email:'Mar_102355',
   password:'password',

          }
      }
    },
    result: {
      data: {
          login: mockToken,
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

     
      <Login/>
 
     </MockedProvider>
   </PageContext.Provider>  
    );


    const userNameInput = screen.getByPlaceholderText("Email or Username")
    const passwordInput = screen.getByPlaceholderText("Password")
    const submit = screen.getByTestId("submit")

    fireEvent.change(userNameInput, { target: { value: 'Mar_102355' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });


    fireEvent.click(submit)
 



    await waitFor(() => 
    expect(pushMock).toHaveBeenCalledTimes(1));

    // Assert that the router push was called with the expected URL
 expect(pushMock).toHaveBeenCalledWith('/');
  



  });
});









