function Persons({ persons }) {
  return (
    <>
      {persons.map((person) => {
        return <div key={person.id}>{person.name}</div>;
      })}
    </>
  );
}

export default Persons;
