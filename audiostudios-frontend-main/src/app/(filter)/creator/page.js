import React from 'react'
import FilterPage from '@/components/FilterPage/FilterPage'


export const metadata = {
  title: "Audiostudio | Music producer |Creator | Best Creators in India | Kolkata | Bangalore",
  description: `India's most talented music producer, song creators,beat makers
  and jampad artists are in audio studios. Let's work with top-class professionals and
  record with happiness.`,
  keywords: ['music producer', 'song creators, beat makers'],
}

async function filterList() {
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/filter`,{ next: { revalidate: 3600 } })
  return res.json();

}


const page = async () => {
  const filterListDataSerer = await filterList();
  return (
    <>
    <FilterPage data={filterListDataSerer}/>
    </>
  )
}

export default page