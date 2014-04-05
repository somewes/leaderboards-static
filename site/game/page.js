define(['lodash', 'moment', 'Ractive', 'rv!./template', 'leaderboards/api/games/sm64', 'leaderboards/api/platforms', 'components/tagvalueselect'], function (_, moment, Ractive, template, game, platforms) {

	_.each(game.filters, function (filter) {
		if (filter.all_filter) {
			filter.all = filter.all_filter.tags;
		}

		if (filter.any_filter) {
			filter.any = filter.any_filter.tags;
		}

		if (filter.not_filter) {
			filter.not = filter.not_filter.tags;
		}
	});

	game.tagvalues = _.flatten(_.pluck(game.tags, 'values'));

	_.each(game.tags, function (tag) {
		tag.type = 'list';
	});

	var data = {
		_: _,
		game: game,
		platforms: platforms,
		filter: {
			all: null,
			any: null,
			not: null
		},
		gameFilter: true,
		allRuns: false
	};

	data.tagset = {};
	_.each(game.tags, function (tag) {
		data.tagset[tag.id] = tag;
	});

	data.tagvalueset = {};
	_.each(game.tagvalues, function (tagvalue) {
		data.tagvalueset[tagvalue.id] = tagvalue;
	});

	data.platformset = {};
	_.each(platforms, function (platform) {
		data.platformset[platform.id] = platform;
	});

	data.filterset = {};
	_.each(game.filters, function (filter) {
		data.filterset[filter.id] = filter;
	});

	data.formatTime = function (milliseconds) {
		var duration = moment.duration(milliseconds);
		
		var hours = duration.hours();
		var minutes = duration.minutes();
		var seconds = duration.seconds();
		
		var t = ''; // Return value: hh:mm:ss, mm:ss if no hours, :ss if no minutes
		
		if (hours) {
			t += hours + ':';
			
			if (minutes > 9) {
				t += minutes;
			} else {
				t += '0' + minutes;
			}
		} else {
			if (minutes > 9) {
				t += minutes;
			} else if (minutes > 0) {
				t += '0' + minutes;
			}
		}

		t += ':';
	
		if (seconds > 9) {
			t += seconds;
		} else {
			t += '0' + seconds;
		}
		
		return t;
	};

	data.filterRun = function (filter, run) {
		var filterTest = function (tagvalue) {
			return _.find(run.tags, { id: tagvalue.id });
		};

		if (typeof filter !== 'object') {
			return true;
		}

		if (filter.all) {
			if (!_.all(filter.all, filterTest)) {
				return false;
			}
		}

		if (filter.any) {
			if (!_.any(filter.any, filterTest)) {
				return false;
			}
		}

		if (filter.not) {
			if (_.any(filter.not, filterTest)) {
				return false;
			}
		}

		return true;
	};

	var ractive = new Ractive({
		el: 'main',
		template: template,
		debug: true,
		data: data
	});

	ractive.on('change-filter-game', function (event) {
		ractive.set('gameFilter', true);
		ractive.set('allRuns', false);
	});

	ractive.on('change-filter', function (event, filterid) {
		ractive.set('allRuns', false);
		ractive.set('gameFilter', false);
		ractive.set('filter', _.findWhere(game.filters, { id: filterid }));
	});

	ractive.on('change-filter-all', function (event) {
		ractive.set('filter', {all: null, any: null, not: null});
		ractive.set('gameFilter', false);
		ractive.set('allRuns', true);
	});

	ractive.on('add-all', function (event) {
		ractive.set('addingAll', true);
	});

	ractive.observe('new_all_tag_value', function (new_all_tag_value) {
		if (new_all_tag_value) {
			var filter = ractive.get('filter');

			if (!filter.all) {
				filter.all = [];
			}

			filter.all.push(data.tagvalueset[new_all_tag_value]);

			ractive.set('filter', filter);
			ractive.set('addingAll', false);
			ractive.set('new_all_tag', undefined);
		}
	});

	ractive.on('add-any', function (event) {
		ractive.set('addingAny', true);
	});

	ractive.observe('new_any_tag_value', function (new_any_tag_value) {
		if (new_any_tag_value) {
			var filter = ractive.get('filter');

			if (!filter.any) {
				filter.any = [];
			}

			filter.any.push(data.tagvalueset[new_any_tag_value]);

			ractive.set('filter', filter);
			ractive.set('addingAny', false);
			ractive.set('new_any_tag', undefined);
		}
	});

	ractive.on('add-not', function (event) {
		ractive.set('addingNot', true);
	});

	ractive.observe('new_not_tag_value', function (new_not_tag_value) {
		if (new_not_tag_value) {
			var filter = ractive.get('filter');

			if (!filter.not) {
				filter.not = [];
			}

			filter.not.push(data.tagvalueset[new_not_tag_value]);

			ractive.set('filter', filter);
			ractive.set('addingNot', false);
			ractive.set('new_not_tag', undefined);
		}
	});
});
