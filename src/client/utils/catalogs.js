export const getCatalogNameById = (catalog, id) => {
  let result = '';
  for (let i = 0; i < catalog.length; i += 1) {
    if (catalog[i].id === id) {
      result = catalog[i].name;
      break;
    }
  }
  return result;
};
