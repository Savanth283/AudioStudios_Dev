'use client';
import React from 'react'
import styles from './style.module.scss'
import Link from 'next/link'
import Image from 'next/image';
import { FaStar } from 'react-icons/fa'
import { BsCheckCircleFill } from 'react-icons/bs'
import { AiFillClockCircle,AiOutlineLoading3Quarters } from 'react-icons/ai'
import { TiLocationOutline } from 'react-icons/ti'
import useSWR from 'swr'
import BookNow from '../BookNow/BookNow';
// import GetLocation from '../Location/GetLocation';
import { useState,useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useRouter } from "next/navigation";
import { getUserLocation } from '@/utlis/location/getLocation';

// const fetcher = (...args) => fetch(...args).then(res => res.json())
//paremt component
const FilteredList = ({listDataCount, filterlocation,locationList,categoriesList,langaugeList,genresList,instrumentList,highPrice,lowPrice,filterType,sortby}) => {
    const router = useRouter();
    // console.log("locationList in list",locationList)
    const arrFilterlocation = filterlocation ? [filterlocation] : [];
    // console.log("locationList in list",arrFilterlocation)
    // console.log("filterlocation",filterlocation)

    // useEffect(() => {
    //   if ( filterlocation != '') {
    //     setLatitude(null)
    //     setLongitude(null)
    //   }
    // }, [locationList,filterlocation])
    

    const searchParams = useSearchParams();
    const searchLat = searchParams.get('searchlat')
    const searchLong = searchParams.get('searchlong')
    const searchType = searchParams.get('from')

    //const menuLocation = searchParams.get('location');
    //const menuLocationArray = menuLocation ? [menuLocation] : [];
    const pathname = usePathname()
    const trimmedPathname = pathname.substring(1);
    
    // console.log("trimmedPathname in list",trimmedPathname)
    // console.log("searchLat searchLong",searchLat,searchLong)
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    //const initialLocationState = menuLocationArray.length > 0 ? [...locationList, ...menuLocationArray] : locationList;
    //const [location, setLocation] = useState(initialLocationState);

    // useEffect(() => {
    //     if (locationList.length > 0) {
    //       const updatedLocationState = [...locationList, ...menuLocationArray];
    //       setLocation(updatedLocationState);
    //     }
    //   }, [locationList]);

    //   useEffect(() => {
    //     if (menuLocationArray.length > 0) {
    //       const updatedLocationState = [...locationList, ...menuLocationArray];
    //       setLocation(updatedLocationState);
    //     }
    //   }, [ menuLocationArray]);
      


    //console.log("menuLocationArray",menuLocationArray)
    //console.log("location",location)
    useEffect(()=> {
        if (searchType === "search" && trimmedPathname === "audio-studio" ) {
            console.log("inside search")
            setLatitude(searchLat);
            setLongitude(searchLong);
        }

    },[searchLat,searchLong,trimmedPathname])

    // useEffect(() => {
    //     if (menuLocation !== null && menuLocation !== "null") {
    //       setLocation(menuLocation);
    //     } 
    //   }, []);
      


    // const handleDataReceived = (latitude, longitude) => {
    //     if ( searchType != "search" && locationList.length == 0) {
    //         setLatitude(latitude);
    //         setLongitude(longitude);
    //     }
    //   };

      useEffect(() => {
        getUserLocation()
          .then((location) => {
            console.log('location use', location);
            if ( searchType != "search" && locationList.length == 0) {
                setLatitude(location.latitude);
                setLongitude(location.longitude);
            }


          })
          .catch((error) => {
            console.error('Error getting location in useEffect:', error);
          });
      }, []);
    //   console.log("location",location)
    //   console.log("locationList",locationList)
      
    //   useEffect(() => {
    //     if (locationList.length !== 0) {
    //       setLatitude("null");
    //       setLongitude("null");
    //     }
    //   }, [locationList]);
    const [filterDate,setFilterDate] =  useState()
    const searchBy = searchParams.get('from');
    const searchDate = searchParams.get('date');
    console.log("searchDate",searchBy,searchDate)

    useEffect(() => {
        if (searchBy === "search") {
            setFilterDate(searchDate)
        } else {
            setFilterDate(null)
        }
    }, [router])


    //console.log("price in list",highPrice,lowPrice)
    //https://audiostudios-backend.idiosysdev.com/search-list?city&category&language&genres&instrument&city&lat&long http://localhost:3000/search-list?type=studio,creator   http://localhost:3000/search-list?low_price=100&max_price=300 
   // const { data:filterData, error,isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/search-list?type=${filterType}&city=${locationList}&category=${categoriesList}&language=${langaugeList}&genres=${genresList}&instrument=${instrumentList}&low_price=${lowPrice}&max_price=${highPrice}&sort_by=${sortby}&lat=${latitude}&long=${longitude}&date=${filterDate}`, fetcher)
    //console.log("filterData",filterData)

    // listDataCount(filterData?.length)

    const [filterData,setFilterData] = useState()
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
        try {
            const list = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search-list?type=${filterType}&city=${locationList || filterlocation}&category=${categoriesList}&language=${langaugeList}&genres=${genresList}&instrument=${instrumentList}&low_price=${lowPrice}&max_price=${highPrice}&sort_by=${sortby}&lat=${latitude}&long=${longitude}&date=${filterDate}`)
            const result = await list.json();
            setLoading(false)
            setFilterData(result);
        } catch (e) {
            setLoading(false)
            console.log(e)
        }
         }
     fetchData();
      }, [filterlocation,latitude,longitude,filterType,locationList,categoriesList,langaugeList,genresList,instrumentList,lowPrice,highPrice,sortby,filterDate])

    useEffect(() => {
        //console.log("filterData",filterData)
        filterData != undefined && (
            listDataCount(filterData?.data?.length)
        )
    }, [filterData])
    
    // const filterDataLength = () => {
    //     let listLength = filterData?.length
    //     return listLength
    // }

    if (loading) {
        return (
        <div className='mt-4 lg:mt-6'>
        <div className='h-56 flex  items-center w-full text-center bg-gray-50 justify-center'>
            <div className="w-full"> 
                <div className="flex justify-center mb-5"> 
                <AiOutlineLoading3Quarters className="text-6xl animate-spin" />
                </div>
                <p className='text-xl decoration-green-600'> loading...</p>
            </div>
        </div>

        </div>
        )
    }


    return (
    <>
    {/* <GetLocation onDataReceived={handleDataReceived} />      */}
<div className={`grid 2xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 justify-start mt-4 lg:mt-6 ${filterData?.data.length === 0 ? 'noData' : ''}`}>
        {filterData?.data && filterData?.data.map((list,index)=> {
            return (
                <div key={index} className={`${styles.stuido__card} sm:flex p-2 sm:p-3 relative`}>
                                <Link href={`/${list.user_type}/${list.slug}`} className={`w-full sm:w-[30%] md:w-[30%] lg:w-[30%] xl:w-[35%]`}>
                                    {/* <Image 
                                        src={process.env.NEXT_PUBLIC_S3_BUCKET_URL + list.profile_image} width={390} height={260} 
                                        className='w-full h-[155px]  sm:h-[200px] lg:h-[240px] xl:h-[200px] 2xl:h-[240px] rounded-lg object-cover object-center' 
                                        alt={list.code_name}
                                    />  */}

                                {list.profile_image ? (
                                    <Image 
                                    src={process.env.NEXT_PUBLIC_S3_BUCKET_URL + list.profile_image} width={390} height={260} 
                                    className='w-full h-[155px]  sm:h-[200px] lg:h-[240px] xl:h-[200px] 2xl:h-[240px] rounded-lg object-cover object-center' 
                                    alt={list.code_name} 
                                /> 
                                ) : (
                                    <Image 
                                    src='/images/noimage.webp' width={390} height={260} 
                                    className='opacity-25 w-full h-[155px]  sm:h-[200px] lg:h-[240px] xl:h-[200px] 2xl:h-[240px] rounded-lg object-cover object-center' 
                                    alt={list.code_name} 
                                /> 
                                )}

                                </Link>
                                {list.rating && list.rating.length != 0 && (
                                <div className={`items-center absolute top-[10px] left-[15px] sm:hidden`}>
                                    <div className="bg-_green px-1 py-[3px] rounded inline-flex items-center">
                                        <span className="text-white me-1 font-semibold text-[9px] ">{list.rating && list.rating[0]?.averageRating.toFixed(1)}</span> 
                                        <FaStar className='text-white text-[10px] relative top-[-1px]' />
                                    </div> 
                                </div>
                                )}
                                <div className={`${styles.caption} w-full sm:w-[70%] md:w-[70%] lg:w-[70%] xl:w-[65%] sm:pl-4 pt-3 sm:pt-0`}>
                                    <div className="flex flex-wrap relative">
                                        <div className={`${styles.title__box}`}>
                                            <h3 className='leading-none'>
                                                <Link href={`/${list.user_type}/${list.slug}`} className="text-sm sm:text-base lg:text-lg font-bold text-_dark transition-all duration-300 hover:text-_green" style={{ lineHeight:'1.3' }}>
                                                {list.code_name}
                                                </Link>
                                            </h3>
                                            {list.rating && list.rating.length != 0 && (
                                            <div className="hidden sm:flex mt-3 items-center">
                                                <div className="bg-_green px-2 py-1 rounded inline-flex items-center">
                                                    <span className="text-white me-1 font-semibold text-sm 2xl:text-base">{list.rating && list.rating[0]?.averageRating.toFixed(1)}</span> 
                                                    <FaStar className='text-white text-xs 2xl:text-sm' />
                                                </div>
                                                <div className="text-gray ml-3">({list.rating && list.rating[0]?.totalRatingCount })</div>
                                            </div>
                                            )}
                                        </div>


                                        {/* <div className={`${styles.icon__box}`}>
                                            <img src="/images/icons/gold.svg" alt="icon" />
                                        </div> */}
                                        {list.type && list.type === "GOLD" && (
                                        <div className={`${styles.icon__box}`}>
                                            <img src="/images/icons/gold.svg" alt="gold" />
                                        </div>
                                        )}
                                        {list.type && list.type === "SILVER" && (
                                        <div className={`${styles.icon__box}`}>
                                            <img src="/images/icons/silver.svg" alt="SILVER" />
                                        </div>
                                        )}
                                        {list.type && list.type === "PLATINUM" && (
                                        <div className={`${styles.icon__box}`}>
                                            <img src="/images/icons/platinum.svg" alt="platinum" />
                                        </div>
                                        )}

                                    </div>
                                    <div className={`${styles.price__box} flex flex-wrap items-center mt-2 sm:mt-3`}>
                                        {list.price_list?.find(obj => obj.default_price === "Yes")?.offer_price ? (
                                            <>
                                            <span className={`${styles.price} text-_dark sm:text-xl font-bold`}>₹{list.price_list?.find(obj => obj.default_price === "Yes")?.offer_price}</span>
                                            <div className={`${styles.ptext} sm:text-sm text-gray px-3 line-through`}>₹{list.price_list?.find(obj => obj.default_price === "Yes")?.price}</div>
                                            </>
                                        ):<span className={`${styles.price} text-_dark sm:text-xl font-bold`}>₹{list.price_list?.find(obj => obj.default_price === "Yes")?.price}</span>}
                                        <div className={`${styles.ptext} sm:text-sm px-2 text-_teal`}>{list.price_list?.find(obj => obj.default_price === "Yes")?.package_type}</div>
                                    </div>
                                    <p className="text-gray text-sm 2xl:text-base">
                                        <span className="hidden sm:inline pe-3">{list.address}</span>
                                        <span className='text-_yellow inline text-sm 2xl:text-base w-[130px]'>
                                            <TiLocationOutline className='text-base sm:text-lg lg:text-xl inline'/>
                                            <span className={`${styles.distance}  text-_yellow inline sm:text-sm 2xl:text-base`}> {list.distance} KM</span>
                                            
                                        </span>
                                    </p>
                                    <div className="divide my-3 hidden sm:block">
                                        <hr style={{ backgroundColor: '#D3D3D3' }} />
                                    </div>
                                    <div className="sm:flex justify-between mt-2.5 sm:mt-0">
                                        {list.user_type === "studio" && (
                                        <div className={`${styles.info__list}  sm:w-[calc(100%-104px)] xl:w-[calc(100%-120px)] pr-3`}>
                                           
                                            {list.sound_proofing_type && (
                                            <div className="flex">
                                                <div className="w-[24] pt-[2px]">
                                                    <BsCheckCircleFill className={`${styles.info__icon} text-_teal sm:text-base md:text-lg 2xl:text-xl`} />
                                                </div>
                                                <div className={`${styles.info__text} w-[calc(100%-24)] pl-3 text-_dark sm:ps-2 sm:text-sm lg:text-base 2xl:text-base capitalize`}>{list.sound_proofing_type}</div>
                                            </div>
                                            )}

                                            {list.audio_interface && (
                                            <div className="flex mt-2">
                                                <div className="w-[24] pt-[2px]"> 
                                                    <BsCheckCircleFill className={`${styles.info__icon} text-_teal sm:text-base md:text-lg 2xl:text-xl`} />
                                                </div>
                                                <div className={`${styles.info__text} w-[calc(100%-24)] pl-3 text-_dark sm:ps-2 sm:text-sm lg:text-base 2xl:text-base capitalize`}>{list.audio_interface}</div>
                                            </div>
                                            )}

                                        </div>
                                        )}

                                        {list.user_type === "creator" && (
                                        <div className={`${styles.info__list}  sm:w-[calc(100%-104px)] xl:w-[calc(100%-120px)] pr-3`}>
                                            {list.category_name && (
                                            <div className="flex">
                                                <div className="w-[24] pt-[2px]"> 
                                                    <BsCheckCircleFill className={`${styles.info__icon} text-_teal sm:text-base md:text-lg 2xl:text-xl`} />
                                                </div>
                                                <div className={`${styles.info__text} w-[calc(100%-24)] pl-3 text-_dark sm:ps-2 sm:text-sm lg:text-base 2xl:text-base capitalize`}>{list.category_name}</div>
                                            </div>
                                            )}
                                            {/* <div className="flex items-center mt-2">
                                                <BsCheckCircleFill className={`${styles.info__icon} text-_teal sm:text-base md:text-lg 2xl:text-xl`} />
                                                <div className={`${styles.info__text} text-_dark sm:ps-2 sm:text-sm lg:text-base 2xl:text-base`}>{list.audio_interface}</div>
                                            </div> */}
                                        </div>
                                        )}

                                        <div className='actions w-full sm:w-[104px] xl:w-[120px] pt-3 sm:pt-0'>
                                            <div>
                                                {/* <Link href=""
                                                    className='py-1.5 2xl:py-2 px-3 xl:px-4 bg-_teal text-white rounded-lg w-full block transition duration-300 hover:bg-_dark hover:text-_teal text-base 2xl:text-lg text-center'>
                                                    Book Now
                                                </Link> */}
                                                <BookNow name={list.code_name} id={list.user_id} pricingDetails={list.price_list} type={list.user_type}/>
                                            </div>
                                            <Link href={`/${list.user_type}/${list.slug}`} className=' hidden sm:block  p-2 text-_dark font-bold rounded text-sm 2xl:text-base'>View Details</Link>
                                        </div>
                                    </div>
                                </div>
                </div>
            ) 
        })}

    </div>
        {filterData?.data && filterData?.data.length == 0 && (
            <div className='mt-4 lg:mt-6'>
            <div className='h-56 flex  items-center w-full text-center bg-gray-50 justify-center'>
                <div className="w-full"> 
                    <div className="flex justify-center mb-5"> 
                        <svg xmlns="http://www.w3.org/2000/svg" height="3em" viewBox="0 0 384 512"><path fill='#808080' d="M96 96V256c0 53 43 96 96 96s96-43 96-96H208c-8.8 0-16-7.2-16-16s7.2-16 16-16h80V192H208c-8.8 0-16-7.2-16-16s7.2-16 16-16h80V128H208c-8.8 0-16-7.2-16-16s7.2-16 16-16h80c0-53-43-96-96-96S96 43 96 96zM320 240v16c0 70.7-57.3 128-128 128s-128-57.3-128-128V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v24z"/></svg>
                    </div>
                    <p className='text-xl decoration-red-600'> No Result Found</p>
                </div>
            </div>

             </div>
               
            )
        }
    </>
  )
}

export default FilteredList