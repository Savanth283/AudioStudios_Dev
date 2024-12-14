"use client";
import React from 'react'
import styles from './style.module.scss'
import Link from 'next/link'
import Image from 'next/image';
import { FaStar } from 'react-icons/fa'
import { BsCheckCircleFill } from 'react-icons/bs'
import { AiFillClockCircle } from 'react-icons/ai'
import { TiLocationOutline } from 'react-icons/ti'
import useSWR from 'swr'
import { useState,useEffect } from 'react';
import GetLocation from '../Location/GetLocation';
import BookNow from '../BookNow/BookNow';
import { getUserLocation } from '@/utlis/location/getLocation';

// const fetcher = (...args) => fetch(...args).then(res => res.json())

const CreatorsListCard = () => {

    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    const [creatorlist,setCreatorlist] = useState()

    useEffect(() => {
        getUserLocation()
          .then((location) => {
            console.log('location use', location);
            setLatitude(location.latitude);
            setLongitude(location.longitude);

          })
          .catch((error) => {
            console.error('Error getting location in useEffect:', error);
          });
      }, []);

      useEffect(() => {
        const fetchData = async () => {
        try {
            const list = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/creator-list?lat=${latitude}&long=${longitude}&limit=4`)
            const result = await list.json();
            setCreatorlist(result);
        } catch (e) {
            console.log(e)
        }
         }
     fetchData();
      }, [latitude,longitude])

    // const handleDataReceived = (latitude, longitude) => {
    //     setLatitude(latitude);
    //     setLongitude(longitude);
    //   };

    // const { data:creatorlist, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/creator-list?lat=${latitude}&long=${longitude}&limit=4`, fetcher)
      //console.log("creatorlist",creatorlist)

    //   const { data: creatorlist, error,isLoading  } = useSWR(
    //     latitude !== null && longitude !== null
    //       ? `${process.env.NEXT_PUBLIC_API_URL}/creator-list?lat=${latitude}&long=${longitude}&limit=4`
    //       : null,
    //     fetcher
    //   );
      

      if (creatorlist?.data && creatorlist?.data.length === 0) {
        return (
          <>
            <div className="py-5 md:py-7">
              <div className="container mx-auto">
                <div className="flex justify-between items-center">
                  <h2 className="2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl sm:text-lg text-base text-_dark fw-bold font-bold">
                    No Creators Available
                  </h2>
                  {/* <Link
                    href="/studio"
                    className="text-[11px] sm:text-sm md:text-base font-semibold rounded-sm px-3 py-2 bg-_gray-light text-_green transition-all duration-300 hover:text-_teal focus:text-_teal focus:bg-_gray"
                  >
                    View All
                  </Link> */}
                </div>
              </div>
            </div>
          </>
        );
      }


  return (
    <>
            {/* <GetLocation onDataReceived={handleDataReceived} /> */}

            <div className="py-5 md:py-7 mb-4">
                <div className="container mx-auto"> 
                    <div className='flex justify-between items-center'>
                        <h2 className="2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl sm:text-lg text-base text-_dark fw-bold font-bold">Nearby Creators</h2>
                        <Link href="creator" className='text-[11px] sm:text-sm md:text-base font-semibold rounded-sm px-3 py-2 bg-_gray-light text-_green transition-all duration-300 hover:text-_teal focus:text-_teal focus:bg-_gray'>View All</Link>
                    </div>
                    <div className="grid xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 justify-start mt-4 lg:mt-6">
                        
                        {creatorlist?.data && creatorlist?.data.map((creator,index) => ( 
                        <div key={index} className={`${styles.stuido__card} sm:flex p-2 sm:p-3 relative`}>
                            <Link href={`/${creator.user_type}/${creator.slug}`} className={`w-full sm:w-[30%] md:w-[30%] lg:w-[30%] xl:w-[35%]`}>
                                {/* <Image 
                                    src={process.env.NEXT_PUBLIC_S3_BUCKET_URL + creator.profile_image} width={390} height={260} 
                                    className='w-full h-[155px]  sm:h-[200px] lg:h-[240px] xl:h-[200px] 2xl:h-[240px] rounded-lg object-cover object-center' 
                                    alt={creator.code_name} 
                                />  */}

                            {creator.profile_image ? (
                                <Image 
                                src={process.env.NEXT_PUBLIC_S3_BUCKET_URL + creator.profile_image} width={390} height={260} 
                                className='w-full h-[155px]  sm:h-[200px] lg:h-[240px] xl:h-[200px] 2xl:h-[240px] rounded-lg object-cover object-center' 
                                alt={creator.code_name} 
                            /> 
                            ) : (
                                <Image 
                                src='/images/noimage.webp' width={390} height={260} 
                                className='opacity-25 w-full h-[155px]  sm:h-[200px] lg:h-[240px] xl:h-[200px] 2xl:h-[240px] rounded-lg object-cover object-center' 
                                alt={creator.code_name} 
                            /> 
                            )}

                            </Link>
                            {creator.rating && creator.rating.length != 0 && (
                            <div className={`items-center absolute top-[10px] left-[15px] sm:hidden`}>
                                <div className="bg-_green px-1 py-[3px] rounded inline-flex items-center">
                                    <span className="text-white me-1 font-semibold text-[9px] ">{creator.rating && creator.rating[0]?.averageRating.toFixed(1) }</span> 
                                    <FaStar className='text-white text-[10px] relative top-[-1px]' />
                                </div> 
                            </div>
                            )}
                            <div className={`${styles.caption} w-full sm:w-[70%] md:w-[70%] lg:w-[70%] xl:w-[65%] sm:pl-4 pt-3 sm:pt-0`}>
                                <div className="flex flex-wrap relative">
                                    <div className={`${styles.title__box}`}>
                                        <h3 className='leading-none'>
                                            <Link href={`/${creator.user_type}/${creator.slug}`} className="text-sm sm:text-base lg:text-lg font-bold text-_dark transition-all duration-300 hover:text-_green ">
                                                {creator.code_name}
                                            </Link>
                                        </h3>
                                        {creator.rating && creator.rating.length != 0 && (
                                        <div className="hidden sm:flex mt-3 items-center">
                                            <div className="bg-_green px-2 py-1 rounded inline-flex items-center">
                                                <span className="text-white me-1 font-semibold text-sm 2xl:text-base">{creator.rating && creator.rating[0]?.averageRating.toFixed(1) }</span> 
                                                <FaStar className='text-white text-xs 2xl:text-sm' />
                                            </div>
                                            <div className="text-gray ml-3">({creator.rating && creator.rating[0]?.totalRatingCount })</div>
                                        </div>
                                        )}
                                    </div>

                                {creator.type && creator.type === "GOLD" && (
                                <div className={`${styles.icon__box}`}>
                                    <img src="/images/icons/gold.svg" alt="gold" />
                                </div>
                                )}
                                {creator.type && creator.type === "SILVER" && (
                                <div className={`${styles.icon__box}`}>
                                    <img src="/images/icons/silver.svg" alt="SILVER" />
                                </div>
                                )}
                                {creator.type && creator.type === "PLATINUM" && (
                                <div className={`${styles.icon__box}`}>
                                    <img src="/images/icons/platinum.svg" alt="platinum" />
                                </div>
                                )}

                                </div>
                                <div className={`${styles.price__box} flex flex-wrap items-center mt-2 sm:mt-3`}>
                                    {creator.price_list?.find(obj => obj.default_price === "Yes")?.offer_price ? (
                                        <>
                                        <span className={`${styles.price} text-_dark sm:text-xl font-bold`}>₹{creator.price_list?.find(obj => obj.default_price === "Yes")?.offer_price}</span>
                                        <span className={`${styles.ptext} sm:text-sm text-gray pl-2 line-through`}>₹{creator.price_list?.find(obj => obj.default_price === "Yes")?.price}</span>
                                        </>
                                    ):<span className={`${styles.price} text-_dark sm:text-xl font-bold`}>₹{creator.price_list?.find(obj => obj.default_price === "Yes")?.price}</span>}
                                    <div className={`${styles.ptext} sm:text-sm pl-2 text-_teal`}>{creator.price_list?.find(obj => obj.default_price === "Yes")?.package_type}</div>
                                </div>
                                <p className="text-gray text-sm 2xl:text-base">
                                    <span className="hidden sm:inline pe-3">{creator.address}</span>
                                    <span className='text-_yellow inline text-sm 2xl:text-base w-[130px]'>
                                        <TiLocationOutline className='text-base sm:text-lg lg:text-xl inline'/>
                                        <span className={`${styles.distance}  text-_yellow inline sm:text-sm 2xl:text-base`}> {creator.distance} KM</span>
                                        
                                    </span>
                                </p>
                                <div className="divide my-3 hidden sm:block">
                                    <hr style={{ backgroundColor: '#D3D3D3' }} />
                                </div>
                                <div className="sm:flex justify-between mt-2.5 sm:mt-0">
                                    <div className={`${styles.info__list}  sm:w-[calc(100%-104px)] xl:w-[calc(100%-120px)] pr-3`}>
                                        <div className="flex mb-2 items-center">
                                            <BsCheckCircleFill className={`${styles.info__icon} text-_teal sm:text-base md:text-lg 2xl:text-xl`} />
                                            <div className={`${styles.info__text} text-_dark sm:ps-2 sm:text-sm lg:text-base 2xl:text-base`}>{creator.category_name.charAt(0).toUpperCase() + creator.category_name.slice(1).toLowerCase()}</div>
                                        </div>
                                        {/* <div className="flex items-center mt-2">
                                            <BsCheckCircleFill className={`${styles.info__icon} text-_teal sm:text-base md:text-lg 2xl:text-xl`} />
                                            <div className={`${styles.info__text} text-_dark sm:ps-2 sm:text-sm lg:text-base 2xl:text-base`}>{creator.audio_interface}</div>
                                        </div> */}
                                    </div>
                                    <div className='actions w-full sm:w-[104px] xl:w-[120px] pt-3 sm:pt-0'>
                                        <div>
                                        <BookNow name={creator.code_name} id={creator.user_id} pricingDetails={creator.price_list} type={creator.user_type}/>
                                        </div>
                                        <Link href={`/${creator.user_type}/${creator.slug}`} className='hidden sm:block  p-2 text-_dark font-bold rounded text-sm 2xl:text-base'>View Details</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}


                    </div>
                </div>
            </div>
            {/* {studiolist?.data.map((item, index) => {

                return (
                )
            })} */}


            {/* <div className={`${styles.stuido__card} sm:flex mt-4 lg:mt-6 p-3`}>
            <Link href='/' className={`${styles.thumbnail}`}>
                <img src="/images/studios/studio-01.jpg" className='w-full' alt="banner" />
            </Link>
            <div className={`${styles.caption} sm:pl-4 pt-3 sm:pt-0`}>
                <div className="flex">
                    <div className={`${styles.title__box}`}>
                        <h3>
                            <Link href='/' className="text-base lg:text-lg font-bold text-_dark transition-all duration-300 hover:text-_green ">Audio Studios Collection Studio Rec 60 Sec</Link>
                        </h3>
                        <div className="flex mt-3 items-center">
                            <div className="bg-_green px-2 py-1 rounded inline-flex items-center">
                                <span className="text-white me-1 font-semibold text-sm 2xl:text-base">4.4</span> <FaStar className='text-white text-xs 2xl:text-sm'/>
                            </div>
                            <div className="text-gray ml-3">(151)</div>
                        </div> 
                    </div>
                    <div className={`${styles.icon__box}`}>
                        <img src="/images/icons/gold.svg" alt="icon" />
                    </div>
                </div>
                <div className="flex items-center mt-3">
                    <span className="text-_dark text-xl font-bold">₹699</span>
                    <div className="text-sm text-gray px-3">₹1099</div>
                    <div className="text-sm text-_teal">Per Hour</div>
                </div>
                <p className="text-gray text-sm 2xl:text-base">Bhattacharya Bhavan, Bodak Para, South Kamrangu, Jhorehat, Andul, Howrah- 711302</p>
                <div className="divide my-3">
                    <hr style={{ backgroundColor: '#D3D3D3' }} />
                </div>
                <div className="flex justify-between">
                    <div className="list">
                        <div className="flex items-center">
                            <BsCheckCircleFill className=" text-_teal text-xl"/>
                            <div className="text-_dark ps-2 text-sm 2xl:text-base">Full Sound Proof</div>
                        </div>
                        <div className="flex items-center mt-2"> 
                            <BsCheckCircleFill className=" text-_teal text-xl"/>
                            <div className="text-_dark ps-2 text-sm 2xl:text-base">UAD Audio Interfase</div>
                        </div>
                    </div>
                    <div className='actions'>
                        <div>
                            <Link href="" 
                                className='py-1.5 2xl:py-2.5 px-4 bg-_teal text-white rounded-lg w-full block transition duration-300 hover:bg-_dark hover:text-_teal text-base 2xl:text-lg text-center'>
                                Book Now
                            </Link>
                        </div>
                        <Link href="" className='p-2 text-_dark font-bold rounded block text-sm 2xl:text-base'>View Details</Link>
                    </div>
                </div>
            </div>
        </div> */}


        </>
  )
}

export default CreatorsListCard