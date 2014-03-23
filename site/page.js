define(['Ractive', 'rv!./template', 'data/games'],
function (Ractive, template, games) {

	var contains = function (str, search) {
		var strLower = str.toLocaleLowerCase();
		var searchLower = search.toLocaleLowerCase();

		return strLower.indexOf(searchLower) !== -1;
	};


	var ractive = new Ractive({
		el: 'main',
		template: template,
		data: {
			games: games
		}
	});

	ractive.observe('searchtext', function (searchtext) {
		ractive.set('games', games.filter(function (game) {
			// TODO: Fuzzy matching, abbreviation matching, first-letter abbreviation matching
			return contains(game.name, searchtext);
		}));
	});

});
