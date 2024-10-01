import { useState, useEffect } from "react";

interface FetchOptions extends RequestInit {
  // You can specify other options if needed
}

const useFetch = (url: string, options?: FetchOptions) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    // Define an async function for fetching data
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  // Return an object containing data, loading state, and error state
  return { data, loading, error };
};

export default useFetch;
