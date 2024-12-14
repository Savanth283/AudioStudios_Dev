"use client"
import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import { AiOutlineClockCircle,AiFillCamera } from 'react-icons/ai'
import { TiUser } from 'react-icons/ti'
import { TfiEmail } from 'react-icons/tfi'
import { RiPhoneFill, RiLockPasswordFill } from 'react-icons/ri'
import {CiUser} from "react-icons/ci"
import axios from 'axios'
import { useSession, signOut } from "next-auth/react";
import { CiEdit } from "react-icons/ci";
import { IoSaveOutline } from "react-icons/io5";
import {AiOutlineEyeInvisible,AiOutlineEye } from 'react-icons/ai'

const ProfileDetails = () => {

const { data: session, status } = useSession();
//console.log("status status",status)
const [profileData,setProfileData] = useState();


const [profileName, setProfileName] = useState('');

const [profileImgUp,setProfileImgUp] = useState('')

const [imageUpLoading, setImageUpLoading] = useState(false);


const [updatePassword,setUpdatePassword] = useState(false)
const [oldPassword,setOldPassword] = useState('')
const [newPassword,setNewPassword] = useState('')
const [updatePasswordMessage,setUpdatePasswordMessage] = useState('')
const [newPassworderror, setNewPasswordeerror] = useState('')

const getProfileDetails = async () => {

        try {
            const res =  await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/profile?customer_id=${session.user.id}`,{
                headers: {
                  Authorization: session.user.token, // Replace with your actual token
                  'Content-Type': 'application/json'
                }
              })
              //console.log("res.data",res.data)
            if (res.status === 200) {
                setProfileData(res.data)
                setProfileName(res.data?.data.name);
            }
        } catch (error) {
            console.error(error)
        }

}

useEffect(() => {
    if (status === 'authenticated') {
      getProfileDetails();
    }
  }, [status]);


//console.log("profileData",profileData)

const [profileUpdate,setProfileUpdate] = useState(false)

const updateProfile = async () => {

    try {
        const res =  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/profile-update`,{
           
            id: profileData.data._id,	
            name: profileName,
            
        },{
            headers: {
              Authorization: session.user.token, // Replace with your actual token
              'Content-Type': 'application/json'
            }
          })
          if (res.status === 200) {
            changeProfileedit()
            getProfileDetails()
          }
          
    } catch (error) {
      if (error.response.status === 403 ) {
        //console.log("hgfdgh")
        //handleSignOut()
        signOut()
      }
        console.error(error)
    }
}

const changeProfileedit = () => {
    setProfileUpdate(!profileUpdate)
}

const ProfileName = (e) => {
    const name = e.target.value
    setProfileName(name)
}

const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      return; // No file selected, do nothing
    }

    setImageUpLoading(true); // Start the loading state

    // Create a FormData object and append the selected file
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Send the file to your server-side endpoint for S3 upload using Axios
      const response = await axios.post('/api/imageupload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Assuming your server returns the fileName in the response data

      //const { fileName } = response.data;

      // Handle the response, e.g., update the profile image URL in your UI
      console.log('Image uploaded successfully:', response.data);
      setProfileImgUp(response.data.fileName)
      imageUpdate(response.data.fileName)
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setImageUpLoading(false); // Finish the loading state, whether successful or not
    }
  };

  // useEffect(() => {
  //   // Function to hide the message after 5 seconds
  //   const hideMessage = () => {
  //     setUpdatePasswordMessage('');
  //   };

  //   // Check if there is a message to display
  //   if (updatePasswordMessage) {
  //     // Set a timeout to hide the message after 5 seconds
  //     const timeoutId = setTimeout(hideMessage, 5000);

  //     // Clean up the timeout when the component unmounts or when the message changes
  //     return () => clearTimeout(timeoutId);
  //   }
  // }, [updatePasswordMessage]);

const imageUpdate = async (ProfileImage) => {
  try {
    const res =  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/profile-update`,{
       
        id: profileData.data._id,
        profile_image: `${process.env.NEXT_PUBLIC_AWS_INSIDE_PATH}/${ProfileImage}`
        
    },{
        headers: {
          Authorization: session.user.token, // Replace with your actual token
          'Content-Type': 'application/json'
        }
      })
      if (res.status === 200) {
        console.log("image update in profile")
        getProfileDetails()
      }
      
} catch (error) {
  if (error.response.status === 403 ) {
    console.log("hgfdgh")
    //handleSignOut()
    signOut()
  }
    console.error(error)
}
}

const updateNewPassword = async () => {
  // console.log("oldPassword",oldPassword)
  // console.log("newPassword",newPassword)
  if (newPassworderror) {
    // If there are any errors, do not proceed with the submission
    return;
  }

  try {
    const res =  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/change-password`,{
       
        id: profileData.data._id,	
        old_password: oldPassword,
        new_password: newPassword
        
    },{
        headers: {
          Authorization: session.user?.token, // Replace with your actual token
          'Content-Type': 'application/json'
        }
      })
      if (res.status === 200) {
        console.log("update pasword",res)
        setUpdatePassword(false)
        setUpdatePasswordMessage(res.data.message);
        setOldPassword('')
        setNewPassword('')
      }
      
    } catch (error) {
    if (error.response.status === 403 ) {
      signOut()
    }
    setUpdatePasswordMessage(error.response.data.message);
      console.error(error)
  }

}
//console.log("profileImgUp",profileImgUp)
const [showPassword,setShowPassword] = useState(false)
const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
};


