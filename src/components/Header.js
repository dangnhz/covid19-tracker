import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core';
const Header = ({ countries, country, onCountryChange }) => {
  return (
    <Grid
      className='app__header'
      container
      justify='space-between'
      style={{ marginTop: '2rem' }}
    >
      <Grid item>
        <Typography variant='h4' className='app__logo'>
          Covid-19 Tracker
        </Typography>
      </Grid>
      <Grid item>
        <FormControl className='app__dropdown'>
          <Select
            variant='outlined'
            value={country}
            onChange={(e) => onCountryChange(e.target.value)}
          >
            <MenuItem value='worldwide'>Worldwide</MenuItem>
            {countries.map((country, index) => (
              <MenuItem value={country.value} key={index}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Header;
