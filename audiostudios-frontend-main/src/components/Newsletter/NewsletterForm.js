"use client"

import { useState } from 'react';
import  { sanitize } from '@/utlis/utils'

import styles from '@/components/Footer/styles.module.scss'

const NewsletterForm = ({ status, message, onValidated }) => {
    // console.log("message",message)
    // console.log("status",status)
    const [ error, setError ] = useState(null);
    const [ email, setEmail ] = useState('');

    const handleFormSubmit = () => {
        setError(null);

    if ( ! email ) {
      setError( 'Please enter a valid email address' );
      return null;
    }

    const isFormValidated = onValidated({ EMAIL: email });

    // On success return true
    //return email && email.indexOf("@") > -1 && isFormValidated;

    // On success return true
    if (email && email.indexOf('@') > -1 && isFormValidated) {
        // Clear the email after successful submission
        setEmail('');
        return true;
    } else {
        return false;
    }

    }

    const handleInputKeyEvent = ( event ) => {
        setError(null);
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      handleFormSubmit();
    }
    }

    const getMessage = (message) => {
        console.log("message get msg",message)
        if ( !message ) {
            return null;
          }
          const result = message?.split('-') ?? null;
          if ( "0" !== result?.[0]?.trim() ) {
            return sanitize(message);
          }
          const formattedMessage = result?.[1]?.trim() ?? null;
          return formattedMessage ? sanitize( formattedMessage ) : null;
    }

  return (
   
    <>
    {/* <p className="text-sm mb-3 sm:text-base lg:text-lg text-white font-bold">Newsletter</p> */}
    <div className="mt-4">
    <p className="text-sm text-white hidden sm:block">Newsletter signup</p>
    <div className={`${styles.input__group} flex sm:border border-gray-light rounded-lg mt-2 p-2`}>
        <input  onChange={(event) => setEmail(event?.target?.value ?? '')}
        value={email} 
        type="email"
         name='email'
          className={`${styles.input} form-control`}
           placeholder='Email Address'
           onKeyUp={(event) => handleInputKeyEvent(event)}
           />
        <button onClick={handleFormSubmit} className={`${styles.btn} bg-_teal p-3 rounded`}>
            <img src="/images/icons/plan.svg" alt="icon" />
        </button>
    </div>
    <div className="mt-2">
        { 'sending' === status ? <div className='text-white font-bold'>Loading...</div> : null }
        {'error' === status || error ? (
          <div
            className="text-[red] pt-2"
            dangerouslySetInnerHTML={{ __html: error || getMessage( message ) }}
          />
        ) : null }
        {'success' === status && 'error' !== status && !error && (
          <div className="text-[green] font-bold pt-2" dangerouslySetInnerHTML={{ __html: sanitize(message) }} />
        )}
      </div>
</div>
    </>
  )
}

export default NewsletterForm