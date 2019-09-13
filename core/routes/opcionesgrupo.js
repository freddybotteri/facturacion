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
			return;
		}
		
	}else{
		
	}
	next();
};
//GET PARA VER LA VISTA PRINCIPAL DE EMPRESA
router.get('/index',secure, (req, res, next) => {  
	res.render('opcionesgrupo/index');
})
router.post('/newopcionesgrupo', (req, res, next) => {
	_SQL.insertopcionesGrupo(req.body).then((resp)=>{
		res.jsonp(resp)
	})
});
router.post('/listaopcionesgrupo', (req, res, next) => {
	_SQL.listaopcionesGrupo(req.body.grupo).then((resp)=>{
		res.jsonp(resp)
	})
});
module.exports = router;