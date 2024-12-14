import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const HomeBannerMiddle = ({HomeBannermiddleAddList}) => {
    //console.log(HomeBannermiddleAddList)
  return (
    <>
    {/* desktop */}
    <div className="py-5 text-center hidden md:block">
    <div className="container mx-auto ">
        <Link href={HomeBannermiddleAddList[0]?.ad_link} className="inline-block" target="_blank" >
            <img className='object-cover' src={process.env.NEXT_PUBLIC_S3_BUCKET_URL + HomeBannermiddleAddList[0].ad_image} alt="banner" />
        </Link>
    </div>
    </div>

    {/* mobile */}
    <div className="py-5 text-center block md:hidden">
    <div className="container mx-auto ">
        <Link href={HomeBannermiddleAddList[0]?.ad_link} className="inline-block" target="_blank" >
            <img className='object-cover' src={process.env.NEXT_PUBLIC_S3_BUCKET_URL + HomeBannermiddleAddList[0].mobile_ad_image} alt="banner" />
        </Link>
    </div>
    </div>
  </>
  )
}

export default HomeBannerMiddle