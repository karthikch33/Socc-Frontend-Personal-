import React, { useEffect } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet-async';
import { Watermark } from 'antd';
import AOS from 'aos';
import 'aos/dist/aos.css';
const Layout = () => {
  // document.addEventListener('contextmenu', event => event.preventDefault());
  useEffect(()=>{
      AOS.init()
  })
  return (  

    <div>
        <Header/>
        <ToastContainer
            position='top-right'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='light'
          />
          <Watermark content="">
        <Outlet />
        </Watermark>
        <Footer/>
 </div>
  )
}

export default Layout