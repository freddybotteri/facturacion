"use strict"
import angular from 'angular'
import { productoListformComponent } from './producto-listform/producto-listform.component'


const producto = angular
	.module('producto', [])
	.component('productoListform', productoListformComponent)
	.config(($stateProvider, $urlRouterProvider) => {
		$stateProvider
			.state('producto', {
				url: '/producto',
				component: 'productoListform',
			})
		$urlRouterProvider.otherwise('/inicio')
	})
	.name
export default producto