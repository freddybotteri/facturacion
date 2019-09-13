'use strict'
class clienteListformController {
	constructor (notify,$window,clienteService,$timeout) {
		'ngInject';
		this.notify = notify
		this.$window = $window
		this.$timeout = $timeout
		this.clienteService = clienteService
		this.ListaRutas = {}
		this.ListarClientes = {}
		this.data={
			cli_id		:0,
			cli_nombre	:"",
			cli_codigo	:"",
			cli_direccion:"", 
			cli_tel		:"",
			cli_zona	:"", 
			cli_longitud:"", 
			cli_latitud	:"", 
			cli_rtn		:"",
			cli_sts		:1,
			emp_id:""
		}
		this.visible = false
		this.modal = ""
		this.latLng = {
				latitude: 15.5119,
				longitude: -88.0238
		};
		
	}
		$onInit() {
			this.latLng = {
				latitude: 15.5119,
				longitude: -88.0238
			};
			//funcion global para poder usarla en el controller de mapa.
			this.$window.mapReady = (map)=> {
					if(this.latLng.latitude != 0.0 && this.latLng.longitude != 0.0){
						this.$timeout(function(){
							document.getElementById('mapFrame').contentWindow.setLocationForm("cliente");
							document.getElementById('mapFrame').contentWindow.setMarker(0,this.latLng,'/img/clientes.png');
						}, 500);
					}
			};
			this.$window.onClickMap = (datos)=> {
					this.latLng.latitude = datos.lat();
					this.latLng.longitude = datos.lng();
					this.data.cli_longitud = datos.lng();
					this.data.cli_latitud = datos.lat();
					document.getElementById('mapFrame').contentWindow.setMarker(0,this.latLng,'/img/clientes.png');
			};
		}
		cargaClientes(){
			this.clienteService.listarCliente().success((response) => {
				console.log(response)
				this.ListarClientes = response.data
			});
		}
		btnAgregar () {
		console.log(this.data)
		this.clienteService.guardarCliente(this.data).success((data)=>{			
			if(data.sts == 'ok'){
				//compruebo si es una insercion o una actualizacion
				//y dependiendo actualizao en local lista o agrego un mas.
				if(data.datos.insertId == 0){
					for (let clien in this.ListarClientes) { 
						if(this.ListarClientes[clien].cli_id == this.data.cli_id){
							this.ListarClientes[clien].cli_id = this.data.cli_id
							this.ListarClientes[clien].cli_nombre	=	this.data.cli_nombre
							this.ListarClientes[clien].cli_codigo	=	this.data.cli_codigo
							this.ListarClientes[clien].cli_direccion=	this.data.cli_direccion 
							this.ListarClientes[clien].cli_tel		=	this.data.cli_tel
							this.ListarClientes[clien].cli_zona		=	this.data.cli_zona 
							this.ListarClientes[clien].cli_longitud	=	this.data.cli_longitud 
							this.ListarClientes[clien].cli_latitud	=	this.data.cli_latitud  
							this.ListarClientes[clien].cli_rtn		=	this.data.cli_rtn
							this.ListarClientes[clien].cli_sts		=	this.data.cli_sts
							this.ListarClientes[clien].emp_id		=	""
						}
					}	
				}else{
					this.ListarClientes.push({
	    					cli_id		:data.datos.insertId,
							cli_nombre	:this.data.cli_nombre,
							cli_codigo	:this.data.cli_codigo,
							cli_direccion:this.data.cli_direccion, 
							cli_tel		:this.data.cli_tel,
							cli_zona	:this.data.cli_zona, 
							cli_longitud:this.data.cli_longitud, 
							cli_latitud	:this.data.cli_latitud, 
							cli_rtn		:this.data.cli_rtn,
							cli_sts		:this.data.cli_sts,
							emp_id		:""
					});
					this.data.cli_id = 	data.datos.insertId			
				}
				this.notify.show('GUARDADO EXITOSAMENTE...')
			}else if(data.sts == 'fail'){
				switch(data.erro.code){
					case 'ER_DUP_ENTRY':
						this.notify.show('ERROR:El nombre de la granja ya existe')
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
		updCliente(cliente){
			this.visible = true
			this.data={
				cli_id		:cliente.cli_id,
				cli_nombre	:cliente.cli_nombre,
				cli_codigo	:cliente.cli_codigo,
				cli_direccion:cliente.cli_direccion, 
				cli_tel		:cliente.cli_tel,
				cli_zona	:cliente.cli_zona, 
				cli_longitud:parseInt(cliente.cli_longitud), 
				cli_latitud	:parseInt(cliente.cli_latitud),  
				cli_rtn		:cliente.cli_rtn,
				cli_sts		:cliente.cli_sts,
				emp_id		:""
			}
			this.latLng = {
				latitude: cliente.cli_latitud,
				longitude:cliente.cli_longitud
			};
		}
		mostrarForm(){
			this.visible = !this.visible
		}
		activeModal(){
			this.modal = "is-active"
			document.getElementById('mapFrame').contentWindow.setMarker(0,this.latLng,'/img/clientes.png');
		}
		cerrarModal(){
			this.modal = ""
		}
		btnLimpiar (form) {
			this.data = {
				cli_id		:0,
				cli_nombre	:"",
				cli_codigo	:"",
				cli_direccion:"", 
				cli_tel		:"",
				cli_zona	:"", 
				cli_longitud:"", 
				cli_latitud	:"", 
				rut_id		:"", 
				cli_rtn		:"",
				cli_sts		:1,
				emp_id		:""
			}
			form.$setPristine();
	}
}
export default clienteListformController