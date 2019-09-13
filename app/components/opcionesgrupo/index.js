"use strict"
import angular from 'angular'
import { opcionesgrupoListformComponent } from './opcionesgrupo-listform/opcionesgrupo-listform.component'


const opcionesgrupo = angular
	.module('opcionesgrupo', [])
	.component('opcionesgrupoList', opcionesgrupoListformComponent)
	.config(($stateProvider, $urlRouterProvider) => {
		$stateProvider
			.state('opcionesg', {
				url: '/opcionesg',
				params: {
					idGrupo: 0,
					claveGrupo:""
				},
				component: 'opcionesgrupoList',
			})
		$urlRouterProvider.otherwise('/inicio')
	})
	.name

export default opcionesgrupo