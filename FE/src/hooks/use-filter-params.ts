// lib/hooks/use-filter-params.ts
import { useQueryStates, type UseQueryStatesKeysMap } from "nuqs";
import { createQueryParams, resetQueryParams } from "@/lib/searchparams";

interface UseFilterParamsOptions<T> {
  parsers: UseQueryStatesKeysMap;
  defaultFilters?: Partial<T>;
}

export function useFilterParams<T extends Record<string, any>>({
  parsers,
  defaultFilters = {},
}: UseFilterParamsOptions<T>) {
  const [params, setParams] = useQueryStates(parsers);

  const handleSubmit = (values: T) => {
    setParams({
      ...createQueryParams(values),
      page: 1,
    });
  };

  const handleReset = () => {
    setParams({
      ...resetQueryParams(defaultFilters),
      page: 1,
      perPage: 10,
    });
  };

  return { params, setParams, handleSubmit, handleReset };
}
