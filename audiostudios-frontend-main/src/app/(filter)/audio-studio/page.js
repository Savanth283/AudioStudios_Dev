import React from 'react'
import FilterPage from '@/components/FilterPage/FilterPage'


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