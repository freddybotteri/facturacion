class GranjaListController {
	constructor (granjaService,notify,socketIO) {
		'ngInject';
		this.granjaService = granjaService
		this.socketIO = socketIO
		this.notify = notify
		this.ListaEmpresas={}//para el select del form
		this.ListaGranja = {}
		this.data= {
			gran_id:0,
 			gran_nombre:"",
			gran_direccion:"",
	 		gran_ubicacion:"", 
	 		gran_contacto:"",
			gran_telefono:"",
			emp_id:"",
			gran_sts:0
		}
		this.visible = false
	}

	btnLimpiar () {
		this.data= {
			gran_id:0,
 			gran_nombre:"",
			gran_direccion:"",
	 		gran_ubicacion:"", 
	 		gran_contacto:"",
			gran_telefono:"",
			emp_id:"",
			gran_sts:0
		}
	}

	$onInit() {
      	this.granjaService.FKEmpresas().success((response) => {
      		this.ListaEmpresas = response.data
      	});
      	this.socketIO.init()

    }


	CargaGranjas (){
		this.granjaService.listaGranja().success((data)=>{
			console.log(data)
			if(data.tipo = "ok"){
				this.ListaGranja = data.data
			}else{
				notify.show('ERROR: No se cargaron las granjas.')
			}
		}).catch((err)=>{
			console.log(err)
		})
	}

	btnAgregar () {
		this.granjaService.guardarGranja(this.data).success((data)=>{
			if(data.sts == 'ok'){
				let empNombre = ""
				//Buscar en la lista de empresas y perfiles el nombre de ambos
				//ya que al momento de retornar un ingreso estos no vienen.
				for (let emp in this.ListaEmpresas) { 
					if(this.ListaEmpresas[emp].emp_id == this.data.emp_id){
						empNombre = this.ListaEmpresas[emp].emp_nombre 
					}
				}
				//compruebo si es una insercion o una actualizacion
				//y dependiendo actualizao en local lista o agrego un mas.
				if(data.datos.insertId == 0){
					for (let granL in this.ListaGranja) { 
						if(this.ListaGranja[granL].gran_id == this.data.gran_id){
				 			this.ListaGranja[granL].gran_nombre=this.data.gran_nombre
							this.ListaGranja[granL].gran_direccion=this.data.gran_direccion
					 		this.ListaGranja[granL].gran_ubicacion=this.data.gran_ubicacion
					 		this.ListaGranja[granL].gran_contacto=this.data.gran_contacto
							this.ListaGranja[granL].gran_telefono=this.data.gran_telefono
							this.ListaGranja[granL].emp_id=this.data.emp_id
							this.ListaGranja[granL].gran_sts=this.data.gran_sts
							this.ListaGranja[granL].emp_nombre=empNombre
						}
					}	
				}else{
					this.data.gran_id = data.datos.insertId
					this.ListaGranja.push({
						gran_id:this.data.gran_id,
	    				gran_nombre:this.data.gran_nombre,
						gran_direccion:this.data.gran_direccion,
				 		gran_ubicacion:this.data.gran_ubicacion,
				 		gran_contacto:this.data.gran_contacto,
						gran_telefono:this.data.gran_telefono,
						emp_id:this.data.emp_id,
						gran_sts:this.data.gran_sts,
						emp_nombre:empNombre
					});				
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

	updGran (granja){
		this.visible = true
		this.data = {
			gran_id:granja.gran_id,
 			gran_nombre:granja.gran_nombre,
			gran_direccion:granja.gran_direccion,
	 		gran_ubicacion:granja.gran_ubicacion, 
	 		gran_contacto:granja.gran_contacto,
			gran_telefono:granja.gran_telefono,
			emp_id:granja.emp_id,
			gran_sts:granja.gran_sts
		}
	}
	mostrarForm(){
			this.visible = !this.visible
			this.socketIO.emit('granjamensaje','mensaje')
		}
	btnLimpiar (form) {
		this.data= {
			gran_id:0,
 			gran_nombre:"",
			gran_direccion:"",
	 		gran_ubicacion:"", 
	 		gran_contacto:"",
			gran_telefono:"",
			emp_id:"",
			gran_sts:0
		}
		form.$setPristine();
	}
}
export default GranjaListController
