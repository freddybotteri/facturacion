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
		if(req.session.usuario.tusuario_global == 0){
			res.render('Noautorizado');
		}
		return;
	}else{
		
	}
	next();
};
/*Para ingresar un nuevo perfil*/
router.post('/newPerfil', (req, res, next) => {
	_SQL.insertPerfil(req.body).then((resp)=>{
		res.jsonp(resp)
	}).fail((err)=>{
		res.json(err)
	})
});

//para listar los perfiles
router.get('/listaPerfiles', (req, res, next) => {

	_SQL.listaPerfiles(req.session.usuario.tusuario_global).then((resp)=>{
		res.jsonp(resp)
	}).fail((err)=>{
		res.json(err)
	})
});

router.get('/listaOperaciones', (req, res, next) => {

	_SQL.listaOperaciones(req).then((resp)=>{
		res.jsonp(resp)
	}).fail((err)=>{
		res.json(err)
	})
});
module.exports = router;
