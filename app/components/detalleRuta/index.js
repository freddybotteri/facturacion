"use strict"
import angular from 'angular'
import { detalleRutaListformComponent } from './detalleRuta-listform/detalleRuta-listform.component'


const detalleRuta = angular
	.module('detalleRuta', [])
	.component('detalleRutaListform', detalleRutaListformComponent)
	.config(($stateProvider, $urlRouterProvider) => {
		$stateProvider
			.state('detalleRuta', {
				url: '/detalleRuta',
				params: {
					idRuta: 0,
				},
				component: 'detalleRutaListform',
			})
		$urlRouterProvider.otherwise('/inicio')
	})
	.name
export default detalleRuta