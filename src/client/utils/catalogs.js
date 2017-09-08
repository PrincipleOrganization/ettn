export const getCatalogNameById = (catalog, id) => {
  if (!id) {
    return '';
  }
  
  let result = id;
  for (let i = 0; i < catalog.length; i += 1) {
    if (catalog[i].id === id) {
      result = catalog[i].name;
      break;
    }
  }
  return result;
};

export const getCatalogValueById = (catalog, id) => {
  if (!id) {
    return {};
  }
  
  let result = {};
  for (let i = 0; i < catalog.length; i += 1) {
    if (catalog[i].id === id) {
      result = catalog[i];
      break;
    }
  }
  return result;
};
