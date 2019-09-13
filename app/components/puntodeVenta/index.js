"use strict"
import angular from 'angular'
import { puntodeVentaListformComponent } from './puntodeVenta-listform/puntodeVenta-listform.component'


const puntodeVenta = angular
	.module('puntodeVenta', [])
	.component('puntodeVentaListform', puntodeVentaListformComponent)
	.config(($stateProvider, $urlRouterProvider) => {
		$stateProvider
			.state('puntodeVenta', {
				url: '/puntodeVenta',
				component: 'puntodeVentaListform',
			})
		$urlRouterProvider.otherwise('/inicio')
	})
	.name
export default puntodeVenta