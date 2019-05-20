// Libs
const webpack = require('webpack');
const withSass = require('@zeit/next-sass');
const {parsed: localEnv} = require('dotenv').config();

// Resources
const getRoutes = require('./routes');

const config = {
	// some configuration
	assetPrefix: process.env.NODE_ENV === 'production' ? '/{reponame}' : '',
	// another configuration
	exportPathMap: getRoutes,

	// be able to get node environment in client/server side.
	webpack: (config) => {
		config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
		return config
	}
};

module.exports = withSass(config);
