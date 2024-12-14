'use client';

import React, { useState,useEffect } from "react";
import styles from '@/styles/Login.module.scss';
import { getSession,signIn } from "next-auth/react";
import axios from "axios";
import {AiOutlineEyeInvisible,AiOutlineEye } from 'react-icons/ai'
import { useRouter } from 'next/navigation'
import Link from "next/link";
import ThankYou from "../ThankYou/ThankYou";
import { data } from "jquery";
import { Alert } from 'flowbite-react';




const RagisterForm = () => {

  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     sessionStorage.setItem('previousPage', 'register');
  //   };

  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);

  const router = useRouter()

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone,setPhone] = useState("")
    const [password, setPassword] = useState("");
    const [message,setMessage] = useState("");

    const [isLoading,setIsLoading] = useState(false)

    const [submitData,setSubmitData] = useState()
    //console.log("submitData",submitData)

    const [showThankyou,setshowThankyou] = useState(false)

    const submitHandler = async (e) => {
      e.preventDefault();
  
      if (nameerror || emailerror || phoneerror || passwordeerror) {
        // If there are any errors, do not proceed with the submission
        return;
      }

      try {
        setIsLoading(true)
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/create-customer`, {
          name,
          email,
          phone,
          password,
          type :"Normal"
        });
  
        //console.log("submit data",data);
  
        if (data.status_code == 200) {
          setEmail("");
          setName("");
          setPhone("");
          setPassword("");
          setIsLoading(false)
          setMessage(data.message)
          setSubmitData(data)
          setshowThankyou(true)
        }
      } catch ({response}) {
        setIsLoading(false)
        //console.log("submit error register",response.data.message);
        setMessage(response.data.message)
      }

     
    };
  //console.log("message",message)
    async function handleGoogleSignin() {
      signIn("google", { callbackUrl: "/", prompt: "login" })
    }

    // Name Validation
    const [nameerror, setNameError] = useState("");
    const handleName = (event) => {
        const name = event.target.value;
        if (!name) {
        setNameError("Name is required");
          setName(name);
        } else if (!/^[a-zA-Z\s]+$/.test(name)) {
        setNameError("Name should contain only letters and spaces");
          setName(name);
        } else {
        setNameError("");
          setName(name);
        }
      };
    


    //   Email Validation
    const [emailerror, setEmailError] = useState("");
    const handleEmail = (event) => {
        const email = event.target.value;
        if (!email) {
        setEmailError("Email is required");
        setEmail(email);
        } else if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
        ) {
        setEmailError("Please enter a valid email address");
        setEmail(email);
        } else {
        setEmailError("");
        setEmail(email);
        }
    };

    // phone No validation
    const [phoneerror, setPhoneError] = useState("");
    const handlephone = (event) => {
      const phone = event.target.value;
      if (!phone) {
        setPhoneError("Phone number is required");
        setPhone(phone);
      } else if (!/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(phone)) {
        setPhoneError("Phone number should contain only digits");
        setPhone(phone);
      }  else if (phone.length < 6 || phone.length > 13) {
        setPhoneError("Phone number should be between 6 and 13 digits");
        setPhone(phone.slice(0, 13));
      } else {
        setPhoneError("");
        setPhone(phone);
      }
    };
  
    // password validation
    const [passwordeerror, setPasswordeerror] = useState("");
    const [showPassword,setShowPassword] = useState(false);

    const handlepassword = (event) => {
      const password = event.target.value;
      if (!password) {
        setPasswordeerror("Password number is required");
        setPassword(password);
      } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%&?!*]{8,}$/.test(password)) {
        setPasswordeerror("Minimum eight characters, at least one letter and one number");
        setPassword(password);
      } else {
        setPassword(password);
        setPasswordeerror("");
      }
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };


  
  


  return (
    <>
      <div className="">
        <h1 className="text-xl xl:text-4xl lg:text-3xl md:text-2xl font-bold text-_dark">
          {!showThankyou ? "Create" : "Verify"} Your Account
        </h1>
        {!showThankyou ? (
          <form className="mt-8" onSubmit={submitHandler}>
            <div className="form-group mb-4 md:mb-5">
              <div className={styles.left__bordered__box}>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  className={`${styles.input_feild} form-control`}
                  value={name}
                  onChange={handleName}
                  required
                />
                <i
                  className="absolute top-[14px] left-3 w-[20px] h-[20px] bg-no-repeat bg-contain bg-center"
                  style={{
                    backgroundImage: `url('${"/images/icons/profile.svg"}')`,
                  }}
                ></i>
                {nameerror && (
                  <p className="text-xs pt-1" style={{ color: "red" }}>
                    {nameerror}
                  </p>
                )}
              </div>
            </div>

            <div className="form-group mb-4 md:mb-5">
              <div className={styles.left__bordered__box}>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email ID"
                  className={`${styles.input_feild} form-control`}
                  value={email}
                  onChange={handleEmail}
                  required
                />
                <i
                  className="absolute top-[17px] left-3 w-[20px] h-[16px] bg-no-repeat bg-contain bg-center"
                  style={{
                    backgroundImage: `url('${"/images/icons/email.svg"}')`,
                  }}
                ></i>
                {emailerror && (
                  <p className="text-xs pt-1" style={{ color: "red" }}>
                    {emailerror}
                  </p>
                )}
              </div>
            </div>
            <div className="form-group mb-4 md:mb-5">
              <div className={styles.left__bordered__box}>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Phone No"
                  className={`${styles.input_feild} form-control`}
                  value={phone}
                  onChange={handlephone}
                  required
                />
                <i
                  className="absolute top-[17px] left-3 w-[20px] h-[16px] bg-no-repeat bg-contain bg-center"
                  style={{
                    backgroundImage: `url('${"/images/icons/phone.svg"}')`,
                  }}
                ></i>
                {phoneerror && (
                  <p className="text-xs pt-1" style={{ color: "red" }}>
                    {phoneerror}
                  </p>
                )}
              </div>
            </div>
            <div className="form-group mb-4 md:mb-5">
              <div className={styles.left__bordered__box}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  className={`${styles.input_feild} form-control`}
                  value={password}
                  onChange={handlepassword}
                  required
                />
                <i
                  className="absolute top-[14px] left-3 w-[20px] h-[20px] bg-no-repeat bg-contain bg-center"
                  style={{
                    backgroundImage: `url('${"/images/icons/password.svg"}')`,
                  }}
                ></i>
                <button
                  onClick={togglePasswordVisibility}
                  type="button"
                  className="absolute top-[14px] right-3 w-[20px] h-[20px] bg-no-repeat bg-contain bg-center"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>

                {passwordeerror && (
                  <p className="text-xs pt-1" style={{ color: "red" }}>
                    {passwordeerror}
                  </p>
                )}
              </div>
            </div>
            {/* <div className="form-group mb-5 md:mb-6 lg:mb-8 flex justify-between"> 
            <div className={`check__group`}> 
                <input type="checkbox" name='remember' id='remember' className="chek__box appearance-none" />
                <label htmlFor="remember" className='text-sm sm:text-base text-_dark label'>Remember Me</label>
            </div>
            <a href="#" className='text-sm sm:text-base'>Forgot Password?</a>
        </div> */}
            {message && (
              <Alert color="failure" className="mt-3 mb-3">
                <span>{message}</span>
              </Alert>
            )}
            <div className="mb-3 md:mb-5">
              <button 
              className={`uppercase font-semibold w-full transition-all rounded py-3 px-3 bg-${isLoading ? '_gray' : '_green'} hover:bg-${isLoading ? '_gray' : '_teal'} text-white`}
              disabled={isLoading}
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
                'Sign Up'
              )}
                
              </button>
            </div>
            {/* <div className="text-_green text-center font-medium text-lg mb-2">Or with</div>
        <button onClick={handleGoogleSignin} type='button' className="btn border border-gray hover:border-_dark hover:bg-gray-light w-full rounded py-3 flex justify-center align-middle">
            <img src="/images/icons/google.svg" className='mr-3' alt="icon" />
            <span className='text-_dark text-uppercase'>Continue with Google</span>
        </button> */}
          </form>
        ) : (
          <ThankYou
            name={submitData?.data.name}
            useremail={submitData?.data.email}
            userPhone={submitData?.data.phone}
          />
        )}
        <div className="text-center text-gray text-sm sm:text-base mt-3 sm:mt-4">
          Already have an account?
          <Link href="/login" className="text-_green hover:text-_blue ms-2">
            Sign In
          </Link>
        </div>
      </div>
    </>
  );
}

export default RagisterForm