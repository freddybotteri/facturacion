"use strict"
import angular from 'angular'
import { inventarioListformComponent } from './inventario-listform/inventario-listform.component'


const inventario = angular
	.module('inventario', [])
	.component('inventarioListform', inventarioListformComponent)
	.config(($stateProvider, $urlRouterProvider) => {
		$stateProvider
			.state('inventario', {
				url: '/inventario',
				params: {
					idBod: 0,
					tipo:0,
					nameBod:""
				},
				component: 'inventarioListform',
			})
		$urlRouterProvider.otherwise('/inicio')
	})
	.name
export default inventario