const routes = {
	'home': { path: '/', page: 'home'},
	'client': { path: '/client', page: 'client'},
	'newkiosk': { path: '/kiosk', page: 'kiosk' },
	'kiosk': { path: '/kiosk/:id', page: 'kiosk' },
}

module.exports = () => routes