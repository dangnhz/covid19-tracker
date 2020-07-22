import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent } from '@material-ui/core';
import axios from 'axios';
import Header from './components/Header';
import InfoCardContainer from './components/InfoCardContainer';
import Table from './components/Table';
import LineChart from './components/LineChart';

import Map from './components/Map';
import './App.scss';
import 'leaflet/dist/leaflet.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryData, setCountryData] = useState({});
  const [tableData, setTableData] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState([0, 0]);
  const [mapZoom, setMapZoom] = useState(1);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState('cases');

  // fetch countries from API
  useEffect(() => {
    const getCountriesData = async () => {
      try {
        const countries = await axios
          .get('https://disease.sh/v3/covid-19/countries')
          .then((res) => res.data);
        setCountries(
          countries.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }))
        );
        setTableData(countries.sort((a, b) => b.cases - a.cases));
        setMapCountries(countries);
      } catch (err) {
        console.log(err);
      }
    };

    getCountriesData();
  }, []);

  // fetch data for selected country

  useEffect(() => {
    const url =
      country === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${country}`;

    axios(url)
      .then((res) => res.data)
      .then((data) => {
        setCountryData(data);
        // set long and lat of the map center
        if (country !== 'worldwide') {
          const { lat, long } = data.countryInfo;
          setMapCenter([lat, long]);
          setMapZoom(4);
        } else {
          setMapCenter([0, 0]);
          setMapZoom(1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [country]);

  const onCountryChange = async (countryCode) => {
    setCountry(countryCode);
  };

  return (
    <Container className='app'>
      <Header
        countries={countries}
        country={country}
        onCountryChange={onCountryChange}
      ></Header>
      <Grid container spacing={2}>
        <Grid item sm={12} md={8} className='app__left'>
          <InfoCardContainer
            setCasesType={setCasesType}
            casesType={casesType}
            countryData={countryData}
          />

          <Map
            countries={mapCountries}
            casesType={casesType}
            center={mapCenter}
            zoom={mapZoom}
          ></Map>
        </Grid>
        <Grid item sm={12} md={4} className='app__right'>
          <Card>
            <CardContent>
              <h3>Cases Info</h3>
              {/* table */}
              <Table countries={tableData} />
            </CardContent>
          </Card>
          <Card style={{ marginTop: '1rem' }}>
            <CardContent>
              {/* graph */}
              <h3 style={{ marginBottom: '1rem' }}>Worldwide New Cases</h3>
              <LineChart casesType={casesType} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
