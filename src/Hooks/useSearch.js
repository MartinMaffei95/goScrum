import { List } from '@mui/material';
import { useState, useEffect } from 'react';
import { useTasks } from './useTasks';

const useSearch = (list) => {
  const [search, setSearch] = useState('');
  const [searchData, setSearchData] = useState(null);

  const handleSearch = (e) => {
    setSearch(e.currentTarget.value);
  };

  const searchTask = () => {
    if (list)
      return setSearchData(
        list.filter(
          (data) =>
            data.title.includes(search) || data.description.includes(search)
        )
      );
  };

  useEffect(() => {
    searchTask();
  }, [search]);

  return { setSearch, search, searchData, handleSearch };
};
export default useSearch;
