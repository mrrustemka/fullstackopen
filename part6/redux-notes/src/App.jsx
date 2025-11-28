import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import NoteForm from './components/NoteForm';
import Notes from './components/Notes';
import VisibilityFilter from './components/VisibilityFilter';
import { initializeNotes } from './reducers/noteReducer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeNotes());
  }, [dispatch]);
  return (
    <>
      <NoteForm />
      <VisibilityFilter />
      <Notes />
    </>
  );
};

export default App;
