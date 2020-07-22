const DataLoader = require('dataloader');
const axios = require('./axios');

/**
 * Our caching API client. All requests to moviedb will be deduped
 * for the lifetime of this instance. Each request will get its own
 * instance.
 */
module.exports = function makeApiClient() {
  return new DataLoader(
    (queries) => {
      return Promise.all(
        queries.map(([url, config]) => {
          return axios.get(url, config);
        })
      );
    },
    { cacheKeyFn: (obj) => JSON.stringify(obj) }
  );
};
