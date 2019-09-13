"use strict"
import angular from 'angular'
import { detallePerfilListformComponent } from './detallePerfil-listform/detallePerfil-listform.component'
import { detallePerfilAdminListformComponent } from './detallePerfil-listform/detallePerfilAdmin-listform.component'


const detallePerfil = angular
	.module('detallePerfil', [])
	.component('detallePerfilListform', detallePerfilListformComponent)
	.component('detallePerfilAdminListform',detallePerfilAdminListformComponent)
	.config(($stateProvider, $urlRouterProvider) => {
		$stateProvider
			/*.state('detallePerfil', {
				url: '/detallePerfil',
				component: 'detallePerfilListform',
			})*/
			.state('detallePerfilAdmin', {
				url: '/detallePerfilAdmin',
				component: 'detallePerfilAdminListform',
			})
		$urlRouterProvider.otherwise('/inicio')
	})
	.name
export default detallePerfil