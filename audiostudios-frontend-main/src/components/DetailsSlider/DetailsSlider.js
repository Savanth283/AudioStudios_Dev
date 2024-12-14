'use client';
import React from 'react'
import dynamic from 'next/dynamic';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Image from 'next/image';

var $ = require("jquery");
if (typeof window !== "undefined") {
  // Client-side-only code
  window.$ = window.jQuery = require("jquery");
}

const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,});

const options = {
    loop: true,
    center: true,
    items:1.75,
    dots: false,
    nav: true,
    margin:12,
    navText: [
        '<img src="/images/icons/arrow-left-white.svg" alt="left-arrow" />',
        '<img src="/images/icons/arrow-right-white.svg" alt="left-arrow" />',
    ],
    responsiveClass: true,
    responsive:{
        0:{ items: 1, dots:true, nav:false },
        576: { items: 1, dots:true, nav:false },
        768: { items: 1.5, dots:true, nav:false },
        992: { items: 1.65, dots:false, nav:true },
        1200: { items: 1.75, dots:false, nav:true },
    }
}

const DetailsSlider = ({data,codeName}) => {
  //console.log("all list",data)
  //console.log("loading galary")
  return (
    <div className="pb-2 sm:pb-4 md:pb-5 lg:pb-8 ml:pb-10">
    <div className="container max-w-none">
    <OwlCarousel 
         
        {...options}
        className={` heroCarousel slider-items owl-theme rightAligned`} 
      >
        {data.map((image,index)=> {
          return (
          <div className="" key={index}>
            <Image height={400} width={800} src={process.env.NEXT_PUBLIC_S3_BUCKET_URL + image.image} className='w-full lg:h-[calc(30vh+250px)] md:h-[calc(15vh+200px)] h-[calc(10vh+100px)] object-contain bg-_dark object-center bg-no-repeat bg-cover' style={{
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${process.env.NEXT_PUBLIC_S3_BUCKET_URL + image.image})`
  }} alt={codeName + index} />
          </div> 
          )
        })}

      </OwlCarousel>

    </div>
</div>
  )
}

export default DetailsSlider