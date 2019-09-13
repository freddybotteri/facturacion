"use strict"
export default class selectorRutaService {
	constructor ($http) {
		this.$http = $http
	}

	guardarselectorRuta (data) {
		return this.$http({
				method: 'POST',
				url: '/selectorRuta/newselectorRuta',
				data:data
			})
	}

	ListarRutas () {
		return this.$http({
				method: 'GET',
				url: '/selectorRuta/listarRutas',
			})
	}
}