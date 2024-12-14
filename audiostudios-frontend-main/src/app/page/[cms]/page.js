import React from 'react'
import styles from "@/styles/GlobalPageStyles.module.scss";


 //for seo 
 export async function generateMetadata({ params}) {
    // read route params
    const slug = params.cms
   
    // fetch data
    const cms = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cms?cms_slug=${slug}`).then((res) => res.json())

    return {
      title: cms.meta_title,
      description: cms.meta_description,
      keywords: cms.meta_keyword
    }
  }


const page = async ({ params}) => {
    const slug = params.cms
    //console.log("slug",slug)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cms?cms_slug=${slug}`,{ cache: 'no-store' });
    const data = await res.json();
    //console.log("cms data",data)
  return (
    <main>
    {/* Header Wrapper Start */}
    <header className='header__wrapper py-10 sm:py-14 md:py-16 lg:py-20 bg-no-repeat bg-cover bg-center' style={{ backgroundImage: `url("/images/banners/blog-header-bg-image.webp")` }}>
        <div className="container mx-auto">
            <div className="text-center">
                <h1 className='text-xl sm:text-xl md:text-3xl lg:text-4xl font-semibold text-white'>{data.page_name}</h1>
            </div>
        </div>
    </header>
    {/* Header Wrapper End */}

    {/* Main Content wrapper start */}
    <section className={`py-8 ${styles.golbal__page}`}>
        <div className="container">

            <div dangerouslySetInnerHTML={{ __html: data?.page_content }}></div>
        </div>
    </section>
    {/* Main Content wrapper end */}
</main>
  )
}

export default page