"use strict"
import angular from 'angular'
import { EmpresaListComponent } from './empresa-list/empresa-list.component'
import { EmpresaAdminListComponent } from './empresa-list/empresaAdmin-listform.component'

const empresa = angular
  .module('empresa', [])
  .component('empresaList', EmpresaListComponent)
  .component('empresaAdminList', EmpresaAdminListComponent)
  .config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('empresas', {
        url: '/empresas',
        component: 'empresaList',
      })
      .state('empresasAdmin', {
        url: '/empresasAdmin',
        component: 'empresaAdminList',
      })
    $urlRouterProvider.otherwise('/inicio')
  })
  .name

export default empresa