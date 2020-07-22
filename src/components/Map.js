import React from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import { Card } from '@material-ui/core';
import './Map.scss';

import numeral from 'numeral';
import { Circle, Popup } from 'react-leaflet';

import { casesTypeColors } from '../utils/';

// draw circle on the map
export const showDataOnMap = (countries, casesType = 'cases') =>
  countries.map((country, index) => (
    <Circle
      key={index}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[casesType].color}
      fillColor={casesTypeColors[casesType].color}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className='info-container'>
          <div className='info-flag'>
            <img src={country.countryInfo.flag} alt={country.country} />
          </div>
          <div className='info-name'> {country.country}</div>
          <div className='info-confirmed'>
            <span>Confirmed</span>
            <span>{numeral(country.cases).format('0,0')}</span>
          </div>

          <div className='info-recovered'>
            <span>Recovered</span>
            <span>{numeral(country.recovered).format('0,0')}</span>
          </div>
          <div className='info-deaths'>
            <span>Deaths</span>
            <span>{numeral(country.deaths).format('0,0')}</span>
          </div>
        </div>
      </Popup>
    </Circle>
  ));

const Map = ({ countries, casesType, center, zoom }) => {
  return (
    <Card className='app__map'>
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </Card>
  );
};

export default Map;
