"use client"
import React, { useState } from "react";
import { RWebShare } from "react-web-share";
import {FaShareSquare} from "react-icons/fa"

const ShareButton = ({title,url,type}) => {
  let shareurl = `${process.env.NEXT_PUBLIC_BASE_URL}/${type}/${url}`
  console.log("share url",shareurl)
  return (
    <div>
      <RWebShare
        data={{
          text: "Book Me Here : ",
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/${type}/${url}`,
          title: title,
        }}
        //onClick={() => console.log("shared successfully!")}
      >
        <button className="flex w-full items-center justify-center py-2 mb-3 px-4 border border-_green rounded-lg transition-all duration-200 hover:bg-_teal hover:text-white text-_green"><FaShareSquare/> <span className='pl-3'> Share </span> </button>
       
      </RWebShare>
    </div>
  )
}

export default ShareButton