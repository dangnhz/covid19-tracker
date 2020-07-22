import React from 'react';
import InfoCard from './InfoCard';
import { Grid } from '@material-ui/core';
const InfoCardContainer = ({ countryData, setCasesType, casesType }) => {
  return (
    <Grid container justify='space-between' spacing={2}>
      <Grid
        className={`infoCard__confirmed infoCard ${
          casesType === 'cases' ? 'active' : ''
        }`}
        item
        xs={12}
        sm={4}
        md={4}
        onClick={() => setCasesType('cases')}
      >
        <InfoCard
          title='Confirmed'
          cases={countryData.todayCases}
          total={countryData.cases}
        ></InfoCard>
      </Grid>
      <Grid
        item
        xs={12}
        sm={4}
        md={4}
        className={`infoCard__recovered infoCard ${
          casesType === 'recovered' ? 'active' : ''
        }`}
        onClick={() => setCasesType('recovered')}
      >
        <InfoCard
          title='Recovered'
          cases={countryData.todayRecovered}
          total={countryData.recovered}
        ></InfoCard>
      </Grid>
      <Grid
        className={`infoCard__deaths infoCard ${
          casesType === 'deaths' ? 'active' : ''
        }`}
        item
        xs={12}
        sm={4}
        md={4}
        onClick={() => setCasesType('deaths')}
      >
        <InfoCard
          title='Deaths'
          cases={countryData.todayDeaths}
          total={countryData.deaths}
        ></InfoCard>
      </Grid>
    </Grid>
  );
};

export default InfoCardContainer;
