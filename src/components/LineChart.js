import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';
import axios from 'axios';

import { casesTypeColors } from '../utils/';

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: 'index',
    intersect: false,
    callbacks: {
      label: (tooltipItem, data) => {
        return numeral(tooltipItem.value).format('+0,0');
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: 'time',
        time: {
          format: 'MM/DD/YY',
          tooltipFormat: 'll',
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: (value, index, values) => {
            return numeral(value).format('0a');
          },
        },
      },
    ],
  },
};

const LineChart = ({ casesType }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get('https://disease.sh/v3/covid-19/historical/all?lastdays=60')
      .then((res) => res.data)
      .then((data) => {
        setData(buildChartData(data, casesType));
      });
  }, [casesType]);

  const buildChartData = (data, casesType) => {
    const chartData = [];
    let lastDataPoint;

    // loop through cases object keys

    Object.keys(data[casesType]).forEach((date) => {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };

        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    });

    return chartData;
  };
  return (
    <div className='app__lineChart'>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                label: '# of Cases',
                data: data,
                backgroundColor: casesTypeColors[casesType].halfOpacity,
                borderColor: casesTypeColors[casesType].color,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
};

export default LineChart;
