"use client";

import { useSession } from "next-auth/react"
import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import Link from "next/link";

export const GiveRating = ({user_id}) => {
  const { data: session, status } = useSession()
  //console.log("customer_id",session?.user?.id)
  //console.log("session",session)

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review,setReview] = useState("");

  const [message,setMessage] = useState("");
  //const user_id = "nqAjL3bDQRKxHMGX9";
  //const customer_id = "Hp6waGogSMtNyikEM";
  //console.log("rating", rating)

  const submitReview =  () => {

  //  console.log("rating",rating);
   // console.log("review",review);
   // console.log("user_id",user_id);
   // console.log("customer_id",session?.user?.id);
    // try {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/save-rating`, {
        method: 'POST',
        headers: {
          Authorization: session?.user?.token, // Replace with your actual token
          'Content-Type': 'application/json'
          
        },
        body: JSON.stringify({
          rating: rating,
          review: review,
          user_id: user_id,
          customer_id: session?.user?.id
        })
      })
        .then(response => {
          if (response.ok) {
            //console.log(response)
            setRating(0);
            setHover(0);
            setReview("");
            return response.json();
          } else {
            throw new Error('Request failed with status code ' + response.status);
          }
        })
        .then(data => {
          console.log("data",data);
          setMessage(data.message)
        })
        .catch(error => {
          console.error(error);
        });

      // axios.post(`${process.env.NEXT_PUBLIC_API_URL}/save-rating`,{
      //   rating:"5",
      //   review:"demo",
      //   user_id:user_id,
      //   customer_id:customer_id,
      // })
      // .then(response => {

      //   // Check if the request was successful (status code 2xx)
      //   // if (response.status >= 200 && response.status < 300) {
      //     // Access the result data here
      //     console.log("response",response);
      //   // } else {
      //   //   throw new Error('Request failed with status code ' + response.status);
      //   // }
      // })
      // .catch(error => {
      //   // Handle any errors that occurred during the request
      //   console.error("error",error);
      // });
      

      // if (data.status_code == 200) {
      //   setRating(0)
      //   setReview("")
      // }

    // } catch (error) {
    //     console.log("review error",error)
    // }
  }

  if (status === "unauthenticated") {
    return (
      <>
      <div className='mt-4 max-w-[600px]'>
      <p className=" capitalize">Please Login To give Review <Link href="/login">Sign In</Link> </p>
      </div>
      </>
      )
      
  }

  return (
    <div className='mt-4 max-w-[600px]'>
      <p className='text-sm sm:text-base  font-semibold text-_dark mb-2'>Give a rating</p>
      <div className="flex flex-wrap sm:flex-nowrap">
          <div className="bg-_gray-light px-3 sm:px-4 lg:px-5 py-4 sm:py-10 md:py-12 rounded-lg rounded-b-none sm:rounded-b-lg border-b-0 sm:border-b-1 border border-border-color text-center w-full sm:w-[140px] md:w-[200px] lg:w-[250px]">  
            <p className='text-sm sm:text-base font-medium text-_dark mb-1'>Select a rating</p>
              <style jsx>{`
                .button {
                    background-color: transparent;
                    border: none;
                    outline: none;
                    cursor: pointer;
                    font-size: 24px;
                  }
                  .on {
                    color: #FFAF40;
                    line-height:1;
                  }
                  .off {
                    color: #ccc;
                    line-height:1;
                  }
              `}</style>
              {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                  <button
                    type="button"
                    key={index}
                    className={index <= (hover || rating) ? "on" : "off"}
                    onClick={() => setRating(index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(rating)}
                  >
                    <span className='button'>&#9733;</span>
                  </button>
                );
              })}
          </div>
          <div className="w-full sm:w-[calc(100%-138px)] md:w-[calc(100%-198px)] lg:w-[calc(100%-248px)] sm:-ml-[4px] p-3 border border-border-color rounded-lg flex flex-column items-center rounded-tl-none sm:rounded-bl-none rounded-tr-none sm:rouned-tr-lg sm:border-l-0">
              <div className="w-full">
                <textarea value={review} onChange={(e)=> setReview(e.target.value)} name="give_rating" id="give_rating" cols="30" rows="2" className='border border-border-color w-full rounded-md h-auto' placeholder='Write your review'></textarea>
                {message && message}
                <div className="text-right pt-2 pt-md-3"> 
                  <button onClick={submitReview}
                    className='text-[12px] sm:text-sm md:text-base px-3 py-2 sm:py-2 leading-[1] rounded-md lg:rounded-lg bg-_teal text-white transition-all duration-300 hover:bg-_green hover:text-white focus:bg-_dark focus:text-white'
                  >
                    Submit
                  </button>
                </div>
              </div>
          </div>
      </div>
      
    </div>
  )
}