const handlepassword = (event) => {
  const password = event.target.value;
  if (!password) {
    setNewPasswordeerror("Password number is required");
    setNewPassword(password);
  } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%&?!*]{8,}$/.test(password)) {
    setNewPasswordeerror("Minimum eight characters, at least one letter and one number");
    setNewPassword(password);
  } else {
    setNewPassword(password);
    setNewPasswordeerror("");
  }
};

if (status === "unauthenticated") {
  return (
    <div className="pb-16 mt-12 sm:mt-16 lg:mt-20" style={{minHeight:'500px'}}>
      
        <div className="w-full text-center">
          <div className="flex justify-center">
            <CiUser className="text-6xl" />
          </div>
          <p>
          <Link href="/login">Login</Link> to access your account
          </p>
        </div>
      
    </div>
  );
}

if (status === "loading") {
    return (
        <div role="status" className='text-center min-h-min	 flex justify-center items-center' style={{minHeight:'500px'}}>
            <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    )
    }


  return (
    <div className="pb-16 -mt-12 sm:-mt-16 lg:-mt-20 min-h-32">
    <div className="container mx-auto">

        
        <div className="">
            <div className="relative w-28 sm:w-32 md:w-36 lg:w-40 h-28 sm:h-32 md:h-36 lg:h-40 rounded-full border-4 border-_teal bg-_teal mx-auto"> 
            {profileData?.data && profileData?.data?.profile_image ? (
                <img src={process.env.NEXT_PUBLIC_S3_BUCKET_URL + profileData?.data?.profile_image} className='object-cover rounded-full w-full h-full' alt={profileData?.data.name} />
            ): null}

             
                
                {imageUpLoading ? (
                  <div className="absolute rounded-full inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    {/* You can display a loading spinner or any other loading animation here */}
                    <div className="text-white text-xl">Uploading...</div>
                  </div>
                ) : (
                  <label
                    htmlFor="profileimage"
                    className="w-10 h-10 rounded-full border border-_green flex justify-center items-center absolute top-[50%] left-[50%] bg-[##ffffffdb] hover:bg-white hover:text-_teal"
                    style={{ transform: 'translate(-50%,-50%)' }}
                  >
                    <input onChange={handleFileUpload} type="file" name="" id="profileimage" className='w-0 h-0' />
                    <AiFillCamera className="text-2xl rounded-full" />
                  </label>
                )}
                          <span className="status d-block w-4 h-4 border-2 border-white bg-_green absolute rounded-full right-3.5 bottom-3"></span>
            </div>
            <div className="text-center font-semibold text-_dark text-base md:text-lg lg:text-xl mt-4">{profileData?.data.name} </div>
            {/* <div className="text-center font-normal text-_gray text-sm md:text-base mt-2 flex justify-center flex-wrap items-center">
                <AiOutlineClockCircle className='text-base mr-2 lg:text-lg' /> 
                Active 1 year 9 monts ago
            </div> */}
        </div>

        <div className="mt-8 mx-auto max-w-[1200px] w-full"> 
            {!profileUpdate ? (
                <div className="mt-4 sm:mt-6 text-right mb-3">
                    <button onClick={changeProfileedit} type='button' className='text-_green hover:text-_teal hover:decoration-1 hover:underline inline-flex items-center'><CiEdit className='text-xl mr-2' /> Edit Your Profile?</button>
                </div>
            ): (
            <div className="mt-4 sm:mt-6 text-right mb-3">
                <button onClick={updateProfile} type='button' className='text-_green hover:text-_teal hover:decoration-1 hover:underline inline-flex items-center'><IoSaveOutline className='text-xl mr-2' /> Update Profile</button>
            </div>
            )}

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div>
                    <div className="flex shadow-lg">
                        <div className="bg-_teal p-3 z-10 rounded w-14 flex items-center justify-center">
                            <TiUser className='text-lg md:text-xl lg:text-2xl text-white' />
                        </div>
                        <input type="text" onChange={ProfileName} value={profileName}  readOnly={!profileUpdate} className='form-control text-base md:text-lg -ml-1' />
                    </div>
                </div>
                <div>
                    <div className="flex shadow-lg">
                        <div className="bg-_teal p-3 z-10 rounded w-14 flex items-center justify-center">
                            <TfiEmail className='text-lg md:text-xl text-white' />
                        </div>
                        <input type="text" value={profileData?.data.email} readOnly className='form-control text-base md:text-lg -ml-1' />
                    </div>
                </div>
                <div>
                    <div className="flex shadow-lg">
                        <div className="bg-_teal p-3 z-10 rounded w-14 flex items-center justify-center">
                            <RiPhoneFill className='text-lg md:text-xl lg:text-2xl text-white' />
                        </div>
                        <input type="text" value={profileData?.data.phone} readOnly className='form-control text-base md:text-lg -ml-1' />
                    </div>
                </div>

                <div>
                  {!updatePassword && (
                    <>
                    <div className="flex shadow-lg relative">
                        <div className="bg-_teal p-3 z-10 rounded w-14 flex items-center justify-center">
                            <RiLockPasswordFill className='text-lg md:text-xl lg:text-2xl text-white' />
                        </div>
                        <input type="password" value="1234567" readOnly className='form-control text-base md:text-lg -ml-1' />
                        <button onClick={()=>setUpdatePassword(true)} className='text-_green text-sm md:text-base absolute top-3 right-5 underline decoration-1 hover:text-_teal transition-all duration-200' > Change your password? </button>
                    </div>
                    {updatePasswordMessage && (
                      <p className='text-_green pt-2' >{updatePasswordMessage}</p>
                    )}
                    </>
                  )}


                    {/* update password section */}
                    {updatePassword && (
                      <>
                    <div className="flex relative pb-1">
                        <div className="bg-_teal p-3 z-10 rounded w-14 flex items-center justify-center">
                            <RiLockPasswordFill className='text-lg md:text-xl lg:text-2xl text-white' />
                        </div>
                        <input type={showPassword ? "text" : "password"} value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} placeholder='Enter Old Password'  className='form-control text-base md:text-lg -ml-1' />
                       
                        <button
                  onClick={togglePasswordVisibility}
                  type="button"
                  className="absolute top-[14px] right-3 w-[20px] h-[20px] bg-no-repeat bg-contain bg-center"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>

                    </div>
                    <p className=' pb-3 text-right' >Don't Remember Old Password ? <Link href="/forgot-password">Forget Password</Link></p>

                    <div className="flex shadow-lg relative">
                        <div className="bg-_teal p-3 z-10 rounded w-14 flex items-center justify-center">
                            <RiLockPasswordFill className='text-lg md:text-xl lg:text-2xl text-white' />
                        </div>
                        <input 
                        type={showPassword ? "text" : "password"}  
                        value={newPassword} 
                        onChange={handlepassword} 
                        placeholder='Enter New Password' 
                        className='form-control text-base md:text-lg -ml-1'
                        required
                         />
                        <button
                  onClick={togglePasswordVisibility}
                  type="button"
                  className="absolute top-[14px] right-3 w-[20px] h-[20px] bg-no-repeat bg-contain bg-center"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
                    
                    </div>
                    {updatePasswordMessage && (
                      <p className='text-[#FF0000] pt-2' >{updatePasswordMessage}</p>
                    )}
                    
                    {newPassworderror && (
                      <p className='text-[#FF0000] pt-2' >{newPassworderror}</p>
                    )}
                    <div className='text-right mt-4'>
                    <button onClick={()=>setUpdatePassword(false)} className='text-base font-medium px-4 py-2 rounded-md border border-_teal bg-white text-_teal transition-all duration-300 hover:bg-_teal hover:text-white mr-3'>Cancle</button>

                    <button disabled={newPassworderror != '' || newPassword === '' || oldPassword === '' } onClick={updateNewPassword} className={`text-base font-medium px-4 py-2 rounded-md border border-_teal  ${ oldPassword === '' || newPassword === '' || newPassworderror != ''  ?  'bg-_gray ' : 'bg-_teal' }  text-white transition-all duration-300 hover:bg-white hover:text-_teal`}>Update Password</button>

                    </div>
                    </>
                     )}
                     {/* update password section */}


      
                </div>

            </div>

            {/* {!profileUpdate ? (
                <div className="mt-4 sm:mt-6">
                    <button onClick={changeProfileedit} type='button' className='text-_green hover:text-_teal hover:decoration-1 hover:underline'>Edit your profile?</button>
                </div>
            ): (
            <div className="mt-4 sm:mt-6">
                <button onClick={updateProfile} type='button' className='text-_green hover:text-_teal hover:decoration-1 hover:underline'>Update</button>
            </div>
            )} */}



        </div>

    </div>
</div>
  )
}

export default ProfileDetails