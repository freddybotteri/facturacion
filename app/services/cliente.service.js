"use strict"
export default class clienteService {
	constructor ($http) {
		this.$http = $http
	}

	guardarCliente (data) {
		return this.$http({
				method: 'POST',
				url: '/cliente/newCliente',
				data:data
			})
	}

	listarCliente () {
		return this.$http({
				method: 'GET',
				url: '/cliente/listaClientes',
			})
	}

	FKRuta () {
		return this.$http({
				method: 'GET',
				url: '/cliente/FKRuta',
			})
	}

	FKPerfiles () {
		return this.$http({
				method: 'GET',
				url: '/cliente/FKPerfiles',
			})
	}
}