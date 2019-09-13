"use strict"
export default class correlativoService {
	constructor ($http) {
		this.$http = $http
	}

	guardarCorrelativo (data) {
		return this.$http({
				method: 'POST',
				url: '/correlativo/newCorrelativo',
				data:data
			})
	}

	listaCorrelativo () {
		return this.$http({
				method: 'GET',
				url: '/correlativo/listaCorrelativo',
			})
	}

	FKEmpresas () {
		return this.$http({
				method: 'GET',
				url: '/correlativo/FKEmpresas',
			})
	}
}