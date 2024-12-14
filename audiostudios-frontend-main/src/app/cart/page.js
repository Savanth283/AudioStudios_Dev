import React from 'react'
import Link from 'next/link';
import { Image } from 'next/image';
import { TiLocationOutline } from 'react-icons/ti'
import { AiFillStar } from 'react-icons/ai'
import { RiCheckboxCircleFill } from 'react-icons/ri' 
import { TbThumbUp, TbThumbDown } from 'react-icons/tb' 
import { IoCalendarSharp } from 'react-icons/io5' 
import { BsFillArrowRightCircleFill } from 'react-icons/bs' 
import Cart from '@/components/Cart/CartDetails'
import CartList from '@/components/Cart/CartList';
// import axios from 'axios';
// import { useSession } from "next-auth/react"

const Page = () => {
  return (
    <>
    <div className="pt-6 lg:pt-10 pb-8">
        <div className="container mx-auto">
            <div className="flex flex-wrap flex-row">

                <CartList/>
                   
            </div>
        </div>
    </div>

    {/* <div className="my-6 text-center">
        <Link href="/" className="inline-block">
            <img src="/images/banners/add-banner.jpg" className='img-fluid' alt="banner" />
        </Link>
    </div> */}
</>
  )
}

export default Page