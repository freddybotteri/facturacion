"use strict"
const Comunicator = ['$http', ($http) => {
	let menu 		= {};
	let perfiles	= {};
	let recuMenu = (totMenu,dato) => {
		var stado=false;
		if(dato.tmenu_padre ==0){
			totMenu.push({
					tmenu_nid: 		dato.tmenu_nid
					,tmenu_padre: 	dato.tmenu_padre
					,tmenu_text:	dato.tmenu_text
					,tmenu_uri: 	dato.tmenu_uri
					,tmenu_icon: 	dato.tmenu_icon
					,hijos: []
				});
			return true;
		}
		for (var i = 0; i < totMenu.length; i++) {
			var itm = totMenu[i];
			if(dato.tmenu_padre == itm.tmenu_nid ){
				itm.hijos.push({
					tmenu_nid: 	dato.tmenu_nid
					,tmenu_padre: 	dato.tmenu_padre
					,tmenu_text:	dato.tmenu_text
					,tmenu_uri: 	dato.tmenu_uri
					,tmenu_icon: 	dato.tmenu_icon
					,hijos: []
				});
				return  true;
			}else if (itm.hijos.length>0) {
				if (recuMenu(itm.hijos,dato))
					return  true;
			}
		};
		return false;
	}
	let _dowMenu  =  (tipo_) =>{
		$http({
			method: 'POST',
			url: '/post/getmenu',
			data:{
				tipo: tipo_
			}
		}).success(function(respuesta){
			menu[tipo_] = {};
			let temData=[];
			if (respuesta.tipo == 'ok') {
				for (let rid in respuesta.data) {
					let dato = respuesta.data[rid];
					if (!recuMenu(temData,dato)) {
						console.log("NO SE ENCONTRO DATO: ");
						console.log(dato);
					};
				};
				if (temData.length>0) {
					menu[tipo_] = temData;
				};
			}else{
				delete menu[tipo_];
			}
		});
	};
	let dowPerfiles = (sts)=>{
		$http({
			method: 'POST',
			url: '/post/getPerfiles',
			data:{
				estados: sts
			}
		}).success(function(respuesta){
			perfiles[sts] = {};
			let temData=[];
			if (respuesta.tipo == 'ok') {
				temData =respuesta.data;
				if (temData.length>0) {
					perfiles[sts] = temData;
				};
			}else{
				delete perfiles[sts];
			}
		});	
	};
	let getperfiles = (estados)=>{
		let _perfiles = {};
		if(Object.keys(perfiles).length > 0){
			if(estados in perfiles){
				return perfiles[estados];
			}else{
				perfiles[estados] = [];
				dowPerfiles(estados);
				return [];
			}
		}
	};
	return {
		getMenu: function (tipo) {
			if(tipo in menu){
				return menu[tipo];
			}else{
				return [];
			}
		},
		dowMenu: _dowMenu,
		secureGet: (tipo)=>{
			if(tipo in menu){
				return menu[tipo];
			}else{
				menu[tipo] = [];
				_dowMenu(tipo);
				return [];
			}
		},
		getPerfiles: getperfiles,
		saludar: ()=>{
			console.log("Hey un saludo desde el comunicador");
		}
	}
}];
export default Comunicator 