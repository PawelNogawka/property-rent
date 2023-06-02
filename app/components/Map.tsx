import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import "./Map.scss";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface MapProps {
  // center?: L.LatLngExpression;
  center?: any,
  big?: boolean;
}

const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  const Map: React.FC<MapProps> = ({ center, big }) => {
    const mapHeight = big ? "430px" : "300px";
    const borderRadius = big ? "4px" : "0";
  
    return (
      <MapContainer
        center={center || [51, -0.09]}
        zoom={center ? 4 : 2}
        scrollWheelZoom={false}
        style={{ height: mapHeight, borderRadius: borderRadius }}
      >
        <TileLayer url={url} attribution={attribution} />
        {center && <Marker position={center} />}
      </MapContainer>
    );
  };
export default Map;
