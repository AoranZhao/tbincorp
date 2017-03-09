'use strict';

export default function routes($stateProvider) {
	'ngInject';

	$stateProvider.state('mnglist', {
		url: '/mnglist?cat',
		template: '<mnglist></mnglist>'
	})
}