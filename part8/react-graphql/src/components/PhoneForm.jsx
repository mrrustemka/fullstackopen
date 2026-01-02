import { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { EDIT_NUMBER } from '../queries';

function PhoneFrom({ setError }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [changeNumber] = useMutation(EDIT_NUMBER, {
    onCompleted: (data) => {
      if (!data.editNumber) {
        setError('Person not found');
      }
    }
  });

  const submit = (e) => {
    e.preventDefault();

    changeNumber({ variables: { name, phone } });

    setName('');
    setPhone('');
  };

  return (
    <>
      <h2>Change Phone</h2>
      <form onSubmit={submit}>
        <div>
          Name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          Phone
          <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <button type='submit'>Save</button>
      </form>
    </>
  );
}

export default PhoneFrom;
