import React from 'react'
import { useContext } from 'react'

const User = () => {
  const { navbar, setNavbar, cart , setCart} = useContext(PageContext)
  return (
    <div>User</div>
  )
}

export default User