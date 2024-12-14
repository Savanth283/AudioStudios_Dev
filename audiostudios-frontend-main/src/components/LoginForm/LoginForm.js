'use client';
import React from 'react'
import styles from '@/styles/Login.module.scss'
import { getCsrfToken, signIn, providers, getSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useState,useEffect } from "react";
import { Alert } from 'flowbite-react';
import {AiOutlineEyeInvisible,AiOutlineEye } from 'react-icons/ai'
import axios from 'axios';
import Link from 'next/link';
import { usePathname,useSearchParams } from 'next/navigation'

const LoginErrAlert = ({ errorMsg }) => {
  return (
    <Alert color="failure" className='mt-3'>
      <span>
        {errorMsg}
      </span>
    </Alert>
  )
}


const LoginForm = ({globalData}) => {

  // function getPreviousURL() {
  //   const currentURL = window.location.href;
  
  //   // Go back in the browsing history
  //   window.history.back();
  
  //   // Return the stored current URL
  //   return currentURL;
  // }

  // const prevUrl = document.referrer;
  // console.log("prevUrl", prevUrl);
 
  //const previousPage = sessionStorage.getItem('previousPage');
  // const [checkPreev,setCheckPrev] = useState('')
  // useEffect(() => {
  //   const previousPage = sessionStorage.getItem('previousPage');
  //   setCheckPrev(previousPage);
  //   //sessionStorage.removeItem('previousPage'); // Clear the item after retrieval

  //   // Use the 'previousPage' value as needed
  //   console.log('Previous page:', previousPage);
  // }, []);
  // console.log("checkPreev",checkPreev)

// You can now use the 'previousPage' variable to know the page visited before reaching the login page
//console.log('Previous page:', previousPage); // Output: "Previous page: register"

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams();
  const loginError = searchParams.get('error')

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errormsg, setErrormsg] = useState()

  const [inputedit,setInputEdit]= useState(true)

  const [isLoading,setIsLoading] = useState(false)

  async function handleSignIn(e) {
    e.preventDefault();
  
    // Clear previous error messages
    setEmailError("");
    setPasswordError("");
    setErrormsg(null);
  
    // Validate email and password
    if (email === "") {
      setEmailError("Email/Phone is required");
      return;
    }
  
    if (password === "" && showLoginOtp == false) {
      setPasswordError("Password is required");
      return;
    }

    if (showLoginOtp == true & myotp === "" ) {
      setOtpError("Otp is required");
      return;
    }


    
    try {
      setIsLoading(true)
      // console.log("email",email)
      // console.log("password",password)
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
        otp:myotp
      });
      //console.log("result",result)
      // const sussObj = JSON.parse(result.data);
      // console.log("login result",sussObj)
      if (!result.error) {
        // The user was successfully authenticated
        // Redirect to the appropriate page
        console.log("Logged in");
        router.push('/');
        setIsLoading(false)
        // router.back();
        //console.log("backurl",pathname)
        // if (checkPreev === "register" ) {
        //   router.push('/')
        // } else {
        //   router.back();
        // }

      } else {
        //console.log("result result",result)
        //const { error } = result;
        setIsLoading(false)
        const errorObj = JSON.parse(result.error);

        setErrormsg(errorObj.message );
          if (errorObj.flag === "otp") {
            setShowOtpBox(true)
          }

        console.error("Sign-in error (in try):", errorObj);
      }
    } catch (error) {
      setIsLoading(false)
      console.error("Sign-in error:", error);
      setErrormsg("An error occurred while attempting to sign in.");
    }
  }

  // Google Handler function

  async function handleGoogleSignin() {
    console.log("google login")
    //try {
      const googleLoginResult = await signIn("google", { callbackUrl: "/", prompt: "login",redirect: false  })
      console.log("googleLoginResult",googleLoginResult)
      if (!googleLoginResult.error) {
        //console.log("login with google")
        //console.log("login with google message",JSON.parse(googleLoginResult.error))
        router.push('/');
      } else {

        const errorObj = JSON.parse(googleLoginResult.error);
        setErrormsg("An error occurred while attempting to sign in.");
        //console.log("Sign-in error google:", errorObj);
      }

    
    // } catch(error) {
    //   setErrormsg("An error occurred while attempting to sign in.");
    //     console.log("login with google error",error)
    //     console.log("login with google message",JSON.parse(error.googleLoginResult.error))

    // }
  }
  useEffect(() => {
    if (loginError != '') {
      setErrormsg(loginError)
    }
  }, [loginError])
  
  //console.log("loginError",loginError)
  async function handleFacebookSignin() {
    signIn("facebook", { callbackUrl: "/", prompt: "login",redirect: false  })
  }

  //   Email Validation
  const [emailerror, setEmailError] = useState("");
  const handleEmail = (event) => {
    const email = event.target.value;
    if (!email) {
      setEmailError("Email/Phone No is required");
      setEmail(email);
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) &&
      !/^[0-9]{10}$/.test(email) // Regex for 10-digit phone number, adjust as needed
    ) {
      setEmailError("Please enter a valid Email or Phone No");
      setEmail(email);
    } else {
      setEmailError("");
      setEmail(email);
    }
  };

  // Password Validation
  const [passworderror, setPasswordError] = useState("");
  const [showPassword,setShowPassword] = useState(false);

  const handlePassword = (event) => {

    const password = event.target.value;
    if (!password) {
      setPasswordError("Password is required");
      setPassword(password);
    }  else {
      setPasswordError("");
      setPassword(password);
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [showOtpBox,setShowOtpBox] = useState(false)

  const [otpError,setOtpError]= useState('')
  const [myotp,setMyotp] = useState('')
  const handleOtp = (e) => {
    const otp = e.target.value
    if (!otp) {
      setOtpError("Otp is required");
      setMyotp(otp);
    }  else {
      setOtpError("");
      setMyotp(otp);
    }
  }

  const confirmOtp = async () => {
    if (myotp === '') {
      setOtpError("Otp is required");
    }
    if (myotp === '' ) {
      // If there are any errors, do not proceed with the submission
      return;
    }
    try {
      const res =  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/verify-otp`,{           
        email: email,
        phone: email,
        email_otp: myotp,
        phone_otp: myotp,
      })
        if (res.status === 200) {
          //console.log("Otp Confarmed")
          setShowOtpBox(false)
          setOtpError(res.data.message)
          setErrormsg('')
          //console.log("res otp verified",res.data)
        }
        
  } catch (error) {
      //console.error("res.data catche",error)
      setOtpError(error.response.data.message)
  }
  }

  //login with otp

  const [loginOtp,setLoginOtp] = useState()
  const [successMsg,setSuccessMsg] = useState('')
  const [showLoginOtp,setShowLoginOtp] = useState(false) 
  const [fieldEdit,setFieldEdit] = useState(false)  
  const getLoginOtp = async () => {
    //console.log("getLoginOtp")
    setErrormsg('')
    if (email === "") {
      setEmailError("Email/Phone is required");
      return;
    }

    try {
      const res =  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/send-login-otp`,{           
        email_phone: email, //email state have bloth email and phone
      })
        if (res.status === 200) {
          setShowLoginOtp(true)
          setFieldEdit(true)
          setOtpError('')
          //setErrormsg(res.data.message)
          setSuccessMsg(res.data.message)
        }
  } catch (error) {
      setErrormsg(error.response.data.message)
      console.error("res.data catche",error)
      
  }

  }

  const fieldEditInput = () => {
    setSuccessMsg('')
    setFieldEdit(!fieldEdit)
  }

  return (
    <>
      {errormsg && <LoginErrAlert errorMsg={errormsg} />}
      {/* <form className='mt-8' onSubmit={handleSignIn} > */}
      {successMsg && (
        <Alert color="success" className='mt-3'>
        <span>
          {successMsg}
        </span>
      </Alert>
      )}
      <div className="form-group mb-4 md:mb-5 mt-8">
        <div className={styles.left__bordered__box}>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter Your Email / Phone No"
            className={`${styles.input_feild} form-control`}
            value={email}
            onChange={handleEmail}
            readOnly={fieldEdit}
          />
          <i
            className="absolute top-[17px] left-3 w-[20px] h-[20px] bg-no-repeat bg-contain bg-center"
            style={{ backgroundImage: `url('${"/images/icons/contact-us.svg"}')` }}
          ></i>
          {emailerror && (
            <div>
              <p style={{ color: "red" }}>{emailerror}</p>
            </div>
          )}
        </div>
      </div>

        <div className='text-right -mt-3'>
        {fieldEdit ? (
          <button onClick={fieldEditInput} className="text-_green text-center font-medium text-lg mb-4 ">Edit</button>
         ): (
          <button onClick={getLoginOtp} className="text-_green text-center font-medium text-sm md:text-base mb-4  ">Login With OTP</button>
         )}
        </div>

       
            {showLoginOtp ? (
               <div className="form-group mb-4 md:mb-5">
               <div className={styles.left__bordered__box}>
                 <input
                   type="text"
                   name="otp"
                   id="otp"
                   placeholder="OTP"
                   className={`${styles.input_feild} form-control`}
                   value={myotp}
                   onChange={handleOtp}
                 />
                 <i
                   className="absolute top-[17px] left-3 w-[20px] h-[20px] bg-no-repeat bg-contain bg-center"
                   style={{ backgroundImage: `url('${"/images/icons/otp.svg"}')` }}
                 ></i>
               </div>
             </div>
            ) : (
            <div className="form-group mb-4 md:mb-5">
            <div className={styles.left__bordered__box}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter Your Password"
                className={`${styles.input_feild} form-control`}
                value={password}
                onChange={handlePassword}
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
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>
              {passworderror && (
                <div>
                  <p style={{ color: "red" }}>{passworderror}</p>
                </div>
              )}
            </div>
            </div>
            )}
            { otpError && showLoginOtp && (
            <div className="pb-2 mb-2">
              <p style={{ color: "red" }}>{otpError}</p>
            </div>
            )}




      {showOtpBox ? (
        <div className="form-group mb-4 md:mb-5 mt-8">
          <div className={styles.left__bordered__box}>
            <input
              type="text"
              name="otp"
              id="otp"
              placeholder="OTP"
              className={`${styles.input_feild} form-control`}
              value={myotp}
              onChange={handleOtp}
            />
            <i
              className="absolute top-[17px] left-3 w-[20px] h-[20px] bg-no-repeat bg-contain bg-center"
              style={{ backgroundImage: `url('${"/images/icons/otp.svg"}')` }}
            ></i>
            <button
              onClick={confirmOtp}
              type="button"
              className="absolute right-3 uppercase font-semibold transition-all rounded py-1.5 text-[13px] top-2 px-3 bg-_green hover:bg-_teal text-white"
            >
              Confirm
            </button>

            {otpError && (
              <div>
                <p style={{ color: "red" }}>{otpError}</p>
              </div>
            )}
          </div>
        </div>
      ) : null}

      {!showOtpBox && otpError && !showLoginOtp && (
        <div className="pb-2 mb-2">
          <p style={{ color: "green" }}>{otpError}</p>
        </div>
      )}

      {/* <p>{errormsg}</p> */}
      {!showOtpBox ? (
        <>
          <div className="form-group mb-5 md:mb-6 lg:mb-8 flex justify-between">
            <div className={`check__group`}>
              {/* <input type="checkbox" name='remember' id='remember' className="chek__box appearance-none" />
            <label htmlFor="remember" className='text-sm sm:text-base text-_dark label'>Remember Me</label> */}
            </div>
            <Link href="/forgot-password" className="text-sm sm:text-base">
              Forgot Password?
            </Link>
          </div>
          <div className="mb-3 md:mb-5">
            <button
              onClick={handleSignIn}
              type="button"
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
                'Login'
              )}
            </button>
          </div>
        </>
      ) : null}

      <div className="text-_green text-center font-medium text-lg mb-2">Or with</div>
     {globalData?.google_login_enable?.value === "Yes" && (
      <button onClick={handleGoogleSignin} type='button' className="btn border border-gray hover:border-_dark hover:bg-gray-light w-full rounded py-3 flex justify-center align-middle">
          <img src="/images/icons/google.svg" className='mr-3' alt="icon" />
          <span className='text-_dark text-uppercase'>Continue with Google</span>
        </button>
     )}
     {globalData?.facebook_login_enable?.value === "Yes" && (
      <button onClick={handleFacebookSignin}  type='button' className=" mt-3 btn border border-gray hover:border-_dark hover:bg-gray-light w-full rounded py-3 flex justify-center align-middle">
          <img src="/images/icons/facebook.svg" className='mr-3 max-h-[24px] w-auto' alt="icon" />
          <span className='text-_dark text-uppercase'>Continue with Facebook</span>
        </button>
         )} 
      {/* </form> */}
    </>
  );
}

export default LoginForm