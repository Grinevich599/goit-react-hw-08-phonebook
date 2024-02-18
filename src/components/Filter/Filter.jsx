import { useDispatch, useSelector } from 'react-redux';

import { selectFilter } from '../../redux/contacts.selector';
import { changeFilter } from '../../redux/filterSlice';

import css from './Filter.module.css';

const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const handleChangeFilter = evt => {
    const value = evt.target.value;
    dispatch(changeFilter(value));
  };

  return (
    <div className={css.filter}>
      <p>Find contacts by name</p>
      <input
        onChange={handleChangeFilter}
        value={filter}
        type="text"
        name="filter"
        className={css.filterInput}
      />
    </div>
  );
};

export { Filter };
