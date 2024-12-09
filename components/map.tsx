"use client"

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

const containerStyle = {
  width: '100%',
  height: '800px'
};

const center = {
  lat: 58.5953,  
  lng: 25.0136
};

const GoogleMapComponent = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    
    if (window.google && window.google.maps) {
      setIsScriptLoaded(true);  
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY2}`;
      script.onload = () => setIsScriptLoaded(true); 
      document.head.appendChild(script);
    }
  }, []);

  if (!isScriptLoaded) {
    return <div>Kaart laaditakse...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}

      zoom={8}
      

    >
      <Marker position={center} />
    </GoogleMap>
  );
};

export default GoogleMapComponent;
