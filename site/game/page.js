define(['Ractive', 'rv!./template', 'data/games/sm64'], function (Ractive, template, game) {
	var ractive = new Ractive({
		el: 'main',
		template: template,
		data: {
			game: game
		}
	});

	ractive.on('change-filter', function (event, filter) {
		console.log('filter: ' + filter);
	});
});
