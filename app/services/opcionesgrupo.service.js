"use strict"
export default class opcionesgrupoService {
	constructor ($http) {
		this.$http = $http
	}

	guardaropcionesgrupo(data) {
		return this.$http({
				method: 'POST',
				url: '/opcionesgrupo/newopcionesgrupo',
				data:data
			})
	}
	cargaopcionesGrupo (grupo){
		return this.$http({
				method: 'POST',
				url: '/opcionesgrupo/listaopcionesgrupo',
				data:{grupo:grupo}
			})
	}
}