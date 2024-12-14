// 'use client';

// import axios from "axios";
import Link from "next/link";
// import React, { useState } from "react";
import styles from '../../../styles/Login.module.scss';
// import { getSession,signIn } from "next-auth/react";
import RagisterForm from "@/components/RagisterForm/RagisterForm";

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



const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone,setPhone] = useState("")
//   const [password, setPassword] = useState("");

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/create-customer`, {
//         name,
//         email,
//         password,
//       });

//       console.log("submit data",data);

//       if (data.status_code === 200) {
//         setEmail("");
//         setName("");
//         setPhone("");
//         setPassword("");
//       }
//     } catch (error) {
//       console.log("submit error",error);
//     }
//   };

//   async function handleGoogleSignin() {
//     signIn("google", { callbackUrl: "/", prompt: "login" })
//   }

  return (
    // <div className="container container-fluid">
    //   <div className="row mt-5 d-flex justify-content-center">
    //     <div className="col-10 col-lg-5 ">
    //       <form
    //         className="border border-secondary rounded p-4"
    //         onSubmit={submitHandler}
    //       >
    //         <h1 className="mb-4">Register</h1>

    //         <div className="form-outline mb-4">
    //           <label className="form-label" htmlFor="name_field">
    //             Name
    //           </label>
    //           <input
    //             type="text"
    //             id="name_field"
    //             className="form-control"
    //             value={name}
    //             onChange={(e) => setName(e.target.value)}
    //           />
    //         </div>

    //         <div className="form-outline mb-4">
    //           <label className="form-label" htmlFor="email_field">
    //             Email address
    //           </label>
    //           <input
    //             type="email"
    //             id="email_field"
    //             className="form-control"
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}
    //           />
    //         </div>

    //         <div className="form-outline mb-4">
    //           <label className="form-label" htmlFor="password_field">
    //             Password
    //           </label>
    //           <input
    //             type="password"
    //             id="password_field"
    //             className="form-control"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //           />
    //         </div>

    //         <button
    //           type="submit"
    //           className="btn btn-block w-100 btn-_green btn-block mb-4"
    //         >
    //           Register
    //         </button>
    //       </form>
    //     </div>
    //   </div>
    // </div>

<div className={`${styles.auth__layout} relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 p-6 sm:p-12`}> 
                <img src="/images/logo-white-tm.svg" className="lg:h-20 md:h-18 sm:h-16 h-14" alt="Tailwind Play" />
                <p className='text-white text-center mb-4 text-base lg:text-lg xl:text-xl font-semibold mt-3'>
                    World's first chain of Recording Studios & Audio Creators
                </p>
                <div className="relative bg-white px-6 pt-10 pb-8 sm:mx-auto sm:max-w-md w-full sm:rounded-lg sm:px-10">
                    <div className="mx-auto max-w-lg w-full"> 
                        <div className="divide-y">
                            {/* <div className="">
                                <h1 className="text-xl xl:text-4xl lg:text-3xl md:text-2xl font-bold text-_dark">Create Your Account</h1> */}

                                <RagisterForm/>
                                {/* <div className="text-center text-gray text-sm sm:text-base mt-3 sm:mt-4">
                                Already have an account?
                                    <Link href='/login' className='text-_green hover:text-_blue ms-2'>Sign In</Link>
                                </div>
                                
                            </div>  */}
                        </div>
                    </div>
                </div>
            </div>

  );
};

export default Register;