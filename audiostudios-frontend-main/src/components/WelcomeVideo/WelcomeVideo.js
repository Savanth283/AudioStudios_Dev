"use client";

import ReactPlayer from 'react-player';
import Script from 'next/script';
import React, { useEffect, useRef, useState } from 'react';



const WelcomeVideo = () => {

//const [showWelcomeVideo, setShowWelcomeVideo] = useState(false);

  // useEffect(() => {
  //   const visitedBefore = localStorage.getItem('visitedBefore');
  //   if (!visitedBefore) {
  //     setShowWelcomeVideo(true);
  //     localStorage.setItem('visitedBefore', 'true');
  //   }
  // }, []);

  // if (!showWelcomeVideo) {
  //   return null;
  // }


  const videoRef = useRef(null);
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleVideoEnd = () => {
      setVideoEnded(true);
    };

    videoElement.addEventListener('ended', handleVideoEnd);

    return () => {
      videoElement.removeEventListener('ended', handleVideoEnd);
    };
  }, []);



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

  return (
    <>
    {!videoEnded ? (
      <div className="flex items-center justify-center fixed top-0 left-0 w-full h-full z-50 bg-[#00c7ba]" >
      {/* <div className='video-wrapper'> */}
      {/* <ReactPlayer className="react-player" width="100%" height="100%" url="/video/km_20220630-6_1440p.mp4" playing={true} controls={false} muted /> */}
     <div className='videoBox'>
      <video ref={videoRef} autoPlay muted controls playsInline id="vid" >
        {isMobile ? <source src="/video/mobilewelcome.mp4" type="video/mp4"/> : <source src="/video/desktopwelcome.mp4" type="video/mp4"/> }
      {/* <source src="/video/desktopwelcome.mp4" type="video/mp4"/> */}
      
      </video>
      </div>
      
    <Script id="show-pslyer">
  {`document.getElementById('vid').play()`}
    </Script>
      {/* </div> */}
    </div>
    ) : null }
    </>
    
  )
}

export default WelcomeVideo