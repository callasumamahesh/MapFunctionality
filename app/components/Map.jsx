import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

function LocationMarker({ location }) {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.setView([location.Latitude, location.Longitude], 15); // Set appropriate zoom level
    }
  }, [location, map]);

  return null;
}

function Map({ locations }) {
  let initialCenter = [17.824400, 79.187900];
  let initialZoom = 9;

  if (locations.length === 1) {
    initialCenter = [locations[0].Latitude, locations[0].Longitude];
    initialZoom = 16; // Set appropriate zoom level
  }

  return (
    <div>
      {/* {console.log(initialZoom)} */}
      <MapContainer center={initialCenter} zoom={initialZoom} style={{ height: "500px", width: "90%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {Array.isArray(locations) && locations.map((location, index) => (
          <CircleMarker 
            key={index} 
            center={[location.Latitude, location.Longitude]} 
            radius={10} 
            fillColor="blue" 
            color="blue" 
            opacity={1}
          >
            <Popup>
              <h2>Name: {location.name}</h2>
              <p>Roll Number: {location.rollnumber}</p>
              <p>Branch: {location.Branch}</p>
            </Popup>
          </CircleMarker>
        ))}
        {locations.length === 1 && <LocationMarker location={locations[0]} />}
      </MapContainer>
    </div>
  );
}

export default Map;
