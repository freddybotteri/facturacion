"use strict"
export default class productoService {
	constructor ($http) {
		this.$http = $http
	}

	guardarProducto (data,complementos) {
		return this.$http({
				method: 'POST',
				url: '/producto/newProducto',
				data:{data:data,complementos:complementos}
			})
	}

	listarProductos () {
		return this.$http({
				method: 'GET',
				url: '/producto/listaProductos',
			})
	}

	FKEmpresa () {
		return this.$http({
				method: 'GET',
				url: '/producto/FKEmpresa',
			})
	}
	FKFamilia () {
		return this.$http({
				method: 'GET',
				url: '/producto/listaFamilias',
			})
	}
}