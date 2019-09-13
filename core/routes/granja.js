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
		res.render('Noautorizado');
		return;
	}else{
		
	}
	next();
};
//GET PARA VER LA VISTA PRINCIPAL DE EMPRESA
router.get('/index',secure, (req, res, next) => {  
	res.render('granja/index',{
			Verglobal:req.session.usuario.tusuario_global
		});
})
//para el servicio de llenar select input con las empresas
router.get('/FKEmpresas', (req, res, next) => {
	_SQL.selFKEmpresas(req).then((resp)=>{
		res.jsonp(resp)
	})
});
router.post('/newGranja', (req, res, next) => {
	if(req.body.emp_id == ""){
		req.body.emp_id = req.session.usuario.emp_id
	}
	_SQL.insertGranja(req,req.body).then((resp)=>{
		res.jsonp(resp)
	})
});
//para el servicio de llenar tabla con las empresas
router.get('/listaGranjas', (req, res, next) => {
	_SQL.listaGranjas(req.session.usuario.emp_id,req.session.usuario.tusuario_global).then((resp)=>{
		res.jsonp(resp)
	})
});
/*
//para el servicio de llenar tabla con las empresas
router.post('/delEmpresa', (req, res, next) => {
	_SQL.delEmpresa(req,req.body.id).then((resp)=>{
		res.jsonp(resp)
	})
});*/
module.exports = router;
