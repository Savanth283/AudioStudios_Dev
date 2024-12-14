import React from 'react';
import styles from '../../../styles/Login.module.scss';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
    title: "Thank You",
    //description: ""
}

const page = () => {
  return (
    <div className={`${styles.auth__layout} relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 p-6 sm:p-12`}> 
        <img src="/images/logo-white-tm.svg" className="lg:h-20 md:h-18 sm:h-16 h-14" alt="Tailwind Play" />
        <p className='text-white text-center mb-4 text-base lg:text-lg xl:text-xl font-semibold mt-3'>
            World's first chain of Recording Studios & Audio Creators
        </p>
        <div className="relative bg-white px-6 pt-10 pb-8 sm:mx-auto sm:max-w-md w-full sm:rounded-lg sm:px-6">
            <div className="mx-auto max-w-[530px] w-full"> 
                <div className="divide-y">
                    <div className="">
                        <h1 className="text-xl xl:text-4xl lg:text-3xl md:text-2xl font-bold text-_green text-center">Thank You</h1>
                        <div className="text-center">
                            <svg className='w-16 h-8 mx-auto' width="100" height="34" viewBox="0 0 100 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.7994 5.56199C13.6365 11.7385 20.2849 16.3005 27.4881 19.3308C34.6747 22.3694 42.3333 23.8349 50.0249 23.8597C57.7166 23.8349 65.3834 22.3694 72.5618 19.3308C79.7567 16.3005 86.4134 11.7385 92.2505 5.56199C92.4906 5.30533 92.888 5.29705 93.1364 5.52888C93.3185 5.70274 93.3765 5.96769 93.2937 6.19124C90.3876 14.4956 84.0041 21.6325 76.2462 26.385C68.4551 31.1788 59.2069 33.6544 50.0167 33.6627C40.8264 33.6627 31.5782 31.1788 23.7871 26.385C16.0375 21.6325 9.66229 14.5039 6.74791 6.19124C6.63199 5.86834 6.80586 5.50404 7.12876 5.3964C7.36887 5.31361 7.62553 5.37984 7.79112 5.55371L7.7994 5.56199Z" fill="#0F9855"/>
                            <path d="M0.0417275 9.3209C-0.123863 7.81402 0.265274 6.40651 0.993872 5.1149C1.73075 3.83986 2.85676 2.70556 4.22288 2.01008C5.58072 1.3146 7.09588 0.925467 8.54479 1.00826C9.27339 0.991703 9.96887 1.20697 10.6478 1.33944C11.3184 1.56299 11.956 1.83621 12.5521 2.19223C12.8667 2.37438 12.9661 2.78008 12.7756 3.08642C12.6928 3.21889 12.5686 3.31825 12.4362 3.36792L12.3451 3.40104C11.6993 3.63287 11.1032 3.72394 10.5319 3.8647C9.96887 4.04684 9.40586 4.12964 8.90081 4.32007C7.84931 4.60157 6.95512 5.03211 6.10233 5.46264C5.24954 5.91801 4.47127 6.49758 3.67644 7.18478C2.8816 7.8637 2.10333 8.71649 1.23398 9.6024L1.1429 9.69347C0.894518 9.95014 0.488821 9.95014 0.232156 9.69347C0.124523 9.58584 0.0582865 9.44509 0.0417275 9.30434V9.3209Z" fill="#0F9855"/>
                            <path d="M98.7663 9.61068C97.897 8.72477 97.1187 7.87198 96.3238 7.19306C95.529 6.50586 94.7507 5.92629 93.8979 5.47092C93.0369 5.0321 92.1427 4.60157 91.0995 4.32834C90.5944 4.12964 90.0314 4.05512 89.4684 3.87297C88.8888 3.73222 88.2927 3.63287 87.6552 3.40932L87.5641 3.3762C87.2247 3.25201 87.0508 2.87943 87.1667 2.53997C87.2164 2.39094 87.324 2.27502 87.4482 2.20051C88.0443 1.84449 88.6901 1.57127 89.3525 1.34772C90.0314 1.22353 90.7269 0.999979 91.4555 1.01654C92.9044 0.933743 94.4196 1.32288 95.7774 2.01008C97.1435 2.70556 98.2695 3.83985 99.0064 5.1149C99.7433 6.4065 100.124 7.81402 99.9586 9.32089C99.9172 9.67691 99.6025 9.93358 99.2465 9.89218C99.0892 9.87562 98.9567 9.80938 98.8574 9.70175L98.7663 9.61068Z" fill="#0F9855"/>
                            </svg>
                        </div>

                        <h2 className="text-base md:text-lg text-center text-_dark font-semibold mt-5">Welcome to Audio Studios</h2>
                        <p className="text-center text-_grey mb-4">We believe you will find what you are looking for right here</p>
                         
                        <Link href={'/'} className="uppercase font-medium text-center w-full block transition-all rounded py-3 px-3 bg-_green hover:bg-_teal text-white mt-3">
                            Go To Home
                        </Link>
                        <Link href={'/'} className="uppercase font-medium text-center w-full block transition-all rounded py-3 px-3 bg-_yellow hover:bg-_dark text-black mt-3">
                            Go To Home
                        </Link>
                       
                       <div className="-mx-6 -mb-8"> 
                            <Image 
                                src={'/images/thank-you-bg.svg'}
                                width={530}
                                height={200}
                                alt='image'
                                className='w-full'
                            />
                       </div>
                    </div> 
                </div>
            </div>
        </div>
    </div>
  )
}

export default page
