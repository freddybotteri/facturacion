"use strict"
import angular from 'angular'
import { proveedorListformComponent } from './proveedor-listform/proveedor-listform.component'


const proveedor = angular
	.module('proveedor', [])
	.component('proveedorListform', proveedorListformComponent)
	.config(($stateProvider, $urlRouterProvider) => {
		$stateProvider
			.state('proveedor', {
				url: '/proveedor',
				component: 'proveedorListform',
			})
		$urlRouterProvider.otherwise('/inicio')
	})
	.name
export default proveedor