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
	res.render('vendedor/index');
}) 
router.get('/listaFKUsuarios', (req, res, next) => {
	_SQL.selFKUsuarios().then((resp)=>{
		res.jsonp(resp)
	})
});
router.get('/listaFKEmpresas', (req, res, next) => {
	_SQL.selectFKempresas().then((resp)=>{
		res.jsonp(resp)
	})
});

//para el servicio de llenar tabla con las empresas
router.post('/newVendedor', (req, res, next) => {
	if(req.body.emp_id == ""){
		req.body.emp_id = req.session.usuario.emp_id
		//req.tusuario.tusuario_id = req.session.usuario.tusuario_id
	}
	_SQL.insertVendedor(req.body).then((resp)=>{
		res.jsonp(resp)
	})
});
router.get('/listaVendedores', (req, res, next) => {
	_SQL.listaVendedores(req.session.usuario.emp_id).then((resp)=>{
		res.jsonp(resp)
	})
});/**/
module.exports = router;