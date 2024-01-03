import React, { useEffect } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Watermark } from 'antd';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Bulb from './pages/Bulb';
const Layout = () => {
  // document.addEventListener('contextmenu', event => event.preventDefault());
  useEffect(()=>{
      AOS.init()
  })
  useEffect(() => {
    const jumboAnimation = document.querySelector('.jumbo');

    if (jumboAnimation) {
      jumboAnimation.style.animation = 'jumbo 60s linear infinite';
    }
  }, []);
  return (  

    <div >
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
      <div className='dark jumbo relative flex flex-col h-[100vh] items-center justify-center bg-white dark:bg-transparent transition-bg'>
        <div className="absolute inset-0 overflow-hidden">
          <div className="jumbo absolute -inset-[10px] opacity-50"></div>
        </div>
        <div className="mt-4">
        <Bulb/>
            <Outlet/>
        </div>
      </div>
    </Watermark>
        <Footer/>
 </div>
  )
}

export default Layout