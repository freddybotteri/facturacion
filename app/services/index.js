// Services Index.js punto de entrada para cargar todos los servicios
"use strict"
import angular from 'angular'

import  comunicator  from './comunicator.service'
import  postdata  from './postdata.service'
import  empresaService  from './empresa.service'
import  granjaService  from './granja.service'
import  perfilService  from './perfil.service'
import  usuarioService  from './usuario.service'
import  detallePerfilService  from './detallePerfil.service'
import  permisoService  from './permiso.service'
import  vendedorService  from './vendedor.service'
import  correlativoService  from './correlativo.service'
import  puntodeVentaService  from './puntodeVenta.service'
import  clienteService  from './cliente.service'
import  bodegaService  from './bodega.service'
import  rutaService  from './ruta.service'
import  productoService  from './producto.service'
import  familiaService  from './familia.service'
import  detalleRutaService  from './detalleRuta.service'
import  selectorRutaService  from './selectorRuta.service'
import  inventarioService  from './inventario.service'
import 	grupoService  from './grupo.service'
import 	opcionesgrupoService  from './opcionesgrupo.service'
import 	selectorGrupo  from './selectorGrupo.service'
import 	proveedorService  from './proveedor.service'

import 	socketIO  from './socketIO_service'

const services = angular  
	.module('services', [])
	.service('comunicator', comunicator)
	.service('postdata', postdata)
	.service('empresaService', empresaService)
	.service('granjaService', granjaService)
	.service('perfilService', perfilService)
	.service('usuarioService', usuarioService)
	.service('detallePerfilService', detallePerfilService)
	.service('permisoService', permisoService)
	.service('vendedorService', vendedorService)
	.service('correlativoService', correlativoService)
	.service('puntodeVentaService', puntodeVentaService)
	.service('clienteService',clienteService)
	.service('bodegaService',bodegaService)
	.service('rutaService',rutaService)
	.service('productoService',productoService)
	.service('familiaService',familiaService)
	.service('detalleRutaService',detalleRutaService)
	.service('selectorRutaService',selectorRutaService)
	.service('inventarioService',inventarioService)
	.service('grupoService',grupoService)
	.service('opcionesgrupoService',opcionesgrupoService)
	.service('selectorGrupo',selectorGrupo)
	.service('proveedorService',proveedorService)
	.service('socketIO',socketIO)
	
	.name
export default services