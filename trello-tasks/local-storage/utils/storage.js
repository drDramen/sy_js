export function isQuotaExceededError(error) {
  return (
    error instanceof DOMException &&
    (error.code === 22 ||
      error.code === 1014 ||
      error.name === 'QuotaExceededError' ||
      error.name === 'NS_ERROR_DOM_QUOTA_REACHED')
  );
}

function isStorageSupported(type = 'localStorage') {
  let storage;
  try {
    storage = window[type];
    if (!storage) {
      return false;
    }
    const x = `__storage_test__`;
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (err) {
    return isQuotaExceededError(err) && storage.length > 0;
  }
}
