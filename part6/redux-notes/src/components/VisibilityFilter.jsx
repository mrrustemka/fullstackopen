import { useDispatch } from 'react-redux';
import { filterChange } from '../reducers/filterReducer';

function VisibilityFilter() {
  const dispatch = useDispatch();

  return (
    <>
      <input
        type='radio'
        name='filter'
        onChange={() => dispatch(filterChange('ALL'))}
      />
      All
      <input
        type='radio'
        name='filter'
        onChange={() => dispatch(filterChange('IMPORTANT'))}
      />
      Important
      <input
        type='radio'
        name='filter'
        onChange={() => dispatch(filterChange('NONIMPORTANT'))}
      />
      Non-important
    </>
  );
}

export default VisibilityFilter;
