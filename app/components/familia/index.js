"use strict"
import angular from 'angular'
import { familiaListformComponent } from './familia-listform/familia-listform.component'


const familia = angular
	.module('familia', [])
	.component('familiaList', familiaListformComponent)
	.config(($stateProvider, $urlRouterProvider) => {
		$stateProvider
			.state('familia', {
				url: '/familia',
				component: 'familiaList',
			})
		$urlRouterProvider.otherwise('/inicio')
	})
	.name

export default familia