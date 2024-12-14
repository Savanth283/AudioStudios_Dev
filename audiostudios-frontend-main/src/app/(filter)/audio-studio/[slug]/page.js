//'use client';
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
    {/* ------ Header Wraper Start */}
    <Suspense fallback={<Loading />}>
    <DetailsSlider data={data.Gallery_details} />
    </Suspense>
    {/* ------ Header Wraper End */}

    {/* ------ Details Wrapper Start -------------- */}
    <div className="md:pt-6 pt-3 pb-8">
        <div className="container mx-auto">
            <div className="flex flex-wrap flex-row">
                {/* Details Start */}
                <div className='w-full 2xl:w-[70%] xl:w-[65%] lg:w-[60%] lg:pr-4'>
                    <div className='flex md:flex-row flex-wrap'> 
                        <div className="w-full md:w-[calc(100%-240px)]"> 
                            <h1 className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-_dark font-semibold">{data.code_name}</h1>
                            <p className="text-_grey inline-flex flex-wrap">
                                <span className="pe-3">{data.full_address}</span>
                                {/* <span className='text-_yellow inline-flex w-[130px]'><TiLocationOutline className='text-xl'/> 1.3 KM</span> */}
                            </p>
                            <div className="mt-2">
                            {reviewData.total_count && reviewData.total_count.length != 0 && (

                                <div className="inline-flex items-center"> 
                                    <div className="inline-flex items-center bg-_green px-2 py-[2px] text-white text-base md:text-lg font-semibold rounded-md">
                                        {reviewData.total_count[0]?.averageRating.toFixed(1)} <AiFillStar/>
                                    </div>
                                    <div className="text-base lg:text-lg ml-3">({reviewData.total_count[0]?.totalRatingCount})</div>
                                </div> 

                            )}

                            </div>
                        </div>
                        <div className="w-full md:w-[240px] sm:max-w-[300px] mt-3 mt-md-0"> 
                            <div className="flex items-center"> 
                                <div className="max-w-[240px] w-full flex items-center"> 
                                    {/* <div className="w-[50px] md:w-[80px] lg:w-[100px]"> 
                                        <img src="/images/icons/gold-lg.svg" alt="gold" />
                                    </div> */}

                                    {data.quality_type && data.quality_type === "GOLD" && (
                                    <div className="w-[50px] md:w-[80px] lg:w-[100px]">
                                        <img src="/images/icons/gold-lg.svg" alt="gold" />
                                    </div>
                                    )}
                                    {data.quality_type && data.quality_type === "SILVER" && (
                                    <div className="w-[50px] md:w-[80px] lg:w-[100px]">
                                        <img src="/images/icons/silver-lg.svg" alt="SILVER" />
                                    </div>
                                    )}
                                    {data.quality_type && data.quality_type === "PLATINUM" && (
                                    <div className="w-[50px] md:w-[80px] lg:w-[100px]">
                                        <img src="/images/icons/platinum-lg.svg" alt="platinum" />
                                    </div>
                                    )}




                                    <div className='lg:w-[calc(100%-100px)] md:w-[calc(100%-80px)] w-[calc(100%-50px)] pl-3'> 
                                        <div className="flex md:block"> 
                                            <div className="bg-_gray-light sm:p-3 p-2 text-center md:rounded-t-md md:rounded-r-md rounded-tl-md rounded-bl-md w-[100px] md:w-full">
                                              
                                               {defaultPriceObject.offer_price ? (
                                                <>
                                                    <div className="text-_green text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold">
                                                    ₹{defaultPriceObject.offer_price}
                                                    </div>
                                                    <div className="text-sm md:text-base line-through">₹{defaultPriceObject.price}</div>
                                                </>
                                                ) : (
                                                <div className="text-_green text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold">₹{defaultPriceObject.price}</div>
                                                )}


                                            </div>
                                            <div className="p-2 text-white bg-_green text-center md:rounded-b-md md:rounded-bl-md w-[calc(100%-100px)] md:w-full flex md:block items-center rounded-tr-md rounded-br-md text-sm sm:text-base">{defaultPriceObject.package_type}</div>
                                        </div>
                                    </div>



                                </div>

                                <div className='w-[150px] sm:hidden pl-2 flex flex-col'>
                                    <a href="#bookSection"
                                    className='py-3 2xl:py-2 sm:px-3 px-1 xl:px-4 bg-_teal text-white rounded-lg w-full block transition duration-300 hover:bg-_dark hover:text-_teal text-sm md:text-base 2xl:text-lg text-center'>
                                    Book Now
                                    </a>
                                </div>



                            </div>
                        </div>
                    </div>

                    {/* Our Sample Section */}
                    {data.sample_file && data.sample_file.length != 0 && (
                    <div className="bg-_teal rounded-md p-4 lg:p-5 mt-4">
                        <h2 className='text-white text-base md:text-lg lg:text-xl xl:text-2xl font-bold'>Our Sample</h2>

                        <div className="mt-4">
                            <div className="grid xl:grid-cols-2 gap-5">
                                {data.sample_file?.map((sample, index)=> {
                                    return <AudioSample key={index} sample={sample}/>
                                })}
                                
                                {/* <AudioSample/>
                                <AudioSample/>
                                <AudioSample/> */}
                            </div>
                        </div>
                    </div>
                    )}  
                    {/* Our Sample Section end */}
                    
                    {data.user_type === "studio" && (
                    <div className="mt-6 md:mt-8 lg:mt-10">
                        <h3 className="text-base md:text-lg lg:text-xl text-_dark font-semibold mb-4 md:mb-5">Features</h3>

                        <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-3 gap-3">

                            {/* sound_proofing_type  */}
                            {/* {data.studio_details?.sound_proofing_type && data.studio_details?.sound_proofing_type === "semi soundproof" && (
                            <div className="flex items-center">
                                <RiCheckboxCircleFill className='text-lg lg:text-2xl text-_teal'/>
                                <span className="text-base lg:text-lg text-_dark pl-1">Semi Soundproof System</span>
                            </div>
                            )}

                            {data.studio_details?.sound_proofing_type && data.studio_details?.sound_proofing_type === "full soundproof" && (
                            <div className="flex items-center">
                                <RiCheckboxCircleFill className='text-lg lg:text-2xl text-_teal'/>
                                <span className="text-base lg:text-lg text-_dark pl-1">Full Soundproof System</span>
                            </div>
                            )} */}

                            {data.studio_details?.sound_proofing_type &&  (
                            <div className="flex items-center">
                                <RiCheckboxCircleFill className='text-lg lg:text-2xl text-_teal'/>
                                <span className="text-base lg:text-lg text-_dark pl-1">{data.studio_details?.sound_proofing_type}</span>
                            </div>
                            )}

                            {/* sound_proofing_type end  */}

                            <div className="flex items-center">
                                <RiCheckboxCircleFill className='text-lg lg:text-2xl text-_teal'/>
                                <span className="text-base lg:text-lg text-_dark pl-1 capitalize">{data.studio_details?.acoustic_type}</span>
                            </div>

                            <div className="flex items-center">
                                <RiCheckboxCircleFill className='text-lg lg:text-2xl text-_teal'/>
                                <span className="text-base lg:text-lg text-_dark pl-1 capitalize">{data.studio_details?.audio_interface}</span>
                            </div>

                            {/* dubbing_booth */}
                            {data.studio_details?.dubbing_booth && data.studio_details?.dubbing_booth === "Yes" && (
                            <div className="flex items-center">
                                <RiCheckboxCircleFill className='text-lg lg:text-2xl text-_teal'/>
                                <span className="text-base lg:text-lg text-_dark pl-1">Dubbing Booth Available</span>
                            </div>
                            )}

                            {/* equipments */}
                            {data.equipments_name && (
                            <div className="flex items-center">
                                <RiCheckboxCircleFill className='text-lg lg:text-2xl text-_teal'/>
                                <span className="text-base lg:text-lg text-_dark pl-1 capitalize">{data.equipments_name}</span>
                            </div>
                            )}

                            {/* Air Condition */}
                            {data.studio_details?.air_condition && data.studio_details?.air_condition ==="Yes" && (
                                <div className="flex items-center">
                                <RiCheckboxCircleFill className='text-lg lg:text-2xl text-_teal'/>
                                <span className="text-base lg:text-lg text-_dark pl-1">Air Conditioner Available</span>
                                </div>
                            )}

                           
                            {data.studio_details?.lunch_area && data.studio_details?.lunch_area === "Yes" && (
                            <div className="flex items-center">
                                <RiCheckboxCircleFill className='text-lg lg:text-2xl text-_teal'/>
                                <span className="text-base lg:text-lg text-_dark pl-1">Lunch Area Available</span>
                            </div>
                            ) }

                            {data.studio_details?.dubbing_booth && data.studio_details?.dubbing_booth === "Yes" && (
                            <div className="flex items-center">
                                <RiCheckboxCircleFill className='text-lg lg:text-2xl text-_teal'/>
                                <span className="text-base lg:text-lg text-_dark pl-1">Dubbing Booth Available</span>
                            </div>
                            )}

                            {data.studio_details?.toilet_type && (
                            <div className="flex items-center">
                                <RiCheckboxCircleFill className='text-lg lg:text-2xl text-_teal'/>
                                <span className="text-base lg:text-lg text-_dark pl-1 capitalize">{data.studio_details?.toilet_type}</span>
                            </div>
                            )}
                        </div>
                    </div>
                    )}

                    {data.user_type === "creator" && (
                    <div className="mt-6 md:mt-8 lg:mt-10">
                        <h3 className="text-base md:text-lg lg:text-xl text-_dark font-semibold mb-4 md:mb-5">Features</h3>

                        <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-3 gap-3">

                        {data.creators_details.category && (
                            <div className="flex items-center">
                                <RiCheckboxCircleFill className='text-lg lg:text-2xl text-_teal'/>
                                <span className="text-base lg:text-lg text-_dark pl-1">{data.creators_details.category.charAt(0).toUpperCase() + data.creators_details.category.slice(1).toLowerCase()}</span>
                            </div>
                            )}

                            {data.creators_details.exprience && (
                            <div className="flex items-center">
                                <RiCheckboxCircleFill className='text-lg lg:text-2xl text-_teal'/>
                                <span className="text-base lg:text-lg text-_dark pl-1">{data.creators_details.exprience} Years Experience</span>
                            </div>
                            )}

                            {data.creators_details.instrument_type && (
                            <div className="flex items-center">
                                <RiCheckboxCircleFill className='text-lg lg:text-2xl text-_teal'/>
                                <span className="text-base lg:text-lg text-_dark pl-1">Instrument: {data.creators_details.instrument_type.charAt(0).toUpperCase() + data.creators_details.instrument_type.slice(1).toLowerCase()}</span>
                            </div>
                            )}

                            {data.creators_details.home_setup === "Yes" && (
                            <div className="flex items-center">
                                <RiCheckboxCircleFill className='text-lg lg:text-2xl text-_teal'/>
                                <span className="text-base lg:text-lg text-_dark pl-1">Home Setup Available</span>
                            </div>
                            )}
                                                            
                        </div>
                    </div>
                    )}

                    {data.creators_details && data.creators_details.languages && (
                    <div className="mt-6 md:mt-8 lg:mt-10">
                        <h3 className="text-base md:text-lg lg:text-xl text-_dark font-semibold mb-2 md:mb-3">Languages :</h3>
                        <p className='text-_dark'>{data.creators_details.languages.join(", ")}</p>
                    </div>
                     )} 

                    {data.creators_details && data.creators_details.skills && (
                    <div className="mt-6 md:mt-8 lg:mt-10">
                        <h3 className="text-base md:text-lg lg:text-xl text-_dark font-semibold mb-2 md:mb-3">Skills :</h3>
                        <p className='text-_dark'>{data.creators_details.skills.join(", ")}</p>
                    </div>
                     )} 

                    {data.creators_details && data.creators_details.instruments && (
                    <div className="mt-6 md:mt-8 lg:mt-10">
                        <h3 className="text-base md:text-lg lg:text-xl text-_dark font-semibold mb-2 md:mb-3">Instruments :</h3>
                        <p className='text-_dark'>{data.creators_details.instruments.join(", ")}</p>
                    </div>
                     )} 

                    {data.creators_details && data.creators_details.genres && (
                    <div className="mt-6 md:mt-8 lg:mt-10">
                        <h3 className="text-base md:text-lg lg:text-xl text-_dark font-semibold mb-2 md:mb-3">Genres :</h3>
                        <p className='text-_dark'>{data.creators_details.genres.join(", ")}</p>
                    </div>
                     )} 



                    {data.description && (
                    <div className="mt-6 md:mt-8 lg:mt-10">
                        <h3 className="text-base md:text-lg lg:text-xl text-_dark font-semibold mb-2 md:mb-3">Description</h3>
                        <p className='text-_dark'>{data.description}</p>
                        {/* <p className='text-_dark'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> */}
                    </div>
                     )} 




                    <div className="mt-6 md:mt-8 lg:mt-10">
                        <h3 className="text-base md:text-lg lg:text-xl text-_dark font-semibold mb-2 md:mb-3">Our Pricing </h3>
                        <div className="grid sm:grid-cols-2 gap-3">


                            {/* <div className="py-3 px-4 px-md-5 rounded-md bg-_gray-light flex justify-between items-center">
                                <span className="text-_dark text-sm md:text-base xl:text-xl">Per Hour:</span>
                                <div className='flex items-center space-x-2'>

                                
                                {data.pricing_details?.hourly_offer_price ? (
                                        <>
                                        <span className="text-_green text-sm md:text-base xl:text-xl">₹{data.pricing_details?.hourly_offer_price}</span>
                                        <span className="text-_gray text-sm md:text-sm xl:text-sm line-through">₹{data.pricing_details?.hourly_price}</span>
                                        </>
                                    ):<span className="text-_green text-sm md:text-base xl:text-xl">₹{data.pricing_details?.hourly_price}</span>}

                                </div>
                            </div> */}

                            {data.pricing_details?.map((price,index)=> (
                            <div key={index} className="py-3 px-4 px-md-5 rounded-md bg-_gray-light flex justify-between items-center">
                                <span className="text-_dark text-sm md:text-base xl:text-xl">{price.package_type}:</span>

                                <div className='flex items-center space-x-2'>
                                    {price?.offer_price ? (
                                        <>
                                        <span className="text-_green text-sm md:text-base xl:text-xl">₹{price?.offer_price}</span>
                                        <span className="text-_gray text-sm md:text-sm xl:text-sm line-through">₹{price?.price}</span>
                                        </>
                                    ):<span className="text-_green text-sm md:text-base xl:text-xl">₹{price?.price}</span>}

                                </div>

                            </div>

                            ))}

