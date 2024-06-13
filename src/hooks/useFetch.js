import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export const useFetch = (url, options = {}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const [statusCode, setStatusCode] = useState(null);

  options = {
    ...options,
    api: options && options.api,
    method: options.method || "get",
    headers: { id_canal: "test" },
  };

  const fetchData = useCallback(async () => {
    if (!options.preventInitialFetch) {
      setIsLoading(true);
      const { method } = options;

      try {
        const response = await axios.request({
          method,
          url,
          ...options,
          headers: { ...options.headers },
        });

        setData(response.data);
        setErrorMessage(undefined);
        setStatusCode(response.status);
        if (response.status === 204) setIsLoading(false);

        return true;
      } catch (error) {
        setErrorMessage(error);
        return false;
      }
    }
  }, [url, options]);

  useEffect(() => {
    if (data || errorMessage) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [data, errorMessage]);

  useEffect(() => {
    if (options.useInitialFetch || options.preventInitialFetch) {
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [url, options.useInitialFetch, options.preventInitialFetch, fetchData]);

  const makeRequest = useCallback(fetchData, [url, options]);

  return {
    data,
    setData,
    isLoading,
    errorMessage,
    makeRequest,
    statusCode,
  };
};
