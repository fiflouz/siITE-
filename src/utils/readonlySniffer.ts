// Petit proxy récursif qui bloque toute écriture et log la stack.
// Quand ça essaie d'écrire: console.error + debugger -> tu vois la ligne fautive.

export function guardDeep<T extends object>(obj: T, label = "obj"): T {
  const seen = new WeakMap<object, any>();

  const wrap = (value: any, path: string): any => {
    if (value === null || typeof value !== "object") return value;
    if (seen.has(value)) return seen.get(value);

    const proxy = new Proxy(value, {
      get(target, prop, receiver) {
        const v = Reflect.get(target, prop, receiver);
        return wrap(v, `${path}.${String(prop)}`);
      },
      set(_target, prop) {
        // Log + pause, tu lis la stack dans le devtools
        console.error(`🔴 Mutation détectée sur ${path}.${String(prop)}`);
        // eslint-disable-next-line no-debugger
        debugger;
        return false;
      },
      defineProperty(_t, prop) {
        console.error(`🔴 defineProperty sur ${path}.${String(prop)}`);
        // eslint-disable-next-line no-debugger
        debugger;
        return false;
      },
      deleteProperty(_t, prop) {
        console.error(`🔴 deleteProperty sur ${path}.${String(prop)}`);
        // eslint-disable-next-line no-debugger
        debugger;
        return false;
      },
    });

    seen.set(value, proxy);
    return proxy;
  };

  return wrap(obj, label);
}
