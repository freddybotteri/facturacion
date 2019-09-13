"use strict"
import controller from './selectorGrupo_controller'
const selectorGrupo = {  
	bindings: {
		tipe: '=',
		salida:'=',
		update:'<'//viene desde el controlador de producto
	},
	controller,
	templateUrl:'/selectorGrupo/index' 
};
export default selectorGrupo

/*
salida : para  que funcione, el padre debe enviar un arreglo para manejar las opciones
seleccionadas, se debe luego boorar gru_id(esto por la forma de guardarlo),

tipe : tambien el tipo de pade que lo usara (producto,vendedor, cientes etc)

update : este envia el id del producto, vendedoretc, esto con el proposito,
de consultar las opciones ya seleccionadas anteriormente.
*/