import { useEffect, useState } from 'react';

export const useFetch = (endpoint, path) => {
  const [data, setData] = useState();
  const { REACT_APP_API_URL } = process.env;

  const fetchTasks = async () => {
    await fetch(`${REACT_APP_API_URL}${endpoint}${path}`, {
      headers: {
        method: 'GET',
        contentType: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return [data];
};
