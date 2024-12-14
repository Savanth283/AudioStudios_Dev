import BlogSearch from '@/components/BlogSearch/BlogSearch'
import Image from 'next/image'
import React from 'react'
import moment from 'moment'

//for seo 
export async function generateMetadata({ params}) {
    // read route params
    const slug = params.blog  
   
    // fetch data
    const blog = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog?slug=${slug}`).then((res) => res.json())
    // console.log("blog",blog)
    return {
      title: blog[0].meta_title || blog[0].title,
      description: blog[0].meta_description,
      keywords: blog[0].meta_keyword
    }
  }

  async function BlogList() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`,{ cache: 'no-store' })
        return res.json();
    } catch (e) {
        return []
    }
}

const page = async ({params}) => {
    const slug = params.blog  

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog?slug=${slug}`,{ cache: 'no-store' });
    
    const data = await res.json();
    const Blogadata = await BlogList();

    //console.log("blog data",blogdata)
  return (
    <main>
        {/* Header Wrapper Start */}
        <header className='header__wrapper py-10 sm:py-14 md:py-16 lg:py-20 bg-no-repeat bg-cover bg-center' style={{ backgroundImage: `url("/images/banners/blog-header-bg-image.webp")` }}>
            <div className="container mx-auto">
                <div className="text-center">
                    <h1 className='text-xl sm:text-xl md:text-3xl lg:text-4xl font-semibold text-white'>{data[0].title}</h1>
                </div>
            </div>
        </header>
        {/* Header Wrapper End */}

        {/* Lisitng Wrapper Start */}
        <section className="py-8 sm:py-10 md:py-14 overflow-hidden text-_dark">
            <div className="container">
                <div className="flex flex-wrap">
                    <div className="lg:w-[70%] lg:pr-4">
                        <Image
                            src={process.env.NEXT_PUBLIC_S3_BUCKET_URL + data[0].thumbnail}
                            width={1110}
                            height={440}
                            className='rounded-lg'
                            alt='blog thumbnail'
                        />
                        
                        <div className="date flex items-center mt-4">
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
                            <span className='text-[12px] sm:text-[13px] md:text-sm lg:text-base text-_dark ml-3'>{moment(data[0].createdAt).format('DD MMM, YYYY')}</span>
                        </div>
                        <h1 className='text-sm sm:text-base lg:text-lg xl:text-2xl font-semibold text-_dark mb-4 mt-3'>
                           {data[0].title} 
                        </h1>
                        <div className='mb-4' dangerouslySetInnerHTML={{__html: data[0]?.content}} />
                        {/* <p className="mb-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta et veniam dignissimos sint inventore iure veritatis reiciendis voluptates, unde doloremque vitae ad nihil illum quasi harum dolorem. Ad libero laudantium eius dolorem quo delectus ipsum consequuntur labore similique a, vitae, soluta, id ex recusandae quidem? Quos ullam reprehenderit expedita dolores atque vel doloribus dolore beatae?</p>
                        <p className="mb-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta et veniam dignissimos sint inventore iure veritatis reiciendis voluptates, unde doloremque vitae ad nihil illum quasi harum dolorem. Ad libero laudantium eius dolorem quo delectus ipsum consequuntur labore similique a, vitae, soluta, id ex recusandae quidem? Quos ullam reprehenderit expedita dolores atque vel doloribus dolore beatae?</p>
                        <p className="mb-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta et veniam dignissimos sint inventore iure veritatis reiciendis voluptates, unde doloremque vitae ad nihil illum quasi harum dolorem. Ad libero laudantium eius dolorem quo delectus ipsum consequuntur labore similique a, vitae, soluta, id ex recusandae quidem? Quos ullam reprehenderit expedita dolores atque vel doloribus dolore beatae?</p>
                        <p className="mb-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta et veniam dignissimos sint inventore iure veritatis reiciendis voluptates, unde doloremque vitae ad nihil illum quasi harum dolorem. Ad libero laudantium eius dolorem quo delectus ipsum consequuntur labore similique a, vitae, soluta, id ex recusandae quidem? Quos ullam reprehenderit expedita dolores atque vel doloribus dolore beatae?</p>
                        <p className="mb-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta et veniam dignissimos sint inventore iure veritatis reiciendis voluptates, unde doloremque vitae ad nihil illum quasi harum dolorem. Ad libero laudantium eius dolorem quo delectus ipsum consequuntur labore similique a, vitae, soluta, id ex recusandae quidem? Quos ullam reprehenderit expedita dolores atque vel doloribus dolore beatae?</p>
                        <p className="mb-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta et veniam dignissimos sint inventore iure veritatis reiciendis voluptates, unde doloremque vitae ad nihil illum quasi harum dolorem. Ad libero laudantium eius dolorem quo delectus ipsum consequuntur labore similique a, vitae, soluta, id ex recusandae quidem? Quos ullam reprehenderit expedita dolores atque vel doloribus dolore beatae?</p>
                        <p className="mb-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta et veniam dignissimos sint inventore iure veritatis reiciendis voluptates, unde doloremque vitae ad nihil illum quasi harum dolorem. Ad libero laudantium eius dolorem quo delectus ipsum consequuntur labore similique a, vitae, soluta, id ex recusandae quidem? Quos ullam reprehenderit expedita dolores atque vel doloribus dolore beatae?</p> */}




                    </div>
                    <div className="lg:w-[30%] lg:pl-4 flex">
                        <BlogSearch latestblog={Blogadata} />

                    </div>
                </div>
            </div>
        </section>
        {/* Lisitng Wrapper End */}
    </main>
  )
}

export default page
