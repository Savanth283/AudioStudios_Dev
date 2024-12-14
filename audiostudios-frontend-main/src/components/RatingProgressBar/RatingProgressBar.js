
import React from 'react'
import { AiFillStar } from 'react-icons/ai'

const RatingProgressBar = ({RatingBar,totalCount}) => {
    //console.log("RatingBar",RatingBar)
    RatingBar.sort((a,b) => b._id - a._id);


  return (
    <>
        {RatingBar && RatingBar.map((item,index)=>{

            const ratingbarPercentage = (item.count / totalCount[0]?.totalRatingCount ) * 100;
            //console.log("ratingbarPercentage",ratingbarPercentage)
            return(
                <div key={index} className="flex items-center py-1">
                    <span className="text-base lg:text-xl font-semibold text-_dark">{item._id}</span>
                    <AiFillStar className="text-xl text-_dark mx-2"/>
                    <div className="w-full bg-border-color h-[4px] max-w-[calc(100%-90px)] mr-auto">
                        <div className="bg-_green h-[4px]" style={{width: `${ratingbarPercentage}%`}}></div>
                    </div>
                    <span>{item.count}</span>
                </div>
            )
        })}
        
        {/* {sortedratingData.map((ratingcount,index) => {
        <div key={index} className="flex items-center py-1">
            <span className="text-base lg:text-xl font-semibold text-_dark">{ratingcount._id}</span>
            <AiFillStar className="text-xl text-_dark mx-2"/>
            <div className="w-full bg-border-color h-[4px] max-w-[calc(100%-90px)] mr-auto">
                <div className="bg-_green h-[4px]" style={{width: '55%'}}></div>
            </div>
            <span>{ratingcount.count}</span>
        </div>

        })} */}

        {/* <div className="flex items-center py-1">
            <span className="text-base lg:text-xl font-semibold text-_dark">3</span>
            <AiFillStar className="text-xl text-_dark mx-2"/>
            <div className="w-full bg-border-color h-[4px] max-w-[calc(100%-90px)] mr-auto">
                <div className="bg-_green h-[4px]" style={{width: '45%'}}></div>
            </div>
            <span>125</span>
        </div>
        <div className="flex items-center py-1">
            <span className="text-base lg:text-xl font-semibold text-_dark">2</span>
            <AiFillStar className="text-xl text-_dark mx-2"/>
            <div className="w-full bg-border-color h-[4px] max-w-[calc(100%-90px)] mr-auto">
                <div className="bg-_green h-[4px]" style={{width: '25%'}}></div>
            </div>
            <span>78</span>
        </div>
        <div className="flex items-center py-1">
            <span className="text-base lg:text-xl font-semibold text-_dark">1</span>
            <AiFillStar className="text-xl text-_dark mx-2"/>
            <div className="w-full bg-border-color h-[4px] max-w-[calc(100%-90px)] mr-auto">
                <div className="bg-_green h-[4px]" style={{width: '15%'}}></div>
            </div>
            <span>8</span>
        </div> */}
    </>
  )
}

export default RatingProgressBar