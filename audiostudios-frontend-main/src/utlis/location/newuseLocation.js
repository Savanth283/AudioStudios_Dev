import { useState, useEffect } from 'react';

const newuseLocation = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      } catch (error) {
        setError(error.message);
      }
    };

    const handlePermission = (status) => {
      if (status === 'granted') {
        fetchLocation();
      } else {
        setError('Geolocation permission denied.');
      }
    };

    if (navigator.permissions) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then((permissionStatus) => {
          handlePermission(permissionStatus.state);

          permissionStatus.onchange = () => {
            handlePermission(permissionStatus.state);
          };
        })
        .catch((error) => {
          setError(error.message);
        });
    } else {
      fetchLocation();
    }
  }, []);

  return { latitude, longitude, error };
};

export default newuseLocation;
