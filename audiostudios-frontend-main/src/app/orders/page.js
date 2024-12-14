import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { getServerSession } from 'next-auth/next'
//import { authOptions } from '../../api/auth/[...nextauth]/route'
import OrderList from '@/components/OrderList/OrderList'


export const metadata = {
    title: 'Booking Listing',
    description: 'Test'
}




const page = async () => {

// const session = await getServerSession(authOptions)

// console.log("order session",session)

  return (
    <main className='pb-5'>
        <div className="py-8 bg-_dark">
            <div className="container">
                <h1 className='text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-white text-center'>My Orders</h1>
            </div>
        </div>

      <OrderList/>

    </main>
  )
}

export default page
