"use client";

import React, { useState, useEffect } from 'react';

const GetLocation = ({ onDataReceived }) => {
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    // Function to handle success
    const successCallback = (position) => {
      //setLatitude(position.coords.latitude);
      //setLongitude(position.coords.longitude);
        //console.log("position",position)
      onDataReceived(position.coords.latitude, position.coords.longitude);
    };

    // Function to handle error
    const errorCallback = (error) => {
      console.error('Error retrieving location:', error);
    };

    // Retrieve the current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, [onDataReceived]);

//   useEffect(() => {
//     // Pass the latitude and longitude values to the parent component
//     onDataReceived(latitude, longitude);
//   }, [latitude, longitude, onDataReceived]);

  return <></>;
};

export default GetLocation;
