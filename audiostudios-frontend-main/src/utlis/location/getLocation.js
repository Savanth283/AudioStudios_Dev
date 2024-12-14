

export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    // Check if Geolocation is supported by the browser
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location:", error.message);
          reject(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser");
      reject("Geolocation not supported");
    }
  });
}