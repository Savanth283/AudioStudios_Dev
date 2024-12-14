import React from 'react'
import FilterPage from '@/components/FilterPage/FilterPage'

export const metadata = {
  title: "Audiostudio | Sound recording studio | Studio | Sound Recording studio in India | Kolkata | Bangalore",
  description: `Find and book your ideal sound recording studio,recording studio in
  kolkata, Delhi, Bangalore, Pune, and other Indian cities. 500+ recording studios across
  India with top-class recording equipment and amenities.`,
  keywords: ['sound recording studio', 'recording studio in kolkata'],
}

async function filterList() {
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/filter`,{ next: { revalidate: 3600 } })
  return res.json();

}


const page = async () => {
  const filterListDataSerer = await filterList();
  //console.log("filterListData",filterListData)
  return (
    <>
    <FilterPage data={filterListDataSerer}/>
    </>
  )
}

export default page