{/*                             
                            {data.pricing_details?.other_packages && data.pricing_details?.other_packages.map((other_package,index)=> {
                                    return (
                                        <div key={index} className="py-3 px-4 px-md-5 rounded-md bg-_gray-light flex justify-between items-center">
                                        <span className="text-_dark text-sm md:text-base xl:text-xl">{other_package.hour} Hour:</span>
                                        <div className='flex items-center space-x-2'>

                                        {other_package.offer_price ? (
                                             <>
                                             <span className="text-_green text-sm md:text-base xl:text-xl">₹{other_package.offer_price}</span>
                                             <span className="text-_gray text-sm md:text-sm xl:text-sm line-through">₹{other_package.price}</span>
                                             </>
                                        ): <span className="text-_green text-sm md:text-base xl:text-xl">₹{other_package.price}</span>
                                        }
                                        </div>
                                        </div>
                                    )
                                    })} */}



                            {/* <div className="py-3 px-4 px-md-5 rounded-md bg-_gray-light flex justify-between items-center">
                                <span className="text-_dark text-sm md:text-base xl:text-xl">100 Hour:</span>
                                <div className='flex items-center space-x-2'>
                                <span className="text-_green text-sm md:text-base xl:text-xl">₹10699</span>
                                <span className="text-_gray text-sm md:text-sm xl:text-sm line-through">₹20699</span>
                                </div>
                            </div>
                            <div className="py-3 px-4 px-md-5 rounded-md bg-_gray-light flex justify-between items-center">
                                <span className="text-_dark text-sm md:text-base xl:text-xl">200 Hour:</span>
                                <div className='flex items-center space-x-2'>
                                <span className="text-_green text-sm md:text-base xl:text-xl">₹3699</span>
                                <span className="text-_gray text-sm md:text-sm xl:text-sm line-through">₹40699</span>
                                </div>
                            </div> */}
                        </div>
                    </div>








                    {data.studio_details?.daw && (
                        <div className="mt-6 md:mt-8 lg:mt-10">
                        <h3 className="text-base md:text-lg lg:text-xl text-_dark font-semibold mb-2 md:mb-3">Daw</h3>
                        <p className='text-_dark'>{data.studio_details?.daw}</p> 
                    </div>
                    )}

                    {data.studio_details?.computer_configuration && (
                        <div className="mt-6 md:mt-8 lg:mt-10">
                        <h3 className="text-base md:text-lg lg:text-xl text-_dark font-semibold mb-2 md:mb-3">Computer Configuration</h3>
                        <p className='text-_dark'>{data.studio_details?.computer_configuration}</p> 
                    </div>
                    )}

                    {data.studio_details?.microphones && (
                        <div className="mt-6 md:mt-8 lg:mt-10">
                        <h3 className="text-base md:text-lg lg:text-xl text-_dark font-semibold mb-2 md:mb-3">Microphones</h3>
                        <p className='text-_dark'>{data.studio_details?.microphones}</p> 
                    </div>
                    )}

                    {data.studio_details?.monitors && (
                        <div className="mt-6 md:mt-8 lg:mt-10">
                        <h3 className="text-base md:text-lg lg:text-xl text-_dark font-semibold mb-2 md:mb-3">Monitors</h3>
                        <p className='text-_dark'>{data.studio_details?.monitors}</p> 
                    </div>
                    )}

                    {data.rules_and_regulation && (
                    <div className="mt-6 md:mt-8 lg:mt-10">
                        <h3 className="text-base md:text-lg lg:text-xl text-_dark font-semibold mb-2 md:mb-3">Our rules and regulations</h3>
                        <p className='text-_dark'>{data.rules_and_regulation}</p> 
                    </div>
                    )}




                        {middleAddData && (
                            <>
                            {/* mobile */}
                        <div className="my-6 text-center block md:hidden">
                            <Link href={middleAddData[0]?.ad_link} className="block ">
                                <Image src={process.env.NEXT_PUBLIC_S3_BUCKET_URL + middleAddData[0].mobile_ad_image} className='img-fluid w-full object-cover' width={1000} height={300} alt="banner"  />
                                
                                {/* <img src="/images/banners/add-banner.jpg" className='img-fluid' alt="banner" /> */}
                            </Link>
                        </div>
                            {/* desktop */}
                        <div className="my-6 text-center hidden md:block">
                            <Link href={middleAddData[0]?.ad_link} className="block ">
                                <Image src={process.env.NEXT_PUBLIC_S3_BUCKET_URL + middleAddData[0].ad_image} className='img-fluid w-full object-cover' width={1000} height={300} alt="banner"  />
                                
                                {/* <img src="/images/banners/add-banner.jpg" className='img-fluid' alt="banner" /> */}
                            </Link>
                        </div>
                            </>
                        )}

                    <div className="mt-6 md:mt-8 lg:mt-10">
                        <h3 className="text-base md:text-lg lg:text-xl text-_dark font-semibold mb-2 md:mb-3">Ratings and reviews</h3>
                        
                        {reviewData.total_count.length != 0 ? ( 
                        <div className="flex">
                            <div className="bg-_gray-light px-3 sm:px-4 lg:px-5 py-8 sm:py-10 md:py-12 rounded-lg border border-border-color text-center w-[150px] md:w-[200px] lg:w-[250px]">
                                <div className="inline-flex items-center bg-_green px-2 py-[2px] text-white text-base md:text-lg font-semibold rounded-md">
                                    {reviewData.total_count && reviewData.total_count[0]?.averageRating.toFixed(1)}<AiFillStar/>
                                </div>
                                
                                <div className="text-base lg:text-lg text-center text-_dark font-semibold mt-3">{reviewData.rating_status}</div>
                                <div className="text-base lg:text-lg text-center text-_gray mt-3 leading-[1.2]">{reviewData.total_count && reviewData.total_count[0]?.totalRatingCount} Ratings and {reviewData.total_count && reviewData.total_count[0]?.totalReviewCount} reviews </div> 
                            </div>
                            <div className="w-[calc(100%-148px)] md:w-[calc(100%-198px)] lg:w-[calc(100%-248px)] -ml-[4px] p-5 border border-border-color rounded-lg flex flex-column items-center rounded-tl-none rounded-bl-none border-l-0">
                                <div className="w-full">
                                <RatingProgressBar RatingBar={reviewData.rating_count} totalCount={reviewData.total_count}  />
                                </div>
                            </div>
                        </div>
                        ) : (
                            <span>No Ratings and reviews Given</span>
                        )} 

                        {/* Review Detail */}
                       
                        <ShowRating reviewList={reviewData.rating_list} />

                        {/* <button className='text-base md:text-lg font-semibold text-_yellow tranistion-all duration-300 hover:text-_green'>More Comment</button> */}

                        <GiveRating user_id={data.user_id}/>

                    </div>

                </div>
                {/* Details End */}

                {/* Right Details */}
                <div className="w-full 2xl:w-[30%] xl:w-[35%] lg:w-[40%] lg:pl-4 mt-6 lg:mt-0">
                <BookingSection type={data.user_type} id={data.user_id} pricingDetails={data.pricing_details} />
                </div>
                {/* Right Details End */}
            </div>
        </div>
    </div>
    {/* ------ Details Wrapper End -------------- */}




    {bottomAdddData && (
        <>
        {/* mobile */}
    <div className="my-6 text-center px-2 block md:hidden">
        <Link href={bottomAdddData[0]?.ad_link} target='_blank' className="block px-2 max-w-[950px] mx-auto">
            <Image src={process.env.NEXT_PUBLIC_S3_BUCKET_URL + bottomAdddData[0].mobile_ad_image} className='img-fluid w-full object-cover' height={200} width={950}  alt="banner" />
        </Link>
    </div>

        {/* desktop */}
    <div className="my-6 text-center px-2 hidden md:block">
        <Link href={bottomAdddData[0]?.ad_link} target='_blank' className="block px-2 max-w-[950px] mx-auto">
            <Image src={process.env.NEXT_PUBLIC_S3_BUCKET_URL + bottomAdddData[0].ad_image} className='img-fluid w-full object-cover' height={200} width={950}  alt="banner" />
        </Link>
    </div>
          </>
    )}





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