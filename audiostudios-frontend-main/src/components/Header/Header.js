"use client";

import Link from "next/link";
import React, { useState,useEffect } from "react";
import styles from "./styles.module.scss";
import { TbLayoutGrid } from "react-icons/tb";
import { VscClose } from "react-icons/vsc";
import { FiChevronDown } from "react-icons/fi";
import { HiOutlineChevronDown } from "react-icons/hi";
import Image from "next/image";
import { useSession } from "next-auth/react";
import ProfileDropdown from "../Profile/ProfileDropdown";
import { BsFillCartCheckFill } from "react-icons/bs";
import { Accordion } from "flowbite-react";
import MobileSidemenu from "./MobileSidemenu";
import HeaderMenu from "./HeaderMenu";
import axios from 'axios';

const Header = ({cityListData,gsData}) => {
  const { data: session, status } = useSession();
  //console.log("header session", status);
  //console.log("cityListData header",cityListData)
  const [menuList,setMenuList] = useState();

  const [sideMenuCollapse, setSideMenuCollapse] = useState(false);

  const openSideMenu = () => {
    setSideMenuCollapse(!sideMenuCollapse);
  };
  const closeSideMenu = () => {
    setSideMenuCollapse(false);
  };

  
// const GetMenuList = async () => {
//     try {
//         const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/city-list`) 
//         setMenuList(res.data)
        
//     } catch (error) {
//         console.log(error)
//     }
// }

// useEffect(() => {
//     GetMenuList();
// }, [])

//console.log("menuList",menuList)

  return (
    <>
      <header className="text-_gray-600 body-font">
        <div className="container mx-auto flex flex-wrap sm:py-2 py-3 flex-row items-center lg:justify-between  justify-between">
          <button onClick={openSideMenu} className="lg:hidden text-_dark">
            <TbLayoutGrid className="text-3xl text-_green" />
          </button>
          <Link
            href="/"
            className={`${styles.logo} flex title-font font-medium items-center text-_gray-900`}
          >
            <Image width={240} height={90} src={process.env.NEXT_PUBLIC_S3_BUCKET_URL + gsData.logo.upload} alt="AUDIOSTUDIOS" />
          </Link>

          <div className="inline-flex">
            <div
              className={`${styles.nav__content} hidden lg:flex flex-wrap justify-end items-center `}
            >
              {/* <Link
                href="https://creator.audiostudios.in/"
                target="_blank"
              >
                <div
                  className={`${styles.top__info__box} px-3 md:px-4 hidden md:inline-flex`}
                >
                  <img src="/images/icons/business-bag.svg" alt="Audio List" />
                  <div className="caption pl-3">
                    <p className="text-sm 2xl:text-base text-_dark font-semibold min-w-full">
                      AUDIOSTUDIOS for Business
                    </p>
                    <p className="text-xs 2xl:text-sm text-_gray">
                      Corporate business solutions.
                    </p>
                  </div>
                </div>
              </Link> */}

              <Link
                href="https://audiostudios.in/business/"
                target="_blank"
                className="block bg-[#f0f0f0] hover:bg-_green hover:text-white p-1 shadow-sm px-3 md:px-4 pt-2 rounded-lg"
              >
                <span className="  hidden md:inline-flex">
                  <Image height={24} width={24} src="/images/icons/audio-list.svg" alt="Audio List" />
                  <span className="caption pl-3">
                    <p className="text-sm 2xl:text-base text-_dark hover:text-white  font-semibold !leading-[1.3] mb-1">
                      List Your Studio, join as a creator
                    </p>
                    <p className="text-xs 2xl:text-sm text-_gray hover:text-white  !leading-[1]">
                      Start earning in 30 mins.
                    </p>
                  </span>
                </span>
              </Link>

              {/* <div className="bg bg-_yellow p-[2px] rounded-lg text-white leading-3 ml-4">
                                <span className="text-center text-[11px] font-normal leading-[.8] uppercase block pt-1 pb-1.5">Earn Coins</span>
                                <div className="px-2 sm:px-3 py-1 flex justify-between bg-white rounded-b-lg items-center">
                                    <img src="/images/icons/coin.svg" className="w-[18px] h-[18px] mr-2" alt="Earn Coin" />
                                    <span className="text-lg text-_dark font-semibold leading-3">122</span>
                                </div>

                            </div> */}

            </div>
            {/* <div className="bg p-[2px] rounded-lg text-_green leading-3 md:ml-4 hover:text-_gray flex items-center">
                <Link href="/cart" className="hover:text-_gray">
                    <BsFillCartCheckFill className="text-2xl" />
                </Link>
            </div> */}
            {status === "authenticated" ? (
              <ProfileDropdown />
            ) : (
              <Link
                href="/login"
                className={`${styles.userBtn} ml-4 inline-flex items-center sm:bg-_green sm:text-white text-_teal border-0 sm:py-3 sm:px-3 md:px-5 sm:focus:outline-none sm:hover:bg-_blue rounded-lg sm:ml-3 text-base transition-all duration-300`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className={`${styles.svg} bi bi-person-circle sm:text-white`}
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                  />
                </svg>
                <span className="text-white ms-2 hidden xl:inline-block">
                  Login or Create Account
                </span>
              </Link>
            )}
          </div>
        </div>
      </header>
      <nav className={`${styles.main__menu} bg-_green py-3`}>
        <div className="container mx-auto">
          <ul className="flex flex-wrap justify-center">
            <HeaderMenu menuList={cityListData} />

            {/* <li className={`${styles.dropdown} mx-3 md:mx-3 xl:mx-4 2xl:mx-6 relative`}>
                            <Link href='' className={`${styles.nav_link} p-3`}>
                                Bangalore
                            </Link>
                            <ul className={`${styles.dropdown__menu}`}>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                            </ul>
                        </li>

                        <li className={`${styles.dropdown} mx-3 md:mx-3 2xl:mx-4 2xl:mx-6 relative`}>
                            <Link href='' className={`${styles.nav_link} p-3`}>
                                Kolkata
                            </Link>
                            <ul className={`${styles.dropdown__menu}`}>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                            </ul>
                        </li>
                        <li className={`${styles.dropdown} mx-3 md:mx-3 2xl:mx-4 2xl:mx-6 relative`}>
                            <Link href='' className={`${styles.nav_link} p-3`}>
                                Mumbai
                            </Link>
                            <ul className={`${styles.dropdown__menu}`}>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                            </ul>
                        </li>
                        <li className={`${styles.dropdown} mx-3 md:mx-3 2xl:mx-4 2xl:mx-6 relative`}>
                            <Link href='' className={`${styles.nav_link} p-3`}>
                                Delhi
                            </Link>
                            <ul className={`${styles.dropdown__menu}`}>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                            </ul>
                        </li>

                        <li className={`${styles.dropdown} mx-3 md:mx-3 2xl:mx-4 2xl:mx-6 relative`}>
                            <Link href='' className={`${styles.nav_link} p-3`}>
                                Chennai
                            </Link>
                            <ul className={`${styles.dropdown__menu}`}>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                            </ul>
                        </li>

                        <li className={`${styles.dropdown} mx-3 md:mx-3 2xl:mx-4 2xl:mx-6 relative`}>
                            <Link href='' className={`${styles.nav_link} p-3`}>
                                Punjab
                            </Link>
                            <ul className={`${styles.dropdown__menu}`}>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                            </ul>
                        </li>
                        <li className={`${styles.dropdown} mx-3 md:mx-3 2xl:mx-4 2xl:mx-6 relative`}>
                            <Link href='' className={`${styles.nav_link} p-3`}>
                                Hyderabad
                            </Link>
                            <ul className={`${styles.dropdown__menu}`}>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                            </ul>
                        </li>


                        <li className={`${styles.dropdown} mx-3 md:mx-3 2xl:mx-4 2xl:mx-6 relative`}>
                            <Link href='' className={`${styles.nav_link} p-3`}>
                                Odisha
                            </Link>
                            <ul className={`${styles.dropdown__menu}`}>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                            </ul>
                        </li> */}
          </ul>
        </div>
      </nav>

      <aside
        className={`${styles.main__sidemenu} ${
          sideMenuCollapse ? "show" : ""
        } fixed top-0 left-0 w-full h-screen`}
      >
        <div
          className={`${styles.content__box} w-full ml-auto bg-white h-screen`}
        >
          <div className="p-2">
            <button className="btn" onClick={closeSideMenu}>
              <VscClose className="text-3xl" />
            </button>
          </div>
          <div className={`${styles.links__list} px-3`}>
            <div className="flex py-2">

              {/* <Link
                href="https://creator.audiostudios.in/"
                target="_blank"
                className="w-full max-w-[150px] border border-_green text-_green mr-3"
              >
                <div
                  className={`inline-flex items-center py-2 px-3`}
                >
                  <img src="/images/icons/business-bag.svg" alt="Audio List" />
                  <div className="caption pl-3 text-[11px] font-semibold" style={{lineHeight:1.2}}>
                  AUDIOSTUDIOS <br /> for Business 
                  </div>
                </div>
              </Link> */}

              <Link
                href="https://audiostudios.in/business/"
                target="_blank"
                className="w-full max-w-[150px] border border-_green text-_green"
              >
                <div className="inline-flex items-center py-2 px-3">
                  <img src="/images/icons/audio-list.svg" alt="Audio List" />
                  <div className="caption pl-3 text-[13px] font-semibold" style={{lineHeight:1.2}}>
                      Join as a creator 
                  </div>
                </div>
              </Link>

            </div>

            

              <MobileSidemenu menuList={cityListData}/>


              {/* <Accordion.Panel>
                <Accordion.Title className={`${styles.acc__header}`}>
                  Hyderabad
                </Accordion.Title>
                <Accordion.Content className={`${styles.acc__body}`}>
                  <ul className={``}>
                    <li>
                      <Link
                        href="/studiodetail/"
                        className={`${styles.dropdown__item} text-base py-2 text-_dark transition block hover:bg-__gray-light`}
                      >
                        Link Name
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/studiodetail/"
                        className={`${styles.dropdown__item} text-base py-2 text-_dark transition block hover:bg-__gray-light`}
                      >
                        Link Name
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/studiodetail/"
                        className={`${styles.dropdown__item} text-base py-2 text-_dark transition block hover:bg-__gray-light`}
                      >
                        Link Name
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/studiodetail/"
                        className={`${styles.dropdown__item} text-base py-2 text-_dark transition block hover:bg-__gray-light`}
                      >
                        Link Name
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/studiodetail/"
                        className={`${styles.dropdown__item} text-base py-2 text-_dark transition block hover:bg-__gray-light`}
                      >
                        Link Name
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/studiodetail/"
                        className={`${styles.dropdown__item} text-base py-2 text-_dark transition block hover:bg-__gray-light`}
                      >
                        Link Name
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/studiodetail/"
                        className={`${styles.dropdown__item} text-base py-2 text-_dark transition block hover:bg-__gray-light`}
                      >
                        Link Name
                      </Link>
                    </li>
                  </ul>
                </Accordion.Content>
              </Accordion.Panel> */}

              

          </div>
        </div>
      </aside>
    </>
  );
};

export default Header;
