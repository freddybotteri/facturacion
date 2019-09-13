
class selectorGrupocontroller{  
	constructor(selectorGrupo,$timeout) {
		'ngInject'
		this.selectorGrupo = selectorGrupo;
		this.$timeout = $timeout;
		this.listaGrupos =[]
		this.ListaGruposLimpia = []
		this.ListaYaopciones = []

		this.modal = ""

		//datos para guardar complementos de un productp
		this.grupo
		this.opcion
	};
	$onInit(){
		this.selectorGrupo.listselectorGrupo(this.tipe).success((response) => {
			this.listaGrupos = response.data
			this.ListaGruposLimpia  = response.data
		});
	};
	$onChanges(changesObj) {
		if(this.update != 0){
			this.salida = []
			//Busco las opciones de los grupos que ese producto ya tiene asignadas
			this.selectorGrupo.listYaopciones(this.update,this.tipe).success((response) => {
				this.ListaYaopciones = response.data
				//comparo para marcar los complementos ya seleccionados
				for(let k in this.listaGrupos){
					delete this.listaGrupos[k].ya
				}
				this.listaGrupos = this.ListaGruposLimpia//la lista no deberia levar la clave ya
				let that = this
				let arrPorID = []
				for(let ii in that.ListaYaopciones){
						this.listaGrupos.filter(function(item) {
							if(item.gru_id.toString().indexOf(that.ListaYaopciones[ii].gru_id) > -1){
								item.ya = 1
							}else{
								if(item.ya == 1 || item.ya != null){
									if(item.ya == null){
										item.ya == 0
									}
								}else{
									item.ya = 0
								}
							} 
						})
				}
			});
		}
	}
	activeModal(grupo){
		this.grupo = grupo
			this.selectorGrupo.listopcionesGrupo(grupo).success((response) => {
				let listaYaopciones2 = this.ListaYaopciones
				this.listaopcionesGrupos = response.data
					for(let k in this.listaopcionesGrupos){
						delete this.listaopcionesGrupos[k].ya
					}
					//for para eliminar opcion de server si ya selecciono otra en salida 

					//######################################
					//primero ver que salida funcione bien.
					//tengo que sustituir listaYaopciones con los nuevos valores de salida
							//en teoria si sustituyo bien listaYa opciones seran marcadas de manera correcta.
							//listaYaopciones =/ salida
					//como hacer para que cuando este vacio no me marque otra vez las del servidor
					//######################################
					//busco el grupo y la opcion y las resplazo borrar y crearla
					if(this.salida[0] != undefined || this.salida[0] == 0){
						this.ListaYaopciones = []
						for(let b in this.salida){
							this.ListaYaopciones.push(this.salida[b])							
						}
					}
					/*if(this.salida[0] != undefined){
						for(let b in this.salida){
							for(let f in this.ListaYaopciones){
								if(this.ListaYaopciones[f].gru_id == this.salida[b].grupo){
									//en lugar de borrarlo le asigno los valores de salida
									//this.ListaYaopciones[f].ogru_id = this.salida[b].ogru_id
									delete this.ListaYaopciones[f]
								}
							}
						}
					}*/

					let that = this
					for(let ii in that.ListaYaopciones){
							this.listaopcionesGrupos.filter(function(item) {
								if(item.ogru_id.toString().indexOf(that.ListaYaopciones[ii].ogru_id) > -1){
									//si existe ya marcada pero se booro en accion anterior no aparece marcada
									/*if(that.salida[0] != undefined){
										for(let k in that.salida){
											//los que vengan desde la base si no estan selecconados los borro
											if(that.salida[k].seleccionado == 1){
												item.ya = 1
											}
										}
									}else{}*/
										item.ya = 1
									
								}else{
									if(item.ya == 1 || item.ya != null){
										if(item.ya == null){
											item.ya = 0
										}
									}else{
										item.ya = 0
									}
								} 
							})
					}
						//busco las opciones que fueron borradas en otras operaciones y si estan borradas no las ingreso
						if(this.salida[0] != undefined || this.salida[0] == 0){
							/*for(let op in this.ListaYaopciones){
								for(let ll in this.salida){
									if(this.salida[ll].seleccionado != 1){
										if(this.salida[ll].ogru_id == this.ListaYaopciones[op].ogru_id){
											console.log("asignando nuevos")
											this.salida.push({seleccionado:1,grupo:this.ListaYaopciones[op].gru_id,ogru_id:this.ListaYaopciones[op].ogru_id,detag_sujeto:0,detag_nombre:this.tipe})	
										}
									}	
								}
							}*/
						}else{
							for(let op in this.ListaYaopciones){
								this.salida.push({gru_id:this.ListaYaopciones[op].gru_id,ogru_id:this.ListaYaopciones[op].ogru_id,detag_sujeto:0,detag_nombre:this.tipe})	
							}
						}
						
					
				this.modal = "is-active"

			});
	}
	escogerOpcion(opcion){
		this.opcion = opcion
		if(this.salida[0] == 0){
			this.salida = [] 
		}
		for(let i in this.salida){
			if(this.salida[i].gru_id == this.grupo){
				this.salida.splice(i,1)
			}
		}
		this.salida.push({gru_id:this.grupo,ogru_id:opcion,detag_sujeto:0,detag_nombre:this.tipe})
		//recorro las opciones de un grupo 
		for(let o in this.listaopcionesGrupos){
			//busco para marcar una opcion y desmarcar las otras y si marca una ya seleccionada
			//la desmarca
			if(this.listaopcionesGrupos[o].ogru_id == this.opcion && this.listaopcionesGrupos[o].gru_id == this.grupo){
				if(this.listaopcionesGrupos[o].ya == 1){
					delete this.listaopcionesGrupos[o].ya

					//#############################3
					//si desmarco uno ya seleccionado lo elimino
					for(let j in this.salida){
						if(this.salida[j].ogru_id == this.listaopcionesGrupos[o].ogru_id){
							//delete this.salida[j]
							//this.salida.splice(0,j)
							this.salida.splice(j,1)
						}
					}
				}else{
					this.listaopcionesGrupos[o].ya = 1
				}
				
			}else if(this.listaopcionesGrupos[o].gru_id == this.grupo){
				delete this.listaopcionesGrupos[o].ya
			}
		}
		//si salida queda vacia luego de desmarcar 
		//todo le doy una propiedad para que no quede vacia
		if(this.salida[0] == undefined){
			this.salida[0] = 0 
		}
		//this.modal = ""
	}
	cerrarModal(){

				if(this.salida[0] != undefined || this.salida[0] == 0){
					this.ListaYaopciones = []
					for(let b in this.salida){
						this.ListaYaopciones.push(this.salida[b])							
					}
				}
				for(let k in this.listaGrupos){
					delete this.listaGrupos[k].ya
				}
		//###################################
					this.listaGrupos = this.ListaGruposLimpia//la lista no deberia levar la clave ya
					let that = this
					let arrPorID = []
					for(let ii in this.ListaYaopciones){
							this.listaGrupos.filter(function(item) {
								if(item.gru_id.toString().indexOf(that.ListaYaopciones[ii].gru_id) > -1){
									item.ya = 1
								}else{
									if(item.ya == 1 || item.ya != null){
										if(item.ya == null){
											item.ya == 0
										}
									}else{
										item.ya = 0
									}
								} 
							})
					}
					//###################################
		this.modal = ""
	}
}
export default selectorGrupocontroller