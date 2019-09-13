"use strict"
export default class inventarioService {
	constructor ($http) {
		this.$http = $http
	}

	guardarInventario (trans,data) {
		return this.$http({
				method: 'POST',
				url: '/inventario/newInventario',
				data:{data:data,trans:trans}
			})
	}
	guardarInventarioTransf (trans,data,ids) {
		return this.$http({
				method: 'POST',
				url: '/inventario/newInventarioTranf',
				data:{data:data,trans:trans,BodId:ids}
			})
	}

	FKBodegas () {
		return this.$http({
				method: 'GET',
				url: '/inventario/FKBodegas',
			})
	}
	FKProductos () {
		return this.$http({
				method: 'GET',
				url: '/inventario/FKProductos',
			})
	}
	listarinventarios(idBod){
		return this.$http({
				method: 'POST',
				url: '/inventario/listaInventario',
				data:{idBod:idBod}
			})
	
	}
}