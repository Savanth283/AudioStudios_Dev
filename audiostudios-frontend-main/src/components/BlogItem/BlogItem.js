import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import moment from 'moment'

const BlogItem = ({blog}) => {
  //console.log("blog",blog)
  return (
    <>
    <Link href={`/blog/${blog.slug}`}>
    <div className='relative rounded-lg border border-border-color sm:border-0 p-2 sm:p-0 mb-4 md:mb-5 lg:mb-6'>
      <Link href={`/blog/${blog.slug}`}>
      <Image
        src={process.env.NEXT_PUBLIC_S3_BUCKET_URL + blog.thumbnail}
        width={1110}
        height={440}
        className='rounded-lg'
        alt={blog.title}
      />
      </Link>
      <div className="sm:absolute top-0 left-0 w-full h-full flex items-end rounded-lg overflow-hidden">
        <div className="w-full relative blog__caption sm:p-6 p-2 rounded-lg overflow-hidden">
            <div className="relative z-10 pt-2 pt-sm-0"> 
                <div className="date flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={18}
                        height={20}
                        fill="none"
                        aria-labelledby={'caldendar'} 
                    > 
                        <path
                        stroke="#fff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        d="M5.5 1v2.7M12.7 1v2.7M1.45 7.381h15.3M17.2 6.85v7.65c0 2.7-1.35 4.5-4.5 4.5H5.5C2.35 19 1 17.2 1 14.5V6.85c0-2.7 1.35-4.5 4.5-4.5h7.2c3.15 0 4.5 1.8 4.5 4.5Z"
                        />
                        <path
                        stroke="#fff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12.426 11.53h.01M12.426 14.23h.01M9.094 11.53h.009M9.094 14.23h.009M5.766 11.53h.01M5.766 14.23h.01"
                        />
                    </svg>
                    <span className='text-[12px] sm:text-[13px] md:text-sm lg:text-base sm:text-white ml-3'>{moment(blog.createdAt).format('DD MMM, YYYY')} </span>
                </div>
                <h2 className='text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mt-3 sm:mb-4 mb-2'>
                    <Link href={`/blog/${blog.slug}`} className='sm:text-white text-_teal transition-all duration-300 hover:text-_green hover:underline'>
                        {blog.title}
                    </Link>
                </h2>
                {/* <div className="text-[12px] sm:text-[13px] md:text-sm lg:text-base sm:text-white ellipsis-2">
                  {blog.content.length > 100 ? `${blog.content.slice(0, 100)}...` : blog.content} dangerouslySetInnerHTML={{__html: data}}
                </div>

                   dangerouslySetInnerHTML={{__html: blog.content.length > 100 ? `${blog.content.slice(0, 100)}...` : blog.content}}
                <div  className="text-[12px] sm:text-[13px] md:text-sm lg:text-base sm:text-white ellipsis-2"  /> */}
               
               <div className="text-[12px] sm:text-[13px] md:text-sm lg:text-base sm:text-white ellipsis-2" dangerouslySetInnerHTML={{__html: blog.content.length > 100 ? `${blog.content.slice(0, 100)}...` : blog.content}} />

                {/* <p className="text-[12px] sm:text-[13px] md:text-sm lg:text-base sm:text-white ellipsis-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt nunc lorem, nec faucibus mi facilisis eget. Mauris laoreet, nisl id faucibus pellentesque, mi...</p>  */}
            </div>
        </div>
      </div>
    </div>
    </Link>
    </>
  )
}

export default BlogItem
