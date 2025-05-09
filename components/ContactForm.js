'use client';

import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import yellowIcon from './leafletIcon';
import Link from 'next/link';

function LocationMarker({ setLatLng, setAddress }) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setLatLng(e.latlng);

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        );
        const data = await response.json();
        setAddress(data.display_name || `Lat: ${lat}, Lng: ${lng}`);
      } catch (error) {
        console.error('Error with reverse geocoding:', error);
        setAddress(`Lat: ${lat}, Lng: ${lng}`);
      }
    },
  });

  return null;
}

export default function ContactForm() {
  const [address, setAddress] = useState('');
  const [latLng, setLatLng] = useState(null);
  const [message, setMessage] = useState('');
  const [alert, setAlert] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
  });

  const services = [
    'Мини багер под наем',
    'Изкопи за основи',
    'Нивелация на терени',
    'Премахване на отпадъци',
    'Изкопи за канали и тръбопроводи',
  ];

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^0\d{9}$|^\+395\d{9}$/.test(phone);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      alert('Моля, въведете валиден имейл адрес.');
      return;
    }

    if (!validatePhone(formData.phone)) {
      alert('Телефонният номер трябва да започва с 0 и да е 10 цифри или с +395 и още 9 цифри.');
      return;
    }

    console.log('Form submitted:', { formData, address, message, latLng });

    setAlert('Изпратено успешно!');
    setTimeout(() => setAlert(''), 4000);

    setFormData({ name: '', email: '', phone: '', service: '' });
    setAddress('');
    setLatLng(null);
    setMessage('');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Back button */}
      <div style={{ marginBottom: '1rem' }}>
        <Link href="/">
          <button
            style={{
              backgroundColor: '#444',
              color: '#fff',
              padding: '8px 16px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            ⬅ Обратно към началната страница
          </button>
        </Link>
      </div>

      <h2 style={{ textAlign: 'center', color: '#eee' }}>Свържете се с нас</h2>

      {alert && (
        <div
          style={{
            backgroundColor: '#4BB543',
            color: '#fff',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '1rem',
            textAlign: 'center',
          }}
        >
          {alert}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="name">Име</label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="email">Имейл</label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="phone">Телефон</label>
          <input
            type="tel"
            id="phone"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="service">Изберете услуга</label>
          <select
            id="service"
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            style={inputStyle}
            required
          >
            <option value="">-- Изберете услуга --</option>
            {services.map((service, idx) => (
              <option key={idx} value={service}>{service}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="address">Адрес (Кликнете на картата)</label>
          <input
            type="text"
            id="address"
            value={address}
            readOnly
            style={inputStyle}
          />
        </div>

        <MapContainer
          center={[42.6977, 23.3219]}
          zoom={13}
          style={{ width: '100%', height: '400px', borderRadius: '8px' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationMarker setLatLng={setLatLng} setAddress={setAddress} />
          {latLng && (
            <Marker position={latLng} icon={yellowIcon}>
              <Popup>Избрана локация: {latLng.lat}, {latLng.lng}</Popup>
            </Marker>
          )}
        </MapContainer>

        <div>
          <label htmlFor="message">Съобщение</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ ...inputStyle, minHeight: '100px' }}
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#FFD700',
            color: '#000',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
            marginTop: '1rem',
          }}
        >
          Изпратете
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '5px',
  backgroundColor: '#333',
  color: '#fff',
  border: '1px solid #444',
};
