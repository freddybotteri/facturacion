"use strict"
import angular from 'angular'
import { selectorRutaListformComponent } from './selectorRuta-listform/selectorRuta-listform.component'


const selectorRuta = angular
	.module('selectorRuta', [])
	.component('selectorRutaListform', selectorRutaListformComponent)
	.config(($stateProvider, $urlRouterProvider) => {
		$stateProvider
			.state('selectorRuta', {
				url: '/selectorRuta',
				component: 'selectorRutaListform',
			})
		$urlRouterProvider.otherwise('/inicio')
	})
	.name
export default selectorRuta