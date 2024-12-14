"use client";
import React from 'react'
import { IoCalendarSharp } from 'react-icons/io5' 
import { BsFillClockFill } from 'react-icons/bs' 
import Link from 'next/link'
import { useState,useEffect } from 'react'
import { BiCheckboxChecked } from 'react-icons/bs'
import {FiEdit} from 'react-icons/fi'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import axios from 'axios';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { handleSignOut } from '@/utlis/Logout';
import { signOut } from "next-auth/react"
import { useSearchParams,usePathname } from 'next/navigation'


const BookingSection = ({id,pricingDetails,type}) => {
  const searchParams = useSearchParams();

    const { data: session, status } = useSession()
      //console.log("booking  session",session)
    const router = useRouter()
    const userid = session?.user?.id
    const bookingType = pricingDetails.map(item => item.package_type);
    const [studioBookingType,setStudioBookingType] = useState(bookingType[0])
    const [selectedDate, setSelectedDate] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [slots, setSlots] = useState([]);
    const [selectedSlot,setSelectedSlot] = useState([]);
    const [slotHour,setSlothour] = useState('')
    const [fullDayavAilable,setFullDayavAilable] = useState('')
    const [dateError, setdateError] = useState();
    const [slotError,setSlotError] = useState();
    const [inputError,setInputError] = useState('')
    const [inputItemValue, setInputItemValue] = useState('');

    const [isLoading,setIsLoading] = useState(false)

    const [bookingdetails,setBookingdetails] = useState({asId: id,userId: userid ,asType: type, bookingtype: studioBookingType, date: null, slots:[],creatorItem: null})

    useEffect(() => {
      setBookingdetails((prevState) => ({
        ...prevState,
        bookingtype: studioBookingType,
        date: moment(selectedDate).format('YYYY-MM-DD'),
        slots: selectedSlot,
        creatorItem: inputItemValue
      }));
   
    }, [selectedDate,studioBookingType,selectedSlot,inputItemValue]);

    const getSlots = async (date) => {
      //setSlots([]);
      //setdateError('');
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/booking-list?creator_studio_id=${id}&date=${date}`)
          
        const slotData = response.data.data;
        const slotHour = response.data.data && response.data.data[0]?.slot_hour
        const fullDAy = response.data.full_day

        setSlots(slotData);
        setSlothour(slotHour);
        setFullDayavAilable(fullDAy);
        

        if (response.status === 200) {
          setSlots(slotData);
          setSlothour(slotHour);
          setFullDayavAilable(fullDAy);
        } 
      
        return fullDAy
        //setFullDayavAilable(fullDAy);

      } catch (error) {
        console.error('Error fetching slots:', error);
      }
    };

    

    const handleOptionChange = (event) => {
        //setSelectedDate(null);
        //setdateError("");
        setStudioBookingType(event.target.value);
      };
    

//console.log("fullDayavAilable",fullDayavAilable)
     const handleDateChange = async (date) => {
      const formattedDate = moment(date).format('YYYY-MM-DD');
     var fuldaycheck = await getSlots(formattedDate);
      //console.log("fuldaycheck",fuldaycheck)
      if (type === "creator") {
        setSelectedDate(date);
        return;
      }

      if (type === "studio") {

        if (studioBookingType === "Per Hour") {
          if (!date) {
            setdateError("Please select a date");
            return;
          }
          
          setSelectedDate(date);
          setSelectedSlot([]);
        } else if (studioBookingType === "Full Day") {
          setSelectedDate(date);
          setShowPopup(false);
    
         // console.log("fullDayavAilable", fullDayavAilable);
    
          if (fuldaycheck === "No") {
            setdateError("Full Day is not available");
          } else if (fuldaycheck === "Yes") {
            setdateError("");
          }
          
          return;
        }
    
    
      }



   
};

      





      const handleSlotChange = (event) => {
  const slotId = event.target.value;
  setSelectedSlot((prevSelectedSlots) => {
    if (prevSelectedSlots.includes(slotId)) {
      return prevSelectedSlots.filter((id) => id !== slotId);
    } else {
      return [...prevSelectedSlots, slotId];
    }
  });
};

const handleConfirm = () => {
  //console.log(selectedSlot); // Do something with the selected slots
  setShowPopup(false);
};



const showEditSlots = () => {
  if (studioBookingType === "Per Hour") {
  if (selectedDate) {
    if (slots.length === 0) {
      setShowPopup(false);
      setdateError("No slots available for the selected date");
    } else {
      setShowPopup(true);
      setdateError("");
    }
  } else {
    setShowPopup(false);
    setdateError("Please select a date");
  }

}



  if (studioBookingType === "Full Day") {
    setShowPopup(false);
  }
};

      

    const closePopup = () => {
      setShowPopup(false); // Close the popup
    };

    useEffect(()=> {
          setSelectedDate(null)
          setShowPopup(false);
          setdateError("");
          setSlots([])
          setSelectedSlot([])
          setSlothour('')
        },[studioBookingType])

    

    const handleItemInputChange = (event) => {
      const inputValue = event.target.value;
      setInputItemValue(inputValue);
      //console.log('Input Value:', event.target.value);
      // Check if the input value is a number
      if (/^[0-9]*$/.test(inputValue)) {
        setInputItemValue(inputValue);
        setInputError(""); // Clear the error if the input is valid
      } else {
        setInputItemValue(inputValue);
        setInputError('Please Enter Nunber'); // Set error to true if the input is not a number
      }

      // Perform any desired actions with the data
    };


    const selectBookingtype = pricingDetails.find(obj => obj.package_type === studioBookingType);

    //console.log("bookingdetails",bookingdetails)
    //console.log("selectBookingtype",selectBookingtype)

    //console.log("slots",slots)


    const saveSlots = async () => {
      setIsLoading(true)
      try {
        const slotres = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/save-slots`, {
          
            asId: id,
            userId: userid,
            asType: type,
            bookingtype: studioBookingType,
            date: moment(selectedDate).format('YYYY-MM-DD'),
            slots: selectedSlot,
            creatorItem: inputItemValue ,
            slot_hour: slotHour
        },{
          headers: {
            Authorization: session?.user?.token, // Replace with your actual token
            'Content-Type': 'application/json'
          }
        })

        if (slotres.status === 200) {
          router.push('/cart');
          setIsLoading(false)
        } else {
          setIsLoading(false)
          console.log(slotres.data.message);
        }
        

        console.log('Response:', slotres.data);

      } catch (error) {
        if (error.response.status === 403 ) {
          console.log("hgfdgh")
          //handleSignOut()
          signOut()
        }
        setIsLoading(false)
        console.error("Response e save slots",error)
      }
    }

    const confurmBooking = () => {
     // if (status === "unauthenticated" && status === "loading") {

     
          if (type === 'studio' && selectedDate != null && selectedSlot.length != 0) {
            saveSlots()
            setdateError()
            setSlotError()
          } else if (selectedDate == null ) {
            setdateError("Date Is Requred")
            setSlotError()
          } else if (selectedSlot.length == 0 ) {
            setSlotError("Please Select Slot")
            setdateError()
          } else null

          if (type === 'studio' && selectedDate != null && studioBookingType === "Full Day" ) {
            saveSlots()
            setdateError()
            setSlotError()
          } else if (selectedDate == null ) {
            setdateError("Date Is Requred")
            setSlotError()
          } else null


          if (type === 'creator' && selectedDate != null && inputItemValue != '') {
            saveSlots()
            setdateError()
            setInputError()
          } else if (selectedDate == null ) {
            setdateError("Date Is Requred")
            setInputError()
          } else if (inputItemValue === '') {
            setInputError("Please Enter Item No")
            setdateError()
          } else null
        // } else {
        //   window.alert("Please Login To Contenue");
        // }
    }

    const searchBy = searchParams.get('from');
    const searchDate = searchParams.get('date');
  
    useEffect(() => {
      if (searchBy === "search") {
        const searchDateAsDate = new Date(searchDate);
      // Check if searchDateAsDate is a valid Date object
      if (!isNaN(searchDateAsDate.getTime())) {
        setSelectedDate(searchDateAsDate);
      }
      }
  }, [router])

  
