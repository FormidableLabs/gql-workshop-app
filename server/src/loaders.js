const DataLoader = require('dataloader');
const axios = require('./axios');

module.exports = function makeLoaders() {
  return {
    axios: new DataLoader(
      queries => {
        return Promise.all(
          queries.map(([url, config]) => {
            return axios.get(url, config);
          })
        );
      },
      { cacheKeyFn: obj => JSON.stringify(obj) }
    )

  }
};