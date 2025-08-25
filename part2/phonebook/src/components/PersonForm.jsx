import { useState } from 'react';

function PersonForm({ onSubmit, name, onNameChange, phone, onPhoneChange }) {
  const [error, setError] = useState('');

  const validatePhone = (phone) => {
    const regex = /^(\d{2,3})-(\d+)$/;
    if (!regex.test(phone)) return false;

    return phone.length >= 8;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePhone(phone)) {
      setError(
        'Phone must be in format XX-XXXXXXX or XXX-XXXXXXXX, total length ≥ 8'
      );
      return;
    }

    setError('');
    onSubmit(e);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={name} onChange={onNameChange} />
          phone: <input value={phone} onChange={onPhoneChange} />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </>
  );
}

export default PersonForm;
