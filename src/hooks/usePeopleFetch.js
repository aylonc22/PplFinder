import { useState, useEffect } from "react";
import axios from "axios";
//axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export const usePeopleFetch = (page) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const USERS_URL = "https://randomuser.me/api/?results=25&page=1";

  useEffect(() => {
    let cancel;
    setError(false);
    setIsLoading(true);
    axios({
      method: "GET",
      url: USERS_URL,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setUsers((users) => [...users, ...res.data.results]);
        setIsLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [page]);

  return { users, isLoading, error };
};
