"use strict"
export default class puntodeVentaService {
	constructor ($http) {
		this.$http = $http
	}

	guardarpuntodeVenta (data) {
		return this.$http({
				method: 'POST',
				url: '/puntodeVenta/newpuntodeVenta',
				data:data
			})
	}

	listapuntodeVenta () {
		return this.$http({
				method: 'GET',
				url: '/puntodeVenta/listapuntodeVenta',
			})
	}

	FKEmpresas () {
		return this.$http({
				method: 'GET',
				url: '/puntodeVenta/FKEmpresas',
			})
	}
	FKCorrelativos(){
		return this.$http({
				method: 'GET',
				url: '/puntodeVenta/FKCorrelativos',
			})
	}
}