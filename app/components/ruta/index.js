"use strict"
import angular from 'angular'
import { rutaListformComponent } from './ruta-listform/ruta-listform.component'


const ruta = angular
	.module('ruta', [])
	.component('rutaListform', rutaListformComponent)
	.config(($stateProvider, $urlRouterProvider) => {
		$stateProvider
			.state('ruta', {
				url: '/ruta',
				component: 'rutaListform',
			})
		$urlRouterProvider.otherwise('/inicio')
	})
	.name
export default ruta