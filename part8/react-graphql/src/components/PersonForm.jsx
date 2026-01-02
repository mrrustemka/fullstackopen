import { useState } from 'react';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';

const CREATE_PERSON = gql`
  mutation createPerson(
    $name: String!
    $street: String!
    $city: String!
    $phone: String!
  ) {
    addPerson(name: $name, street: $street, city: $city, phone: $phone) {
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`;

function PersonForm() {
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');

  const [createPerson] = useMutation(CREATE_PERSON);

  const submit = (event) => {
    event.preventDefault();

    createPerson({ variables: { name, street, city, phone } });

    setName('');
    setStreet('');
    setCity('');
    setPhone('');
  };

  return (
    <>
      <h2>Create New</h2>
      <form onSubmit={submit}>
        <div>
          Name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          Street
          <input
            value={street}
            onChange={({ target }) => setStreet(target.value)}
          />
        </div>
        <div>
          City
          <input
            value={city}
            onChange={({ target }) => setCity(target.value)}
          />
        </div>
        <div>
          Phone
          <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <button type='submit'>Add</button>
      </form>
    </>
  );
}

export default PersonForm;
