"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

const customIcon = L.divIcon({
  className: "",
  html: `
    <div style="
      width: 40px; height: 40px;
      background: linear-gradient(135deg, #D4AF37, #b8941e);
      border: 3px solid white;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 4px 16px rgba(212,175,55,0.5);
    ">
      <div style="
        position: absolute; inset: 0;
        display: flex; align-items: center; justify-content: center;
        transform: rotate(45deg);
        font-size: 16px;
      ">✈️</div>
    </div>
    <div style="
      width: 8px; height: 8px;
      background: rgba(212,175,55,0.3);
      border-radius: 50%;
      margin: 4px auto 0;
    "></div>
  `,
  iconSize: [40, 52],
  iconAnchor: [20, 52],
  popupAnchor: [0, -56],
});

interface LeafletMapProps {
  lat?: number;
  lng?: number;
  zoom?: number;
}

export default function LeafletMap({ lat = 6.1375, lng = 1.2123, zoom = 14 }: LeafletMapProps) {

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "100%" }}
      className="rounded-2xl z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]} icon={customIcon}>
        <Popup>
          <div style={{ fontFamily: "sans-serif", minWidth: 160 }}>
            <strong style={{ color: "#0B1F3A", display: "block", marginBottom: 4 }}>EMJ-Consulting</strong>
            <span style={{ color: "#666", fontSize: 13 }}>Agence de voyage & visa</span>
            <br />
            <span style={{ color: "#666", fontSize: 13 }}>Lomé, Togo</span>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
