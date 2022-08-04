import { useEffect, useState } from 'react';

const useFilter = (list) => {
  const [filterList, setFilterList] = useState(list);
  const [filters, setFilters] = useState({
    status: 'ALL',
    importance: 'ALL',
  });

  const handleFilter = (e) => {
    let { name, value } = e.currentTarget;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // const filterResults = (list) => {
  //   console.log(filterList);
  //   if (list) {
  //     if (filters.importance === 'ALL' && filters.status === 'ALL') {
  //       setFilterList(list);
  //     }
  //     if (filters.status === 'ALL') {
  //       setFilterList(
  //         list.filter((data) => data.importance === filters.importance)
  //       );
  //     }
  //     if (filters.importance === 'ALL') {
  //       setFilterList(list.filter((data) => data.status === filters.status));
  //     }
  //     setFilterList(
  //       list.filter(
  //         (data) =>
  //           data.status === filters.status &&
  //           data.importance === filters.importance
  //       )
  //     );
  //   }
  // };
  useEffect(() => {
    console.log(filterList);
    if (list) {
      if (filters.importance === 'ALL' && filters.status === 'ALL') {
        setFilterList(list);
      }
      if (filters.status === 'ALL') {
        setFilterList(
          list.filter((data) => data.importance === filters.importance)
        );
      }
      if (filters.importance === 'ALL') {
        setFilterList(list.filter((data) => data.status === filters.status));
      }
      setFilterList(
        list.filter(
          (data) =>
            data.status === filters.status &&
            data.importance === filters.importance
        )
      );
    }
  }, [filters]);

  return [filterList, handleFilter, filters, setFilters];
};

export default useFilter;
