import NoteForm from './components/NoteForm';
import Notes from './components/Notes';

const App = () => {
  const filterSelected = (value) => {
    console.log(value);
  };

  return (
    <>
      <NoteForm />
      <div>
        <input
          type='radio'
          name='filter'
          onChange={() => filterSelected('ALL')}
        />
        All
        <input
          type='radio'
          name='filter'
          onChange={() => filterSelected('IMPORTANT')}
        />
        Important
        <input
          type='radio'
          name='filter'
          onChange={() => filterSelected('NONIMPORTANT')}
        />
        Non-important
      </div>
      <Notes />
    </>
  );
};

export default App;
