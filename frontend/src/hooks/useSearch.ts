import { useState, useEffect } from "react";

type FilterFn<T> = (item: T, searchTerm: string) => boolean;

function useSearch<T>(
  data: T[],
  searchTerm: string,
  filterFn: FilterFn<T>
): T[] {
  const [filteredData, setFilteredData] = useState<T[]>([]);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredData(data);
    } else {
      const results = data.filter((item) => filterFn(item, searchTerm));
      setFilteredData(results);
    }
  }, [data, searchTerm, filterFn]);

  return filteredData;
}

export default useSearch;
