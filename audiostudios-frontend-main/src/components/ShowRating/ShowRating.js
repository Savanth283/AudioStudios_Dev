import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import {BiTimeFive} from 'react-icons/bi'
import { TbThumbUp, TbThumbDown } from 'react-icons/tb' 
import moment from 'moment'

const ShowRating = ({reviewList}) => {
    //console.log(reviewList)
  return (
    <ul className="mt-7 max-w-[650px]">
        {reviewList.map((review,index)=> {
            
            return (
                <li key={index} className='mb-4'>
                    <div className="text-base md:text-lg lg:text-xl text-_dark">{review.name}</div>

                    <div className='flex flex-wrap items-center mt-2 sm:mt-3 ' >
                    <BiTimeFive/>
                    <span className='px-[2px]'>{moment(review.createdAt).format('MMMM Do YYYY')}</span>
                    </div>

                    <div className="inline-flex items-center bg-_green px-2 py-[2px] text-white mt-3 mb-3 text-sm md:text-base font-semibold rounded-md">
                        {review.rating} <AiFillStar className="ml-1"/>
                    </div>

                    
                    <p className="text-sm sm:text-base lg:text-lg">{review.review}</p>
                    {/* <div className="inline-flex mt-4">
                        <button className='hover:text-_dark inline-flex items-center'>
                            <TbThumbUp className='text-2xl mr-2'/>
                            <span>321</span>
                        </button>
                        <button className='hover:text-_dark inline-flex items-center ml-3'>
                            <TbThumbDown className='text-2xl mr-2'/>
                            <span>21</span>
                        </button>
                    </div> */}
                </li>
            )
        })}

        
    </ul>
  )
}

export default ShowRating