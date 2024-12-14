"use client"
import React from 'react'
import styles from './style.module.scss'
import Link from 'next/link'
import { FaStar } from 'react-icons/fa'
import { AiFillClockCircle } from 'react-icons/ai'
import { TiLocationOutline } from 'react-icons/ti'
import Image from 'next/image'
import axios from 'axios'
import { useSession } from "next-auth/react";

const CartDetails = ({cartdata}) => {
    const { data: session, status } = useSession();
    console.log("cartdata",cartdata)

    const removeCartItem = async () => {
        try {
            const res = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/removecart-list?booking_id=${cartdata.booking_details._id}&customer_id=${session.user.id}`,
              {
                headers: {
                  Authorization: session?.user?.token, // Replace with your actual token
                  "Content-Type": "application/json",
                },
              }
            );
      
            if (res.status === 200) {
              //setCartListdata(res.data);
            }
          } catch (error) {
            console.error(error);
          }
    }

  return (
    <>
        <div className={`${styles.stuido__card} sm:flex mb-4 lg:mb-6 p-3`}>
            <Link href={`/${cartdata.user_type}/${cartdata.slug}`} className="w-[240px] 2xl:w-[240px] xl:w-[200px] lg:w-[180px] md:w-[180px] sm:w-[160px] block">
                <Image src={process.env.NEXT_PUBLIC_S3_BUCKET_URL + cartdata.profile_image} width={390} height={260} className='w-full' alt={cartdata.code_name}  />
            </Link>
            <div className={`${styles.caption} w-full 2xl:w-[calc(100%-240px)] xl:w-[calc(100%-200px)] lg:w-[calc(100%-180px)] md:w-[calc(100%-180px)] sm:w-[calc(100%-160px)] sm:pl-4 pt-3 sm:pt-0`}>
                <div className="flex">
                    <div className={`xl:w-[calc(100%-140px)] lg:w-[calc(100%-90px)] sm:w-[calc(100%-80px)] w-[calc(100%-50px)]`}>
                        <h3>
                            <Link href={`/${cartdata.user_type}/${cartdata.slug}`} className="text-base lg:text-lg font-bold text-_dark transition-all duration-300 hover:text-_green ">{cartdata.code_name}</Link>
                        </h3>
                        <p className="text-gray text-sm 2xl:text-base">
                        {cartdata.address}
                            {/* <span className='text-_yellow inline w-[130px] ml-3'><TiLocationOutline className='text-xl inline'/> 1.3 KM</span> */}
                        </p>
                    </div>


                    {cartdata.type && cartdata.type === "GOLD" && (
                    <div className={`w-[50px] sm:w-[60px] text-right ml-auto flex jusitfy-end items-start flex-row`}>
                    <img src="/images/icons/gold.svg" className='ml-auto w-[40px] sm:w-[60px]' alt="icon" />
                    </div>
                    )}

                    {cartdata.type && cartdata.type === "SILVER" && (
                    <div className={`w-[50px] sm:w-[60px] text-right ml-auto flex jusitfy-end items-start flex-row`}>
                    <img src="/images/icons/silver.svg" className='ml-auto w-[40px] sm:w-[60px]' alt="SILVER" />
                    </div>
                    )}

                    {cartdata.type && cartdata.type === "PLATINUM" && (
                    <div className={`w-[50px] sm:w-[60px] text-right ml-auto flex jusitfy-end items-start flex-row`}>
                    <img src="/images/icons/platinum.svg" className='ml-auto w-[40px] sm:w-[60px]' alt="platinum" />
                    </div>
                    )}

                </div>
                
                <div className="flex items-center mt-2 lg:mt-3">
                    <span className="text-_dark text-xl xl:text-2xl font-bold">₹699</span>
                    <div className="text-sm text-gray px-3">₹1099</div> 
                </div>


                <div className="inline-flex md:flex items-center mt-2 lg:mt-3">
                    <div className="text-_dark text-base xl:text-lg border border-_teal px-3 py-1 rounded-md md:rounded-lg inline-flex items-center">
                        1 hour <AiFillClockCircle className="text-_gray ml-2 text-lg lg:text-xl"/>
                    </div>
                    <div className="text-base lg:text-lg text-_green font-medium px-3">1 hour Selected</div> 
                </div>

                
                <button type="button" className='text-base lg:text-lg font-bold text-[#DC2751] mt-2 lg:mt-3 xl:mt-4 hover:text-_dark transition-all duration-300'>REMOVE</button>
                
                 
            </div>
        </div>
   
    </>
  )
}

export default CartDetails