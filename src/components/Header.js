import React from 'react'
import NavBar from './Navbar/Navbar'
import Timer from './pages/Timers'
import cookies from './cookies'

const Header = () => {
  return (
    <>
    <NavBar/>
   {cookies.get('adminData')?<Timer/>:""} 
    </>
  )
}

export default Header