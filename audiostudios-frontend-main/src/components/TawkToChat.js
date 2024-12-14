"use client"
import { useEffect } from 'react';

const TawkToChat = () => {
  useEffect(() => {
    // Create a script element
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://embed.tawk.to/651fea8eeb150b3fb99eb50c/1hc2aogd9';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    // Append the script to the DOM
    document.head.appendChild(script);

    // Clean up the script element when the component unmounts
    return () => {
      if (document.head.contains(script)) {
      document.head.removeChild(script);
      }
    };
  }, []);

  return null; // Since this component only handles script loading, it doesn't render any content
};

export default TawkToChat;
