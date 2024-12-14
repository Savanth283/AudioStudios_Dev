export const fetchLocation = () => {
    if (navigator.permissions) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then((result) => {
          if (result.state === 'granted') {
            getCurrentPosition();
          } else if (result.state === 'prompt') {
            requestPermission();
          } else {
            handlePermissionDenied();
          }
        })
        .catch((error) => {
          console.error('Error getting location permission:', error);
        });
    } else {
      handlePermissionDenied();
    }
  };

  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  };

  const requestPermission = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  };

  const handlePermissionDenied = () => {
    console.error('Geolocation permission denied or not supported by this browser.');
  };