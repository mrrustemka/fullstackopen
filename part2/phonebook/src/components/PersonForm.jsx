function PersonForm({ onSubmit, name, onNameChange, phone, onPhoneChange }) {
  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={name} onChange={onNameChange} />
          phone: <input value={phone} onChange={onPhoneChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </>
  );
}

export default PersonForm;
