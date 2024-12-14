'use client';

import { useState, useRef, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { HiOutlineUser } from "react-icons/hi";
import { MdOutlineLogout } from "react-icons/md";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import {AiOutlineCodeSandbox} from "react-icons/ai"
import {BsFillCartCheckFill} from "react-icons/bs"


function ProfileDropdown() {

  const router = useRouter()

  const { data: sesson, status } = useSession();
  console.log("sesson",sesson)


const [isOpen, setIsOpen] = useState(false);

function toggleDropdown() {
  setIsOpen(!isOpen);
}

const dropdownRef = useRef(null);

useEffect(() => {
  function handleClickOutside(event) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

useEffect(() => {
  // Add a separate event listener to stop propagation when clicking on the dropdown toggle
  function handleToggleClick(event) {
    event.stopPropagation();
  }

  if (isOpen) {
    document.addEventListener('mousedown', handleToggleClick);
  } else {
    document.removeEventListener('mousedown', handleToggleClick);
  }

  return () => {
    document.removeEventListener('mousedown', handleToggleClick);
  };
}, [isOpen]);
  


 //console.log("isOpen",isOpen)

const handleSignOut =  async() => {
  const data = await signOut({ redirect: false, callbackUrl: '/' })
  router.push(data.url)

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/logout?customer_id=${sesson.user.id}`, {
      headers: {
        Authorization: sesson?.user?.token, // Replace with your actual token
        'Content-Type': 'application/json'
      }
    });
    
    // Handle the response
    console.log("loged out",response.data);
  } catch (error) {
    console.error("loged out error",error);
  }

  // fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout?customer_id=${sesson.user.id}`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': sesson.user.token
  //   }
  // })
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error('Request failed with status code ' + response.status);
  //     }
  //     return response.json();
  //   })
  //   .then(data => {
  //     console.log("data", data);
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });
  


}

//check is authenticated or not

if (status === "unauthenticated") {
  return null
}

  return (
    <div ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        id="dropdownDefaultButton"
        // data-dropdown-toggle="ProfileDropdown"
        className="rounded-full w-10 h-10 bg-_green text-white text-xl hover:bg-_teal transition-all duration-300 ml-4"
        type="button"
      >
        {sesson && sesson?.user?.name.charAt(0).toUpperCase()}
      </button>

      {/* {isOpen && ( */}
      {/* z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 overflow-hidden block */}
      <style jsx>{`
        .popupstyle {
            position: absolute;
            inset: 0px auto auto 0px;
            margin: 0px;
            transform: translate3d(1570px, 85px, 0px)
        }
      `}</style>
      {isOpen && (
      <div
         //ref={dropdownRef}
         id="ProfileDropdown"
        className={` z-[100] bg-white divide-y absolute divide-gray-100 rounded-lg shadow sm:w-2/6 md:w-[150px] lg:w[5%] right-0 mr-2.5 overflow-hidden border border-inherit border-solid	 `}
        //style={popupstyle}
      >
        <div className="px-4 py-3 text-sm text-_gray-900 _dark:text-white">
          <div>{sesson && sesson?.user?.name}</div>
          {/* <div className="text-sm text-_gray">
            {sesson && sesson?.user?.email}
          </div> */}
        </div>
        <ul className="" aria-labelledby="dropdownInformationButton">
          <li>
            <Link
              href="/profile"
              className="flex items-center px-4 py-2 text-_green hover:bg-gray-100"
            >
              <HiOutlineUser className="mr-2 text-lg" /> Profile
            </Link>
          </li>

          <li>
            <Link
              href="/cart"
              className="flex items-center px-4 py-2 text-_green hover:bg-gray-100"
            >
              <BsFillCartCheckFill className="mr-2 text-lg" /> Cart
            </Link>
          </li>
          
          <li>
            <Link
              href="/orders"
              className="flex items-center px-4 py-2 text-_green hover:bg-gray-100"
            >
              <AiOutlineCodeSandbox className="mr-2 text-lg" /> Orders
            </Link>
          </li>
        </ul>
        <div className="">
          <button
            onClick={handleSignOut}
            // onClick={() => signOut(router.push('/'))}
            className="flex w-full items-center px-4 py-2  text-red-600	 hover:bg-gray-100  text-base"
          >
            <MdOutlineLogout className="mr-2 text-lg" /> Sign out
          </button>
        </div>
      </div>
       )} 

      {/* <div className="relative">
                <button
                    className="flex items-center focus:outline-none"
                    onClick={toggleDropdown}
                >

                    <div className='inline-flex items-center bg-_green text-white border-0 py-3 px-3 focus:outline-none hover:bg-_blue rounded-lg ml-3 text-base mt-4 md:mt-0 transition-all duration-300'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-circle text-white" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                        </svg>
                    </div>
                </button>
                {isOpen && (
                    <ul className="absolute center mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-10 loginDropdown" >
                        <li className='border-solid border-3'>
                            <div className="px-4 py-3 text-sm text-_gray-900 _dark:text-white border-solid border-3">
                                <div>{sesson.user.data[0].name}</div>
                                <div className="font-medium truncate">{sesson.user.data[0].email}</div>
                            </div>
                        </li>
                        <li>
                            <Link href='/profile' className="flex items-center block px-4 py-2 text-_gray-800 hover:bg-red-100">
                                <div classNAme="mr-3 ">
                                    <FaUserAlt />
                                </div>
                                &nbsp; Profile
                            </Link>
                        </li>


                        <hr className="_dark:border-_gray-700"></hr>
                        <li>
                            <button onClick={() => signOut()} className="flex items-center block px-4 py-2 text-_gray-800 hover:bg-red-100">
                                <div classNAme="mr-3 text-red-600">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>

                                </div>
                                Logout
                            </button>
                        </li>
                    </ul>
                )}
            </div> */}
    </div>
  );
}

export default ProfileDropdown;
