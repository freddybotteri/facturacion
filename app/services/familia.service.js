"use strict"
export default class familiaService {
	constructor ($http) {
		this.$http = $http
	}

	guardarfamilia(data) {
		return this.$http({
				method: 'POST',
				url: '/familia/newFamilia',
				data:data
			})
	}

	listFamilia () {
		return this.$http({
				method: 'GET',
				url: '/familia/listaFamilias',
			})
	}
}