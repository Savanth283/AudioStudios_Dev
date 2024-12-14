
import Link from 'next/link'
import { getSession,getServerSession,csrfTokenF } from 'next-auth/react'
import React from 'react'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { TiUser } from 'react-icons/ti'
import { TfiEmail } from 'react-icons/tfi'
import { RiPhoneFill, RiLockPasswordFill } from 'react-icons/ri'
import { BsFillBriefcaseFill } from 'react-icons/bs'
import ProfileDetails from '@/components/Profile/ProfileDetails'

const Page = () => {
  return (
    <>
    <div className='header__wrapper pb-20 sm:pb-32 md:pb-36 pt-10 bg-no-repeat bg-cover bg-center' style={{ backgroundImage: `url("/images/profile-bg-image.jpg")` }}>
        <div className="container mx-auto">
            <div className="text-right">
                {/* <Link href='/'
                    className='px-4 md:px-5 py-3 sm:py-4 bg-_yellow rounded sm:rounded-lg md:rounded-xl text-_dark inline-flex items-center transition-all duration-300 hover:bg-_green hover:text-white focus:bg-_green focus:text-white active:bg-_green active:text-white'
                >
                    <BsFillBriefcaseFill className='text-base md:text-lg  mr-3' />
                    <span className='text-sm sm:text-base md:text-lg'>Go to your Business Profile</span>
                </Link> */}
            </div>
        </div>
    </div>

    {/* ------- Profile Image Box ----------- */}
    <ProfileDetails/>
</>
  )
}

export default Page