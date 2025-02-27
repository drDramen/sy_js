export const store = (target) => {
  const observers = new Map();

  return new Proxy(target, {
    get: (target, property) =>
      property === 'subscribe'
        ? (key, observer) => {
            const observersByKey = observers.get(key) || new Map();

            if (!observersByKey.has(observer)) {
              observers.set(key, observersByKey.set(observer, observer));
            }

            return () => observersByKey.delete(observer);
          }
        : target[property],
    set: (target, property, value) => {
      target[property] = value;
      const observersByKey = observers.get(property);

      observersByKey?.forEach((observer) => observer(value));
      return true;
    },
    deleteProperty: (target, property) => {
      delete target[property];
      observers.delete(property);
      return true;
    },
  });
};
