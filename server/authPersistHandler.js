const fetch = require('isomorphic-unfetch')


module.exports = async (req, res, next) => {

	if (!(/^\/_next\/-\/page/.test(req.originalUrl))) {
		next()
		return
	}

	if (req.cookies.access_token) {
		const jwt = await fetch(`${process.env.API_URL}/v1/token`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ token: req.cookies.access_token })
		}).then(response => response.json())
		.catch(e => {})

		if (jwt.error) {
			next()
			return
		}

		if (!req.auth) {
			req.auth = {}
		}

		req.auth.jwt = jwt
		console.log(jwt);
	}

	next()
}