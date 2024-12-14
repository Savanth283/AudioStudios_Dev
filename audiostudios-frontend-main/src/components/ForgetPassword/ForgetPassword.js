"use client"

import React,{useState} from 'react'
import styles from '@/styles/Login.module.scss';
import {AiOutlineEyeInvisible,AiOutlineEye } from 'react-icons/ai'
import axios from 'axios';
import { Alert } from 'flowbite-react';
import Link from 'next/link';

const LoginErrAlert = ({ errorMsg }) => {
    return (
      <Alert color="failure" className='mt-3 mb-3'>
        <span>
          {errorMsg}
        </span>
      </Alert>
    )
  }

const ForgetPassword = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorMsg,setErrormsg] = useState("");
   const [successMsg,setSuccessMsg] = useState('')
    const [emailerror, setEmailError] = useState("");
    const [otpVerified,setOtpVerified] = useState(false)

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


        const [showPasswordfields,setShowPasswordfields] = useState(false)
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


        // const confirmOtp = async () => {
        //     try {
        //       const res =  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/verify-otp`,{           
        //         email: email,
        //         otp: myotp        
        //       })
        //         if (res.status === 200) {
        //           //console.log("Otp Confarmed")
        //           setShowPasswordfields(false)
        //           setOtpError(res.data.message)
        //           setErrormsg('')
        //           //console.log("res otp verified",res.data)
        //         }
                
        //   } catch (error) {
        //       //console.error("res.data catche",error)
        //       setOtpError(error.response.data.message)
        //   }
        //   }

        const resetPassword = async () => {
            try {
                const res =  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/forget-password`,{           
                  email: email, 
                  phone: email                   
                })
                  if (res.status === 200) {
                    setShowPasswordfields(true)
                    setErrormsg('')
                    //console.log("resetPassword",res.data)
                  }
                  
            } catch ({response}) {
                //const resetPassworderror = JSON.parse(error);
                console.error("resetPassworderror",response.data)
                setErrormsg(response.data.message)
            }
        }

        const updatePassword = async () => {

          if (myotp === '') {
            setOtpError("Otp is required");
          }
          if (myotp === '') {
            setPasswordeerror("Password is required");
          }

          if (myotp === '' || password === '') {
            // If there are any errors, do not proceed with the submission
            return;
          }

            try {
                const res =  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/reset-password`,{           
                  email: email,   
                  otp: myotp,
                  new_password : password       
                })
                  if (res.status === 200) {
                    console.log("updatePassword",res.data)
                    setEmail('')
                    setPassword('')
                    setErrormsg('')
                    setMyotp('')
                    setShowPasswordfields(false)
                    setSuccessMsg(res.data.message)
                    setOtpVerified(true)
                  }
                  
            } catch ({response}) {
                //console.error("res.data catche",error)
                setErrormsg(response.data.message)
            }
        }

  return (
    <>
        <form className='mt-8'>
                 {errorMsg && (
                <LoginErrAlert errorMsg={errorMsg} />
                 )}   
        {!otpVerified && (
        <div className="form-group mb-4 md:mb-5">
              <div className={styles.left__bordered__box}>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Your Email / Phone No"
                  className={`${styles.input_feild} form-control`}
                  value={email}
                  onChange={handleEmail}
                  required
                  readOnly={showPasswordfields}
                />
                <i
                  className="absolute top-[17px] left-3 w-[20px] h-[20px] bg-no-repeat bg-contain bg-center"
                  style={{
                    backgroundImage: `url('${"/images/icons/contact-us.svg"}')`,
                  }}
                ></i>
                {emailerror && (
                  <p className="text-xs pt-1" style={{ color: "red" }}>
                    {emailerror}
                  </p>
                )}
              </div>
            </div>
        )}

            {successMsg && (
                <Alert
                color="success"
                className='mb-2'
              >
                <span >
                  <p>
                  {successMsg}
                  </p>
                </span>
              </Alert>
            )}

            {showPasswordfields ? (
                <>
        <div className="form-group mb-4 md:mb-5 mt-8">
          <div className={styles.left__bordered__box}>
            <input
              type="text"
              name='otp' id='otp'
              placeholder='OTP'
              className={`${styles.input_feild} form-control`}
              value={myotp}
              onChange={handleOtp}
            
            />
            <i className='absolute top-[17px] left-3 w-[20px] h-[20px] bg-no-repeat bg-contain bg-center' style={{ backgroundImage: `url('${'/images/icons/otp.svg'}')` }}></i>
            

          </div>
          {otpError && (
              <div>
                <p style={{ color: "red" }}>{otpError}</p>
              </div>
            )}
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
            <div>
                <p style={{ color: "red" }}>{passwordeerror}</p>
              </div>
        )}
        </div>
        </div>
        </>
        ):null}

            {/* {!showOtpBox && otpError && (
              <div className='pb-2 mb-2'>
                <p style={{ color: "green" }}>{otpError}</p>
              </div>
            )} */}


            
        {!otpVerified ? (
          <>
        {!showPasswordfields ? (
        <div className="mb-3 md:mb-5">
            <button onClick={resetPassword} type='button' className="uppercase font-semibold w-full transition-all rounded py-3 px-3 bg-_green hover:bg-_teal text-white">Submit</button>
        </div>
        ) : (
        <div className="mb-3 md:mb-5">
            <button onClick={updatePassword}  type='button' className="uppercase font-semibold w-full transition-all rounded py-3 px-3 bg-_green hover:bg-_teal text-white">Update Password</button>
        </div>
        )}
        </>
        ): (
          <Link
          href={"/login"}
          className="uppercase font-medium text-center w-full block transition-all rounded py-3 px-3 bg-_green hover:bg-_teal text-white mt-3"
        >
          Go To Login
        </Link>
        )}


        </form>
    </>
  )
}

export default ForgetPassword