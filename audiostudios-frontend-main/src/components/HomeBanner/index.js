"use client";
import React from 'react'
// import { Carousel } from 'flowbite-react'
import Link from 'next/link';
import Image from 'next/image';
// import useSWR from 'swr'
import { useEffect, useState } from 'react';
// import axios from 'axios';
// import dynamic from 'next/dynamic';
// import "owl.carousel/dist/assets/owl.carousel.css";
// import "owl.carousel/dist/assets/owl.theme.default.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// async function homeBannerData() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banner-list?position=top`)
//     return res.json();
//   }

// const fetcher = url => axios.get(url).then(res => res.data)
//const fetcher = (...args) => fetch(...args).then(res => res.json())

const HomeBanner = ({HomeBannerAddList}) => {
 // console.log("HomeBannerAddList",HomeBannerAddList)
  //const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/banner-list?position=top`, fetcher)
  //console.log("data",data)
  // const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  // const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/banner-list?position=top`, fetcher);

  //console.log("render")

// const [bannerList,setBannerList] = useState();

  // useEffect(()=>{
  //   try{
  //     const res = axios.get(`${process.env.NEXT_PUBLIC_API_URL}/banner-list?position=top`)
  //     .then((response) => {
  //       const homeBannerList = response.data;
  //       setBannerList(homeBannerList)
  //       console.log("homeBannerList",homeBannerList)
  //     })

  //   } catch (error) {
  //     console.log(error)
  //   }

  // },[])
// console.log("bannerList",bannerList)
  //const  {homeBannerData}  = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/banner-list?position=top`, fetcher)


  // const homeBannerList = await homeBannerData();
  //console.log("homeBannerList",homeBannerData)


  // var $ = require("jquery");
  // if (typeof window !== "undefined") {
  //   // Client-side-only code
  //   window.$ = window.jQuery = require("jquery");
  // }
  
  // const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  //   ssr: false,});
  
  // const options = {
  //     loop: true,
  //     center: true,
  //     items:1,
  //     dots: false,
  //     nav: true,
  //     margin:12,
  //     navText: [
  //         '<img src="/images/icons/arrow-left-white.svg" alt="left-arrow" />',
  //         '<img src="/images/icons/arrow-right-white.svg" alt="left-arrow" />',
  //     ],
     
  //     autoplay: true, // Enable autoplay
  //     autoplayTimeout: 5000, // Set the autoplay timeout in milliseconds (e.g., 5000ms = 5 seconds)
  //     smartSpeed: 700, // Set the duration of the slide transition animation in milliseconds (e.g., 1000ms = 1 second)
  //     responsiveClass: true,
  //     responsive:{
  //         0:{ items: 1, dots:true, nav:false },
  //         576: { items: 1, dots:true, nav:false },
  //         768: { items: 1, dots:true, nav:false },
  //         992: { items: 1, dots:false, nav:true },
  //         1200: { items: 1, dots:false, nav:true },
  //     }
  // }

  var settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };


  return (
    <>
    <div className="container mx-auto">
      {/* for desktop */}
    <div className="  hidden md:block -z-10">
    
  {/* <Carousel slideInterval={5000}>
    {HomeBannerAddList?.map((banner,index)=> {
      return (

        <>
        <Link key={index} href={banner?.ad_link} className='block' target="_blank" >
          <img 
          className=' object-cover object-center w-full' 
            width="1400"
            height="450"
            alt='banner add'
            src={process.env.NEXT_PUBLIC_S3_BUCKET_URL + banner.ad_image} 
          />
        </Link>
        </>
      )
    })}

  </Carousel> */}

      <Slider {...settings}
         className={` heroCarousel slider-items owl-theme rightAligned`} 
       >
         {HomeBannerAddList?.map((banner,index)=> {
      return (

        <>
        <Link key={index} href={banner?.ad_link} className='block' target="_blank" >
          <Image width={1400} height={450} 
          className=' object-cover object-center w-full' 
            // width="1400"
            // height="450"
            alt='banner add'
            src={process.env.NEXT_PUBLIC_S3_BUCKET_URL + banner.ad_image} 
          />
        </Link>
        </>
      )
    })}
 
 </Slider>


</div>

{/* for mobile */}
<div className="block md:hidden mt-2 z-10">
    
  {/* <Carousel slideInterval={5000}>
    {HomeBannerAddList?.map((banner,index)=> {
      return (

        <>
        <Link key={index} href={banner?.ad_link} className='block' target="_blank" >
        <img className=' object-cover object-center w-full'  alt='banner add'
          src={process.env.NEXT_PUBLIC_S3_BUCKET_URL +  banner.mobile_ad_image} 
        />
        </Link>
        </>
      )
    })}

  </Carousel> */}

        <Slider {...settings}
         className={` heroCarousel slider-items owl-theme rightAligned`} 
       >
         {HomeBannerAddList?.map((banner,index)=> {
          return (

            <>
            <Link key={index} href={banner?.ad_link} className='block' target="_blank" >
            <Image width={600} height={600} className=' object-cover object-center w-full'  alt='banner add'
              src={process.env.NEXT_PUBLIC_S3_BUCKET_URL +  banner.mobile_ad_image} 
            />
            </Link>
            </>
          )
    })}
 
 </Slider>


</div>
</div>
    </>

  )
}

export default HomeBanner