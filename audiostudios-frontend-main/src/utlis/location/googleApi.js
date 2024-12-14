"use client";

import axios from 'axios';

 const getCurrentLocation = async () => {

    try {
      const response = await axios.get('https://ipapi.co/json');

      if (response.status === 200) {
        //console.log('responce',response)
        const lat = response.data.latitude;
        const lng = response.data.longitude;
        //console.log("lat lng",lat,lng )
        return { lat, lng };
      } else {
        throw new Error('Failed to retrieve location.');
      }
    } catch (error) {
      console.error('Error getting current location:', error);
      throw error;
    }
};

export default getCurrentLocation