//console.log("slotHour",slotHour)
  return (
    <>
    <div id="bookSection" className="border border-_teal p-3 sm:p-4 rounded-lg">
        {(type === "studio") ? (
          <div className='grid grid-cols-3 gap-3 mt-3 pb-3'>
          {bookingType.map((bookingTYpe, index) => {
            return (
              <div key={index} className='text-sm sm:text-base'>
                <label
                  className={`p-2 sm:p-2 text-white rounded-lg flex justify-center items-center font-bold cursor-pointer ${
                    studioBookingType === bookingTYpe ? 'bg-_teal' : 'bg-_gray'
                  }`}
                >
                  <input
                    type="radio"
                    value={bookingTYpe}
                    checked={studioBookingType === bookingTYpe}
                    onChange={handleOptionChange}
                    style={{ display: 'none' }}
                  />
                  {/* {studioBookingType === bookingType && (
                    <span className="tick-icon"><BiCheckboxChecked/></span>
                  )} */}
                  {bookingTYpe}
                </label>
              </div>
            );
          })}
        </div>
        ) : null}
    



    {/* for creator  */}
    { (type === "creator") ? (
      <div className='flex mb-2 items-center'>
      <div className='w-[40%] pr-2'>
      <select
        value={studioBookingType}
        onChange={handleOptionChange}
        className='text-sm sm:text-base w-full h-12'
      >
        {bookingType.map((bookingType, index) => (
          <option key={index} value={bookingType}>
            {bookingType}
          </option>
        ))}
      </select>
    </div>

    <div className='w-[60%] pl-2 ' >
      
      {/* <label htmlFor="inputField">No of {studioBookingType}:</label> */}
   
      
      <input
        type="text"
        id="inputField"
        placeholder={`Enter your ${studioBookingType}`}
        value={inputItemValue}
        onChange={handleItemInputChange}
        className="w-full border border-gray-300 rounded px-3 py-2 h-12"
      />
      {inputError && <p className="text-red-500">{inputError}</p>}
    </div>
      </div>
    ):null}
    

       


        <div className="bg-_teal p-2 2xl:p-4  text-white rounded-lg flex justify-between items-center font-medium">
            
            <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            className='bg-transparent outline-none border-none text-white text-sm sm:text-base w-full whitePlaceholder'
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            
            // minDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
            placeholderText="Select a date"
            maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)} // Set max date to 30 days from now

            />

            <IoCalendarSharp className="text-lg sm:text-xl"/>
            
            {showPopup && (
            <div className="fixed w-full h-full overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50 px-3">
              <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
              <div className="relative w-full max-w-[500px]">
                <div className="relative bg-white rounded-lg shadow-md dark:bg-gray-700">
                  <button
                    onClick={closePopup}
                    type="button"
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    data-modal-hide="popup-modal"
                  >
                    <AiOutlineCloseCircle className='text-3xl'/>
                  </button>

                  <div className="p-4 pt-12 text-center ">
                    
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Select your Slots
                    </h3>
                    <div className="p-3 max-h-[214px] overflow-x-hidden overflow-y-auto p-sm-4 pb-3 rounded-lg  flex flex-wrap -mx-3">


                            {slots && slots.map((slot,index)=> (
                            <div key={index} className="check__group flex w-1/2 px-3 my-1 sm:my-2 text-gray-500">
                              <input
                                onChange={handleSlotChange}
                                type="checkbox"
                                value={slot._id}
                                name={`durations-${slot._id}`}
                                id={slot._id}
                                checked={selectedSlot.includes(slot._id)}
                                disabled={slot.booking_status !== 'Available'}
                                className="hidden" // Hide the default checkbox
                              />

                              <label
                                htmlFor={slot._id}
                                className={`label text-[13px] md:text-sm !m-0 w-full block ${
                                  slot.booking_status !== 'Available' ? 'bg-gray-300 border-gray-400 text-gray-600 cursor-none sm:cursor-none	' : ' border-gray-300 text-gray-800'
                                } ${
                                  selectedSlot.includes(slot._id) ? 'bg-green-500 border-green-600 text-white' : ''
                                } cursor-pointer px-3 py-2 rounded border transition duration-300 ease-in-out`}
                              >
                                {/* {slot.start_time } - {slot.end_time} */}
                               { moment(slot.start_time).format('h:mm A')} - <span className="block sm:inline">{ moment(slot.end_time).format('h:mm A')}</span>
                              </label>
                            </div>
                            ))}    

                          
                        </div>
                    <button onClick={handleConfirm}
                      type="button"
                      className="text-white mt-4 bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                    >
                      Yes, Confirm
                    </button>
                    {/* <button
                      onClick={closePopup}
                      type="button"
                      className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    >
                      No, cancel
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
)}

        </div>
        {dateError && <p className="text-red-500">{dateError}</p>}

        {  (studioBookingType === "Per Hour") ? (
        <div className="grid grid-cols-2 gap-4 mt-4">
            {/* <div className="bg-_teal p-3 sm:p-4 text-white rounded-lg flex justify-between items-center font-semibold"> */}
                <button onClick={showEditSlots} className="bg-_teal p-3 2xl:p-4 text-white rounded-lg flex justify-between items-center font-semibold" >
                <span className="text-sm 2xl:text-base">{selectedSlot.length} Slots Selected</span> 
                <FiEdit className="text-lg 2xl:text-xl"/>
                </button>
            {/* </div> */}
            <div className="bg-_teal p-3 2xl:p-4 text-white rounded-lg flex justify-center items-center font-bold">
                <span className="text-sm 2xl:text-base">{slotHour * selectedSlot.length || 0} Hour</span>  
            </div> 
            {slotError && <p className="text-red-500" >{slotError}</p>}
        </div> 
        ) : null }




        <div className="border border-border-color px-3 pt-2 rounded-t-lg mt-4">
            <div className="flex justify-between items-center border-b border-border-color py-2 sm:py-3 text-_dark">
                <span>Price ({studioBookingType})</span>
                <span>₹{selectBookingtype.price}</span>
            </div>

            {(type === "studio" && studioBookingType === "Per Hour") && (
            <div className="flex justify-between items-center border-b border-border-color py-2 sm:py-3 text-_dark">
                <span className='capitalize'>Selected hours</span>
                <span>{slotHour * selectedSlot.length || 0 }</span>
            </div>
            )}

            <div className="flex justify-between items-center border-b border-border-color py-2 sm:py-3 text-_dark">
                <span>Discount</span>
                <span className="text-_green">- ₹{selectBookingtype.price - selectBookingtype.offer_price || 0}</span>
            </div>
            {/* <div className="flex justify-between items-center border-b border-border-color py-2 sm:py-3 text-_dark">
                <span>Tax (0%)</span>
                <span className="text-_green">₹0.00</span>
            </div> */}


            {(type === "studio" && studioBookingType === "Per Hour") && (
            <div className="flex justify-between items-center py-2 sm:py-3 text-_dark">
                <span>Total Price</span>
                {selectBookingtype.offer_price ? (
                <span className="">
                    <span className='text-_gray mr-3'>₹{selectBookingtype.offer_price} X {slotHour * selectedSlot.length || 0}</span>
                    ₹{selectBookingtype.offer_price * (slotHour * selectedSlot.length ) || 0}
                </span>
                ):(
                  <span className="">
                    <span className='text-_gray mr-3'>₹{selectBookingtype.price} X {slotHour * selectedSlot.length}</span>
                    ₹{selectBookingtype.price * (slotHour * selectedSlot.length) || 0}
                </span>
                )}
            </div>
            )}

            {(type === "creator") && (
            <div className="flex justify-between items-center py-2 sm:py-3 text-_dark">
                <span>Total Price</span>
                {selectBookingtype.offer_price ? (
                <span className="">
                    <span className='text-_gray mr-3'>₹{selectBookingtype.offer_price} X {inputItemValue}</span>
                    ₹{selectBookingtype.offer_price * inputItemValue}
                </span>
                ):(
                  <span className="">
                    <span className='text-_gray mr-3'>₹{selectBookingtype.price} X {inputItemValue}</span>
                    ₹{selectBookingtype.price * inputItemValue}
                </span>
                )}
            </div>
            )}


        </div>

        {(type === "studio" && studioBookingType === "Per Hour" ) && (
        <div className="flex justify-between items-center border-b border-border-color py-2 px-3 font-semibold sm:py-3 text-white bg-_dark rounded-bl-lg rounded-br-lg">
            <span>Total Price</span>
            {selectBookingtype.offer_price ? (
            <span className=""> 
                ₹{selectBookingtype.offer_price * (slotHour * selectedSlot.length) || 0}
            </span>
            ):(
              <span className=""> 
                ₹{selectBookingtype.price * (slotHour * selectedSlot.length) || 0}
            </span>
            )}
        </div>
        )}

          {(type === "studio" && studioBookingType === "Full Day" ) && (
          <div className="flex justify-between items-center border-b border-border-color py-2 px-3 font-semibold sm:py-3 text-white bg-_dark rounded-bl-lg rounded-br-lg">
              <span>Total Price</span>
              {selectBookingtype.offer_price  ? (
            <span className=""> 
                ₹{selectBookingtype.offer_price || 0}
            </span>
            ):(
              <span className=""> 
                ₹{selectBookingtype.price || 0}
            </span>
            )}
          </div>
          )}

         

      {(type === "creator") && (
        <div className="flex justify-between items-center border-b border-border-color py-2 px-3 font-semibold sm:py-3 text-white bg-_dark rounded-bl-lg rounded-br-lg">
            <span>Total Price</span>
            {selectBookingtype.offer_price ? (
            <span className=""> 
                ₹{selectBookingtype.offer_price * (inputItemValue) || 0}
            </span>
            ):(
              <span className=""> 
                ₹{selectBookingtype.price * (inputItemValue) || 0}
            </span>
            )}
        </div>
        )}
        
        {(status === "unauthenticated" || status === "loading") ? (
        <div id="bookSection" className="border border-red-500 p-3 sm:p-4 rounded-lg pt-2 mt-2">
          <p className='text-red-500'>Please Login To Continue Booking <Link className='font-semibold' href="/login">Login</Link></p>
        </div>
        ) : null }

        <button 
        onClick={confurmBooking} 
        disabled={status === "unauthenticated" || status === "loading" || isLoading } 
        type='button' 
        className={`w-full block text-center font-bold text-base sm:text-lg lg:text-xl text-white bg-${status === "unauthenticated" || status === "loading" ||  isLoading ? '_gray' : '_green'} transition-all duration-300 hover:bg-${status === "unauthenticated" || status === "loading" ||  isLoading ? '_gray' : '_teal'} rounded-lg mt-4 p-4 md:mt-5 shadow-lg mb-4 mb-lg-5 }`} 
        >
            {isLoading ? (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 inline-block"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291a7.963 7.963 0 01-2-4.291H0c0 3.042 1.135 5.824 3 7.963l3-3.672zM12 20c2.085 0 3.978-.663 5.555-1.791l3 3.672A7.963 7.963 0 0120 17.291h-4c0 2.26-.879 4.348-2.334 5.93A10.018 10.018 0 0112 22a9.963 9.963 0 01-7.666-3.662A10.018 10.018 0 011 17.291l3-3.672A7.963 7.963 0 019 16.291h2a8 8 0 010 8z"
              ></path>
            </svg>
          ) : (
            'Book Now'
          )}
         
        </button>
    </div>

</>
  )
}

export default BookingSection