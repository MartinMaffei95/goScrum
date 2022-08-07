import { useEffect, useState } from 'react';

const useFilter = (list) => {
  //Obtiene una lista de tareas sin filtrar y retorna una lista filtrada.
  const [filterList, setFilterList] = useState();
  const [filters, setFilters] = useState({
    status: 'ALL',
    importance: 'ALL',
  });

  const handleFilter = (e) => {
    //funcion handle para setear los parametros del filter
    let { name, value } = e.currentTarget;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const filterResults = (list) => {
    if (list) {
      if (filters.importance === 'ALL' && filters.status === 'ALL') {
        return setFilterList(list);
      }
      if (filters.status === 'ALL') {
        return setFilterList(
          list.filter((data) => data.importance === filters.importance)
        );
      }
      if (filters.importance === 'ALL') {
        return setFilterList(
          list.filter((data) => data.status === filters.status)
        );
      }
      setFilterList(
        list.filter(
          (data) =>
            data.status === filters.status &&
            data.importance === filters.importance
        )
      );
    }
  };

  useEffect(() => {
    filterResults(list);
  }, [filters]);

  return { filterList, handleFilter, filters, setFilters };
};

export default useFilter;
