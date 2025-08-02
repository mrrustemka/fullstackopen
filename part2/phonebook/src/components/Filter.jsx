function Filter({ filter, onFilterChange }) {
  return (
    <>
      Filter shown with <input value={filter} onChange={onFilterChange} />
    </>
  );
}

export default Filter;
