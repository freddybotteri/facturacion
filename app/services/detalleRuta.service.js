"use strict"
export default class detalleRutaService {
	constructor ($http) {
		this.$http = $http
	}

	guardardetalleRuta (data) {
		return this.$http({
				method: 'POST',
				url: '/detalleRuta/newdetalleRuta',
				data:data
			})
	}

	listardetalleRuta (idRuta) {
		return this.$http({
				method: 'POST',
				url: '/detalleRuta/listadetalleRutas',
				data:{idRuta:idRuta}
			})
	}
	deleteCli(cli,ruta){
		return this.$http({
				method: 'POST',
				url: '/detalleRuta/deleteCliente',
				data:{cli:cli,ruta:ruta}
			})
	}
	FKCliente () {
		return this.$http({
				method: 'GET',
				url: '/detalleRuta/FKCliente',
			})
	}
	FKRuta () {
		return this.$http({
				method: 'GET',
				url: '/detalleRuta/FKRuta',
			})
	}
}