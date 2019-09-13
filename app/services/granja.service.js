"use strict"
export default class granjaService {
	constructor ($http) {
		this.$http = $http
	}

	guardarGranja (data) {
		return this.$http({
				method: 'POST',
				url: '/granja/newGranja',
				data:data
			})
	}

	listaGranja () {
		return this.$http({
				method: 'GET',
				url: '/granja/listaGranjas',
			})
	}

	FKEmpresas () {
		return this.$http({
				method: 'GET',
				url: '/granja/FKEmpresas',
			})
	}

	delGranja (id) {
		return this.$http({
				method: 'POST',
				url: '/granja/delGranja',
				data:{id:id}
			})
	}
}