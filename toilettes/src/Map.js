import React from 'react';
import { Map, CircleMarker, Popup, TileLayer } from 'react-leaflet';

const position = [44.8398818, -0.59075];

const colors = {
  Urinoir: 'orange',
  'Sanitaire automatique': 'green',
  'Chalet de nécessité': 'red',
};

export default function({ data }) {
  const markers = data.map(({ lat, lon, address, typology }, i) => (
    <CircleMarker center={[lat, lon]} key={i} color={colors[typology]}>
      <Popup>
        <div>{typology}</div>
        <div>{address}</div>
      </Popup>
    </CircleMarker>
  ));

  return (
    <Map id='map' center={position} zoom={13}>
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers}
    </Map>
  );
}
