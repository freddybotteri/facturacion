"use strict"
export default class grupoService {
	constructor ($http) {
		this.$http = $http
	}

	guardargrupo(data) {
		return this.$http({
				method: 'POST',
				url: '/grupo/newgrupo',
				data:data
			})
	}
	cargaGrupo (){
		return this.$http({
				method: 'GET',
				url: '/grupo/listagrupos',
			})
	}
}