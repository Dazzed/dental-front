export function disambiguateInitialQueryParams (location) {
  const { query } = location;
  const result = {};
  for (const key in query) {
    if (key === 'distance' || key === 'specialties') {
      if (query[key] === 'any') {
        result[key] = null;
      } else {
        result[key] = query[key];
      }
    } else {
      result[key] = query[key];
    }
  }
  return result;
}
