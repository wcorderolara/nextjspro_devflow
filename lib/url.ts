import qs from "query-string";

interface IFormUrlQuery {
  params: string;
  key: string;
  value: string;
}

interface IRemoveKeysQuery {
  params: string;
  keysToRemove: string[];
}

/**
 * Update query parameters with a new value
 */
const formUrlQuery = ({ params, key, value }: IFormUrlQuery) => {
  const queryString = qs.parse(params);

  queryString[key] = value;

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: queryString,
  });
};

/**
 * Remove specific keys from query parameters
 */
const removeKeysFromQuery = ({ params, keysToRemove }: IRemoveKeysQuery) => {
  const queryString = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete queryString[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: queryString,
    },
    { skipNull: true }
  );
};

export { formUrlQuery, removeKeysFromQuery };
