function Country({ countries, func }) {
  return (
    <div>
      <ul>
        {countries.map((country) => (
          <div key={country.cca3}>
            <li>
              {country.name.official + ' '}
              <button onClick={() => func(country.cca3)}>Show</button>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Country;
