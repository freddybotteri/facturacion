"use strict"
const fs 		= require('fs');
const path 		= require('path')
const express 	= require('express');
const router 	= express.Router();

let secure = (req, res, next) => {
	if (req.session.login != true){
		res.redirect('/login');
		return;
	}
	if(req.session.permisos != undefined){
		if(req.session.permisos == false){
			next()
			return;
		}
		console.log(req.originalUrl)
		if(req.session.permisos.indexOf(req.originalUrl.split("/")[1]) == -1 || req.originalUrl == "/perfiles/admin"){
				if(req.session.usuario.tusuario_global == 0 && req.originalUrl != '/'){
					res.render('Noautorizado');
					return;
				}				
		}else{
		
		}
	}
	next();
};
/* GET home page. ,secure*/
router.get('/',secure, (req, res, next) => {
	res.render('index', { title: 'Express' });
});
router.get('/login', (req, res, next) => {
	res.render('login');
});
router.get('/mapaCliente', (req, res, next) => {
	res.render('mapa');
});

router.get('/template', (req, res, next) => {
	res.render('template');
});
router.get('/mainInit', (req, res, next) => {
	res.render('inicio');
});

//PARA LA AGRUPACION DE LOS MODULOS.

router.get('/datos', (req, res, next) => {
	res.render('templateDatos');
});
router.get('/empresa', (req, res, next) => {
	res.render('templateInterno');
});
router.get('/venta', (req, res, next) => {
	res.render('templateVenta');
});
router.get('/seguridad', (req, res, next) => {
	res.render('templateUsuario');
});
/*Seccion de administracion*/
	router.get('/admin',secure, (req, res, next) => {
		res.render('admin');
	});
	router.get('/perfiles/:tipo',secure, (req, res, next) => {
		let tipoMenuAdmin = req.params.tipo
		res.render('perfiles',{
			tipoMenuAdmin:tipoMenuAdmin,
		});
	});
/*	
	Esta Ruta Get renderiza todas las views para templates de componentes que 
  	que podrian estar publicas en el front end pero yo las dejo aqui para usar PUG
*/
router.get('/temcomp/:name',secure,(req, res, next) => {
		let templ =path.join(__dirname, '../views/templates/',req.params.name+".pug");
		fs.access(templ, fs.F_OK, function(err) {
			if (!err) {
				res.render('templates/'+req.params.name,{nombre:req.session.usuario.name});	
			} else {
				res.send('Error Cargando plantilla');	
			}
		});
	
	
});
/*	&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */ 
router.get('/dashboard', (req, res, next) => {
	res.render('inicio');
});
/*router.post('/logout', (req, res, next) => {
	console.log("DESTRUIR SESSION ================")
	req.session.login = false;
	req.session.permisos = false
	req.session.save();
	
	res.send({tipo:"ok",msg:"Good bye!!"});
});*/
module.exports = router;