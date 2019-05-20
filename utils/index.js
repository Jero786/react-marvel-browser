const {fromJS} = require('immutable');
const crypto = require('crypto');

function timestamp() {
	return parseInt(Date.now() / 1000, 10);
}

exports.decorateUrlWithHash = (url) => {
	const ts = timestamp();
	const preHash = `${ts}${process.env.API_PRIVATE_KEY}${process.env.API_PUBLIC_KEY}`;
	const hash = crypto.createHash('md5').update(preHash).digest('hex');

	return `${url}?ts=${ts}&apikey=${process.env.API_PUBLIC_KEY}&hash=${hash}`;
};

exports.decorateUrlWithPagination = (url, offset) => {
	return `${url}&offset=${offset}`;
};

exports.getSafe = (obj, attr) => {
	if (obj && obj.get && obj.get(attr)) {
		return obj.get(attr)
	} else {
		return fromJS({});
	}
};
