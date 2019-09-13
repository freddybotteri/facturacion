"use strict"
export default class rutaService {
	constructor ($http) {
		this.$http = $http
	}

	guardarRuta (data) {
		return this.$http({
				method: 'POST',
				url: '/ruta/newRuta',
				data:data
			})
	}

	listarRuta () {
		return this.$http({
				method: 'GET',
				url: '/ruta/listaRutas',
			})
	}

	FKEmpresa () {
		return this.$http({
				method: 'GET',
				url: '/ruta/FKEmpresa',
			})
	}
	FKBodega () {
		return this.$http({
				method: 'GET',
				url: '/ruta/FKBodega',
			})
	}
	FKVendedor () {
		return this.$http({
				method: 'GET',
				url: '/ruta/FKVendedor',
			})
	}
}