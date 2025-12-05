import { Link, Routes, Route, useMatch } from 'react-router-dom';
import About from './About';
import AnecdoteList from './AnecdoteList';
import Anecdote from './Anecdote';
import CreateNew from './CreateNew';

const Menu = ({ addNew, anecdotes }) => {
  const padding = {
    paddingRight: 5
  };

  const match = useMatch('/anecdotes/:id');
  const anecdote = match
    ? anecdotes.find((a) => a.id === Number(match.params.id))
    : null;

  return (
    <div>
      <Link to='/' style={padding}>
        Anecdotes
      </Link>
      <Link to='/create_new' style={padding}>
        Create new
      </Link>
      <Link to='/about' style={padding}>
        About
      </Link>
      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route
          path='/anecdotes/:id'
          element={<Anecdote anecdote={anecdote} />}
        />
        <Route path='/create_new' element={<CreateNew addNew={addNew} />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  );
};

export default Menu;
