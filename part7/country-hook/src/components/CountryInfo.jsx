function CountryInfo({ country }) {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>
        <strong>Capital:</strong> {country.capital?.join(', ') || 'N/A'}
      </p>
      <p>
        <strong>Area:</strong> {country.area} km²
      </p>

      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
    </div>
  );
}

export default CountryInfo;
