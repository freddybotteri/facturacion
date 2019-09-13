"use strict"
import angular from 'angular'

import  menuComponent  from './menu_component/menu_component'
import empresa 		   from './empresa'
import granja 		   from './granja'
import usuario 		   from './usuario'
import detallePerfil   from './detallePerfil'
import cliente   from './cliente'
import permiso   from './permiso'
import vendedor   from './vendedor'
import ruta   from './ruta'
import puntodeVenta from './puntodeVenta'
import correlativo   from './correlativo'
import bodega   from './bodega'
import producto   from './producto'
import familia   from './familia'
import detalleRuta   from './detalleRuta'
import  perfilesFrmComponent	from './perfilesform_component/perfilesform_component'
import  perfilListComponent		from './perfilList_component/perfilList_component'
import  selectorRuta		from './selectorRutas'
import  inventario		from './inventario'
import  grupo		from './grupo'
import  opcionesgrupo		from './opcionesgrupo'
import  proveedor  from './proveedor'
import  selectorGrupo  from './selectorGrupo/selectorGrupo_component'

const componentes = angular
	.module('componentes', [empresa,granja,usuario,detallePerfil,
							permiso,cliente,vendedor,ruta,correlativo,
							puntodeVenta,bodega,producto,familia
							,detalleRuta,selectorRuta,inventario,grupo,proveedor,
							opcionesgrupo])
	.component('menu', menuComponent)
	.component('perfilesForm', perfilesFrmComponent)
	.component('perfilList', perfilListComponent)
	.component('selectorgrupo', selectorGrupo)
	.name

export default componentes