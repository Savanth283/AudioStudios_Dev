
import AsDetails from '@/components/AsDetails';

import React from 'react'



  //for seo 
  export async function generateMetadata({ params}) {
    // read route params
    const slug = params.slug
   
    // fetch data
    const product = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/view-details?slug=${slug}`).then((res) => res.json())

    return {
      title: product.code_name,
      
    }
  }

const Page = async ({params}) => {

    const slug = params.slug
    //console.log(slug)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/view-details?slug=${slug}`,{ cache: 'no-store' });
    const data = await res.json();
    //console.log("data",data)

    const reviewRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rating-details?slug=${slug}`,{ cache: 'no-store' });
    const reviewData = await reviewRes.json();

    //middle add
    const middleAddRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banner-list?position=Details-Middle`,{ cache: 'no-store' }); 
    const middleAddData = await middleAddRes.json();
    //console.log("middleAddData",middleAddData)
    
    //bottom add
    const bottomAdddRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banner-list?position=Details-Bottom`,{ cache: 'no-store' });
    const bottomAdddData = await bottomAdddRes.json();

    const defaultPriceObject = data?.pricing_details?.find(obj => obj.default_price === "Yes");

    //console.log("bottomAdddData",bottomAdddData)

    //console.log("reviewData",reviewData)

    //console.log("defaultPriceObject",defaultPriceObject)
  return (
    <>  
   <AsDetails data={data} slug={slug} defaultPriceObject={defaultPriceObject} reviewData={reviewData} middleAddData={middleAddData} bottomAdddData={bottomAdddData} />
    </>
  )
}

export default Page