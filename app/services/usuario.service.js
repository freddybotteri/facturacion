"use strict"
export default class usuarioService {
	constructor ($http) {
		this.$http = $http
	}

	guardarUsuario (data) {
		return this.$http({
				method: 'POST',
				url: '/usuario/newUsuario',
				data:data
			})
	}

	listaUsuario () {
		return this.$http({
				method: 'GET',
				url: '/usuario/listaUsuarios',
			})
	}
	SaberGlobal(){
		return this.$http({
				method: 'GET',
				url: '/usuario/saberGlobal',
			})
	}
	FKEmpresas () {
		return this.$http({
				method: 'GET',
				url: '/usuario/FKEmpresas',
			})
	}

	FKPerfiles () {
		return this.$http({
				method: 'GET',
				url: '/usuario/FKPerfiles',
			})
	}

	stsUsuario (id) {
		return this.$http({
				method: 'POST',
				url: '/usuario/stsUsuario',
				data:{id:id}
			})
	}
}