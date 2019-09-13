"use strict"
export default class bodegaService {
	constructor ($http) {
		this.$http = $http
	}

	guardarBodega (data) {
		return this.$http({
				method: 'POST',
				url: '/bodega/newBodega',
				data:data
			})
	}

	listarBodega () {
		return this.$http({
				method: 'GET',
				url: '/bodega/listaBodegas',
			})
	}

	FKEmpresa () {
		return this.$http({
				method: 'GET',
				url: '/bodega/FKEmpresa',
			})
	}

}