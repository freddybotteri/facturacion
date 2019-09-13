"use strict"
import angular from 'angular'

import  menu_controller  from './menu_controller'

const controllers = angular  
	.module('controllers', [])
	.controller('menuMain', menu_controller)//por que no el mismo nombre
	.name

export default controllers