"use strict"
import angular from 'angular'
import { vendedorListformComponent } from './vendedor-listform/vendedor-listform.component'


const vendedor = angular
	.module('vendedor', [])
	.component('vendedorListform', vendedorListformComponent)
	.config(($stateProvider, $urlRouterProvider) => {
		$stateProvider
			.state('vendedor', {
				url: '/vendedor',
				component: 'vendedorListform',
			})
		$urlRouterProvider.otherwise('/inicio')
	})
	.name
export default vendedor