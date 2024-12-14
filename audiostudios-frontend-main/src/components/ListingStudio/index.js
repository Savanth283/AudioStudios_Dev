'use client';

import React from 'react'
import styles from './style.module.scss'
import Link from 'next/link'
import { FaStar } from 'react-icons/fa'
import { BsCheckCircleFill } from 'react-icons/bs'
import { AiFillClockCircle } from 'react-icons/ai'
import { TiLocationOutline } from 'react-icons/ti'

const ListingStudio = () => {
  return (
    <>  
        <div className={`${styles.stuido__card} mt-4 lg:mt-6 p-3`}>
            <div className=" lg:flex "> 
                <Link href='/' className="w-full 2xl:w-[240px] xl:w-[200px] lg:w-[180px] md:w-[280px] sm:w-[300px] block sm:mb-4 lg:mb-0">
                    <img src="/images/studios/studio-01.jpg" className='w-full' alt="banner" />
                </Link>
                <div className={` w-full 2xl:w-[calc(100%-240px)] xl:w-[calc(100%-200px)] lg:w-[calc(100%-180px)] md:w-[100%] sm:w-[calc(100%-160px)] lg:pl-4 pt-3 sm:pt-0`}>
                    <div className="lg:flex">
                        <div className={`lg:w-[calc(100%-200px)] w-full`}>
                            <h3>
                                <Link href='/studiodetail' className="text-base lg:text-lg font-bold text-_dark transition-all duration-300 hover:text-_green ">Audio Studios Collection Studio Rec 60 Sec</Link>
                            </h3>
                            <div className="flex mt-3 items-center">
                                <div className="bg-_green px-2 py-1 rounded inline-flex items-center">
                                    <span className="text-white me-1 font-semibold text-sm 2xl:text-base">4.4</span> <FaStar className='text-white text-xs 2xl:text-sm'/>
                                </div>
                                <div className="text-gray ml-3">(151)</div>
                                <div className="text-_teal ml-3">Per Hour</div>
                            </div> 

                            <div className="flex items-center mt-2 lg:mt-3">
                                <span className="text-_dark text-xl xl:text-2xl font-bold">₹699</span>
                                <div className="text-sm text-gray px-3">₹1099</div> 
                            </div>

                            <p className="text-gray text-sm 2xl:text-base">
                                <span className="pe-3">Bhattacharya Bhavan, Bodak Para, South Kamrangu, Jhorehat, Andul, Howrah- 711302</span>
                                <span className='text-_yellow inline w-[130px]'><TiLocationOutline className='text-xl inline'/> 1.3 KM</span>
                            </p>
                        </div>
                        <div className={`lg:w-[200px] w-full text-right ml-auto flex justify-between items-start flex-row mt-4 lg:mt-0`}>
                            <img src="/images/icons/gold.svg" className='w-[40px] sm:w-[60px]' alt="icon" />
                            <div className="w-[calc(100%-50px)] sm:w-[calc(100%-70px)] pl-2 items-start">
                                <button className='text-sm lg:text-base font-semibold bg-_teal p-2 xl:p-3 w-full block rounded-md lg:rounded-lg text-white hover:text-white hover:bg-_dark transition-all duration-300'>Book Now</button>
                                <Link href='/studiodetail' className='text-sm lg:text-base font-bold w-full block text-_dark mt-2 lg:mt-3 xl:mt-4 hover:text-_green transition-all duration-300 text-center'>View Details</Link>
                            </div> 
                        </div>
                    </div>
                    <div className="divide my-3">
                        <hr style={{ backgroundColor: '#D3D3D3' }} />
                    </div> 
                </div>
            </div>
            <div className="flex justify-between 2xl:pl-[255px] xl:pl-[220px] xl:-mt-5 2xl:-mt-12">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-5">
                    <div className="flex items-center">
                        <BsCheckCircleFill className=" text-_teal text-xl"/>
                        <div className="text-_dark ps-2 text-sm 2xl:text-base">Full Sound Proof</div>
                    </div>
                    <div className="flex items-center"> 
                        <BsCheckCircleFill className=" text-_teal text-xl"/>
                        <div className="text-_dark ps-2 text-sm 2xl:text-base">UAD Audio Interfase</div>
                    </div>
                    <div className="flex items-center">
                        <BsCheckCircleFill className=" text-_teal text-xl"/>
                        <div className="text-_dark ps-2 text-sm 2xl:text-base">Full Sound Proof</div>
                    </div>
                    <div className="flex items-center"> 
                        <BsCheckCircleFill className=" text-_teal text-xl"/>
                        <div className="text-_dark ps-2 text-sm 2xl:text-base">UAD Audio Interfase</div>
                    </div>
                    <div className="flex items-center">
                        <BsCheckCircleFill className=" text-_teal text-xl"/>
                        <div className="text-_dark ps-2 text-sm 2xl:text-base">Full Sound Proof</div>
                    </div>
                    <div className="flex items-center"> 
                        <BsCheckCircleFill className=" text-_teal text-xl"/>
                        <div className="text-_dark ps-2 text-sm 2xl:text-base">UAD Audio Interfase</div>
                    </div>
                </div> 
            </div>
        </div>
    </>
  )
}

export default ListingStudio