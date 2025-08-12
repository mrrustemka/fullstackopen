import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Person from './components/Person';
import personsService from './services/persons';
import Notification from './components/Notification';

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filterText, setFilterText] = useState('');
  const [isNotify, setIsNotify] = useState(false);
  const [message, setMessage] = useState('');
  const [notifyClass, setNotifyClass] = useState('');

  useEffect(() => {
    personsService.getAll('http://localhost:3001/persons').then((response) => {
      setPersons(response);
    });
  }, []);

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterText.toLowerCase())
  );

  function onSubmit(event) {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newPhone,
      id: persons.length + 1
    };

    if (persons.some((person) => person.name === newName)) {
      if (
        window.confirm(
          `${personObject?.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const person = persons.find((p) => p.name === personObject.name);
        const changedPerson = { ...person, number: newPhone };

        personsService
          .update(person.id, changedPerson)
          .then((returnedNote) => {
            setPersons(
              persons.map((person) =>
                person.name === personObject.name ? returnedNote : person
              )
            );
          })
          .catch(() => {
            alert(`Error`);
            setPersons(persons.filter((n) => n.id !== personObject.id));
          });
        setNewName('');
        setNewPhone('');
        return;
      } else {
        console.log('Canceled');
      }
    } else {
      personsService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewPhone('');
        })
        .then(
          setTimeout(() => {
            setMessage(`${newName} was added`);
            setIsNotify(true);
            setNotifyClass('success');
          }, 500)
        );
    }
  }

  function handleNameChange(event) {
    setNewName(event.target.value);
  }

  function handlePhoneChange(event) {
    setNewPhone(event.target.value);
  }

  function handleFilterChange(event) {
    setFilterText(event.target.value);
  }

  function onDelete(id) {
    const personToDelete = persons.find((person) => person.id === id);
    console.log(personToDelete);

    if (window.confirm(`Delete ${personToDelete?.name}?`)) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch(() => {
          setTimeout(() => {
            setMessage(
              `${personToDelete?.name} was already deleted from the server.`
            );
            setIsNotify(true);
            setNotifyClass('error');
          }, 500);
        });
    } else {
      console.log('Canceled');
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {isNotify ? (
        <Notification message={message} className={notifyClass} />
      ) : (
        <></>
      )}
      <Filter onFilterChange={handleFilterChange} />
      <PersonForm
        onSubmit={onSubmit}
        name={newName}
        onNameChange={handleNameChange}
        phone={newPhone}
        onPhoneChange={handlePhoneChange}
      />
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <Person
          key={person.id}
          person={person}
          onDelete={() => onDelete(person.id)}
        />
      ))}
    </div>
  );
}

export default App;
