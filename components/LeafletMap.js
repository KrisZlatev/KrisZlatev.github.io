import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

export default function LeafletMap({ setLocation, setAddress, address }) {
  const [marker, setMarker] = useState([42.6977, 23.3219]); // София

  useEffect(() => {
    // Ако адресът се променя ръчно
    if (address) {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`)
        .then(res => res.json())
        .then(data => {
          if (data[0]) {
            const { lat, lon } = data[0];
            setMarker([lat, lon]);
            setLocation({ lat, lng: lon });
          }
        });
    }
  }, [address]);

  function MapClickHandler() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMarker([lat, lng]);
        setLocation({ lat, lng });

        // Взимаме адреса от координатите
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
          .then(res => res.json())
          .then(data => {
            if (data.display_name) {
              setAddress(data.display_name);
            }
          });
      },
    });
    return null;
  }

  return (
    <div style={{ height: '300px', marginBottom: '10px' }}>
      <MapContainer center={marker} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler />
        <Marker position={marker} />
      </MapContainer>
    </div>
  );
}
