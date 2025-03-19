if (typeof window === 'undefined' && !global.crypto) {
  global.crypto = {};
}

if (typeof window === 'undefined' && !global.crypto.getRandomValues) {
  global.crypto.getRandomValues = array => {
    return require('crypto').randomFillSync(array);
  };
}
