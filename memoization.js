function memoize(fn) {
    const cache = new Map();
  
    function getCacheKey(args) {
      const seen = new WeakMap();
  
      function stableStringify(val) {
        if (val === null) return 'null';
        if (typeof val === 'undefined') return 'undefined';
        if (typeof val === 'function') return val.toString();
        if (typeof val !== 'object') return JSON.stringify(val);
  
        if (seen.has(val)) return `"[Circular]"`;
        seen.set(val, true);
  
        if (Array.isArray(val)) {
          return `[${val.map(stableStringify).join(',')}]`;
        }
  
        const keys = Object.keys(val).sort(); // consistent key order
        const objStr = keys.map(key => `"${key}":${stableStringify(val[key])}`).join(',');
        return `{${objStr}}`;
      }
  
      return args.map(stableStringify).join('|');
    }
  
    return function (...args) {
      const key = getCacheKey(args);
  
      if (cache.has(key)) {
        return cache.get(key);
      }
  
      const result = fn.apply(this, args);
      cache.set(key, result);
      return result;
    };
  }
  