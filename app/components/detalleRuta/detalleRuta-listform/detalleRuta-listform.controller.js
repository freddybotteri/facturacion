'use strict'
class detalleRutaListformController {
	constructor (notify,$window,detalleRutaService,$stateParams,$timeout) {
		'ngInject';
		this.notify = notify
		this.$window = $window
		this.$timeout = $timeout
		this.$stateParams = $stateParams
		this.detalleRutaService = detalleRutaService
		this.ListaClientes = {}
		this.ListaRutas = {}
		this.ListadetalleRutas = {}
		this.rutaSelected = 0

		this.rutaIdAcual =""
		this.nombreRuta = ""
		this.data={
			drut_id:0, 
			rut_id:"",
			cli_id:1,
			drut_diasvis:"",
			drut_horapref:"", 
			drut_observacion:"",
			emp_id:""
		}
		this.dias={
			lunes:false,
			martes:false,
			miercoles:false,
			jueves:false,
			viernes:false,
			sabado:false,
			domingo:false
		}
		this.visible = false
		this.arr = []
		this.uniqueArray = []//para guardar los clientes que no estan ya en esta ruta
		this.diasHabiles = ""
		this.modal = ""
		this.modalMap = ""
		this.modalMapGeocerca = ""
		this.modalListaGeocerca = ""
		this.idRuta = ""
		this.CliSel = ""
		this.ListaCliLlena = {}
		this.textCli = ""
	}
		activeModal(){
			this.modal = "is-active"
		}
		cerrarModal(){
			this.modal = ""
		}
		cerrarModalMap(){
			this.modalMap = ""
		}
		activeModalMap(){
			this.modalMap = "is-active"
					//this.$window.mapReady = (map)=> {
						for(let actLL in this.ListadetalleRutas){
							let cordenadas={
								latitude: this.ListadetalleRutas[actLL].cli_latitud,
								longitude: this.ListadetalleRutas[actLL].cli_longitud
							}
							this.$timeout(function () {
								document.getElementById('mapFrameMap').contentWindow.setMarker(-1,cordenadas,'/img/clientes.png',"");	
							}, 300);
							
						}
					//}
			//document.getElementById('mapFrame').contentWindow.setMarker(0,this.latLng,'');
		}
		cerrarModalMapGeocerca(){
			this.modalMapGeocerca = ""
			this.activemodalListaGeocerca()
		}
		activeModalMapGeocerca(){
			this.modalMapGeocerca = "is-active"
			//this.$window.mapReady = (map)=> {
				for(let actCli in this.ListaCliLlena){
					let cordenadasCli={
						latitude: this.ListaCliLlena[actCli].cli_latitud,
						longitude: this.ListaCliLlena[actCli].cli_longitud
					}
					this.$timeout(function () {
						document.getElementById('mapFrameGeocerca').contentWindow.setMarker(-1,cordenadasCli,'/img/clientes.png',"");	
					}, 300);
					
				}
			//}
		}
		cerrarmodalListaGeocerca(){
			this.modalListaGeocerca = ""
			this.uniqueArray = []
		}
		activemodalListaGeocerca(){
			this.modalListaGeocerca = "is-active"
			//comparar si existe ya en ruta un cliente de la geocerca.

		}
		deleteList(cli){
			//para borrar un cliente de la lista de la geocerca
			
			for(let ind in this.uniqueArray){
				if(this.uniqueArray[ind].cli_id == cli.cli_id){
					delete this.uniqueArray[ind]
				}
			}
		}
		LimpiarGeo(){
			this.activeModalMapGeocerca()
			this.uniqueArray = []
		}
		seleccionarCli(id,nombre){
			this.CliSel = id +" "+ nombre
			this.data.cli_id = id
			this.modal = ""
		}
		$onInit() {

			this.idRuta = this.$stateParams.idRuta
			this.detalleRutaService.FKCliente().success((response) => {
				this.ListaClientes = response.data
				this.ListaCliLlena = response.data
			});
			this.detalleRutaService.FKRuta().success((response) => {
				this.ListaRutas = response.data
			});
			this.latLng = {
				latitude: 15.5119,
				longitude: -88.0238
			}
			this.$window.onClickMap = (datos)=> {
					console.log(datos.lat())
					this.latLng.latitude = datos.lat();
					this.latLng.longitude = datos.lng();
					document.getElementById('mapFrameGeocerca').contentWindow.setMarker(0,this.latLng,'');
			};
			//funcion que recibe del mapa los clientes dentro de una geocerca
			this.$window.DescriminarCliente = (enGeocerca)=>{
				let that = this
				this.uniqueArray = []
				console.log(that.ListadetalleRutas)
				if(that.ListadetalleRutas[0] != undefined){
					/*this.uniqueArray = enGeocerca.filter(function(item) {
						for(let index in that.ListadetalleRutas){
							console.log(item.cli_id + " == " + that.ListadetalleRutas[index].cli_id )
							console.log(item.cli_id.toString().indexOf(that.ListadetalleRutas[index].cli_id))
							if(item.cli_id.toString().indexOf(that.ListadetalleRutas[index].cli_id) === -1){
								return true	
							}
						}
						
					});*/
					for(let enGeo in enGeocerca){
						for(let index in this.ListadetalleRutas){	
							if(this.ListadetalleRutas[index].cli_id === enGeocerca[enGeo].cli_id){
									delete enGeocerca[enGeo]
									break
							}else{
							}
						}
					}	
					this.uniqueArray = enGeocerca	
				}else{
					this.uniqueArray = enGeocerca
				}
				
            	console.log("unique array")
				console.log(this.uniqueArray)
			}
		}
		elegirDia (dia){
			switch(dia){
				case "lunes":
					this.dias.lunes = !this.dias.lunes
					break;
				case "martes":
					this.dias.martes = !this.dias.martes
					break;
				case "miercoles":
					this.dias.miercoles = !this.dias.miercoles
					break;
				case "jueves":
					this.dias.jueves = !this.dias.jueves
					break;
				case "viernes":
					this.dias.viernes = !this.dias.viernes
					break;
				case "sabado":
					this.dias.sabado = !this.dias.sabado
					break;
				case "domingo":
					this.dias.domingo = !this.dias.domingo
					break;
				case "todo":
					this.dias.lunes = true
					this.dias.martes = true
					this.dias.miercoles = true
					this.dias.jueves = true
					this.dias.viernes = true
					this.dias.sabado = true	
					this.dias.domingo = true
					break;
				case "ninguno":
					this.dias.lunes = false
					this.dias.martes = false
					this.dias.miercoles = false
					this.dias.jueves = false
					this.dias.viernes = false
					this.dias.sabado = false	
					this.dias.domingo = false
					break;
			}
			this.diasHabiles = Number(this.dias.lunes)+" "+Number(this.dias.martes)+" "+Number(this.dias.miercoles)+" "+Number(this.dias.jueves)+" "+Number(this.dias.viernes)+" "+Number(this.dias.sabado)+" "+Number(this.dias.domingo)
		}
		elegirDiaLista (dia,model){
			switch(dia){
				case "lunes":
					model.lunes = !model.lunes
					break;
				case "martes":
					model.martes = !model.martes
					break;
				case "miercoles":
					model.miercoles = !model.miercoles
					break;
				case "jueves":
					model.jueves = !model.jueves
					break;
				case "viernes":
					model.viernes = !model.viernes
					break;
				case "sabado":
					model.sabado = !model.sabado
					break;
				case "domingo":
					model.domingo = !model.domingo
					break;
				case "todo":
					model.lunes = true
					model.martes = true
					model.miercoles = true
					model.jueves = true
					model.viernes = true
					model.sabado = true	
					model.domingo = true
					break;
				case "ninguno":
					model.lunes = false
					model.martes = false
					model.miercoles = false
					model.jueves = false
					model.viernes = false
					model.sabado = false	
					model.domingo = false
					break;
			}
			model.diasHabiles = Number(model.lunes)+" "+Number(model.martes)+" "+Number(model.miercoles)+" "+Number(model.jueves)+" "+Number(model.viernes)+" "+Number(model.sabado)+" "+Number(model.domingo)
		}
		cargadetalleRuta(){

			this.detalleRutaService.listardetalleRuta(this.idRuta).success((response) => {
				this.ListadetalleRutas = response.data
					this.$window.mapReady = (map)=> {
						document.getElementById('mapFrameGeocerca').contentWindow.setLocationForm("geocerca",this.ListaCliLlena);
						for(let actLL in this.ListadetalleRutas){
							let cordenadas={
								latitude: this.ListadetalleRutas[actLL].cli_latitud,
								longitude: this.ListadetalleRutas[actLL].cli_longitud
							}
							this.$timeout(function () {
								document.getElementById('mapFrameMap').contentWindow.setMarker(-1,cordenadas,'/img/clientes.png',"");	
							}, 300);
							
						}
						for(let actCli in this.ListaCliLlena){
							let cordenadasCli={
								latitude: this.ListaCliLlena[actCli].cli_latitud,
								longitude: this.ListaCliLlena[actCli].cli_longitud
							}
							this.$timeout(function () {
								document.getElementById('mapFrameGeocerca').contentWindow.setMarker(-1,cordenadasCli,'/img/clientes.png',"");	
							}, 300);
							
						}
					}	
			})
		}
		asigRuta(rutaId){
			this.rutaIdAcual = rutaId.rut_id
			this.nombreRuta = rutaId.rutNombre
			this.visible = true
		}
		busquedaCli(){
			let that = this
			let arrPorID	=	this.ListaCliLlena.filter(function(item) {
				return item.cli_nombre.indexOf(that.textCli) > -1
			});
			this.ListaClientes = arrPorID

		}
		btnGuardarLista(lista){
			console.log(this.uniqueArray)
			let clienteDetalleRuta = {}
			let saveNum = 0
			this.modalListaGeocerca = ""
			let rutNombre = ""
				let cliNombre = ""
				let lon = 0
				let lat = 0
				for (let rutD in this.ListaRutas) { 
					if(this.ListaRutas[rutD].rut_id == this.data.rut_id){
						rutNombre = this.ListaRutas[rutD].rut_nombre 
					}
				}
			for(let listaCli in this.uniqueArray){
				cliNombre = this.uniqueArray[listaCli].cli_nombre
				for (let cliD in this.ListaClientes) { 
					if(this.ListaClientes[cliD].cli_id == this.uniqueArray[listaCli].cli_id){ 
						lon = this.ListaClientes[cliD].cli_longitud
						lat = this.ListaClientes[cliD].cli_latitud
					}
				}
				delete this.uniqueArray[listaCli].cli_nombre
				delete this.uniqueArray[listaCli].lunes
				delete this.uniqueArray[listaCli].martes
				delete this.uniqueArray[listaCli].miercoles
				delete this.uniqueArray[listaCli].jueves
				delete this.uniqueArray[listaCli].viernes
				delete this.uniqueArray[listaCli].sabado
				delete this.uniqueArray[listaCli].domingo
				this.uniqueArray[listaCli].drut_diasvis = this.uniqueArray[listaCli].diasHabiles
				delete this.uniqueArray[listaCli].diasHabiles
				this.uniqueArray[listaCli].rut_id = this.idRuta
				this.detalleRutaService.guardardetalleRuta(this.uniqueArray[listaCli]).success((data)=>{
					console.log("Ya entro")			
					if(data.sts == 'ok'){
						//compruebo si es una insercion o una actualizacion
						//y dependiendo actualizao en local lista o agrego un mas.
						if(data.datos.insertId == 0){
							for (let dtRuta in this.ListadetalleRutas) { 
								if(this.ListadetalleRutas[dtRuta].drut_id == this.uniqueArray[listaCli].drut_id){
									
									this.ListadetalleRutas[dtRuta].drut_id 			=this.uniqueArray[listaCli].drut_id 
									this.ListadetalleRutas[dtRuta].rut_id			=parseInt(this.uniqueArray[listaCli].rut_id)
									this.ListadetalleRutas[dtRuta].cli_id			=parseInt(this.uniqueArray[listaCli].cli_id)
									this.ListadetalleRutas[dtRuta].drut_diasvis		=this.uniqueArray[listaCli].drut_diasvis
									this.ListadetalleRutas[dtRuta].drut_horapref	=this.uniqueArray[listaCli].drut_horapref 
									this.ListadetalleRutas[dtRuta].drut_observacion	=this.uniqueArray[listaCli].drut_observacion
									this.ListadetalleRutas[dtRuta].emp_id			=this.uniqueArray[listaCli].emp_id
									this.ListadetalleRutas[dtRuta].rut_nombre		=rutNombre
									this.ListadetalleRutas[dtRuta].cli_nombre		=cliNombre
									this.ListadetalleRutas[dtRuta].cli_longitud		=lon
									this.ListadetalleRutas[dtRuta].cli_latitud		=lat
								}
							}	
						}else{
							this.ListadetalleRutas.push({
									drut_id			:data.datos.insertId, 
									rut_id			:parseInt(this.uniqueArray[listaCli].rut_id),
									cli_id			:parseInt(this.uniqueArray[listaCli].cli_id),
									drut_diasvis	:this.uniqueArray[listaCli].drut_diasvis,
									drut_horapref	:this.uniqueArray[listaCli].drut_horapref, 
									drut_observacion:this.uniqueArray[listaCli].drut_observacion,
									emp_id			:this.uniqueArray[listaCli].emp_id,
									rut_nombre		:rutNombre,
									cli_nombre		:cliNombre,
									cli_longitud	:lon,
									cli_latitud		:lat
							});
							this.uniqueArray[listaCli].drut_id = 	data.datos.insertId			
						}
						saveNum++
					}else if(data.sts == 'fail'){
							switch(data.erro.code){
								case 'ER_DUP_ENTRY':
									this.notify.show('ERROR:Ruta ya existente')
									break;
								default:
									this.notify.show('ERROR:Problema en el servidor.')
									break;
							}
					}
					if(saveNum >= 1){
						this.notify.show('GUARDADO EXITOSAMENTE...')
					}
				}).catch((err)=>{
					console.log(err)
				})
			}
		}
		btnAgregar () {
			this.data.drut_diasvis = this.diasHabiles
			this.data.rut_id = this.idRuta
			this.detalleRutaService.guardardetalleRuta(this.data).success((data)=>{			
				if(data.sts == 'ok'){
					let rutNombre = ""
					let cliNombre = ""
					let lon = 0
					let lat = 0
					//Buscar en la lista de empresa el nombre 
					//ya que al momento de retornar un ingreso estos no vienen.
					for (let rutD in this.ListaRutas) { 
						if(this.ListaRutas[rutD].rut_id == this.data.rut_id){
							rutNombre = this.ListaRutas[rutD].rut_nombre 
						}
					}
					for (let cliD in this.ListaClientes) { 
						if(this.ListaClientes[cliD].cli_id == this.data.cli_id){
							cliNombre = this.ListaClientes[cliD].cli_nombre 
							lon = this.ListaClientes[cliD].cli_longitud
							lat = this.ListaClientes[cliD].cli_latitud
						}
					}
					//compruebo si es una insercion o una actualizacion
					//y dependiendo actualizao en local lista o agrego un mas.
					if(data.datos.insertId == 0){
						for (let dtRuta in this.ListadetalleRutas) { 
							if(this.ListadetalleRutas[dtRuta].drut_id == this.data.drut_id){
								
								this.ListadetalleRutas[dtRuta].drut_id 			=this.data.drut_id 
								this.ListadetalleRutas[dtRuta].rut_id			=parseInt(this.data.rut_id)
								this.ListadetalleRutas[dtRuta].cli_id			=parseInt(this.data.cli_id)
								this.ListadetalleRutas[dtRuta].drut_diasvis		=this.data.drut_diasvis
								this.ListadetalleRutas[dtRuta].drut_horapref	=this.data.drut_horapref 
								this.ListadetalleRutas[dtRuta].drut_observacion	=this.data.drut_observacion
								this.ListadetalleRutas[dtRuta].emp_id			=this.data.emp_id
								this.ListadetalleRutas[dtRuta].rut_nombre		=rutNombre
								this.ListadetalleRutas[dtRuta].cli_nombre		=cliNombre
								this.ListadetalleRutas[dtRuta].cli_longitud		=lon
								this.ListadetalleRutas[dtRuta].cli_latitud		=lat
							}
						}	
					}else{
						this.ListadetalleRutas.push({
								drut_id			:data.datos.insertId, 
								rut_id			:parseInt(this.data.rut_id),
								cli_id			:parseInt(this.data.cli_id),
								drut_diasvis	:this.data.drut_diasvis,
								drut_horapref	:this.data.drut_horapref, 
								drut_observacion:this.data.drut_observacion,
								emp_id			:this.data.emp_id,
								rut_nombre		:rutNombre,
								cli_nombre		:cliNombre,
								cli_longitud	:lon,
								cli_latitud		:lat
						});
						this.data.drut_id = 	data.datos.insertId			
					}
					this.notify.show('GUARDADO EXITOSAMENTE...')
				}else if(data.sts == 'fail'){
					switch(data.erro.code){
						case 'ER_DUP_ENTRY':
							this.notify.show('ERROR:Campos ya existestentes')
							break;
						default:
							this.notify.show('ERROR:Problema en el servidor.')
							break;
					}
				}
			}).catch((err)=>{
				console.log(err)
			})
		}

