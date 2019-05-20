const marvelAPI = require('./marvel-api/marvel-api');

/**
 * Initialize all api services.
 *
 * @param server
 */
module.exports = (server) => {
	marvelAPI(server);
};
