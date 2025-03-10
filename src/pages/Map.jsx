import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";



const cityPosition = [41.30, 2.00]
 export default function Map() {
  return (
    <div>
      <h2>Map</h2>
      <MapContainer center={cityPosition} zoom={12} scrollWheelZoom={false} style={{ height: "500px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={cityPosition}>
          <Popup>
            Barcelona
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}


