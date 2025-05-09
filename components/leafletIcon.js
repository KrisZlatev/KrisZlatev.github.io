// components/leafletIcon.js
import L from 'leaflet';

const yellowIcon = new L.Icon({
  iconUrl: '/icons/marker-icon-yellow.png', // ✔️ public path
  shadowUrl: '/icons/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default yellowIcon;
