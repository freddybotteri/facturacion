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
	res.render('selectorRuta/index');
})
;
router.get('/listarRutas', (req, res, next) => {
	_SQL.listaRutas(req.session.usuario.emp_id).then((resp)=>{
		res.jsonp(resp)
	})
});
module.exports = router;