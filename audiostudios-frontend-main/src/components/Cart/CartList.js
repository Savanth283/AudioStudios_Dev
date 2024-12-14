"use client";
import React, { useEffect, useState } from "react";
import CartDetails from "./CartDetails";
import { useSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";
import { FaOpencart } from "react-icons/fa";
import styles from "./style.module.scss";
// import { AiFillClockCircle } from 'react-icons/ai'
import { signOut } from "next-auth/react"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { AiOutlineDelete, AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import moment from "moment";
import { FiEdit } from "react-icons/fi";

const CartList = () => {
  const router = useRouter();

  const { data: session, status } = useSession();

  const [cartListdata, setCartListdata] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);

  const [isPreviousDate,setIsPreviousDate] = useState(false)
  //console.log("cart", session);

  const getCartList = async () => {
    //setIsDataLoading(true)
    try {
      setIsDataLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/cart-list?customer_id=${session.user.id}`,
        {
          headers: {
            Authorization: session?.user?.token, // Replace with your actual token
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        setCartListdata(res.data);
        setIsDataLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsDataLoading(false);
    }
  };

  // Function to check if the booking date is in the past
  // const checkBookingDate = (bookingDate) => {
  //   console.log("bookingDate",bookingDate)
  //   const today = new Date();
  //   const date = new Date(bookingDate);

  //   return date < today;
  // };

  // useEffect(() => {
  //   // Update isPreviousDate state based on the condition
  //   const hasPreviousDate = cartListdata?.data.map((cartdata) =>
  //     checkBookingDate(cartdata?.booking_details?.booking_date)
  //   );

  //   //hasPreviousDate()
  //   //setIsPreviousDate(hasPreviousDate);
  // }, [cartListdata]);

  useEffect(() => {
    getCartList();
  }, [status]);

  const removeCartItem = async (bookingId, asId) => {
    try {
        const confirmDelete = window.confirm("Are you sure you want to remove this item?");
          if (!confirmDelete) {
            return; // If "Cancel" is clicked, exit the function
          }
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/removecart-list?booking_id=${bookingId}&customer_id=${session.user.id}&as_id=${asId}`,
          {
            headers: {
              Authorization: session?.user?.token, // Replace with your actual token
              "Content-Type": "application/json",
            },
          }
        );
  
        if (res.status === 200) {
          //router.reload()
          getCartList();
        } else null
      } catch (error) {
        if (error.response.status === 403 ) {
          console.log("hgfdgh")
          //handleSignOut()
          signOut()
        }
        console.error(error);
      }
  };

  // console.log("cartListdata",cartListdata)

  const [bookingids, setBookingids] = useState([]);
  //const [asId,setAsid] = useState([])

  useEffect(() => {
    const bookingIds = cartListdata?.data.map(
      (item) => item.booking_details._id
    );

    setBookingids(bookingIds);
  }, [cartListdata]);

  //console.log("bookingids",bookingids)
  const handlePayment = async () => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      const paymentres = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/save-order`,
        {
          //"asId": "nqAjL3bDQRKxHMGX9",
          userId: session.user.id,
          booking_ids: bookingids,
        },
        {
          headers: {
            Authorization: session?.user?.token, // Replace with your actual token
            "Content-Type": "application/json",
          },
        }
      );

      if (paymentres.status === 200) {
        //console.log("paymentres.data",paymentres.data)
        router.push(paymentres.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      if (error.response.status === 403 ) {
        console.log("hgfdgh")
        //handleSignOut()
        signOut()
      }
      setIsLoading(false)
      console.log("paymentres.error",error)
    }
  };

  if (status === "unauthenticated") {
    return (
      <div className="w-full lg:pr-4 min-h-[65vh] flex justify-center items-center">
        <p className="text-center text-lg">
        You're almost there! Please <Link href="/login">Login</Link> to complete your purchase
        </p>
      </div>
    );
  }

  if (isDataLoading) {
    return (
      <div className="w-full 2xl:w-[70%] xl:w-[65%] lg:w-[60%] lg:pr-4 flex items-center">
        <div className="w-full text-center py-8">
          <div className="flex justify-center">
            <AiOutlineLoading3Quarters className="text-6xl animate-spin" />{" "}
            {/* Added animate-spin class */}
          </div>
          <p className="text-lg">Loading . . .</p>
        </div>
      </div>
    );
  }

  // console.log("cartListdata",cartListdata?.data)
  return (
    <>
      {/* Left Details Start */}

      {cartListdata && cartListdata.data && cartListdata.data.length != 0 ? (
        <div className="w-full 2xl:w-[70%] xl:w-[65%] lg:w-[60%] lg:pr-4">
          <div className="grid grid-cols-1 sm:grid-cols-1">
            {cartListdata.data.map((cartdata, index) => {
              console.log("cartdata", cartdata);

             

              return (
                <div
                  key={index}
                  className={`${styles.stuido__card} sm:flex mb-4 lg:mb-6 p-2 sm:p-3 relative`}
                >

                  {/* Display a message if any date is in the past */}
                  {/* {isPreviousDate && (
                    <p className="text-red-500">At least one booking date is in the past.</p>
                  )} */}

                  <Link
                    href={`/${cartdata.user_type}/${cartdata.slug}`}
                    className="w-full 2xl:w-[240px] xl:w-[200px] lg:w-[180px] md:w-[180px] sm:w-[160px] max-w-[500px] block"
                  >
                    {/* <Image src={process.env.NEXT_PUBLIC_S3_BUCKET_URL + cartdata.profile_image} width={390} height={260} 
                      className='w-full h-24 sm:h-36 md:h-48 object-cover object-center rounded-xl max-w-[100%]' alt={cartdata.code_name} 
                    /> */}

                    {cartdata.profile_image ? (
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_S3_BUCKET_URL +
                          cartdata.profile_image
                        }
                        width={390}
                        height={260}
                        className="w-full h-[200px]  sm:h-[200px] lg:h-[240px] xl:h-[200px] 2xl:h-[240px] rounded-lg object-cover object-center"
                        alt={cartdata.code_name}
                      />
                    ) : (
                      <Image
                        src="/images/noimage.webp"
                        width={390}
                        height={260}
                        className="opacity-25 w-full h-[155px]  sm:h-[200px] lg:h-[240px] xl:h-[200px] 2xl:h-[240px] rounded-lg object-cover object-center"
                        alt={cartdata.code_name}
                      />
                    )}
                  </Link>
                  <div
                    className={`${styles.caption} w-full 2xl:w-[calc(100%-240px)] xl:w-[calc(100%-200px)] lg:w-[calc(100%-180px)] md:w-[calc(100%-180px)] sm:w-[calc(100%-160px)] sm:pl-4 pt-3 sm:pt-0`}
                  >
                    <div className="sm:flex">
                      <div
                        className={`xl:w-[calc(100%-140px)] lg:w-[calc(100%-90px)] sm:w-[calc(100%-80px)] w-[full]`}
                      >
                        <h3 className="text-[13px] sm:text-base md:text-base">
                          <Link
                            href={`/${cartdata.user_type}/${cartdata.slug}`}
                            className="font-bold text-_dark transition-all duration-300 hover:text-_green "
                          >
                            {cartdata.code_name}
                          </Link>
                        </h3>
                        <p className="text-gray text-[11px] sm:text-[12px] md:text-[13px] lg:text-sm 2xl:text-base">
                          {cartdata.address}
                        </p>
                      </div>

                      {cartdata.type && cartdata.type === "GOLD" && (
                        <div
                          className={`w-[50px] sm:w-[60px] text-right sm:ml-auto flex jusitfy-end items-start flex-row absolute top-3 right-3 sm:static`}
                        >
                          <img
                            src="/images/icons/gold.svg"
                            className="ml-auto w-[40px] sm:w-[60px]"
                            alt="icon"
                          />
                        </div>
                      )}

                      {cartdata.type && cartdata.type === "SILVER" && (
                        <div
                          className={`w-[50px] sm:w-[60px] text-right sm:ml-auto flex jusitfy-end items-start flex-row absolute top-3 right-3 sm:static`}
                        >
                          <img
                            src="/images/icons/silver.svg"
                            className="ml-auto w-[40px] sm:w-[60px]"
                            alt="SILVER"
                          />
                        </div>
                      )}

                      {cartdata.type && cartdata.type === "PLATINUM" && (
                        <div
                          className={`w-[50px] sm:w-[60px] text-right sm:ml-auto flex jusitfy-end items-start flex-row absolute top-3 right-3 sm:static`}
                        >
                          <img
                            src="/images/icons/platinum.svg"
                            className="ml-auto w-[40px] sm:w-[60px]"
                            alt="platinum"
                          />
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 items-center ">
                      <div className="items-center mt-2 sm:mt-3 ">
                        <div className="flex items-center">
                          <BsFillCalendarCheckFill className="mr-1 text-base text-_green" />
                          <span className="px-[2px] text-sm">
                            {moment(
                              cartdata?.booking_details?.booking_date
                            ).format("MMMM Do, YYYY")}
                          </span>
                        </div>

                        {/* // For studio per hour     */}
                        {cartdata.user_type === "studio" &&
                          cartdata.booking_details.package_type ===
                            "Per Hour" && (
                            <>
                              {cartdata.pricing_details &&
                              cartdata.pricing_details.offer_price ? (
                                <div className="flex items-center mt-2 lg:mt-2">
                                  <div className="text-sm text-gray px-3 line-through">
                                    ₹{cartdata.pricing_details.price}
                                  </div>
                                  <span className="text-_dark text-base md:text-xl font-bold">
                                    ₹{cartdata.pricing_details.offer_price}{" "}
                                    <span className="text-[13px]">
                                      &#10005;
                                    </span>{" "}
                                    {cartdata.booking_details.slot_hour *
                                      cartdata.booking_details.slots
                                        .length}{" "}
                                    
                                    <span className="text-[13px]">
                                      {cartdata.booking_details.package_type.replace(
                                        "Per ",
                                        ""
                                      )}{" "}
                                    </span>
                                    {`=`} <span className="text-base font-medium text-gray-700">₹</span>
                                    {cartdata.pricing_details.offer_price *
                                      (cartdata.booking_details.slot_hour *
                                        cartdata.booking_details.slots
                                          .length)}{" "}
                                  </span>
                                </div>
                              ) : (
                                <div className="flex items-center mt-2 lg:mt-3">
                                  <span className="text-_dark text-base md:text-xl font-bold">
                                    <span className="text-base font-medium text-gray-700 pr-1">
                                      ₹
                                    </span>
                                    {cartdata.pricing_details.price}{" "}
                                    <span className="text-[13px]">
                                      &#10005;
                                    </span>{" "}
                                    {cartdata.booking_details.slot_hour *
                                      cartdata.booking_details.slots
                                        .length}{" "}
                                    <span className="text-[13px] font-medium text-gray-700">
                                      {cartdata.booking_details.package_type.replace(
                                        "Per ",
                                        ""
                                      )}{" "}
                                    </span>
                                    {`=`} <span className="text-base font-medium text-gray-700">₹</span>
                                    {cartdata.pricing_details.price *
                                      (cartdata.booking_details.slot_hour *
                                        cartdata.booking_details.slots
                                          .length)}{" "}
                                  </span>
                                </div>
                              )}
                            </>
                          )}
                      </div>

                      {/* slot time */}
                      {cartdata.user_type === "studio" &&
                        cartdata.booking_details.package_type ===
                          "Per Hour" && (
                          <div className="border border-_teal bg-[#fcfcfc] shadow-sm p-3 md:p-4 rounded-md">
                            <div className="max-h-[100px] overflow-y-auto">
                              {cartdata.slot_details.map((time, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="flex text-sm items-center"
                                  >
                                    <BiTimeFive className="text-_green" />
                                    <span className="pl-2">
                                      {moment(time.start_time).format("h:mm A")}{" "}
                                      - {moment(time.end_time).format("h:mm A")}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                            
                          </div>
                        )}
                    </div>

                    <div className="flex flex-wrap items-center mt-2 sm:mt-3">
                      {/* // For studio Full Day     */}

                      {cartdata.user_type === "studio" &&
                        cartdata.booking_details.package_type ===
                          "Full Day" && (
                          <>
                            {cartdata.pricing_details &&
                            cartdata.pricing_details.offer_price ? (
                              <div className="flex items-center mt-2 lg:mt-2">
                                <div className="text-sm text-gray px-3 line-through">
                                  ₹{cartdata.pricing_details.price}
                                </div>
                                <span className="text-_dark text-base md:text-xl xl:text-2xl font-bold">
                                <span className="text-[13px] font-medium text-gray-700">₹</span>{cartdata.pricing_details.offer_price} For{" "}
                                  {cartdata.booking_details.package_type}{" "}
                                </span>
                              </div>
                            ) : (
                              <div className="flex items-center mt-2 lg:mt-3">
                                <span className="text-_dark text-base md:text-xl xl:text-2xl font-bold">
                                <span className="text-base font-medium text-gray-700">₹</span>{cartdata.pricing_details.price} 
                                <span className="text-sm font-medium text-gray-700">{" "}For{" "}{cartdata.booking_details.package_type}{" "}</span> 
                                </span>
                              </div>
                            )}
                          </>
                        )}

                      {/* For creator */}
                      {cartdata.user_type === "creator" && (
                        <>
                          {cartdata.pricing_details &&
                          cartdata.pricing_details.offer_price ? (
                            <div className="items-center mt-2 lg:mt-2"> 
                              <div className="text-sm text-gray line-through">
                                ₹{cartdata.pricing_details.price}
                              </div> 
                              <span className="text-_dark text-base md:text-xl xl:text-2xl font-bold">
                              <span className="text-base font-medium text-gray-700">₹</span>{cartdata.pricing_details.offer_price} 
                              {" "}<span className="text-[13px]">
                                  &#10005;
                                </span>{" "}
                                {cartdata.booking_details?.no_of_items}{" "}
                                <span className="text-[13px]">
                                  {cartdata.booking_details.package_type.replace(
                                    "Per ",
                                    ""
                                  )}{" "}
                                </span>
                                <span className="text-base md:text-lg font-normal">&#61;</span>{" "}
                                <span className="text-base font-medium text-gray-700">₹</span>
                                {cartdata.pricing_details.offer_price * cartdata.booking_details?.no_of_items}{" "}
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center mt-2 lg:mt-3">
                              <span className="text-_dark text-base md:text-xl xl:text-2xl font-bold">
                                ₹{cartdata.pricing_details.price} For{" "}
                                {cartdata.booking_details.package_type}{" "}
                              </span>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {/* {cartdata.pricing_details && cartdata.pricing_details.offer_price ? (
                    <div className="flex items-center mt-2 lg:mt-2">
                        <span className="text-_dark text-base md:text-xl xl:text-2xl font-bold">₹{cartdata.pricing_details.offer_price * (cartdata.booking_details.no_of_items || 1)}</span>
                        <div className="text-sm text-gray px-3 line-through">₹{cartdata.pricing_details.price * (cartdata.booking_details.no_of_items || 1)}</div> 
                    </div>
                  ) : (
                    <div className="flex items-center mt-2 lg:mt-3">
                        <span className="text-_dark text-base md:text-xl xl:text-2xl font-bold">₹{cartdata.pricing_details.price * (cartdata.booking_details.no_of_items || 1)}</span>
                        <div className="text-sm text-gray px-3 line-through">₹1099</div> 
                    </div>
                  )} */}

                    {/* <div className={`text-xs sm:text-sm pl-2 text-_teal font-bold	`}>{cartdata?.booking_details?.package_type}</div> */}

                    {/* <div className="inline-flex md:flex items-center mt-2 lg:mt-3">
                        <div className="text-_dark text-base xl:text-lg border border-_teal px-3 py-1 rounded-md md:rounded-lg inline-flex items-center">
                            1 hour <AiFillClockCircle className="text-_gray ml-2 text-lg lg:text-xl"/>
                        </div>
                        <div className="text-base lg:text-lg text-_green font-medium px-3">1 hour Selected</div> 
                    </div> */}

                    <button
                      type="button"
                      onClick={() =>
                        removeCartItem(
                          cartdata.booking_details._id,
                          cartdata.user_id
                        )
                      }
                      className="inline-flex items-center text-sm md:text-base lg:text-lg font-bold text-[#DC2751] mt-2 lg:mt-3 xl:mt-4 hover:text-_dark transition-all duration-300"
                    >
                      <AiOutlineDelete />
                      <span className="ml-1">REMOVE</span>
                    </button>
                    {/* <button className="btn p-2 ml-3 inline-flex items-center mt-2 lg:mt-3 xl:mt-4">
                      <FiEdit className="text-[#dcb527] mr-1" />
                      <span className="text-sm md:text-base lg:text-lg font-bold text-[#dcb527] hover:text-_green transition-all duration-300 uppercase">Edit</span>
                    </button> */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="w-full 2xl:w-[70%] xl:w-[65%] lg:w-[60%] lg:pr-4 flex items-center">
          <div className="w-full text-center py-8">
            <div className="flex justify-center">
              <FaOpencart className="text-6xl" />
            </div>
            <p className="text-lg">No Cart Item Available</p>
          </div>
        </div>
      )}

      {/* Left Details End */}

      {/* Right Details */}
      <div className="w-full 2xl:w-[30%] xl:w-[35%] lg:w-[40%] lg:pl-4 mt-6 lg:mt-0">
        <div className="border border-_teal rounded-lg">
          <div className="p-3 sm:p-4 text-center  font-bold text-_gray text-base md:text-lg border-b border-border-color">
            PRICE DETAILS
          </div>

          <div className=" px-3 sm:px-4 md:px-5 rounded-t-lg mt-4">
            <div className="flex justify-between items-center border-b border-border-color py-2 sm:py-3 text-_dark text-sm sm:text-base">
              <span>Price </span>
              <span>
                ₹{(cartListdata?.total_price && cartListdata.total_price) || 0}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-border-color py-2 sm:py-3 text-_dark text-sm sm:text-base">
              <span>Studios</span>
              <span>{cartListdata?.studio_count}</span>
            </div>

            <div className="flex justify-between items-center border-b border-border-color py-2 sm:py-3 text-_dark text-sm sm:text-base">
              <span>Creators</span>
              <span>{cartListdata?.creator_count}</span>
            </div>
            {/* <div className="flex justify-between items-center border-b border-border-color py-2 sm:py-3 text-_dark text-sm sm:text-base">
              <span>Selected hours</span>
              <span>2</span>
            </div> */}

            {/* <div className="flex justify-between items-center border-b border-border-color py-2 sm:py-3 text-_dark text-sm sm:text-base">
              <span>Discount</span>
              <span className="text-_green">- ₹1,200</span>
            </div> */}

            {/* <div className="flex justify-between items-center border-b border-border-color py-2 sm:py-3 text-_dark text-sm sm:text-base">
              <span>Coupon Apply</span>
              <span className="text-_green">- ₹200</span>
            </div> */}

            {/* <div className="flex justify-between items-center border-b border-border-color py-2 sm:py-3 text-_dark text-sm sm:text-base">
              <span>Tax (0%)</span>
              <span className="">₹0.00</span>
            </div> */}
            <div className="flex justify-between items-center border-b border-border-color py-2 sm:py-3 text-[#1B1B24] font-semibld text-base md:text-lg lg:text-xl">
              <span>Total Price</span>
              <span className="font-bold">
                ₹{(cartListdata?.total_price && cartListdata.total_price) || 0}
              </span>
            </div>
          </div>
          <div className="px-3 sm:px-4 md:px-5 mb-4">
            {/* <div className="text-center text-_green py-3 md:py-4 text-sm sm:text-base">
              You will save ₹1,400 on this order
            </div> */}

            {/* <button className="btn p-3 sm:p-4 border border-dashed border-_green rounded-md sm:rounded-lg flex items-center justify-between w-full transition-all duration-300 hover:bg-_gray-light">
                    <span className="text-base md:text-lg">Add Discount</span>
                    <BsFillArrowRightCircleFill className="text-lg md:text-xl lg:text-2xl text-_green" />
                </button> */}
          </div>
        </div>
        {/* <button 
          onClick={handlePayment}
          className="w-full block text-center font-bold text-base sm:text-lg lg:text-xl text-white bg-_green transition-all duration-300 hover:bg-_teal hover:text-white rounded-lg mt-4 p-4 md:mt-5 shadow-lg mb-4 mb-lg-5"
        >
          Proceed To Pay
        </button> */}

        <button
          onClick={handlePayment}
          type="button"
          className={`w-full block text-center font-bold text-base sm:text-lg lg:text-xl text-white bg-${
            isLoading ? "_gray" : "_green"
          } transition-all duration-300 hover:bg-${
            isLoading ? "_gray" : "_teal"
          } hover:text-white rounded-lg mt-4 p-4 md:mt-5 shadow-lg mb-4 mb-lg-5`}
          //className={`uppercase font-semibold w-full transition-all rounded py-3 px-3 bg-${isLoading ? '_gray' : '_green'} hover:bg-${isLoading ? '_gray' : '_teal'} text-white`}
          disabled={isLoading}
        >
          {isLoading ? (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 inline-block"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291a7.963 7.963 0 01-2-4.291H0c0 3.042 1.135 5.824 3 7.963l3-3.672zM12 20c2.085 0 3.978-.663 5.555-1.791l3 3.672A7.963 7.963 0 0120 17.291h-4c0 2.26-.879 4.348-2.334 5.93A10.018 10.018 0 0112 22a9.963 9.963 0 01-7.666-3.662A10.018 10.018 0 011 17.291l3-3.672A7.963 7.963 0 019 16.291h2a8 8 0 010 8z"
              ></path>
            </svg>
          ) : (
            "Proceed To Pay"
          )}
        </button>
      </div>
      {/* Right Details End */}
    </>
  );
};

export default CartList;
