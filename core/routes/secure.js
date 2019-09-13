"use strict"
const express 	= require('express');
const router 	= express.Router();
const _SQL 		= require('../libs/sql');

let secure = (req, res, next) => {
	if (req.session.login != true){
		res.redirect('/login');
		return;
	}
	/*if ("operacion" in req.body) {
		if(req.session.permisos.indexOf(req.body.operacion) == -1){
			res.json({tipo: "fail", msg: "No tiene permisos para la operacion Solicitada!"});
			return;		
		}
	}*/
	next();
};
/*POST DE PERFILES*/
	router.post('/getPerfiles',secure, (req, res, next) => {
		console.log("deberia busccar perfiles")
		_SQL.getPerfiles(req.session.usuario.id).then(function (datos) {
			console.log("post>>get perfiles");
			if (datos.tipo == 'ok') {
				//req.session.permisos = datos.data;
			}
		})
		.fail(function (error) {
			console.log(error)
		});
	});
/*POST MENU*/
	router.post('/getmenu',secure, (req, res, next) => {
		if(req.session.permisos == undefined || req.session.permisos == false){//condicion para cargar permisos si no los a cargado.
			_SQL.getPerfiles(req.session.usuario.id).then(function (datos) {
				if (datos.tipo == 'ok') {
					req.session.permisos = datos.data;
					req.session.save();
				}
			})
			.fail(function (error) {
				
			});
		}
		_SQL.getMenu(req.body.tipo, req.session.permisos,req.session.usuario.tusuario_global).then(function (datos) {
			if (datos.tipo == 'ok') {
				res.json({tipo: "ok", data: datos.data});
			}
		})
		.fail(function (error) {
			res.json({tipo: "error", msg: error.msg});
		});
	});
/* POST home page. */
	router.post('/login', (req, res, next) => {
		_SQL.getLogin(req.body).then(function (datos) {
			if (datos.tipo == 'ok') {
				req.session.login = true;
				req.session.usuario = datos.usuario;
				//=================================================
				//=parte agregada para ver nueva carga de perfiles=
				//=================================================
				/*_SQL.getPerfiles(req.session.usuario.id).then(function (datos) {
					console.log("post>>get perfiles");
					if (datos.tipo == 'ok') {
						req.session.permisos = datos.data;
					}
				})
				.fail(function (error) {
					console.log(error)
				});*/
				res.json({tipo: "ok", msg: "Welcome"});
				next();
			}else{
				res.json({tipo: "fail", msg: datos.msg});
			}
		})
		.fail(function (error) {
			res.json({tipo: "error", msg: error.msg});
		});
	}, (req, res, next) => { 
		console.log("deberia busccar perfiles")
		_SQL.getPerfiles(req.session.usuario.id).then(function (datos) {
			if (datos.tipo == 'ok') {
				req.session.permisos = datos.data;
				req.session.save();
				res.json({tipo: "ok", msg: "Welcome"});
			}
		})
		.fail(function (error) {
			
		});
	});
	router.post('/logout',secure, (req, res, next) => {
		console.log("DESTRUIR SESSION ================")
		req.session.login = false;
		req.session.permisos = false
		req.session.save()
		res.json({tipo: "ok", msg: "Bye!"});
	});


module.exports = router;
