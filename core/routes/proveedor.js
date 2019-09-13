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
	res.render('proveedor/index');
})
/*Primero consultamos en lib/sql luego en /lib/empresa que se usa en sql*/
router.post('/newproveedores', (req, res, next) => {
	if(req.body.data.emp_id == ""){
		req.body.data.emp_id = req.session.usuario.emp_id
	}
	_SQL.insertProveedor(req.body.data,req.body.complementos).then((resp)=>{
		res.jsonp(resp)
	})
});
router.get('/listaproveedores', (req, res, next) => {
	_SQL.listaProveedores(req.session.usuario.emp_id).then((resp)=>{
		res.jsonp(resp)
	})
});
router.get('/listaFamilias', (req, res, next) => {
	_SQL.listaFamilias(req.session.usuario.emp_id).then((resp)=>{
		res.jsonp(resp)
	})
});
//para el servicio de llenar tabla con las empresas
router.get('/FKEmpresa', (req, res, next) => {
	_SQL.selectFKempresas().then((resp)=>{
		res.jsonp(resp)
	})
});

module.exports = router;