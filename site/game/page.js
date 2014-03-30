define(['lodash', 'moment', 'Ractive', 'rv!./template', 'data/games/sm64', 'data/platforms'], function (_, moment, Ractive, template, game, platforms) {
	var data = {
		_: _,
		game: game,
		platforms: platforms,
		filter: {},
		allRuns: false
	};

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

	data.filterRuns = function (_filter, runs) {
		if (!_filter) {
			return runs;
		}

		var filter = function (combineFunc, filterSet) {
			if (_.size(filterSet) > 0) {
				runs = _.filter(runs, function (run) {
					return combineFunc(filterSet, function (value, tag) {
						return run.tags[tag] === value;
					});
				});
			}
		};
	
		filter(_.all, _filter.all);
		filter(_.any, _filter.any);
		filter(_.compose(function(f){return !f;}, _.all), _filter.not);
		return runs;
	};

	data.filterRun = function (filter, run) {
		var filterTest = function (val, tag) {
			return run.tags[tag] === val;
		};

		if (typeof filter !== 'object') {
			return true;
		}

		if (_.size(filter.all) > 0) {
			if (!_.all(filter.all, filterTest)) {
				return false;
			}
		}

		if (_.size(filter.any) > 0) {
			if (!_.any(filter.any, filterTest)) {
				return false;
			}
		}

		if (_.size(filter.not) > 0) {
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
		ractive.set('allRuns', false);

	});

	ractive.on('change-filter', function (event, filter) {
		ractive.set('allRuns', false);
		ractive.set('filter', _.findWhere(game.filters, { name: filter }).filter);
	});

	ractive.on('change-filter-all', function (event) {
		ractive.set('filter', {any: {}, all: {}, not: {}});
		ractive.set('allRuns', true);
	});

	ractive.on('add-all', function (event) {
		var filter = ractive.get('filter');

		/// BUG WORKAROUND for Ractive 0.3.9 -- [TODO] Remove when 0.4.0 update comes
		ractive.updateModel('new_all_tag_value');
		///

		filter.all[ractive.get('new_all_tag')] = ractive.get('new_all_tag_value');

		ractive.set('filter', filter);
	});

	ractive.on('add-any', function (event) {
		var filter = ractive.get('filter');

		/// BUG WORKAROUND for Ractive 0.3.9 -- [TODO] Remove when 0.4.0 update comes
		ractive.updateModel('new_any_tag_value');
		///

		filter.any[ractive.get('new_any_tag')] = ractive.get('new_any_tag_value');

		ractive.set('filter', filter);
	});

	ractive.on('add-not', function (event) {
		var filter = ractive.get('filter');

		/// BUG WORKAROUND for Ractive 0.3.9 -- [TODO] Remove when 0.4.0 update comes
		ractive.updateModel('new_not_tag_value');
		///

		filter.not[ractive.get('new_not_tag')] = ractive.get('new_not_tag_value');

		ractive.set('filter', filter);
	});
});
