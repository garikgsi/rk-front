// add value to localStorage by key
const storageAdd = (key, value) => {
  return (localStorage[key] = JSON.stringify(value));
};

// return true if key exists in localStorage
const storageHas = (key) => {
  return localStorage[key] !== undefined;
};

// remove from localStorage by key
const storageRemove = (key) => {
  if (storageHas(key)) localStorage.removeItem(key);
};

// get value from localStorage identified by key
const storageGet = (key) => {
  return storageHas(key) ? JSON.parse(localStorage[key]) : undefined;
};

export { storageAdd, storageHas, storageRemove, storageGet };
