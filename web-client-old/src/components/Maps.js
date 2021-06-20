import React from "react"
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';

export function MapPointCase ({position}){
  
  return (
    <div className="map__container accordion__map" >
        <MapContainer center={position} zoom={2} zoomControl={false}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
          <Marker position = {position}>
            <Popup>Test</Popup>
          </Marker>
        </MapContainer>
    </div>
  )
}