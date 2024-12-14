"use client"
import React,{useState} from 'react'
import axios from 'axios'
import { Alert } from 'flowbite-react'


const ContactForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone,setPhone] = useState("")
    const [subject,setSubject] = useState('')
    const [message,setMessage] = useState("");

    const [successMessage,setSuccessMessage] = useState('')
    const [errorMessage,setErrorMessage] = useState("")

    const [isLoading, setIsLoading] = useState(false);

    // console.log("name",name)
    // console.log("email",email)
    // console.log("phone",phone)
    // console.log("subject",subject)
    // console.log("message",message)

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

// subject Validation
const [subjectError,setSubjectError] = useState('')
const handleSubject = (event) => {
    const subject = event.target.value;
    if (!subject) {
        setSubjectError("Subject is required");
        setSubject(subject);
    } else {
        setSubjectError("");
        setSubject(subject);
    }
}

// message Validation
const [messageError,setMessageError] = useState('')
const handleMessage = (event) => {
    const message = event.target.value;
    if (!message) {
        setMessageError("Message is required");
        setMessage(message);
    } else {
        setMessageError("");
        setMessage(message);
    }
}



const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();

    setErrorMessage('')
    setSuccessMessage('')

    // if (!name || !email || !phone || !subject || !message) {
    // // If there are any errors, do not proceed with the submission
    // setErrorMessage("Please Fill Requred Fields")
    // setIsLoading(false)
    // return;
    // }

    if (!name) {
        setNameError("Please enter your name");
        setIsLoading(false);
        return;
    }
    
    if (!email) {
        setEmailError("Please enter your email");
        setIsLoading(false);
        return;
    }
    
    if (!phone) {
        setPhoneError("Please enter your phone number");
        setIsLoading(false);
        return;
    }
    
    if (!subject) {
        setSubjectError("Please enter a subject");
        setIsLoading(false);
        return;
    }
    
    if (!message) {
        setMessageError("Please enter your message");
        setIsLoading(false);
        return;
    }
    



    try {
        console.log("submit message")
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/contact-us`, {
          name,
          email,
          phone,
          subject,
          message
        });
  
        //console.log("submit data",data);
        if (data.status_code == 200) {
            setSuccessMessage(data.message)
            setErrorMessage('')
            setName('')
            setEmail('')
            setPhone('')
            setMessage('')
            setSubject('')
            setIsLoading(false)
            //console.log("submit success")
        }
  
        } catch ({response}) {
            
            setErrorMessage(response.data.message)
            setSuccessMessage('')
            setIsLoading(false)
                //console.log("response.data.message",response.data.message)
        }
}

  return (
    <>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-7" >
        <div class="col-md-6">
            <input onChange={handleName} value={name} type="text" name="name" id="name" class="form-control" placeholder="Name*"/>
            {nameerror && (
                <p className="text-xs pt-1" style={{ color: "red" }}>
                {nameerror}
                </p>
            )}
        </div>
        <div class="col-md-6">
            <input onChange={handleEmail} value={email} type="text" name="email" id="email" class="form-control" placeholder="Email*"/>
            {emailerror && (
                <p className="text-xs pt-1" style={{ color: "red" }}>
                {emailerror}
                </p>
            )}
        </div>
        <div class="col-md-6">
            <input type="text"  value={phone} onChange={handlephone} name="mobile_no" id="mobile_no" class="form-control" placeholder="Mobile No*"/>
            {phoneerror && (
                  <p className="text-xs pt-1" style={{ color: "red" }}>
                    {phoneerror}
                  </p>
            )}
        </div>
        <div class="col-md-6">
            <input value={subject} onChange={handleSubject} type="text" name="subject" id="subject" class="form-control" placeholder="Subject*"/>
            {subjectError && (
                  <p className="text-xs pt-1" style={{ color: "red" }}>
                    {subjectError}
                  </p>
            )}
        </div>
        <div class="md:col-span-2">
            <textarea value={message} onChange={handleMessage} name="message" id="message" cols="30" rows="4" className='form-control !h-auto' placeholder='Message*'></textarea>
            {messageError && (
                  <p className="text-xs pt-1" style={{ color: "red" }}>
                    {messageError}
                  </p>
            )}
        </div>
       
        <div class="col-12">
        {errorMessage && (
            <Alert color="failure" className=" mb-4">
            <span>{errorMessage}</span>
            </Alert>
        )}
        {successMessage && (
            <Alert color="success" className=" mb-4">
            <span>{successMessage}</span>
            </Alert>
        )}

            <button
        onClick={handleSubmit}
        className={`py-1.5 2xl:py-2 px-3 xl:px-4  text-white rounded-lg block transition duration-300 hover:bg-_dark hover:text-_teal text-[12px] sm:text-sm md:text-base 2xl:text-lg text-center ${isLoading ? 'opacity-50 cursor-not-allowed bg-_dark' : 'bg-_teal'}`}
        type="button"
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'SUBMIT'}
      </button>
        </div>
        </div>
    </>
  )
}

export default ContactForm