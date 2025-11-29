import { useDispatch } from 'react-redux';
import { filterChange } from '../reducers/filterReducer';

function Filter() {
  const dispatch = useDispatch();

  function handleChange(event) {
    dispatch(filterChange(event.target.value));
  }

  const style = {
    marginBottom: 10
  };

  return (
    <div style={style}>
      Filter <input onChange={handleChange} />
    </div>
  );
}

export default Filter;
