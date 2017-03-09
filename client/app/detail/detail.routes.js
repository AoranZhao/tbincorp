'use strict';

export default function routes($stateProvider) {
	'ngInject';

	$stateProvider.state('detail', {
		url: '/detail?id',
		template: '<detail></detail>'
	})
}