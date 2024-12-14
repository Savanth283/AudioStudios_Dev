'use client';

import React from 'react'
import Link from 'next/link'
import { useState,useEffect,useRef } from 'react';
import { IoCalendarSharp } from 'react-icons/io5' 
import { BsFillClockFill } from 'react-icons/bs' 
import { IoMdClose } from 'react-icons/io';
import DatePicker from "react-datepicker";
import DynamicForm from './DynamicForm';
import BookingSection from './BookingSection';

import "react-datepicker/dist/react-datepicker.css";

const BookNow = ({name,id,type,pricingDetails}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        if (modalOpen) {
            document.body.classList.add("no-scroll"); // Prevent scrolling on the body
        } else {
          document.body.style.overflow = 'auto'; // Enable scrolling on the body
        }
    
        return () => {
          document.body.style.overflow = 'auto'; // Revert back to default scrolling on unmount
        };
      }, [modalOpen]);

    const handleButtonClick = () => {
        //console.log("clicked")
        setModalOpen(!modalOpen);
      };
    
      const handleCloseModal = () => {
        setModalOpen(false);
      };


      const [date, setDate] = useState('');
  const dateInputRef = useRef(null);

  const handleChange = (e) => {
    setDate(e.target.value);
  };
//console.log("startDate",startDate)
  return (
    <>
    <button onClick={handleButtonClick} 
    className='py-1.5 2xl:py-2 px-3 xl:px-4 bg-_teal text-white rounded-lg w-full block transition duration-300 hover:bg-_dark hover:text-_teal text-[12px] sm:text-sm md:text-base 2xl:text-lg text-center'>
      Book Now
    </button>

    {modalOpen && (
        <>
        <div className="w-full h-full overflow-x-hidden overflow-y-auto px-4 fixed inset-0 z-50 outline-none focus:outline-none bg-[rgba(0,0,0,0.5)]">
            <div className="relative w-full my-8 mx-auto max-w-[480px] ">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h4 className="text-sm sm:text-base md:text-lg lg:text-xl 2xl:text-2xl font=semibold">{name}</h4>
                  <button
                    className="shadow-md border-0 text-black float-right h-8 w-8 text-xl bg-white py-0 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-_gray-light hover:text-_pink transition-all duration-200"
                    onClick={handleCloseModal}
                  >
                    <IoMdClose />
                    
                  </button>
                </div>

                {/* <div className="relative lg:p-6 md:p-4 sm:p-3 p-3 flex-auto"> */}

                {/* <div className="w-full 2xl:w-[30%] xl:w-[35%] lg:w-[40%] lg:pl-4 mt-6 lg:mt-0"> */}
                        {/* <div className="border border-_teal p-3 sm:p-4 rounded-lg"> */}
                            

                            {/* <DynamicForm id={id} /> */}

                            <BookingSection type={type} id={id} pricingDetails={pricingDetails} />


                            {/* <div className="border border-border-color px-3 pt-2 rounded-t-lg mt-4 text-xs sm:text-sm md:text-base">
                                <div className="flex justify-between items-center border-b border-border-color py-2 sm:py-3 text-_dark">
                                    <span>Price (Hour)</span>
                                    <span>₹1099</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-border-color py-2 sm:py-3 text-_dark">
                                    <span>Selected hours</span>
                                    <span>2</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-border-color py-2 sm:py-3 text-_dark">
                                    <span>Discount</span>
                                    <span className="text-_green">- ₹400</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-border-color py-2 sm:py-3 text-_dark">
                                    <span>Tax (0%)</span>
                                    <span className="text-_green">₹0.00</span>
                                </div>
                                <div className="flex justify-between items-center py-2 sm:py-3 text-_dark">
                                    <span>Total Price</span>
                                    <span className="">
                                        <span className='text-_gray mr-3'>₹699 X 2</span>
                                        ₹1398
                                    </span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center border-b border-border-color py-2 px-3 font-semibold sm:py-3 text-white bg-_dark rounded-bl-lg rounded-br-lg">
                                <span>Total Price</span>
                                <span className=""> 
                                    ₹1398
                                </span>
                            </div>

                            <Link href='/booking' className="w-full block text-center font-bold text-sm sm:text-lg lg:text-xl text-white bg-_green transition-all duration-300 hover:bg-_teal rounded-lg mt-4 sm:p-4 p-3 md:mt-5 shadow-lg mb-2 sm:mb-4 mb-lg-5">Book Now</Link> */}
                        {/* </div> */}

                    {/* </div> */}

                {/* </div> */}

                {/* <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                </div> */}
              </div>
            </div>
          {/* <div className="max-h-[calc(100vh-5rem)] overflow-y-auto"> 
          </div> */}
        </div>



{/* <div  tabindex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="relative w-full max-w-md max-h-full">
        
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
            </button>
            <h1>hiii</h1>
        </div>
    </div>
</div>  */}
</>
    )}

    </>
  )
}

export default BookNow