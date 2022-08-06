import { useState, useEffect } from 'react';
import { useTasks } from './useTasks';

const useSearch = () => {
  const [search, setSearch] = useState('');
  const [searchData, setSearchData] = useState(null);
  const { list, renderList, setRenderList } = useTasks();

  useEffect(() => {
    console.log('buscando: ', search);
    setSearchData(search);
  }, [search]);

  return { setSearch, search, searchData };
};
export default useSearch;