		fechaDatetime(fecha){
			try{
				var vini = new Date(fecha);
				var newvini = new Date(vini);
				newvini.setHours(vini.getHours() - 6);
				var n = newvini.toISOString().split('.')[0].replace('T',' ');
				return vini;
			}catch(err){
				console.log(err);
			}
		}
		upddetalleRuta(detalleRuta){
			let dt = detalleRuta
			this.visible = true
			this.data={
				drut_id:dt.drut_id, 
				rut_id:parseInt(dt.rut_id),
				cli_id:parseInt(dt.cli_id),
				drut_diasvis:dt.drut_diasvis,
				drut_horapref:this.fechaDatetime(dt.drut_horapref), 
				drut_observacion:dt.drut_observacion,
				emp_id:parseInt(dt.emp_id)
			}
			this.CliSel = parseInt(dt.cli_id) + "-"+dt.cli_nombre
			let diasS = dt.drut_diasvis.split(" ")
			this.dias.lunes = Number(diasS[0])==1?true:false
			this.dias.martes = Number(diasS[1])==1?true:false
			this.dias.miercoles = Number(diasS[2])==1?true:false
			this.dias.jueves = Number(diasS[3])==1?true:false
			this.dias.viernes = Number(diasS[4])==1?true:false
			this.dias.sabado = Number(diasS[5])==1?true:false
			this.dias.domingo = Number(diasS[6])==1?true:false
			/*{
				lunes:diasS[0],
				martes:diasS[1],
				miercoles:diasS[2],
				jueves:diasS[3],
				viernes:diasS[4],
				sabado:diasS[5],
				domingo:diasS[6]
			}*/
		}
		eliminarClientedeRuta(id){
			this.detalleRutaService.deleteCli(id,this.idRuta).success((response) => {
				if(response.sts == 'ok'){
					for(let it in this.ListadetalleRutas){
						if(this.ListadetalleRutas[it].cli_id == id && this.ListadetalleRutas[it].rut_id == this.idRuta){
							delete this.ListadetalleRutas[it]
						}
					}
					this.notify.show('Eliminado correctamente...')
				}else if(response.sts == 'fail'){
					switch(response.erro.code){
						case 'ER_DUP_ENTRY':
							this.notify.show('ERROR:Campos ya existente')
							break;
						default:
							this.notify.show('ERROR:Problema en el servidor.')
							break;
					}
				}
			});
		}
		mostrarForm(){
			this.visible = !this.visible
		}
		btnLimpiar (form) {
			this.data = {
				drut_id:0, 
				rut_id:"",
				cli_id:1,
				drut_diasvis:"",
				drut_horapref:"", 
				drut_observacion:"",
				emp_id:""
			}
			this.dias={
				lunes:false,
				martes:false,
				miercoles:false,
				jueves:false,
				viernes:false,
				sabado:false,
				domingo:false
			}
			form.$setPristine();
	}
}
export default detalleRutaListformController