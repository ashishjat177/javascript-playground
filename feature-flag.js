const SAMPLE_FEATURES = {
    show_dialog_box: true,
    enable_new_pricing: true,
  };
  
  // returns the state of *all* features for the current user
  function fetchAllFeatures() {
    // mocking the fetch API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(SAMPLE_FEATURES), 100);
    });
  }

  function cacheData() {
    const cache = {};
    let cache_ttl = 0;
    const MAX_CACHE_TTL = 10000;
    return {
        get: (featureName) => {
            if(new Date() - cache_ttl < MAX_CACHE_TTL && cache[featureName]) {
                return cache[featureName]
            }
        },
        has: (featureName) => {
            if(Object.prototype.hasOwnProperty.call(cache, featureName)) {
                return true
            } 
            return false;
        },
        set: (featureName, value) => {
            cache[featureName] = value;
            cache_ttl = new Date();
        }
    }
  }


function getFeatureState(featureName, defaultValue) {
    if(cacheData.has(featureName)) {
       return cacheData.get(featureName);
    }
    return fetchAllFeatures().then((flags) => {
        if(Object.prototype.hasOwnProperty.call(flags, featureName)) {
            return flags[featureName]
        } else {
            return defaultValue;
        }
    }).catch ((err) => {
        return defaultValue;
    })
  }
  


  getFeatureState("show-pricing-v2")
  .then(function(isEnabled) {
    if (isEnabled) {
      console.log('show-pricing-v2 is enabled')
    } else {
        console.log('show-pricing-v2 is disabled')
    }
});