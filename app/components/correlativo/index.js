"use strict"
import angular from 'angular'
import { correlativoListformComponent } from './correlativo-listform/correlativo-listform.component'


const correlativo = angular
	.module('correlativo', [])
	.component('correlativoListform', correlativoListformComponent)
	.config(($stateProvider, $urlRouterProvider) => {
		$stateProvider
			.state('correlativo', {
				url: '/correlativo',
				component: 'correlativoListform',
			})
		$urlRouterProvider.otherwise('/inicio')
	})
	.name
export default correlativo