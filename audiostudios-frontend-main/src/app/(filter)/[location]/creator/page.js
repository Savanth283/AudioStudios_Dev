import React from 'react'
import FilterPage from '@/components/FilterPage/FilterPage'


// export const metadata = {
//   title: "Audiostudio | Best creator in Howrah | Hire Creator in in Howrah ",
//   description: `Find the best creator in howrah now. Let's work with top creators in Howrah and experience the best quality of assistance from our enlisted creators.`,
//   keywords: [`music creator in howrah, music creator in howrah, dubbing artist in howrah, best dubbing artist in howrah.`],
// }

async function filterList() {
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/filter`,{ next: { revalidate: 3600 } })
  return res.json();

}

async function dynamicHeaderFooter(location) {
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dynamic-listing?type=creator&location=${location}`,{ next: { revalidate: 60 } })
  return res.json();

}


const page = async ({params}) => {
  const filterListDataSerer = await filterList();
  const headerFooterdata = await dynamicHeaderFooter(params.location)

  return (
    <>
    <FilterPage data={filterListDataSerer} headerFooterdata={headerFooterdata} />
    </>
  )
}

export default page