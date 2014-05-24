define(function (require) {

	var _        = require('lodash'),
		moment   = require('moment'),
		Ractive  = require('Ractive'),

		template = require('rv!./template'),

		game     = require('game'),

		R_tag    = require('components/tag'),
		R_run    = require('components/run')


	// Returns object with keys being the value of property 'prop' for each object in array
	function hashByProp(arrayOfObjects, prop) {
		return _.zipObject(_.pluck(arrayOfObjects, prop), arrayOfObjects)
	}


	var data = {

		game: game,

		platforms: hashByProp(game.platforms, 'id'),

		tags: hashByProp(game.tags, 'id'),

		tagvalues: hashByProp(game.tagvalues, 'id'),

		_first: _.first,

		filterRuns: function filterRuns(runs, filter) { // block filter
			if (!filter) {
				return
			}

			var tagblocks = _.filter(filter.tagblocks, function (tagblock) {
				return _.keys(tagblock.selectedvalues).length > 0
			})

			return _.uniq(_.filter(runs, function (run) {
				return _.all(tagblocks, function (tagblock) {
					var values = tagblock.selectedvalues
					return _.keys(values).length > 0 && _.any(values, function (value) {
						return _.contains(run.tagvalues, value.id)
					})
				})
			}), function (run) {
				return run.user.username
			})
		},

		filters: _.map(game.filters, function (filter) {
			return {
				id: filter.id,
				name: filter.name,
				tagblocks: _.map(game.tags, function (tag) {
					var selectedvalues = hashByProp(_.map(_.intersection(filter.tagvalues, tag.tagvalues), function (tagvalueid) {
						return _.findWhere(game.tagvalues, { id: tagvalueid })
					}), 'id')

					tag.tagvalueobjs = _.map(tag.tagvalues, function (tagvalueid) {
						return _.findWhere(game.tagvalues, { id: tagvalueid })
					})

					return {
						tag: tag,
						selectedvalues: selectedvalues
					}
				})
			}
		}),

		augmentedRuns: _.map(game.speedruns, function (run) {
			return _.assign(_.clone(run), {
				tagblocks: _.map(game.tags, function (tag) {
					tag.tagvalueobjs = _.map(tag.tagvalues, function (tagvalueid) {
						return _.findWhere(game.tagvalues, { id: tagvalueid })
					})
					return {
						tag: tag,
						selectedvalues: hashByProp(_.map(_.intersection(run.tagvalues, tag.tagvalues), function (tagvalueid) {
							return _.findWhere(game.tagvalues, { id: tagvalueid })
						}), 'id')
					}
				})
			})
		})
	}


	var components = {
		tagblock: R_tag,
		runblock: R_run
	}


	var ractive = new Ractive({
		el: 'main',
		template: template,
		debug: true,
		data: data,
		components: components
	})


	ractive.on('change-filter-game', function (event) {
		ractive.set('filter', undefined)
	})

	ractive.on('change-filter', function (event, filterid) {
		ractive.set('filter', _.findWhere(data.filters, { id: filterid }))
	})

	var allRunsFilter = {
		tagblocks: _.map(game.tags, function (tag) {
			return {
				tag: tag,
				selectedvalues: {}
			}
		})
	}

	ractive.on('change-filter-all', function (event) {
		ractive.set('filter', allRunsFilter)
	})


	ractive.on('selecttagvalue', function (event) {
		var tagvalue = event.context

		var allRunsfilter = {
			tagblocks: _.cloneDeep(ractive.get('filter.tagblocks'))
		}

		var selectedtagblock = _.findWhere(allRunsfilter.tagblocks, { tag: { id: tagvalue.tag } })

		if ( selectedtagblock.selectedvalues[ tagvalue.id ] ) {
			delete selectedtagblock.selectedvalues[ tagvalue.id ]
		} else {
			selectedtagblock.selectedvalues[ tagvalue.id ] = tagvalue
		}

		ractive.set('filter', allRunsfilter)
	})

})
