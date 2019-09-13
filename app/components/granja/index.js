"use strict"
import angular from 'angular'
import { GranjaListComponent } from './granja-list/granja-list.component'


const granja = angular
	.module('granja', [])
	.component('granjaList', GranjaListComponent)
	.config(($stateProvider, $urlRouterProvider) => {
		$stateProvider
			.state('granja', {
				url: '/granja',
				component: 'granjaList',
			})
		$urlRouterProvider.otherwise('/inicio')
	})
	.name

export default granja

/* `gran_id`,
 `gran_nombre`,
	`gran_direccion`,
	 `gran_ubicacion`, 
	 `gran_contacto`,
		`gran_telefono`,
		`emp_id`,
		 `emp_sts`,
		 `gran_sts*/