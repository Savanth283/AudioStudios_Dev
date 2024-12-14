import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const useLocation = () => {
  const router = useRouter();
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // useEffect(() => {
  //   const fetchLocation = async () => {
  //     if (navigator.geolocation) {
  //       try {
  //         const position = await new Promise((resolve, reject) => {
  //           navigator.geolocation.getCurrentPosition(resolve, reject);
  //         });
  //         setLatitude(position.coords.latitude);
  //         setLongitude(position.coords.longitude);
  //       } catch (error) {
  //         console.error('Error getting location:', error);
  //       }
  //     } else {
  //       console.error('Geolocation is not supported by this browser.');
  //     }
  //   };

  //   fetchLocation();
  // }, [router.pathname]);

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

    if (navigator.permissions) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then((permissionStatus) => {
          if (permissionStatus.state === 'granted') {
            fetchLocation();
          } else if (permissionStatus.state === 'prompt') {
            permissionStatus.onchange = () => {
              if (permissionStatus.state === 'granted') {
                fetchLocation();
              } else {
                setError('Geolocation permission denied.');
              }
            };
          } else {
            setError('Geolocation permission denied.');
          }
        })
        .catch((error) => {
          setError(error.message);
        });
    } else {
      fetchLocation();
    }
  }, [router.pathname]);

  return { latitude, longitude };
};

export default useLocation;
