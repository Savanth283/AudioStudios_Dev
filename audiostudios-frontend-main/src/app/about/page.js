import Image from 'next/image'
import React from 'react'

import styles from '@/styles/AboutPage.module.scss'
import Link from 'next/link'
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'



const aboutData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cms?cms_slug=about`,{ cache: 'no-store' });
    return res.json();
}

async function aboutGSContent() {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/global-settings`,{ cache: 'no-store' })
    return res.json();
}

async function aboutSTContent() {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/service-team`,{ cache: 'no-store' })
    return res.json();
}

 //for seo 
 export async function generateMetadata() {
    const aboutContent = await aboutData()

    return {
      title: aboutContent.meta_title,
      description: aboutContent.meta_description,
      keywords: aboutContent.meta_keyword
    }
  }

const page = async () => {

    const aboutContent = await aboutData()
    const aboutGSContentData = await aboutGSContent()
    const aboutSTdata = await aboutSTContent()
    //console.log("aboutSTdata",aboutSTdata)
  return (
    <main>
        {/* Header Wrapper Start */}
        <header className='header__wrapper py-10 sm:py-14 md:py-16 lg:py-20 bg-no-repeat bg-cover bg-center' style={{ backgroundImage: `url("/images/banners/about-page-header-bg.webp")` }}>
            <div className="container mx-auto">
                <div className="text-center">
                    <h1 className='text-xl sm:text-xl md:text-3xl lg:text-4xl font-semibold text-white'>{aboutContent.page_name}</h1>
                </div>
            </div>
        </header>
        {/* Header Wrapper End */}

        <section className='py-6 sm:py-8 md:py-10'>
            <div className="container"> 
                <div className="flex flex-wrap">
                    <div className="w-full lg:w-[40%] lg:pr-4">
                        <Image
                            src={process.env.NEXT_PUBLIC_S3_BUCKET_URL + aboutContent?.feature_image}
                            width={600} height={550}
                            alt={aboutContent?.meta_title}
                        />
                    </div>

                    <div className="w-full lg:w-[60%] lg:pl-4" dangerouslySetInnerHTML={{__html: aboutContent?.page_content}} />

                    {/* <div className="w-full lg:w-[60%] lg:pl-4">
                        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-_dark mb-3">Welcome to Audiostudios</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <h3 className='text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-_dark mt-6'>We are the best</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <ul className={`text-_dark mt-4  ${styles.check__list}`}>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit 1</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit 1</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit 1</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit 1</li>
                        </ul>
                    </div> */}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mt-8 sm:mt-10 lg:mt-12">
                    <div className="p-4 md:p-5 rounded-lg" style={{boxShadow: '0px 2px 15px 0px rgba(0, 0, 0, 0.15)'}}>
                        <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-_dark mb-3">Our Vision</h4>
                        <div dangerouslySetInnerHTML={{__html: aboutGSContentData?.our_vision?.value}} />      
                    </div>
                    <div className="p-4 md:p-5" style={{boxShadow: '0px 2px 15px 0px rgba(0, 0, 0, 0.15)'}}>
                        <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-_dark mb-3">Our Mission</h4>
                        <div dangerouslySetInnerHTML={{__html: aboutGSContentData?.our_mission?.value}} /> 
                    </div>
                </div>

                <div className="grid items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0 mt-8 sm:mt-10 lg:mt-12">
                   
                   {aboutSTdata.service_list && aboutSTdata.service_list.map((service,index)=>{
                       return (
                        
                        <div className="relative group" key={index}>
                        <Image
                            src={process.env.NEXT_PUBLIC_S3_BUCKET_URL + service.image}
                            width={'400'} height={'600'}
                            alt='Image'
                            className='w-full h-[240px] sm:h-[340px] md:h-[380px] lg:h-[400px] object-cover object-center'
                        /> 
                        <div className="absolute bottom-0 left-0 w-full h-auto min-h-[100px] z-10 p-3 flex items-end" style={{background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #000 100%'}}> 
                            <p className="text-white text-center p-3 w-full rounded transition-all duration-150 text-sm sm:text-base md:text-lg font-semibold group-hover:text-_dark group-hover:bg-white group-hover:shadow-sm">{service.service_name}</p>
                        </div>
                        </div>
                        
                       )
                   }

                    )}


                </div>



                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-_dark mb-3 text-center mt-14">Professional Team</h2>
                <div className="lg:w-[70%] mx-auto mt-5 sm:mt-6 md:mt-7 mb-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                       
                    {aboutSTdata.team_list && aboutSTdata.team_list.map((team,index)=>{
                       return (
                        <div className="relative group shadow-lg rounded text-center p-2 sm:p-3" key={index}>
                        <Image
                            src={process.env.NEXT_PUBLIC_S3_BUCKET_URL + team.image}
                            width={'400'} height={'600'}
                            alt={team.name}
                            className='rounded'
                            // className='w-full h-[240px] sm:h-[340px] md:h-[380px] lg:h-[400px] object-cover object-center'
                        /> 
                        <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-_dark mb-1 mt-5">{team.name}</h4>
                       {team.designation && (
                           <p className="text-sm md:text-base lg:text-lg text-_dark">{team.designation}</p>
                       )}
                        <ul className="flex justify-center mt-4 mb-3">
                           
                            {team.facebook_link && (
                            <li className='mx-2'>
                                <Link href={team.facebook_link} target='_blank' className='w-9 h-9 rounded-full flex justify-center items-center bg-_pink text-white transition-all duration-200 hover:bg-_green hover:text-white'>
                                    <FaFacebookF />
                                </Link>
                            </li>
                            )}

                            {team.twitter_link && (
                            <li className='mx-2'>
                                <Link href={team.twitter_link} target='_blank' className='w-9 h-9 rounded-full flex justify-center items-center bg-_pink text-white transition-all duration-200 hover:bg-_green hover:text-white'>
                                    <FaTwitter />
                                </Link>
                            </li>
                            )}

                            {team.instagram_link && (
                            <li className='mx-2'>
                                <Link href={team.instagram_link} target='_blank' className='w-9 h-9 rounded-full flex justify-center items-center bg-_pink text-white transition-all duration-200 hover:bg-_green hover:text-white'>
                                    <FaInstagram />
                                </Link>
                            </li>
                            )}
                        </ul>
                    </div> 
                        )
                   })}

                         
                        
                        {/* <div className="relative group shadow-lg rounded text-center p-2 sm:p-3">
                            <Image
                                src={'/images/banners/team.webp'}
                                width={'400'} height={'600'}
                                alt='Image'
                                className='rounded'
                                // className='w-full h-[240px] sm:h-[340px] md:h-[380px] lg:h-[400px] object-cover object-center'
                            /> 
                            <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-_dark mb-1 mt-5">Anish Gayen</h4>
                            <p className="text-sm md:text-base lg:text-lg text-_dark">Sound Engineering</p>
                            <ul className="flex justify-center mt-4 mb-3">
                                <li className='mx-2'>
                                    <Link href={'/'} className='w-9 h-9 rounded-full flex justify-center items-center bg-_pink text-white transition-all duration-200 hover:bg-_green hover:text-white'>
                                        <FaFacebookF />
                                    </Link>
                                </li>
                                <li className='mx-2'>
                                    <Link href={'/'} className='w-9 h-9 rounded-full flex justify-center items-center bg-_pink text-white transition-all duration-200 hover:bg-_green hover:text-white'>
                                        <FaTwitter />
                                    </Link>
                                </li>
                                <li className='mx-2'>
                                    <Link href={'/'} className='w-9 h-9 rounded-full flex justify-center items-center bg-_pink text-white transition-all duration-200 hover:bg-_green hover:text-white'>
                                        <FaInstagram />
                                    </Link>
                                </li>
                            </ul>
                        </div>   

                        <div className="relative group shadow-lg rounded text-center p-2 sm:p-3">
                            <Image
                                src={'/images/banners/team.webp'}
                                width={'400'} height={'600'}
                                alt='Image'
                                className='rounded'
                                // className='w-full h-[240px] sm:h-[340px] md:h-[380px] lg:h-[400px] object-cover object-center'
                            /> 
                            <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-_dark mb-1 mt-5">Anish Gayen</h4>
                            <p className="text-sm md:text-base lg:text-lg text-_dark">Sound Engineering</p>
                            <ul className="flex justify-center mt-4 mb-3">
                                <li className='mx-2'>
                                    <Link href={'/'} className='w-9 h-9 rounded-full flex justify-center items-center bg-_pink text-white transition-all duration-200 hover:bg-_green hover:text-white'>
                                        <FaFacebookF />
                                    </Link>
                                </li>
                                <li className='mx-2'>
                                    <Link href={'/'} className='w-9 h-9 rounded-full flex justify-center items-center bg-_pink text-white transition-all duration-200 hover:bg-_green hover:text-white'>
                                        <FaTwitter />
                                    </Link>
                                </li>
                                <li className='mx-2'>
                                    <Link href={'/'} className='w-9 h-9 rounded-full flex justify-center items-center bg-_pink text-white transition-all duration-200 hover:bg-_green hover:text-white'>
                                        <FaInstagram />
                                    </Link>
                                </li>
                            </ul>
                        </div>    */}

                    </div>

                </div>
            </div>
        </section>
    </main>
  )
}

export default page
