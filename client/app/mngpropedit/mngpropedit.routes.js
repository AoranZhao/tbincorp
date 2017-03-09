'use strict';

export default function routes($stateProvider) {
	'ngInject';

	$stateProvider.state('mngpropedit', {
		url: '/mngpropedit?id',
		template: '<mngpropedit></mngpropedit>'
	})

}