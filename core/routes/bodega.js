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
	/*if ("operacion" in req.body) {
		res.json({tipo: "fail", msg: "No tiene permisos para la operacion Solicitada!"});
		return;		
	}else{
		res.send("<section><h1>No tiene permisos</h1></br><p>Contacte a su Administrador</p></section>")
	}*/
};
//GET PARA VER LA VISTA PRINCIPAL DE CLIENTE
router.get('/index',secure, (req, res, next) => {  
	res.render('bodega/index');
})
/*Primero consultamos en lib/sql luego en /lib/empresa que se usa en sql*/
router.post('/newBodega', (req, res, next) => {
	if(req.body.emp_id == ""){
		req.body.emp_id = req.session.usuario.emp_id
	}
	_SQL.insertBodega(req.body).then((resp)=>{
		res.jsonp(resp)
	})
});
router.get('/listaBodegas', (req, res, next) => {
	_SQL.listaBodegas(req.session.usuario.emp_id).then((resp)=>{
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