"use strict"
import angular from 'angular'
import { permisoListformComponent } from './permiso-listform/permiso-listform.component'
import { permisoAdminListformComponent } from './permiso-listform/permisoAdmin-listform.component'


const permiso = angular
	.module('permiso', [])
	.component('permisoListform', permisoListformComponent)
	.component('permisoAdminListform', permisoAdminListformComponent)
	.config(($stateProvider, $urlRouterProvider) => {
		$stateProvider
			.state('permiso', {
				url: '/permiso',
				component: 'permisoListform',
			})
			.state('permisoAdmin', {
				url: '/permisoAdmin',
				component: 'permisoAdminListform',
			})
		$urlRouterProvider.otherwise('/inicio')
	})
	.name
export default permiso