import BlogItem from '@/components/BlogItem/BlogItem'
import BlogSearch from '@/components/BlogSearch/BlogSearch'
import React from 'react'

export const metadata={
    title:'Blogs',
    description: 'Blogs'
}

async function BlogList() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`,{ cache: 'no-store' })
        return res.json();
    } catch (e) {
        return []
    }
}

const page = async () => {
    const Blogadata = await BlogList();

    //console.log("Blogadata",Blogadata)

  return (
    <main>
        {/* Header Wrapper Start */}
        <header className='header__wrapper py-10 sm:py-14 md:py-16 lg:py-20 bg-no-repeat bg-cover bg-center' style={{ backgroundImage: `url("/images/banners/blog-header-bg-image.webp")` }}>
            <div className="container mx-auto">
                <div className="text-center">
                    <h1 className='text-xl sm:text-xl md:text-3xl lg:text-4xl font-semibold text-white'>Our Blog</h1>
                </div>
            </div>
        </header>
        {/* Header Wrapper End */}

        {/* Lisitng Wrapper Start */}
        <section className="py-8 sm:py-10 md:py-14 overflow-hidden">
            <div className="container">
                <div className="flex flex-wrap">
                    <div className="lg:w-[70%] lg:pr-4">
                        {Blogadata && Blogadata.map((blog,index)=> {
                            return <BlogItem blog={blog} />                    
                        })}
                        
                       
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
