define(['jquery', 'lodash', 'util/parseTime', 'Ractive', 'rv!./template', 'game', 'platforms', 'components/tagvalueselect'], function ($, _, parseTime, Ractive, template, game, platforms) {

	var tags = _.clone(game.tags, true);

	var data = {
		_: _,
		game: game,
		platforms: _.filter(platforms, function (p) { return _.contains(game.platforms, p.id); }),
		// Selected values for submission
		timedtags: _.where(tags, {timed: true}),
		untimedtags: _.where(tags, {untimed: true}),
		time: null,
		platform: null
	};

	data.formatTime = function (time) {
		var hours = Math.floor(time / 1000 / 60 / 60);
		var minutes = Math.floor(time / 1000 / 60) % 60;
		var seconds = Math.floor(time / 1000) % 60;
		var milliseconds = time % 1000;

		return hours + 'h ' + minutes + 'm ' + seconds + 's ' + milliseconds + 'ms';
	};

	var ractive = new Ractive({
		el: 'main',
		template: template,
		debug: true,
		data: data
	});

	ractive.observe('timeinput', function (timeinput) {
		ractive.set('time', parseTime(timeinput));
	});

	ractive.on('submit', function (event) {
		event.original.preventDefault();

		ractive.set('info', 'Submitting...');

		var tagvalues = _.pluck(ractive.get('timedtags'), 'selection');

		$.post('/leaderboards/api/speedrun/', {
			user: 2,
			platform: 1,
			game: game.id,
			time: ractive.get('time'),
			video: ractive.get('video'),
			comments: ractive.get('comments'),
			tags: tagvalues,
			username: 'speedrunner',
			api_key: '339960db427cbccc9589509a8c3f313f30f3b265'
		}).done(function (response) {
			ractive.set('info', 'Success!');
		}).fail(function (response) {
			ractive.set('info', 'Error: ' + JSON.stringify(response));
		});
	});
});
