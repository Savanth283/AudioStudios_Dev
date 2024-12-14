'use client';

import React from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import MobileFooter from '@/components/MobileFooter'
import { usePathname } from 'next/navigation';
import { useState,useEffect } from 'react';
import WelcomeVideo from './WelcomeVideo/WelcomeVideo';


const Layout = ({ children,cityListData,gsData }) => {
  
  const routerPath = usePathname();
  //console.log("routerPath",routerPath);
  if (routerPath === '/login' || routerPath === '/signup' || routerPath === '/thank-you' || routerPath === '/forgot-password') {
    return <>{children}</>;
  }

  const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        function handleResize() {
          setIsMobile(window.innerWidth < 768);
        }
    
        window.addEventListener('resize', handleResize);
        handleResize();
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

  //const screen__width = window.innerWidth;
  // console.log('screen-size: ', screen__width);

  if (isMobile) {
    return (
        <>
        <Header cityListData={cityListData} gsData={gsData} />
        {children}
        <MobileFooter cityListData={cityListData} gsData={gsData} />
        </>
    )
  }

  return (
    <>
      <Header cityListData={cityListData} gsData={gsData} />
      {children}
      <Footer cityListData={cityListData} gsData={gsData} /> 
    </>
  )
}

export default Layout