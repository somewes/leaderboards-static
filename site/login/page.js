define(['jquery', 'Ractive', 'rv!login/template', 'jquery-cookie'],
function ($, Ractive, template) {
	var ractive = new Ractive({
		el: 'main',
		template: template
	});

	ractive.on('submit', function (event) {
		event.original.preventDefault();
		ractive.set('success', null);
		ractive.set('error', null);

		$.post('/leaderboards/api/login.json', {
			username: ractive.get('username'),
			password: ractive.get('password')
		}).done(function (user) {
			$.cookie('apikey', user.api_key);
			ractive.set('success', true);
		}).fail(function (response) {
			ractive.set('error', {status: response.status, message: response.responseText});
		});
	});
});
