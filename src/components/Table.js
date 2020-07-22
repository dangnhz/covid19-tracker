import React from 'react';
import numeral from 'numeral';
const Table = ({ countries }) => {
  return (
    <div className='app__table'>
      <table>
        <tbody>
          {countries.map(({ country, cases, countryInfo: { flag } }) => (
            <tr key={country}>
              <td className='app__table-country'>
                <img
                  className='app__table-country-flag'
                  src={flag}
                  alt={country.country}
                />
                <span>{country}</span>
              </td>
              <td className='app__table-cases-number'>
                {numeral(cases).format('0,0')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
