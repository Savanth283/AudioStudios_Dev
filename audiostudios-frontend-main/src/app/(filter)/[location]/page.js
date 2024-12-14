import React from 'react'
import FilterPage from '@/components/FilterPage/FilterPage'

export async function generateMetadata({ params}) {
  // read route params
  const location = params.location
 
  // fetch data
  //const alllocation = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cms?cms_slug=${slug}`).then((res) => res.json())

  return {
    title: `Audiostudio | Best Recording Studio in ${location} | Top 10 Recording Studio in ${location}`,
    description: `Find the best recording studio in ${location} now. Each of these
    recording studios offers world-class recording facilities. Book any of these top
    recording studios in ${location} with Audiostudios and experience the best deals.`,
    keywords: `recording studio in ${location}, best recording studio in ${location}, top recording
    studio in ${location}, recording studio near ${location}`
  }
}

async function filterList() {
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/filter`,{ next: { revalidate: 3600 } })
  return res.json();

}

const page = async ({params}) => {
  const filterListDataSerer = await filterList();
    const location = params.location
    //console.log("location page",location)
  return (
    <>
    <FilterPage filterlocation={location} data={filterListDataSerer} />
    </>
  )
}

export default page