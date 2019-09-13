class rutaListformController {
	constructor (notify,$window,rutaService) {
		'ngInject';
		this.notify = notify
		this.$window = $window
		this.rutaService = rutaService
		this.ListaEmpresas = {}
		this.ListaBodegas = {}
		this.ListaVendedores = {}
		this.ListaRutas = {}

		/*
		rut_id,
		emp_id,
		rut_nombre, 
		ven_id, 
		bod_id, 
		rut_vehi */ 

		this.data={
			rut_id:0,
			emp_id:"",
			rut_nombre:"", 
			ven_id:"", 
			bod_id:"", 
			rut_vehi:""
		}
		this.visible = false
		this.modal = ""
	}
		$onInit() {
			this.rutaService.FKEmpresa().success((response) => {
				this.ListaEmpresas = response.data
			});
			this.rutaService.FKBodega().success((response) => {
				this.ListaBodegas = response.data
			});
			this.rutaService.FKVendedor().success((response) => {
				this.ListaVendedores = response.data
			});
		}
		cargaRutas(){
			this.rutaService.listarRuta().success((response) => {
				this.ListaRutas = response.data
			});
		}
		btnAgregar () {
		this.rutaService.guardarRuta(this.data).success((data)=>{			
			if(data.sts == 'ok'){
				let empNombre = ""
				let bodNombre = ""
				let venNombre = ""
				//Buscar en la lista de empresa,bodega,vendedor el nombre 
				//ya que al momento de retornar un ingreso estos no vienen.
				for (let emp in this.ListaEmpresas) { 
					if(this.ListaEmpresas[emp].emp_id == this.data.emp_id){
						empNombre = this.ListaEmpresas[emp].emp_nombre 
					}
				}
				for (let bod in this.ListaBodegas) { 
					if(this.ListaBodegas[bod].bod_id == this.data.bod_id){
						bodNombre = this.ListaBodegas[bod].bod_nombre 
					}
				}
				for (let vend in this.ListaVendedores) { 
					if(this.ListaVendedores[vend].ven_id == this.data.ven_id){
						venNombre = this.ListaVendedores[vend].ven_nombre 
					}
				}
				//compruebo si es una insercion o una actualizacion
				//y dependiendo actualizao en local lista o agrego un mas.
				if(data.datos.insertId == 0){
					for (let ruta in this.ListaRutas) { 
						if(this.ListaRutas[ruta].rut_id == this.data.rut_id){
							
							this.ListaRutas[ruta].rut_id 		= this.data.rut_id
							this.ListaRutas[ruta].emp_id 		= parseInt(this.data.emp_id)
							this.ListaRutas[ruta].rut_nombre 	= this.data.rut_nombre 
							this.ListaRutas[ruta].ven_id 		= parseInt(this.data.ven_id)
							this.ListaRutas[ruta].bod_id 		= parseInt(this.data.bod_id)
							this.ListaRutas[ruta].rut_vehi 		= this.data.rut_vehi
							this.ListaRutas[ruta].bod_nombre 	= bodNombre
							this.ListaRutas[ruta].emp_nombre 	= empNombre 
							this.ListaRutas[ruta].ven_nombre 	= venNombre
						}
					}	
				}else{
					this.ListaRutas.push({
							rut_id		:data.datos.insertId,
							emp_id		:this.data.emp_id,
							rut_nombre	:this.data.rut_nombre, 
							ven_id		:this.data.ven_id, 
							bod_id		:this.data.bod_id, 
							rut_vehi	:this.data.rut_vehi,
							emp_nombre	:empNombre,
							bod_nombre	:bodNombre,
							ven_nombre	:venNombre
					});
					this.data.rut_id = 	data.datos.insertId			
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
		updRuta(ruta){
			this.visible = true
			this.data={
				rut_id:ruta.rut_id,
				emp_id:parseInt(ruta.emp_id),
				rut_nombre:ruta.rut_nombre, 
				ven_id:parseInt(ruta.ven_id), 
				bod_id:parseInt(ruta.bod_id), 
				rut_vehi:ruta.rut_vehi
			}
		}
		mostrarForm(){
			this.visible = !this.visible
		}
		btnLimpiar (form) {
			this.data = {
				rut_id:0,
				emp_id:"",
				rut_nombre:"", 
				ven_id:"", 
				bod_id:"", 
				rut_vehi:""
			}
			form.$setPristine();
	}
}
export default rutaListformController
