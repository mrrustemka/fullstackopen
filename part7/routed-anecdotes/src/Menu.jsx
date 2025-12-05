import { Link, Routes, Route } from 'react-router-dom';
import About from './About';
import AnecdoteList from './AnecdoteList';
import CreateNew from './CreateNew';

const Menu = ({ addNew, anecdotes }) => {
  const padding = {
    paddingRight: 5
  };

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
        <Route path='/create_new' element={<CreateNew addNew={addNew} />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  );
};

export default Menu;
