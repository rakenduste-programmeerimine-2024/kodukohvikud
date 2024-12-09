"use client";

import { GoogleMap, LoadScript, Marker,InfoWindow } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

const containerStyle = {
  width: '100%',
  height: '800px'
};

const center = {
  lat: 58.5953,  
  lng: 25.0136
};

const GoogleMapComponent = () => {
  const [cafes, setCafes] = useState<any[]>([]);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [selectedCafe, setSelectedCafe] = useState<any | null>(null); 

  useEffect(() => {
    
    const fetchCafes = async () => {
      const { data, error } = await supabase
        .from('cafes')
        .select('id, nimi, aadress, avamis_kuupäev, sulgemis_kuupäev, latitude, longitude,kirjeldus');
    
      if (error) {
        console.error('Error fetching cafes:', error);
      } else {
        console.log(data);
        setCafes(data || []);
      }
    };

    fetchCafes();

   
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

  const handleMarkerClick = (cafe: any) => {
    setSelectedCafe(cafe); 
  };
  return (
    
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={8}
    >
      {cafes.map((cafe) => (
        cafe.latitude && cafe.longitude ? (
          <Marker 
            key={cafe.id}
            position={{ lat: cafe.latitude, lng: cafe.longitude }}
            title={cafe.nimi} 
            onClick={()=> handleMarkerClick(cafe)}
          />
        ) : null
      ))}
      {selectedCafe && (
        <InfoWindow
          position={{ lat: selectedCafe.latitude, lng: selectedCafe.longitude }}
          onCloseClick={() => setSelectedCafe(null)} 
        >
          <div>
            <h3>{selectedCafe.nimi}</h3>
            <p>{selectedCafe.aadress}</p>
            <p><strong>Avamis kuupäev:</strong> {selectedCafe.avamis_kuupäev}</p>
            <p><strong>Sulgemis kuupäev:</strong> {selectedCafe.sulgemis_kuupäev}</p>
            <p><strong>kirjeldus:</strong>{selectedCafe.kirjeldus}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default GoogleMapComponent;
