import { useEffect, useState } from 'react';
import Country from './components/Country';
import axios from 'axios';
import './App.css';
import CountryInfo from './components/CountryInfo';
import Weather from './components/Weather';

function App() {
  const [countries, setCountries] = useState([]);
  const [countriesAll, setCountriesAll] = useState([]);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        setCountriesAll(response.data);
      });
  }, []);

  function handlerChange(event) {
    const value = event.target.value;
    setCountries(
      countriesAll.filter((country) =>
        country.name.common.toLowerCase().includes(value.toLowerCase())
      )
    );
  }

  function handlerClick(id) {
    const country = countries.find((country) => country.cca3 === id);
    setCountries([country]);
  }

  return (
    <>
      <h1>Find countries</h1>
      <input type='text' onChange={handlerChange} />

      {countries.length === 0 && <p>No matches found</p>}

      {countries.length > 10 && (
        <h2>Too many matches, specify another filter</h2>
      )}

      {countries.length <= 10 && countries.length > 1 && (
        <Country countries={countries} func={handlerClick} />
      )}

      {countries.length === 1 && (
        <>
          <CountryInfo country={countries[0]} />
          <Weather city={countries[0].capital[0]} />
        </>
      )}
    </>
  );
}

export default App;
