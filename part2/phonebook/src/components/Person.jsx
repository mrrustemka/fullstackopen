function Person({ person, onDelete }) {
  return (
    <>
      <div key={person.id}>
        {person.name} <button onClick={onDelete}>Delete</button>
      </div>
    </>
  );
}

export default Person;
