import { useEffect, useState } from 'react';
import Country from './components/Country';
import axios from 'axios';
import './App.css';
import CountryInfo from './components/CountryInfo';
import Weather from './components/Weather';

function useCountry(name) {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (!name) {
      setCountry(null);
      return;
    }

    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then((response) => {
        setCountry(response.data);
      })
      .catch((error) => {
        console.log(error);
        setCountry(null);
      });
  }, [name]);

  return country;
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [countryName, setCountryName] = useState('');
  const country = useCountry(countryName);

  function handlerChange(event) {
    setSearchTerm(event.target.value);
  }

  function onFind() {
    setCountryName(searchTerm);
  }

  return (
    <>
      <h1>Find countries</h1>
      <input type='text' value={searchTerm} onChange={handlerChange} />
      <button onClick={onFind}>Find</button>

      {countryName && !country && <p>No matches found</p>}

      {country && (
        <>
          <CountryInfo country={country} />
          <Weather city={country.capital[0]} />
        </>
      )}
    </>
  );
}

export default App;
