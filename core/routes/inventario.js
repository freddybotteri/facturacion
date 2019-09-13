"use strict"
const express = require('express');
const router = express.Router();
const _SQL 		= require('../libs/sql');

let secure = (req, res, next) => {
	if (req.session.login != true){
		res.redirect('/login');
		return;
	}
	if(req.session.permisos.indexOf(req.baseUrl.split("/")[1]) == -1){
		if(req.session.usuario.tusuario_global == 0){
			res.render('Noautorizado');
			return;
		}
		
	}else{
		
	}
	next();
};
//GET PARA VER LA VISTA PRINCIPAL 
router.get('/index',secure, (req, res, next) => {  
	res.render('inventario/index');
})

//para el servicio de llenar select input con las empresas
router.get('/FKBodegas', (req, res, next) => {
	_SQL.listaBodegas(req.session.usuario.emp_id).then((resp)=>{
		res.jsonp(resp)
	})
});
router.get('/FKProductos', (req, res, next) => {
	_SQL.listaFKProductos(req.session.usuario.emp_id).then((resp)=>{
		res.jsonp(resp)
	})
});
router.post('/listaInventario', (req, res, next) => {
	_SQL.listaInventario(req.session.usuario.emp_id,req.body.idBod).then((resp)=>{
		res.jsonp(resp)
	})
});
router.post('/newInventario', (req, res, next) => {
	req.body.trans.emp_id=req.session.usuario.emp_id
	_SQL.insertInventarioTrans(req.body.data,req.body.trans).then((resp)=>{
		res.jsonp(resp)
	})
});
router.post('/newInventarioTranf', (req, res, next) => {
	req.body.trans.emp_id=req.session.usuario.emp_id
	_SQL.insertInventarioTranf(req.body.data,req.body.trans,req.body.BodId).then((resp)=>{
		res.jsonp(resp)
	})
});
module.exports = router;