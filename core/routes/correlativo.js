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
	res.render('correlativo/index');
})
/*Primero consultamos en lib/sql luego en /lib/empresa que se usa en sql*/
router.post('/newCorrelativo', (req, res, next) => {
	if(req.body.emp_id == ""){
		req.body.emp_id = req.session.usuario.emp_id
	}
	_SQL.insertCorrelativo(req.body).then((resp)=>{
		res.jsonp(resp)
	})
});
//para el servicio de llenar tabla con las empresas
router.get('/FKEmpresas', (req, res, next) => {
	_SQL.selectFKempresas(req).then((resp)=>{
		res.jsonp(resp)
	})
});
//para el servicio de llenar tabla con las empresas
router.get('/listaCorrelativo', (req, res, next) => {
	_SQL.listaCorrelativo(req.session.usuario.emp_id).then((resp)=>{
		res.jsonp(resp)
	})
});
module.exports = router;