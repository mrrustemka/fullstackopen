import { useState } from 'react';

function NoteForm({ createNote }) {
  const [newNote, setNewNote] = useState('');

  const addNote = (event) => {
    event.preventDefault();
    createNote({
      content: newNote,
      important: true
    });

    setNewNote('');
  };
  return (
    <>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <label>
          Enter note
          <input
            value={newNote}
            onChange={(event) => setNewNote(event.target.value)}
            placeholder='Write note content here'
          />
        </label>
        <button type='submit'>Save</button>
      </form>
    </>
  );
}

export default NoteForm;
