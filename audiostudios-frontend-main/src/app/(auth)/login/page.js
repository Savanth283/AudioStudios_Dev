// 'use client';

import React from 'react'
import axios from 'axios';
import Link from 'next/link';
// import styles from '../styles/Login.module.scss';
import styles from '../../../styles/Login.module.scss';
import { Image } from 'next/image';

// import {getCsrfToken, signIn, providers,getSession} from "next-auth/react";
// import { useRouter } from 'next/navigation';
// import {useState} from "react";

import LoginForm from '@/components/LoginForm/LoginForm';


// export async function getServerSideProps(context) {
//     const session = await getSession(context);
//     if (session) {
//       return {
//         redirect: {
//           destination: '/',
//           permanent: false
//         }
//       };
//     }
//     return { props: {} };
//   }

async function getGlobal() {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/global-settings`,{ cache: 'no-store' })
    return res.json();
}


const Login = async () => {
    const globalData = await getGlobal()

    // const router = useRouter()

    // const [email,setEmail] = useState("");
    // const [password,setPassword] = useState("");
    // const [errormsg, setErrormsg] = useState()

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    
    //     const result = await signIn('credentials', {
    //       email,
    //       password,
    //       redirect: false, // Do not redirect to callback URL
    //       callbackUrl: '/'
    //     });
    //     console.log("result",result)
    //     if (result.error) {
    //         //alert(result.error);
    //         console.log(result.error)
    //       } else {
    //         // Redirect the user to the home page after successful login
    //         // window.location.href = "/";
    //         console.log("log in success")
    //       }
    //   };

    // async function handleSignIn(e) {
    //     e.preventDefault()
    //     setErrormsg(null)
    //     try {
    //       const result = await signIn('credentials', {
    //         redirect: false,
    //         email,
    //         password,
    //       })
    //        //console.log("result",result)
    //       if (!result.error) {
    //         // The user was successfully authenticated
    //         // Redirect to the appropriate page
  
    //         console.log("loged in")
    //         router.push('/')
    //       } else {
    //         const errorObject = JSON.parse(result.error);
    //         console.log(result.error)
    //         setErrormsg(errorObject.message)
    //         console.log("error",errorObject.message)
    //       }
    //     } catch (error) {
    //       console.error(error)
    //       setErrormsg('An error occurred while attempting to sign in.')
    //     }
    //   }

    //   // Google Handler function

    //   async function handleGoogleSignin() {
    //     signIn("google", { callbackUrl: "/", prompt: "login" })
    //   }
  

    return (
        <>
            <div className={`${styles.auth__layout} relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 p-6 sm:p-12`}> 
                <img src="/images/logo-white-tm.svg" className="lg:h-20 md:h-18 sm:h-16 h-14" alt="audiostudios" />
                <p className='text-white text-center mb-4 text-base lg:text-lg xl:text-xl font-semibold mt-3'>
                    World's first chain of Recording Studios & Audio Creators
                </p>
                <div className="relative bg-white px-6 pt-10 pb-8 sm:mx-auto sm:max-w-md w-full sm:rounded-lg sm:px-10">
                    <div className="mx-auto max-w-lg w-full"> 
                        <div className="divide-y">
                            <div className="">
                                <h1 className="text-xl xl:text-4xl lg:text-3xl md:text-2xl font-bold text-_dark">Login Account</h1>

                                {/* <form className='mt-8' onSubmit={handleSignIn} >
                            
                                    <div className="form-group mb-4 md:mb-5"> 
                                        <div className={styles.left__bordered__box}> 
                                            <input 
                                                type="text" 
                                                name='email' id='email' 
                                                placeholder='Email ID'
                                                className={`${styles.input_feild} form-control`} 
                                                style={{ backgroundImage: `url('${'/images/icons/email.svg'}')` }}
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group mb-4 md:mb-5"> 
                                        <div className={styles.left__bordered__box}> 
                                            <input 
                                                type="text" 
                                                name='password' id='password' 
                                                placeholder='Password'
                                                className={`${styles.input_feild} form-control`} 
                                                style={{ backgroundImage: `url('${'/images/icons/password.svg'}')` }}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <p>{errormsg}</p>
                                    <div className="form-group mb-5 md:mb-6 lg:mb-8 flex justify-between"> 
                                        <div className={`check__group`}> 
                                            <input type="checkbox" name='remember' id='remember' className="chek__box appearance-none" />
                                            <label htmlFor="remember" className='text-sm sm:text-base text-_dark label'>Remember Me</label>
                                        </div>
                                        <a href="#" className='text-sm sm:text-base'>Forgot Password?</a>
                                    </div>
                                    <div className="mb-3 md:mb-5">
                                        <button className="uppercase font-semibold w-full transition-all rounded py-3 px-3 bg-_green hover:bg-_teal text-white">Login</button>
                                    </div>
                                    <div className="text-_green text-center font-medium text-lg mb-2">Or with</div>
                                    <button onClick={handleGoogleSignin} type='button' className="btn border border-gray hover:border-_dark hover:bg-gray-light w-full rounded py-3 flex justify-center align-middle">
                                        <img src="/images/icons/google.svg" className='mr-3' alt="icon" />
                                        <span className='text-_dark text-uppercase'>Continue with Google</span>
                                    </button>
                                </form> */}
                                <LoginForm globalData={globalData} />

                                <div className="text-center text-gray text-sm sm:text-base mt-3 sm:mt-4">
                                    Don’t have an account?
                                    <Link href='/signup' className='text-_green hover:text-_blue ms-2'>Sign up</Link>
                                </div>
                                
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


// export async function getServerSideProps(context) {
//     return {
//       props: {
//         csrfToken: await getCsrfToken(context),
//       },
//     };
//   }

  
export default Login

 