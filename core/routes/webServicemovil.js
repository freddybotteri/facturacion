"use strict"
const express = require('express');
const router = express.Router();
const _SQL 		= require('../libs/sql');
const crypto = require('crypto');

let secure = (req, res, next) => {
	if (req.session.login != true){
		res.redirect('/login');
		return;
	}
	if(req.session.permisos.indexOf(req.baseUrl.split("/")[1]) == -1 || req.originalUrl == "/usuario/index/admin"){
		if(req.session.usuario.tusuario_global == 0){
			res.render('Noautorizado');
			return;
		}
		
	}else{
		
	}
	next();
};
function loginComprobacion(req){
	req.body.pass = crypto.createHash('md5').update(req.body.pass).digest("hex")
	return _SQL.getLoginMovil(req.body)	
}
//POST PARA el login de la aplicacion movil
//en app.js agregue varias ineas para permitor en cross
router.post('/login', (req, res, next) => {
	req.body.pass = crypto.createHash('md5').update(req.body.pass).digest("hex")
	_SQL.getLoginMovil(req.body).then(function (datos) {
			if (datos.tipo == 'ok') {
				res.status(200).jsonp({tipo: "ok",msg:'Todo bien ya esta logueado',data:datos});
				next();
			}else{
				res.status(200).jsonp({tipo: "fail",msg:'Welcomo',data:''});
				next();
			}
		})
		.fail(function (error) {
			res.status(500).jsonp({tipo: "error",msg:'Welcomo',data:''});
			next();
		}); 
})
router.post('/facturacion/listaProductos', (req, res, next) => { 
		console.log(req.body)
		try{
			if(req.body.logueado){
				loginComprobacion(req).then((data)=>{
					if(data.tipo == "ok"){
						_SQL.listaProductosMovil(req.body.emp_id,req.body.bod_id).then((resp)=>{
							res.status(200).jsonp({tipo:'ok',msg:'lista productoss',data:resp.data});
						}).catch((err)=>{console.log(err)})
					}else{
						res.status(200).jsonp({tipo:'OutLogin',msg:'No esta logueado',data:''});
					}
				})
			}else{
				res.status(500).jsonp({tipo:'fail',msg:'No esta logueado',data:''});
			}
		}catch(err){
			console.log(err)
		}
})
router.post('/camara/lista', (req, res, next) => { 
		console.log(req.body)
		try{
			if(req.body.logueado){
				loginComprobacion(req).then((data)=>{
					if(data.tipo == "ok"){
						_SQL.listaCamaraMovil(req.body.emp_id,req.body.bod_id).then((resp)=>{
							res.status(200).jsonp({tipo:'ok',msg:'lista camara',data:resp.data});
						}).catch((err)=>{console.log(err)})
					}else{
						res.status(200).jsonp({tipo:'OutLogin',msg:'No esta logueado',data:''});
					}
				})
			}else{
				res.status(500).jsonp({tipo:'fail',msg:'No esta logueado',data:''});
			}
		}catch(err){
			console.log(err)
		}
})
router.post('/cliente/lista', (req, res, next) => { 
	try{
		if(req.body.logueado){
			loginComprobacion(req).then((data)=>{
				if(data.tipo == "ok"){
					_SQL.listaClientesMovil(req.body.emp_id,req.body.ven_id).then((resp)=>{
						res.status(200).jsonp({tipo:'ok',msg:'lista clientes',data:resp.data});
					}).catch((err)=>{console.log(err)})
				}else{
					res.status(200).jsonp({tipo:'OutLogin',msg:'No esta logueado',data:''});
				}
			})
		}else{
			res.status(500).jsonp({tipo:'fail',msg:'No esta logueado',data:''});
		}
	}catch(err){
		console.log(err)
	}
	
})
module.exports = router;