import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'
import MobileTopNav from '../pages/components/MobileTopNav'
import { MockedProvider } from "@apollo/client/testing";

 
describe('Testing MoblieTopNav', () => {
  it('Ensure that the Insta Logo has 4xl text size', () => {
    render(
    <MockedProvider  addTypename={false}>
<MobileTopNav  />
    </MockedProvider>
    
    )



    const insta = screen.getByText('Insta');
  
    expect(insta.className).toContain("text-4xl");
  })
})