// Libs
const express = require('express');
const next = require('next');
const {parse} = require('url');
const bodyParser = require('body-parser');

// Resources
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();
const apiServices = require('./api');

// Routes
const getRoutes = require('./routes');

const routes = getRoutes();

app.prepare()

	.then(() => {
		// initialize express for custom rest api call
		// and custom routes if needed
		const server = express();

		// middleware to read body content
		server.use(bodyParser.json());
		server.use(bodyParser.urlencoded({extended: true}));

		// initialize register APIs
		apiServices(server);

		server.get('*', (req, res) => {
			const parsedUrl = parse(req.url, true);
			const {pathname, query = {}} = parsedUrl;
			const route = routes[pathname];

			if (route) {
				return app.render(req, res, route.page, query);
			}
			return handle(req, res);
		});

		server.listen(port, (err) => {
			if (err) throw err;
		})
	});

module.exports = app;
