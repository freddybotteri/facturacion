"use strict"
export default class empresaService {
	constructor ($http) {
		this.$http = $http
	}

	guardarEmpresa (data) {
		return this.$http({
				method: 'POST',
				url: '/empresa/newEmpresa',
				data:data
			})
	}

	listaEmpresas () {
		return this.$http({
				method: 'GET',
				url: '/empresa/listaEmpresas',
			})
	}
	delEmpresa (id) {
		return this.$http({
				method: 'POST',
				url: '/empresa/delEmpresa',
				data:{id:id}
			})
	}
}
 