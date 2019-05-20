// Libs
const cheerio = require('cheerio');
const axios = require('axios');

// APIs
const isProduction = process.env.node_ENV === 'production';

module.exports = (server) => {

	server.get('/marvel-api', async (req, res) => {
		const url = req.query.url;
		return axios(url).then(function (parsedBody) {

			const $ = cheerio.load(parsedBody.data);
			const biography = $('.content-block__body').find('.text').text();
			const responseData = JSON.stringify({biography});

			printLog(responseData, url);
			res.send(responseData);

		}).catch(function (err) {

			printErrorLog(err, '/marvel-api');
			res.status(500);
			res.render('error', {error: err})
		});
	});
};

function printErrorLog(err, url) {
	console.error(`
			*****************************************
			* API - ERROR
			*****************************************
			- Message: [${err}]
			- Url: [${url}]
			******************************************
			`);
}

function printLog(message, url) {
	if (!isProduction) {
		console.error(`
			*****************************************
			* API - DEBUGGING 
			*****************************************
			- Message: [${message}]
			- Url: [${url}]
			******************************************
			`);
	}
}
