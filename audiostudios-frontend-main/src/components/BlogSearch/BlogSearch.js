
import styles from '@/styles/BlogSearch.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment'
import axios from 'axios';

const  BlogSearch = ({latestblog}) => {
    //console.log("latestblog",latestblog)

    

  return (
    <div className={styles.blog__search__box}>
        {/* Search field */}

        {/* <div className="relative">
            <input type="text" name='blog_search' className='form-control h-14' placeholder='Search' />
            <button className="p-2 rounded-md bg-_teal absolute top-1.5 right-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    fill="none"
                    aria-labelledby={'search'} 
                > 
                    <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M14.581 13.295a8.186 8.186 0 1 0-1.286 1.286l5.152 5.153a.91.91 0 0 0 1.287-1.287l-5.153-5.152ZM8.186 14.56a6.376 6.376 0 1 1 0-12.751 6.376 6.376 0 0 1 0 12.751Z"
                    clipRule="evenodd"
                    />
                </svg>
            </button>
        </div> */}

        {/* Category */}
        {/* <>

        <h3 className={`text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-_dark mt-7 relative pb-2 mb-4 ${styles.title}`}>Category</h3>

        <ul>
            <li className="flex justify-between mb-2">
                <Link href={'/blog'} className='text-sm sm:text-base lg:text-lg text-[#1B1B24] transition-all duration-300 hover:text-_green hover:underline'>Mastering</Link>
                <span className='text-[12px] sm:text-[13px] md:text-sm lg:text-base text-_dark px-2 py-1 rounded-full bg-[#F5F5F5]'>21</span> 
            </li>
            <li className="flex justify-between mb-2">
                <Link href={'/blog'} className='text-sm sm:text-base lg:text-lg text-[#1B1B24] transition-all duration-300 hover:text-_green hover:underline'>Music band</Link>
                <span className='text-[12px] sm:text-[13px] md:text-sm lg:text-base text-_dark px-2 py-1 rounded-full bg-[#F5F5F5]'>21</span> 
            </li>
            <li className="flex justify-between mb-2">
                <Link href={'/blog'} className='text-sm sm:text-base lg:text-lg text-[#1B1B24] transition-all duration-300 hover:text-_green hover:underline'>Recording</Link>
                <span className='text-[12px] sm:text-[13px] md:text-sm lg:text-base text-_dark px-2 py-1 rounded-full bg-[#F5F5F5]'>21</span> 
            </li>
            <li className="flex justify-between mb-2">
                <Link href={'/blog'} className='text-sm sm:text-base lg:text-lg text-[#1B1B24] transition-all duration-300 hover:text-_green hover:underline'>Sound editing</Link>
                <span className='text-[12px] sm:text-[13px] md:text-sm lg:text-base text-_dark px-2 py-1 rounded-full bg-[#F5F5F5]'>21</span> 
            </li>
            <li className="flex justify-between mb-2">
                <Link href={'/blog'} className='text-sm sm:text-base lg:text-lg text-[#1B1B24] transition-all duration-300 hover:text-_green hover:underline'>Voice recording </Link>
                <span className='text-[12px] sm:text-[13px] md:text-sm lg:text-base text-_dark px-2 py-1 rounded-full bg-[#F5F5F5]'>21</span> 
            </li>
        </ul>
        </> */}

        <h3 className={`text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-_dark mt-6 sm:mt-7 md:mt-8 relative pb-2 mb-4 ${styles.title}`}>Recent Post</h3>

        <ul>
            {latestblog && latestblog.slice(0,5).map((blog,index) => {
                return (
                    <li key={index} className='flex mb-3 sm:mb-4'>
                <Link href={`/blog/${blog.slug}`} className='block w-[150px] h-auto'>
                    <Image
                        src={process.env.NEXT_PUBLIC_S3_BUCKET_URL + blog.thumbnail}
                        width={240}
                        height={120}
                        className='rounded-lg object-cover object-center w-[150px] h-28'
                        alt={blog.title}
                    />
                </Link>
                <div className="w-[calc(100%-150px)] pl-4">
                    <h3 className='text-sm sm:text-base lg:text-lg font-semibold mb-3'>
                        <Link href={`/blog/${blog.slug}`} className='text-_dark transition-all duration-300 hover:text-_green hover:underline'>
                        {blog.title}
                        </Link>
                    </h3>
                    <div className="date flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={18}
                            height={20}
                            fill="none"
                            aria-labelledby={'caldendar'} 
                        > 
                            <path
                            stroke="#212129"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit={10}
                            d="M5.5 1v2.7M12.7 1v2.7M1.45 7.381h15.3M17.2 6.85v7.65c0 2.7-1.35 4.5-4.5 4.5H5.5C2.35 19 1 17.2 1 14.5V6.85c0-2.7 1.35-4.5 4.5-4.5h7.2c3.15 0 4.5 1.8 4.5 4.5Z"
                            />
                            <path
                            stroke="#212129"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12.426 11.53h.01M12.426 14.23h.01M9.094 11.53h.009M9.094 14.23h.009M5.766 11.53h.01M5.766 14.23h.01"
                            />
                        </svg>
                        <span className='text-[12px] sm:text-[13px] md:text-sm lg:text-base text-_dark ml-3'>{moment(blog.createdAt).format('DD MMM, YYYY')}</span>
                    </div>
                </div>
            </li>
                )
            })}
            
            {/* <li className='flex mb-3 sm:mb-4'>
                <Link href={'/'} className='block w-[150px] h-auto'>
                    <Image
                        src={'/images/banners/blog-banner.webp'}
                        width={240}
                        height={120}
                        className='rounded-lg object-cover object-center w-[150px] h-28'
                        alt='blog thumbnail'
                    />
                </Link>
                <div className="w-[calc(100%-150px)] pl-4">
                    <h3 className='text-sm sm:text-base lg:text-lg font-semibold mb-3'>
                        <Link href={'/'} className='text-_dark transition-all duration-300 hover:text-_green hover:underline'>
                            Music And Its Role In The Civil Rights Movement
                        </Link>
                    </h3>
                    <div className="date flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={18}
                            height={20}
                            fill="none"
                            aria-labelledby={'caldendar'} 
                        > 
                            <path
                            stroke="#212129"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit={10}
                            d="M5.5 1v2.7M12.7 1v2.7M1.45 7.381h15.3M17.2 6.85v7.65c0 2.7-1.35 4.5-4.5 4.5H5.5C2.35 19 1 17.2 1 14.5V6.85c0-2.7 1.35-4.5 4.5-4.5h7.2c3.15 0 4.5 1.8 4.5 4.5Z"
                            />
                            <path
                            stroke="#212129"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12.426 11.53h.01M12.426 14.23h.01M9.094 11.53h.009M9.094 14.23h.009M5.766 11.53h.01M5.766 14.23h.01"
                            />
                        </svg>
                        <span className='text-[12px] sm:text-[13px] md:text-sm lg:text-base text-_dark ml-3'>23 July, 2023</span>
                    </div>
                </div>
            </li>
            <li className='flex mb-3 sm:mb-4'>
                <Link href={'/'} className='block w-[150px] h-auto'>
                    <Image
                        src={'/images/banners/blog-banner.webp'}
                        width={240}
                        height={120}
                        className='rounded-lg object-cover object-center w-[150px] h-28'
                        alt='blog thumbnail'
                    />
                </Link>
                <div className="w-[calc(100%-150px)] pl-4">
                    <h3 className='text-sm sm:text-base lg:text-lg font-semibold mb-3'>
                        <Link href={'/'} className='text-_dark transition-all duration-300 hover:text-_green hover:underline'>
                            Music And Its Role In The Civil Rights Movement
                        </Link>
                    </h3>
                    <div className="date flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={18}
                            height={20}
                            fill="none"
                            aria-labelledby={'caldendar'} 
                        > 
                            <path
                            stroke="#212129"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit={10}
                            d="M5.5 1v2.7M12.7 1v2.7M1.45 7.381h15.3M17.2 6.85v7.65c0 2.7-1.35 4.5-4.5 4.5H5.5C2.35 19 1 17.2 1 14.5V6.85c0-2.7 1.35-4.5 4.5-4.5h7.2c3.15 0 4.5 1.8 4.5 4.5Z"
                            />
                            <path
                            stroke="#212129"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12.426 11.53h.01M12.426 14.23h.01M9.094 11.53h.009M9.094 14.23h.009M5.766 11.53h.01M5.766 14.23h.01"
                            />
                        </svg>
                        <span className='text-[12px] sm:text-[13px] md:text-sm lg:text-base text-_dark ml-3'>23 July, 2023</span>
                    </div>
                </div>
            </li> */}
        </ul>

        {/* Tag */}
        {/* <>
        <h3 className={`text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-_dark mt-6 sm:mt-7 md:mt-8 relative pb-2 mb-4 ${styles.title}`}>Tag</h3>

        <ul className="flex flex-wrap">
            <li className='mr-2 mb-2'>
                <Link href={'/'} 
                    className='text-[12px] sm:text-[13px] md:text-sm lg:text-base text-_dark px-2.5 py-1.5 rounded-md bg-[#F5F5F5] inline-block'
                >
                Band
                </Link>
            </li>
            <li className='mr-2 mb-2'>
                <Link href={'/'} 
                    className='text-[12px] sm:text-[13px] md:text-sm lg:text-base text-_dark px-2.5 py-1.5 rounded-md bg-[#F5F5F5] inline-block'
                >
                Music
                </Link>
            </li>
            <li className='mr-2 mb-2'>
                <Link href={'/'} 
                    className='text-[12px] sm:text-[13px] md:text-sm lg:text-base text-_dark px-2.5 py-1.5 rounded-md bg-[#F5F5F5] inline-block'
                >
                Recording
                </Link>
            </li>
            <li className='mr-2 mb-2'>
                <Link href={'/'} 
                    className='text-[12px] sm:text-[13px] md:text-sm lg:text-base text-_dark px-2.5 py-1.5 rounded-md bg-[#F5F5F5] inline-block'
                >
                Sound
                </Link>
            </li>
            <li className='mr-2 mb-2'>
                <Link href={'/'} 
                    className='text-[12px] sm:text-[13px] md:text-sm lg:text-base text-_dark px-2.5 py-1.5 rounded-md bg-[#F5F5F5] inline-block'
                >
                Vocal
                </Link>
            </li>
            <li className='mr-2 mb-2'>
                <Link href={'/'} 
                    className='text-[12px] sm:text-[13px] md:text-sm lg:text-base text-_dark px-2.5 py-1.5 rounded-md bg-[#F5F5F5] inline-block'
                >
                Song
                </Link>
            </li>
            <li className='mr-2 mb-2'>
                <Link href={'/'} 
                    className='text-[12px] sm:text-[13px] md:text-sm lg:text-base text-_dark px-2.5 py-1.5 rounded-md bg-[#F5F5F5] inline-block'
                >
                Band
                </Link>
            </li>
            <li className='mr-2 mb-2'>
                <Link href={'/'} 
                    className='text-[12px] sm:text-[13px] md:text-sm lg:text-base text-_dark px-2.5 py-1.5 rounded-md bg-[#F5F5F5] inline-block'
                >
                Music
                </Link>
            </li>
            <li className='mr-2 mb-2'>
                <Link href={'/'} 
                    className='text-[12px] sm:text-[13px] md:text-sm lg:text-base text-_dark px-2.5 py-1.5 rounded-md bg-[#F5F5F5] inline-block'
                >
                Recording
                </Link>
            </li>
            <li className='mr-2 mb-2'>
                <Link href={'/'} 
                    className='text-[12px] sm:text-[13px] md:text-sm lg:text-base text-_dark px-2.5 py-1.5 rounded-md bg-[#F5F5F5] inline-block'
                >
                Sound
                </Link>
            </li>
            <li className='mr-2 mb-2'>
                <Link href={'/'} 
                    className='text-[12px] sm:text-[13px] md:text-sm lg:text-base text-_dark px-2.5 py-1.5 rounded-md bg-[#F5F5F5] inline-block'
                >
                Vocal
                </Link>
            </li>
            <li className='mr-2 mb-2'>
                <Link href={'/'} 
                    className='text-[12px] sm:text-[13px] md:text-sm lg:text-base text-_dark px-2.5 py-1.5 rounded-md bg-[#F5F5F5] inline-block'
                >
                Song
                </Link>
            </li>
        </ul>
        </> */}

    </div>
  )
}

export default BlogSearch
