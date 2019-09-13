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
	res.render('selectorGrupo/index');
})
router.post('/newselectorGrupo', (req, res, next) => {
	if(req.body.emp_id == ""){
		req.body.emp_id = req.session.usuario.emp_id
	}
	_SQL.insertselectorGrupo(req.body).then((resp)=>{
		res.jsonp(resp)
	})
});
router.post('/listaselectorGrupo', (req, res, next) => {
	_SQL.listaGrupoTipo(req.session.usuario.emp_id,req.body.tipo).then((resp)=>{
		res.jsonp(resp)
	})
});
router.post('/listasopcionesGrupo', (req, res, next) => {
	_SQL.listaopcionesGrupo(req.body.grupo).then((resp)=>{
		res.jsonp(resp)
	})
});
router.post('/YaopcionesGrupo', (req, res, next) => {
	_SQL.YaopcionesGrupo(req.body.pro,req.body.tipo).then((resp)=>{
		res.jsonp(resp)
	})
});
module.exports = router;