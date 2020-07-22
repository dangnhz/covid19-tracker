import React from 'react';
import { Card, Typography, CardContent, Grid } from '@material-ui/core';
import numeral from 'numeral';
function InfoCard({ title, cases, total }) {
  return (
    <Card>
      <CardContent>
        {/* Title */}
        <Typography
          className='infoCard__title'
          variant='body1'
          color='textPrimary'
        >
          {title}
        </Typography>

        {/* 1.2M total */}

        <Typography className='infoCard__total' variant='h3'>
          {numeral(total).format('0,0')}
        </Typography>

        {/* +120k Number of case */}

        <Typography className='infoCard__cases'>
          {numeral(cases).format('+0a')}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoCard;
