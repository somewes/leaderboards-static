define(['Ractive', 'rv!./template', 'data/games'],
function (Ractive, template, games) {
	var ractive = new Ractive({
		el: 'main',
		template: template,
		data: {
			games: games,
			contains: function (str, search) {
				// TODO: Fuzzy matching, abbreviation matching, first-letter abbreviation matching

				if (typeof search === 'undefined') return true;

				var strLower = str.toLocaleLowerCase();
				var searchLower = search.toLocaleLowerCase();

				return strLower.indexOf(searchLower) !== -1;
			}
		}
	});
});
