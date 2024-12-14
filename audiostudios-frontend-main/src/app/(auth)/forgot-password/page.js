// 'use client';

import React from 'react'
import axios from 'axios';
import Link from 'next/link';
// import styles from '../styles/Login.module.scss';
import styles from '../../../styles/Login.module.scss';
import Image from 'next/image';
import ForgetPassword from '@/components/ForgetPassword/ForgetPassword';

const Page = () => {

 
  

    return (
        <>
            <div className={`${styles.auth__layout} relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 p-6 sm:p-12`}> 
                <img src="/images/logo-white-tm.svg" className="lg:h-20 md:h-18 sm:h-16 h-14" alt="Tailwind Play" />
                
                <div className="relative bg-white px-6 pt-10 pb-8 sm:mx-auto sm:max-w-md w-full sm:rounded-lg sm:px-10 mt-4">
                    <div className="mx-auto max-w-lg w-full"> 
                        <div className="divide-y">
                            <div className="">
                                <h1 className="text-xl xl:text-4xl lg:text-3xl md:text-2xl font-bold text-_dark">Reset Password</h1>

                                
                                <ForgetPassword/>

                                 
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

 
export default Page

 
