"use strict"
const express = require('express');
const router = express.Router();
const _SQL 		= require('../libs/sql');

let secure = (req, res, next) => {
	if (req.session.login != true){
		res.redirect('/login');
		return;
	}
	console.log(req.session.permisos)
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
	res.render('detalleRuta/index');
})
/*Primero consultamos en lib/sql luego en /lib/empresa que se usa en sql*/
router.post('/newdetalleRuta', (req, res, next) => {
	if(req.body.emp_id == ""){
		req.body.emp_id = req.session.usuario.emp_id
	}
	_SQL.insertdetalleRuta(req.body).then((resp)=>{
		res.jsonp(resp)
	})
});
router.post('/listadetalleRutas', (req, res, next) => {
	let idRuta = req.body.idRuta
	console.log(idRuta)
	_SQL.listadetalleRuta(req.session.usuario.emp_id,idRuta).then((resp)=>{
		res.jsonp(resp)
	})
});
//para el servicio de llenar tabla con las empresas
router.get('/FKCliente', (req, res, next) => {
	_SQL.selectFKCliente(req.session.usuario.emp_id).then((resp)=>{
		res.jsonp(resp)
	})
});
router.get('/FKRuta', (req, res, next) => {
	_SQL.listaFKRutas(req.session.usuario.emp_id).then((resp)=>{
		res.jsonp(resp)
	})
});
router.post('/deleteCliente', (req, res, next) => {
	_SQL.deleteCli(req.body.cli,req.body.ruta).then((resp)=>{
		res.jsonp(resp)
	})
});
module.exports = router;