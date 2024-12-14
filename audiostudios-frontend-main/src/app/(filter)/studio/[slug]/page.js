//'use client';

import AsDetails from '@/components/AsDetails';

import { Suspense } from 'react';
import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import dynamic from 'next/dynamic'
import styles from "@/styles/StudioDetails.module.scss"
import DetailsSlider from '@/components/DetailsSlider/DetailsSlider';
import { TiLocationOutline } from 'react-icons/ti'
import { AiFillStar } from 'react-icons/ai'
import { RiCheckboxCircleFill } from 'react-icons/ri' 
import { TbThumbUp, TbThumbDown } from 'react-icons/tb' 


import StudioCard from '@/components/StudioCard'
import AudioSample from '@/components/AudioSample'
import { GiveRating } from '@/components/Rating/GiveRating';
import ShowRating from '@/components/ShowRating/ShowRating';

import RatingProgressBar from '@/components/RatingProgressBar/RatingProgressBar';
import BookingSection from '@/components/BookNow/BookingSection';
import ShareButton from '@/components/ShareButton';
// var $ = require("jquery");
// if (typeof window !== "undefined") {

//   window.$ = window.jQuery = require("jquery");
// }
// import "owl.carousel/dist/assets/owl.carousel.css";
// import "owl.carousel/dist/assets/owl.theme.default.css";

// const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
//     ssr: false,
//   });

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


// const RatingProgressBar=()=>{
//     return <>
//         <div className="flex items-center py-1">
//             <span className="text-base lg:text-xl font-semibold text-_dark">5</span>
//             <AiFillStar className="text-xl text-_dark mx-2"/>
//             <div className="w-full bg-border-color h-[4px] max-w-[calc(100%-90px)] mr-auto">
//                 <div className="bg-_green h-[4px]" style={{width: '65%'}}></div>
//             </div>
//             <span>278</span>
//         </div>
//         <div className="flex items-center py-1">
//             <span className="text-base lg:text-xl font-semibold text-_dark">4</span>
//             <AiFillStar className="text-xl text-_dark mx-2"/>
//             <div className="w-full bg-border-color h-[4px] max-w-[calc(100%-90px)] mr-auto">
//                 <div className="bg-_green h-[4px]" style={{width: '55%'}}></div>
//             </div>
//             <span>248</span>
//         </div>
//         <div className="flex items-center py-1">
//             <span className="text-base lg:text-xl font-semibold text-_dark">3</span>
//             <AiFillStar className="text-xl text-_dark mx-2"/>
//             <div className="w-full bg-border-color h-[4px] max-w-[calc(100%-90px)] mr-auto">
//                 <div className="bg-_green h-[4px]" style={{width: '45%'}}></div>
//             </div>
//             <span>125</span>
//         </div>
//         <div className="flex items-center py-1">
//             <span className="text-base lg:text-xl font-semibold text-_dark">2</span>
//             <AiFillStar className="text-xl text-_dark mx-2"/>
//             <div className="w-full bg-border-color h-[4px] max-w-[calc(100%-90px)] mr-auto">
//                 <div className="bg-_green h-[4px]" style={{width: '25%'}}></div>
//             </div>
//             <span>78</span>
//         </div>
//         <div className="flex items-center py-1">
//             <span className="text-base lg:text-xl font-semibold text-_dark">1</span>
//             <AiFillStar className="text-xl text-_dark mx-2"/>
//             <div className="w-full bg-border-color h-[4px] max-w-[calc(100%-90px)] mr-auto">
//                 <div className="bg-_green h-[4px]" style={{width: '15%'}}></div>
//             </div>
//             <span>8</span>
//         </div>
//     </>
// }

function Loading() {
    return <h2>🌀 Loading...</h2>;
  }

  //for seo 
  export async function generateMetadata({ params}) {
    // read route params
    const slug = params.slug
   
    // fetch data
    const product = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/view-details?slug=${slug}`).then((res) => res.json())

    return {
      title: product.code_name,
      
    }
  }

const Page = async ({params}) => {

    const slug = params.slug
    //console.log(slug)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/view-details?slug=${slug}`,{ cache: 'no-store' });
    const data = await res.json();
    //console.log("data",data)

    const reviewRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rating-details?slug=${slug}`,{ cache: 'no-store' });
    const reviewData = await reviewRes.json();

    //middle add
    const middleAddRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banner-list?position=Details-Middle`,{ cache: 'no-store' }); 
    const middleAddData = await middleAddRes.json();
    //console.log("middleAddData",middleAddData)
    
    //bottom add
    const bottomAdddRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banner-list?position=Details-Bottom`,{ cache: 'no-store' });
    const bottomAdddData = await bottomAdddRes.json();

    const defaultPriceObject = data.pricing_details.find(obj => obj.default_price === "Yes");

    //console.log("bottomAdddData",bottomAdddData)

    //console.log("reviewData",reviewData)

    //console.log("defaultPriceObject",defaultPriceObject)
  return (
    <>  
    <AsDetails data={data} slug={slug} defaultPriceObject={defaultPriceObject} reviewData={reviewData} middleAddData={middleAddData} bottomAdddData={bottomAdddData} />

   
  




    {/* ----------- Studio List Wrapper Start ----- */}
    {/* <div className="py-5 md:py-7">
            <div className="container mx-auto">
                <div className="grid lg:grid-cols-2 gap-6 justify-start">
                    <div>
                        <h2 className="2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl text-lg text-_dark fw-bold font-bold">Nearby Studios</h2>
                        <StudioCard  />
                    </div>
                     
                </div>
            </div>
        </div>
   */}
</>
  )
}

export default Page