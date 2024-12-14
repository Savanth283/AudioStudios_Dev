 
import React from 'react';
import styles from './styles.module.scss'
import Link from 'next/link'
import { FaFacebookF,FaTwitter,FaLinkedinIn,FaYoutube,FaWhatsapp,FaPinterest,FaQuora } from 'react-icons/fa'
import Image from 'next/image';
import NewsLetterSubscribe from '../Newsletter/NewsLetterSubscribe'

const MobileFooter = ({cityListData,gsData}) => {
    return <div className=' bg-_dark-deep pt-5 pb-4'>
        <div className="container">
        <ul className='flex justify-center mb-8 flex-wrap border-b border-[#333] pb-4'>
                <li className='mb-2 mx-3 lg:mx-4'><Link href='/' className='text-[10px] font-medium text-border-color
                hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1 focus:text-_teal active:text-_teal capitalize'>Home</Link></li>
                <li className='mb-2 mx-3 lg:mx-4'><Link href='/page/terms-and-condition' className='text-[10px] font-medium text-border-color
                hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1 focus:text-_teal active:text-_teal capitalize'>Terms And Condition</Link></li>
                 <li className='mb-2 mx-3 lg:mx-4'><Link href='/page/privacy-policy1' className='text-[10px] font-medium text-border-color
                hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1 focus:text-_teal active:text-_teal capitalize'>Privacy Policy</Link></li>
                <li className='mb-2 mx-3 lg:mx-4'><Link href='/about' className='text-[10px] font-medium text-border-color
                hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1 focus:text-_teal active:text-_teal capitalize'>About</Link></li>
                <li className='mb-2 mx-3 lg:mx-4'><Link href='/orders' className='text-[10px] font-medium text-border-color
                hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1 focus:text-_teal active:text-_teal capitalize'>Orders</Link></li>
                <li className='mb-2 mx-3 lg:mx-4'><Link href='/studio' className='text-[10px] font-medium text-border-color
                hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1 focus:text-_teal active:text-_teal capitalize'>Studios</Link></li>
                <li className='mb-2 mx-3 lg:mx-4'><Link href='/creator' className='text-[10px] font-medium text-border-color
                hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1 focus:text-_teal active:text-_teal capitalize'>Creators</Link></li>
                <li className='mb-2 mx-3 lg:mx-4'><Link href='/blog' className='text-[10px] font-medium text-border-color
                hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1 focus:text-_teal active:text-_teal capitalize'>Blog</Link></li>
                <li className='mb-2 mx-3 lg:mx-4'><Link href='/faq' className='text-[10px] font-medium text-border-color
                hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1 focus:text-_teal active:text-_teal capitalize'>Faq</Link></li>
                 <li className='mb-2 mx-3 lg:mx-4'><Link href='/contact' className='text-[10px] font-medium text-border-color
                hover:text-_teal hover:decoration-_teal hover:decoration-solid hover:decoration-1 focus:text-_teal active:text-_teal capitalize'>Contact Us</Link></li>
            </ul>

            <ul className='flex flex-wrap'>
               
                {/* <li className=' me-2 mb-2'>
                    <Link href="#" className='text-[10px] leading-[12px] font-medium py-[5px] capitalize px-[6px] bg-[#000] rounded-[4px] text-white transition-all duration-100 focus:bg-white focus:text-_green'>Studios near me</Link>
                </li> */}

                {cityListData?.map((city,index)=> {
                    return (
                        <li key={index} className=' me-2 mb-2'>
                            <Link href={`/${city.cityName.toLowerCase().replace(/ /g, '-')}`} className='text-[10px] leading-[12px] font-medium py-[5px] capitalize px-[6px] bg-[#000] rounded-[4px] text-white transition-all duration-100 focus:bg-white focus:text-_green'>{city.cityName}</Link>
                        </li>
                    )
                })}


                
                {/* <li className=' me-2 mb-2'>
                    <Link href={'/'} className='text-[10px] leading-[12px] font-medium py-[5px] capitalize px-[6px] bg-[#000] rounded-[4px] text-white transition-all duration-100 focus:bg-white focus:text-_green'>Murshidabad</Link>
                </li>
                <li className=' me-2 mb-2'>
                    <Link href={'/'} className='text-[10px] leading-[12px] font-medium py-[5px] capitalize px-[6px] bg-[#000] rounded-[4px] text-white transition-all duration-100 focus:bg-white focus:text-_green'>Birbhum</Link>
                </li>
                 */}
            </ul>
        </div>
        <div className='bg-[#333333] h-[1px] my-3'></div>
        <NewsLetterSubscribe/>
        <div className="container">
            {/* <div className={`${styles.input__group} flex border border-gray-light rounded-lg mt-2 p-2`}>
                <input type="text" name='email' className={`${styles.input} form-control`} placeholder='Email Address' />
                <button className={`${styles.btn} bg-_teal rounded-lg flex justify-center items-center`}> 
                    <Image src={'/images/icons/plan.svg'} alt='Plane' width={12} height={12} />
                </button>
            </div> */}
            <div className="flex justify-center mt-4">
                <Link href={gsData.facebook_link.value} target='_blank' className='p-2 pl-0 text-white active:text-green focus:text-green'><FaFacebookF/></Link>
                <Link href={gsData.twitter_link.value} target='_blank' className='p-2 text-white active:text-green focus:text-green'><FaTwitter/></Link>
                <Link href={gsData.linkedin_link.value} target='_blank' className='p-2 text-white active:text-green focus:text-green'><FaLinkedinIn/></Link>
                <Link href={gsData.you_tube_link.value} target='_blank' className='p-2 text-white active:text-green focus:text-green'><FaYoutube/></Link> 
                <Link href={gsData.pinterest_link.value} target='_blank' className='p-2 text-white active:text-green focus:text-green'><FaPinterest/></Link> 
                <Link href={gsData.quora_link.value} target='_blank' className='p-2 text-white active:text-green focus:text-green'><FaQuora/></Link> 

                <Link href={`https://wa.me/${gsData.contact_phone.value.replace(/\s+/g, '')}`} target='_blank' className='p-2 text-white active:text-green focus:text-green'><FaWhatsapp/></Link> 

            </div>
        </div>
        <div className="py-4">
            <p className="text-center text-sm text-border-color">Copyright © 2023 <Link href="https://studiorec60sec.com/" target='_blank'>STUDIO REC 60 SEC PRIVATE LIMITED</Link></p>
        </div>
        <div className="pb-2">
            <p className="text-center text-sm text-border-color">Developed by <Link href="https://www.idiosystech.com/" target='_blank'>Software Development company </Link> <Link href="https://www.idiosystech.com/" target='_blank'>IDIOSYS TECHNOLOGIES.</Link></p>
        </div>
    </div>;
}


export default MobileFooter;