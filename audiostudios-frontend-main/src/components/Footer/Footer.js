import React from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'
import { FaFacebookF,FaTwitter,FaLinkedinIn,FaYoutube,FaWhatsapp,FaPhoneAlt,FaQuora,FaPinterest } from 'react-icons/fa'
import NewsLetterSubscribe from '../Newsletter/NewsLetterSubscribe'
const Footer = ({cityListData,gsData}) => {
    // console.log("gsData footer",gsData)
  return (
    <>
        <div className={`${styles.main__footer} pt-6 sm:pt-8 md:pt-10 lg:pt-14`}>
            <div className="container mx-auto">

            {/* <ul className='flex justify-center mb-8 flex-wrap border-b border-border-color pb-4'>
                <li className='mb-2 mx-3 lg:mx-4'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1 focus:text-_teal active:text-_teal capitalize'>Home</Link></li>
                <li className='mb-2 mx-3 lg:mx-4'><Link href='/contact' className='text-sm 2xl:text-base font-medium text-border-color
                hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1 focus:text-_teal active:text-_teal capitalize'>Contact Us</Link></li>
                
                <li className='mb-2 mx-3 lg:mx-4'><Link href='/about' className='text-sm 2xl:text-base font-medium text-border-color
                hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1 focus:text-_teal active:text-_teal capitalize'>About Us</Link></li>

                <li className='mb-2 mx-3 lg:mx-4'><Link href='/faq' className='text-sm 2xl:text-base font-medium text-border-color
                hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1 focus:text-_teal active:text-_teal capitalize'>FAQ</Link></li>
               
                <li className='mb-2 mx-3 lg:mx-4'><Link href='/page/terms-and-condition' className='text-sm 2xl:text-base font-medium text-border-color
                hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1 focus:text-_teal active:text-_teal capitalize'>Terms And Condition</Link></li>
                <li className='mb-2 mx-3 lg:mx-4'><Link href='/profile' className='text-sm 2xl:text-base font-medium text-border-color
                hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1 focus:text-_teal active:text-_teal capitalize'>Profile</Link></li>
                <li className='mb-2 mx-3 lg:mx-4'><Link href='/orders' className='text-sm 2xl:text-base font-medium text-border-color
                hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1 focus:text-_teal active:text-_teal capitalize'>Orders</Link></li>
                <li className='mb-2 mx-3 lg:mx-4'><Link href='/studio' className='text-sm 2xl:text-base font-medium text-border-color
                hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1 focus:text-_teal active:text-_teal capitalize'>Studios</Link></li>
                <li className='mb-2 mx-3 lg:mx-4'><Link href='/creator' className='text-sm 2xl:text-base font-medium text-border-color
                hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1 focus:text-_teal active:text-_teal capitalize'>Creators</Link></li>
            </ul> */}



            <div className="grid md:grid-cols-3 gap-5 lg:gap-12">
                    <div className="co">
                        {gsData.about_us_footer.value && (
                            <>
                            <p className="text-sm mb-3 sm:text-base lg:text-lg text-white font-bold">About AUDIOSTUDIOS</p>
                            <p className=' text-border-color text-sm'>{gsData.about_us_footer.value}</p>
                            </>
                        )}

                        {/* <p className="text-sm mb-3 sm:text-base  text-white font-bold mt-4">Join Us : </p>
                        <div className="flex">
                            <Link href='https://www.facebook.com/audiostudios?mibextid=D4KYlr' target='_blank' className='p-2 pl-0 text-white'><FaFacebookF/></Link>
                            <Link href='https://x.com/audiostudiosind?s=11&t=rS0kcz8_Z5RyNfXyHFuTcg' target='_blank' className='p-2 text-white'><FaTwitter/></Link>
                            <Link href='https://www.linkedin.com/company/audiostudios/' target='_blank' className='p-2 text-white'><FaLinkedinIn/></Link>
                            <Link href='https://youtube.com/@audiostudiosindia' target='_blank' className='p-2 text-white'><FaYoutube/></Link>
                            
                        </div> */}
                    </div>
                    <div className="co">
                        <div className="2xl:pl-10"> 
                            <p className="text-sm mb-3 sm:text-base lg:text-lg text-white font-bold">Important Link</p>
                            <div className="grid gap-6 grid-cols-2">
                                <div> 
                                    <ul>
                                        <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base text-border-color
                                hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1 focus:text-_teal active:text-_teal'>Home </Link></li>
                                        <li className='mb-2'><Link href='/blog' className='text-sm 2xl:text-base text-border-color
                                hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1 focus:text-_teal active:text-_teal'>Blog</Link></li>
                                        <li className='mb-2'><Link href='/faq' className='text-sm 2xl:text-base text-border-color
                                hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1 focus:text-_teal active:text-_teal'>FAQ</Link></li>

                                        <li className='mb-2'><Link href='/studio' className='text-sm 2xl:text-base text-border-color
                                hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1 focus:text-_teal active:text-_teal'>Studios</Link></li>
                                       
                                        <li className='mb-2'><Link href='/creator' className='text-sm 2xl:text-base text-border-color
                                hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1 focus:text-_teal active:text-_teal'>Creators</Link></li>
                                    </ul>
                                </div>
                                <div>
                                    <ul>
                                        <li className='mb-2'><Link href='/orders' className='text-sm 2xl:text-base text-border-color
                                hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1 focus:text-_teal active:text-_teal'>Orders</Link></li> 
                                        <li className='mb-2'><Link href='/cart' className='text-sm 2xl:text-base text-border-color
                                hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1 focus:text-_teal active:text-_teal'>Cart</Link></li> 
                                        <li className='mb-2'><Link href='/about' className='text-sm 2xl:text-base text-border-color
                                hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1 focus:text-_teal active:text-_teal'>About</Link></li> 
                                 
                                 <li className='mb-2'><Link href='/page/terms-and-condition' className='text-sm 2xl:text-base text-border-color
                                hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1 focus:text-_teal active:text-_teal'>Terms And Condition</Link></li> 
                                <li className='mb-2'><Link href='/page/privacy-policy1' className='text-sm 2xl:text-base text-border-color
                                hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1 focus:text-_teal active:text-_teal'>Privacy Policy</Link></li> 
                                
                                <li className='mb-2'><Link href='/contact' className='text-sm 2xl:text-base text-border-color
                                hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1 focus:text-_teal active:text-_teal'>Contact Us</Link></li> 
                                    </ul> 
                                </div>
                            </div> 
                        </div>
                    </div>
                    <div className="co">

                         <p className="text-sm mb-3 sm:text-base  text-white font-bold mt-4">Join Us : </p>
                        <div className="flex">
                            <Link href={gsData.facebook_link.value} target='_blank' className='p-2 pl-0 text-white focus:text-_teal active:text-_teal'><FaFacebookF/></Link>
                            <Link href={gsData.twitter_link.value} target='_blank' className='p-2 text-white focus:text-_teal active:text-_teal'><FaTwitter/></Link>
                            <Link href={gsData.linkedin_link.value} target='_blank' className='p-2 text-white focus:text-_teal active:text-_teal'><FaLinkedinIn/></Link>
                            <Link href={gsData.you_tube_link.value} target='_blank' className='p-2 text-white focus:text-_teal active:text-_teal'><FaYoutube/></Link>
                            <Link href={gsData.quora_link.value} target='_blank' className='p-2 text-white focus:text-_teal active:text-_teal'><FaQuora/></Link>
                            <Link href={gsData.pinterest_link.value} target='_blank' className='p-2 text-white focus:text-_teal active:text-_teal'><FaPinterest/></Link>

                            <Link href={`https://wa.me/${gsData.contact_phone.value.replace(/\s+/g, '')}`} target='_blank' className='p-2 text-white focus:text-_teal active:text-_teal'><FaWhatsapp/></Link>
                            
                        </div>
                        <div className="flex items-center">
                            <Link href={`tel:${gsData.contact_phone.value.replace(/\s+/g, '')}`} target='_blank' className='p-2 pl-0 text-white focus:text-_teal active:text-_teal flex items-center '><FaPhoneAlt className="mr-2" /> {gsData.contact_phone.value} </Link>
                            
                        </div>
                        <NewsLetterSubscribe/>
                        {/* <p className="text-sm mb-3 sm:text-base lg:text-lg text-white font-bold">Newsletter</p> */}
                        {/* <div className="mt-4">
                            <p className="text-sm text-white">Newsletter signup</p>
                            <div className={`${styles.input__group} flex border border-gray-light rounded-lg mt-2 p-2`}>
                                <input type="text" name='email' className={`${styles.input} form-control`} placeholder='Email Address' />
                                <button className={`${styles.btn} bg-_teal p-3 rounded`}>
                                    <img src="/images/icons/plan.svg" alt="icon" />
                                </button>
                            </div>
                        </div>  */}


                    </div>
                </div>

                <div className="py-5"> 
                    <hr className='bg-gray' />
                </div>


                <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                    <div>
                        <p className="text-sm sm:text-base lg:text-lg text-white font-bold mb-4 text-center sm:text-left">Our Studio</p> 
                        <ul className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 lg:gap-x-12 gap-1 text-center sm:text-left'>
                            {/* <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                            hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios near me</Link></li> */}

                            {cityListData && cityListData?.slice(0,18)?.map((menu,index)=> {
                                return (
                                    <li key={index} className=''><Link href={`/${menu.cityName.toLowerCase().replace(/ /g, '-')}/studio`} className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal focus:text-_teal active:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios in {menu.cityName}</Link></li>                                   
                            )})}
                            
                        </ul>

                        {/* <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-12 gap-1 text-center sm:text-left">
                            <div className="">
                            </div>
                            <div className="col">
                                <ul>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios In Birbhum</Link></li>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios in Dakshin Dinajpur</Link></li>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios in Darjiling</Link></li>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios in Jalpaiguri</Link></li>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios in Koch Bihar</Link></li>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios in Maldah</Link></li>
                                </ul>
                            </div>
                            <div className="col">
                                <ul>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios near me</Link></li>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios in Kolkata</Link></li>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios in Howrah</Link></li>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios in hooghly</Link></li>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios in Bankura</Link></li>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios in Barddhaman</Link></li>
                                </ul>
                            </div> 
                        </div> */}
                    </div>


                    {/* <div>
                        <p className="text-sm sm:text-base lg:text-lg text-white font-bold mb-4 text-center sm:text-left">Our Studio</p> 
                        <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-12 gap-1 text-center sm:text-left"> 
                            <div className="col">
                                <ul>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios In Birbhum</Link></li>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios in Dakshin Dinajpur</Link></li>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios in Darjiling</Link></li>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios in Jalpaiguri</Link></li>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios in Koch Bihar</Link></li>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios in Maldah</Link></li>
                                </ul>
                            </div>
                            <div className="col">
                                <ul>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios near me</Link></li>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios in Kolkata</Link></li>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios in Howrah</Link></li>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios in hooghly</Link></li>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios in Bankura</Link></li>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios in Barddhaman</Link></li>
                                </ul>
                            </div>
                            <div className="col">
                                <ul>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios In Birbhum</Link></li>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios in Dakshin Dinajpur</Link></li>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios in Darjiling</Link></li>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios in Jalpaiguri</Link></li>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios in Koch Bihar</Link></li>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios in Maldah</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div> */}

<div>
                        <p className="text-sm sm:text-base lg:text-lg text-white font-bold mb-4 text-center sm:text-left">Our Creators</p> 
                        <ul className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 lg:gap-x-12 gap-1 text-center sm:text-left'>
                            {/* <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                            hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios near me</Link></li> */}

                            {cityListData && cityListData?.slice(0,18)?.map((menu,index)=> {
                                return (
                                    <li key={index} className=''><Link href={`/${menu.cityName.toLowerCase().replace(/ /g, '-')}/creator`} className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal focus:text-_teal active:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Creators in {menu.cityName}</Link></li>                                   
                            )})}
                            
                        </ul>

                        {/* <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-12 gap-1 text-center sm:text-left">
                            <div className="">
                            </div>
                            <div className="col">
                                <ul>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios In Birbhum</Link></li>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios in Dakshin Dinajpur</Link></li>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios in Darjiling</Link></li>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios in Jalpaiguri</Link></li>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios in Koch Bihar</Link></li>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios in Maldah</Link></li>
                                </ul>
                            </div>
                            <div className="col">
                                <ul>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios near me</Link></li>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios in Kolkata</Link></li>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios in Howrah</Link></li>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios in hooghly</Link></li>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios in Bankura</Link></li>
                                    <li className='mb-2'><Link href='/' className='text-sm 2xl:text-base font-medium text-border-color
                                    hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1'>Studios in Barddhaman</Link></li>
                                </ul>
                            </div> 
                        </div> */}
                    </div>


                </div>
                <div className="pt-5"> 
                    <hr className='bg-gray' />
                </div>
                <div className="py-4">
    <p className="text-center text-sm text-border-color">
        Copyright © 2023 <Link href="https://studiorec60sec.com/" target='_blank' className="hover:text-blue-300 focus:text-blue-600 !important">STUDIO REC 60 SEC PRIVATE LIMITED</Link>
    </p>
</div>


                <div className="pb-2">
                    <p className="text-center text-sm text-border-color">Developed by <Link href="https://www.idiosystech.com/" target='_blank' className="hover:text-blue-300 focus:text-blue-600 !important">Software Development company </Link> <Link href="https://www.idiosystech.com/" target='_blank' className="hover:text-blue-300 focus:text-blue-600 !important" >IDIOSYS TECHNOLOGIES.</Link></p>
                </div>
                
            </div>
        </div>
    </>
  )
}

export default Footer