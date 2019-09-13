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
//GET PARA VER LA VISTA PRINCIPAL
router.get('/index',secure, (req, res, next) => {  
	res.render('ruta/index');
})
router.get('/listaRutas', (req, res, next) => {
	_SQL.listaRutas(req.session.usuario.emp_id).then((resp)=>{
		res.jsonp(resp)
	})
});
router.get('/FKEmpresa', (req, res, next) => {
	_SQL.selectFKempresas().then((resp)=>{
		res.jsonp(resp)
	})
});
router.get('/FKBodega', (req, res, next) => {
	_SQL.listaFKBodegas(req.session.usuario.emp_id).then((resp)=>{
		res.jsonp(resp)
	})
});
router.get('/FKVendedor', (req, res, next) => {
	_SQL.listaFKVendedores(req.session.usuario.emp_id).then((resp)=>{
		res.jsonp(resp)
	})
});
/*Primero consultamos en lib/sql luego en /lib/empresa que se usa en sql*/
router.post('/newRuta', (req, res, next) => {
	if(req.body.emp_id == ""){
		req.body.emp_id = req.session.usuario.emp_id
	}
	_SQL.insertRuta(req.body).then((resp)=>{
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