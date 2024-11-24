"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


interface LatLngLiteral {
  lat: number;
  lng: number;
}

const center: LatLngLiteral = { lat: 58.5953, lng: 25.0136 }; 


const MapContent = () => {
  const map = useMap(); 
  const customIcon = new L.Icon({
    iconUrl: "/icons/marker.png", 
    iconSize: [32, 32], 
    iconAnchor: [16, 32], 
    popupAnchor: [0, -32], 
  });

  useEffect(() => {
    if (map) {
      map.invalidateSize(); 
    }
  }, [map]);

  return (
    <>
      <Marker position={center} icon={customIcon}>
        <Popup>Tere tulemast Eestisse!</Popup>
      </Marker>
    </>
  );
};

export default function Map() {
  const key = JSON.stringify(center); // Key muutub, kui "center" muutub
  return (
    <MapContainer
      key={key} 
      center={center}
      zoom={7}
      style={{ width: "100%", height: "80vh" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapContent />
    </MapContainer>
  );
}

