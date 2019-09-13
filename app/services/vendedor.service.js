"use strict"
export default class vendedorService {
	constructor ($http) {
		this.$http = $http
	}

	guardarVendedor (vendedor) {
		
		return this.$http({
				method: 'POST',
				url: '/vendedor/newVendedor',
				data:vendedor
			})
	}

	FKUsuarios(){
		return this.$http({
				method: 'GET',
				url: '/vendedor/listaFKUsuarios',
			})
	}
	FKEmpresas(){
		return this.$http({
				method: 'GET',
				url: '/vendedor/listaFKEmpresas',
			})
	}
	listaVendedores(){
		return this.$http({
				method: 'GET',
				url: '/vendedor/listaVendedores',
			})
	}
}