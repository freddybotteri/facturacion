"use strict"
import angular from 'angular'
import { UsuarioListformComponent } from './usuario-listform/usuario-listform.component'
import { UsuarioAdminListformComponent } from './usuario-listform/usuarioAdmin-listform.component'


const usuario = angular
	.module('usuario', [])
	.component('usuarioListform', UsuarioListformComponent)
	.component('usuarioAdminListform', UsuarioAdminListformComponent)
	.config(($stateProvider, $urlRouterProvider) => {
		$stateProvider
			.state('usuarios', {
				url: '/usuario',
				component: 'usuarioListform',
			})
			.state('usuariosAdmin', {
				url: '/usuariosAdmin',
				component: 'usuarioAdminListform'
			})
		$urlRouterProvider.otherwise('/inicio')
	})
	.name
export default usuario