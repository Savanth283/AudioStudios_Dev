"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { signOut } from "next-auth/react"

const OrderList = () => {
  const { data: session, status } = useSession();

  const [orderListdata, setOrderListdata] = useState();

  const getOrderList = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/order-list?customer_id=${session.user.id}`,
        {
          headers: {
            Authorization: session?.user?.token, // Replace with your actual token
            "Content-Type": "application/json",
          },
        }
      );
      //console.log("res.data",res.data)
      if (res.status === 200) {
        setOrderListdata(res.data);
      }
    } catch (error) {
      if (error.response.status === 403 ) {
        //console.log("hgfdgh")
        //handleSignOut()
        signOut()
      }
      console.error(error);
    }
  };

  useEffect(() => {
    getOrderList();
  }, [status]);

  console.log("orderListdata", orderListdata);

  const [expandedLists, setExpandedLists] = useState({});

  const handleViewMoreClick = (listId) => {
    setExpandedLists((prevState) => ({
      ...prevState,
      [listId]: !prevState[listId],
    }));
  };

  if (status === "unauthenticated") {
    return (
      <div className="w-full lg:pr-4 min-h-[65vh] flex justify-center items-center">
        <p className="text-center text-lg">
        Please <Link href="/login">Login</Link> to view your order details
        </p>
      </div>
    );
  }

  if (orderListdata && orderListdata?.data.length === 0) {
    return (
      <div className="w-full lg:pr-4 min-h-[65vh] flex justify-center items-center">
        <p className="text-center text-lg">
        No Order Found
        </p>
      </div>
    );
  }

  return (
    <div className="container pt-8 overflow-auto">
      <div className="w-full">
        <div className="flex flex-col shadow">
          {orderListdata &&
            orderListdata?.data.map(
              (
                list,
                index // Corrected: Removed extra parentheses here
              ) => (
                <React.Fragment key={index}>
                  <div className="grid md:grid-cols-6 sm:grid-cols-4 grid-cols-3 items-center bg-gray-100 font-bold mt-3">
                    <div className="py-2 px-4 rounded w-10 bg-_green text-white ">
                      {index + 1}
                    </div>
                    <div className="py-2 px-3">
                      {moment(list.order_date).format("MMM Do, YYYY")}
                    </div>
                    <div className="py-2 px-3">{moment(list.order_date).format("h:mm A")}</div>

                    <div className="py-2 px-3">{list.order_id}</div>
                    <div className="py-2 px-3">₹ {list.order_price}</div>
                    <div className="py-2 px-3">
                      <button
                        className="bg-_green text-white text-sm font-normal py-2 px-4 rounded"
                        onClick={() => handleViewMoreClick(list.order_id)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                  {expandedLists[list.order_id] && (
                    <div className="grid  grid-cols-1 gap-3 bg-gray-50 p-2 p-sm-3 p-lg-4">
                      {list.items.map((item, subindex) => {
                        // console.log("list.items", list.items);
                        return (
                          <div
                            key={subindex}
                            className="border border-border-color rounded-xl md:p-2 p-1 mb-3"
                          >
                            <div className="flex flex-row flex-wrap">
                              <div className="w-full lg:w-[50%]"> 
                                <div className="flex"> 
                                  <div className="md:w-[120px]">
                                    <Link href={`/${item.user_type}/${item.slug}`}>
                                      {item.profile_image ? (
                                        <Image
                                        src={
                                          process.env.NEXT_PUBLIC_S3_BUCKET_URL +
                                          item.profile_image
                                        }
                                        width={200}
                                        height={80}
                                        alt={item.code_name}
                                        className="w-full h-28 object-cover object-center rounded-xl"
                                      />
                                      ):(
                                        <Image
                                        src="/images/noimage.webp"
                                        width={200}
                                        height={80}
                                        className="opacity-25 h-28 object-cover object-center rounded-xl"
                                        alt={item.code_name}
                                      />
                                      )}
                                      

                                    </Link>
                                  </div>
                                  <div className="md:w-[calc(100%-120px)] md:pl-3 pt-3 md:pt-0">
                                    <p className="font-semibold text-_dark ellipsis-2 text-[13px] sm:text-sm md:text-base lg:text-lg mb-2">
                                      <Link href={`/${item.user_type}/${item.slug}`}>
                                        {item.code_name}
                                      </Link>
                                    </p> 
                                    <p className="text-[13px] sm:text-sm md:text-base text-gray-400">{item.address}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="w-full lg:w-[20%]">
                                {/* <p className="text-_black font-semibold text-[11px] sm:text-[12px] md:text-[13px] lg:text-sm">₹ 134</p> */}
                              </div>
                              <div className="w-full lg:w-[30%]">
                                <p className="text-_black text-[11px] sm:text-[12px] md:text-[13px] lg:text-sm">
                                {moment(item?.booking_details?.cart_data?.booking_date).format("MMMM Do, YYYY")}

                                </p>
                                {/* <p className="text-_black text-[11px] sm:text-[12px] md:text-[13px] lg:text-sm">
                                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus.
                                </p> */}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </React.Fragment>
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default OrderList;
