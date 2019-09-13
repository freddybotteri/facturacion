"use strict"
const express = require('express');
const router = express.Router();
const _SQL 		= require('../libs/sql');

let secure = (req, res, next) => {
	if (req.session.login != true){
		res.redirect('/login');
		return;
	}
	if(req.session.permisos.indexOf(req.baseUrl.split("/")[1]) == -1 || req.originalUrl == "/detallePerfil/index/admin"){
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
	res.render('detallePerfil/index',{
			tipoMenuAdmin:tipoMenuAdmin,
			Verglobal:req.session.usuario.tusuario_global
		});
})
//Primero consultamos en lib/sql luego en /lib/empresa que se usa en sql
router.get('/listaFKPerfil', (req, res, next) => {
	_SQL.selectFKPerfiles(req,req.body).then((resp)=>{
		res.jsonp(resp)
	})
});
router.post('/listaFKOperaciones', (req, res, next) => {
	_SQL.listaFKOperaciones(req.body.perfilId).then((resp)=>{
		res.jsonp(resp)
	})
});
router.post('/newdetallePerfil', (req, res, next) => {
	_SQL.newDetallePerfil(req.body.operacionesIds,req.body.perfilId).then((resp)=>{
		res.jsonp(resp)
	})
});
/*
//para el servicio de llenar tabla con las empresas

//para el servicio de llenar tabla con las empresas
router.post('/delEmpresa', (req, res, next) => {
	_SQL.delEmpresa(req,req.body.id).then((resp)=>{
		res.jsonp(resp)
	})
});*/
module.exports = router;