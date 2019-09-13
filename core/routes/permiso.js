"use strict"
const express = require('express');
const router = express.Router();
const _SQL 		= require('../libs/sql');

let secure = (req, res, next) => {
	if (req.session.login != true){
		res.redirect('/login');
		return;
	}
	if(req.session.permisos.indexOf(req.baseUrl.split("/")[1]) == -1 || req.originalUrl == "/permiso/index/admin"){
		if(req.session.usuario.tusuario_global == 0){
			res.render('Noautorizado');
			return;
		}
		
	}else{
		
	}
	next();
};
//GET PARA VER LA VISTA PRINCIPAL 
router.get('/index/:tipo',secure, (req, res, next) => {  
	let tipoMenuAdmin = req.params.tipo
	res.render('permiso/index',{
			tipoMenuAdmin:tipoMenuAdmin,
			Verglobal:req.session.usuario.tusuario_global
		});
})

//para el servicio de llenar select input con las empresas
router.get('/FKUsuarios', (req, res, next) => {
	_SQL.selFKUsuarios(req).then((resp)=>{
		res.jsonp(resp)
	})
});
router.post('/listaOperaciones', (req, res, next) => {
	_SQL.listaOperacionUser(req.body.userId).then((resp)=>{
		res.jsonp(resp)
	})
});

router.post('/guardarOpeUser', (req, res, next) => {
	_SQL.guardarOpeUser(req.body.operacionesIds,req.body.userId).then((resp)=>{
		res.jsonp(resp)
	})
});
/*
//para el servicio de llenar tabla con las empresas
router.get('/listaGranjas', (req, res, next) => {
	_SQL.listaGranjas(req).then((resp)=>{
		res.jsonp(resp)
	})
});

//para el servicio de llenar tabla con las empresas
router.post('/delEmpresa', (req, res, next) => {
	_SQL.delEmpresa(req,req.body.id).then((resp)=>{
		res.jsonp(resp)
	})
});*/
module.exports = router;