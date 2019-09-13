"use strict"
import angular from 'angular'
import { grupoListformComponent } from './grupo-listform/grupo-listform.component'


const grupo = angular
	.module('grupo', [])
	.component('grupoList', grupoListformComponent)
	.config(($stateProvider, $urlRouterProvider) => {
		$stateProvider
			.state('grupo', {
				url: '/grupo',
				component: 'grupoList',
			})
		$urlRouterProvider.otherwise('/inicio')
	})
	.name

export default grupo