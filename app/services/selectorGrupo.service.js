"use strict"
export default class selectorGrupoService {
	constructor ($http) {
		this.$http = $http
	}

	guardarselectorGrupo(data) {
		return this.$http({
				method: 'POST',
				url: '/selectorGrupo/newselectorGrupo',
				data:data
			})
	}

	listselectorGrupo (tipo) {
		return this.$http({
				method: 'POST',
				url: '/selectorGrupo/listaselectorGrupo',
				data:{tipo:tipo}
			})
	}
	listopcionesGrupo (grupo) {
		return this.$http({
				method: 'POST',
				url: '/selectorGrupo/listasopcionesGrupo',
				data:{grupo:grupo}
			})
	}
	listYaopciones(producto,tipo) {
		return this.$http({
				method: 'POST',
				url: '/selectorGrupo/YaopcionesGrupo',
				data:{pro:producto,tipo:tipo}
			})
	}
}