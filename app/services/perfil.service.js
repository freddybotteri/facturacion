"use strict"
export default class perfilService {
	constructor ($http) {
		this.$http = $http
	}

	guardarPerfil (data) {
		return this.$http({
				method: 'POST',
				url: '/perfil/newPerfil',
				data:data
			})
	}

	listaPerfiles () {
		return this.$http({
				method: 'GET',
				url: '/perfil/listaPerfiles',
			})
	}
	delPerfil (id) {
		return this.$http({
				method: 'POST',
				url: '/perfil/delPerfil',
				data:{id:id}
			})
	}

	listaOperaciones (){
		return this.$http({
				method: 'GET',
				url: '/perfil/listaOperaciones',
			})
	}
}