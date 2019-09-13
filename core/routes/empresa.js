"use strict"
const express = require('express');
const router = express.Router();
const _SQL 		= require('../libs/sql');

let secure = (req, res, next) => {
	if (req.session.login != true){
		res.redirect('/login');
		return;
	}
	if(req.session.permisos.indexOf(req.baseUrl.split("/")[1]) == -1 || req.originalUrl == "/empresa/index/admin"){
		if(req.session.usuario.tusuario_global == 0){
			res.render('Noautorizado');
			return;
		}
	}else{
		
	}
	next();
};
//GET PARA VER LA VISTA PRINCIPAL DE EMPRESA
router.get('/index/:tipo',secure, (req, res, next) => { 
	let tipoMenuAdmin = req.params.tipo 
	res.render('empresa/index',{
			tipoMenuAdmin:tipoMenuAdmin,
			Verglobal:req.session.usuario.tusuario_global,
			empresa:req.session.usuario.emp_id
		});
})
/*Primero consultamos en lib/sql luego en /lib/empresa que se usa en sql*/
router.post('/newEmpresa', (req, res, next) => {
	if(req.body.emp_id == 0 && req.session.usuario.tusuario_global == 0){
		req.body.emp_id = req.session.usuario.emp_id
	}
	_SQL.insertEmpresa(req,req.body,req.session.usuario.tusuario_global).then((resp)=>{
		res.jsonp(resp)
	})
});
//para el servicio de llenar tabla con las empresas
router.get('/listaEmpresas', (req, res, next) => {
	_SQL.listaEmpresas(req.session.usuario.emp_id,req.session.usuario.tusuario_global).then((resp)=>{
		res.jsonp(resp)
	})
});
//para el servicio de llenar tabla con las empresas
router.post('/delEmpresa', (req, res, next) => {
	_SQL.delEmpresa(req,req.body.id).then((resp)=>{
		res.jsonp(resp)
	})
});
module.exports = router;
