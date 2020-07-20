const axios = require('axios');
const camelcaseRecursive = require('camelcase-keys-recursive');
const omit = require('lodash/omit');

/**
 * Axios is an XHR client that offers some niceties over fetch. We're using is here to
 * added some logging to make it explicit what requests are being made.
 */
const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: 'fa60ffe249c919e7f6c528a4aba8674a',
    include_adult: false,
    include_video: false,
  },

  /**
   * The response from the movieDB is snakecased and we'd prefer camelcase as it plays
   * better with GraphQL's auto resolution of object properties.
   */
  transformResponse: (data) => camelcaseRecursive(JSON.parse(data)),
});

/**
 * Some explicit and colourful logging for each request.
 */
instance.interceptors.request.use(function(config) {
  console.log(
    '\x1b[32m',
    config.method.toUpperCase(),
    config.url,
    '\x1b[33m \n',
    omit(config.params, ['api_key', 'include_adult', 'include_video']),
    '\x1b[0m \n'
  );
  return config;
});

instance.interceptors.response.use(function(res) {
  // console.log(res.data);
  return res;
});

module.exports = instance;
