import React from 'react'
import FilterPage from '@/components/FilterPage/FilterPage'


async function filterList() {
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/filter`,{ next: { revalidate: 3600 } })
  return res.json();

}

async function dynamicHeaderFooter(location) {
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dynamic-listing?type=studio&location=${location}`,{ next: { revalidate: 60 } })
  return res.json();

}

const page = async ({params}) => {
  const filterListDataSerer = await filterList();
  const headerFooterdata = await dynamicHeaderFooter(params.location)
  // console.log("Location params",headerFooterdata)
  return (
    <>
    <FilterPage data={filterListDataSerer} headerFooterdata={headerFooterdata}/>
    </>
  )
}

export default page