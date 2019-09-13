class proveedorListformController {
	constructor (notify,$window,proveedorService) {
		'ngInject';
		this.notify = notify
		this.$window = $window
		this.proveedorService = proveedorService
		this.Listaproveedores = {}
		this.ListaEmpresas = {}

		/*
		pve_id,
		pve_nombre,
		pve_ubicacion, 
		telefono, 
		emp_id 
		 */ 

		this.data={
			pve_id			:0,
			pve_nombre		:"",
			pve_ubicacion	:"", 
			telefono		:"", 
			emp_id 			:""
		}
		this.visible = false
		this.modal = ""
		this.desdeComp = ""
		this.complementos = []
		this.ListaFamilia = []
		this.updateComplementos = 0
	}
		$onInit() {
			/*this.proveedorService.FKEmpresa().success((response) => {
				this.ListaEmpresas = response.data
			});*/
		}
		cargaproveedores(){
			this.proveedorService.listarproveedores().success((response) => {
				this.Listaproveedores = response.data
			});
		}
		btnAgregar () {
		for(let fr in this.complementos){
			delete this.complementos[fr].gru_id
		}
		console.log(this.complementos)
		this.proveedorService.guardarproveedor(this.data,this.complementos).success((data)=>{			
			if(data.sts == 'ok'){
				let empNombre = ""
				//Buscar en la lista de empresa el nombre 
				//ya que al momento de retornar un ingreso estos no vienen.
				for (let emp in this.ListaEmpresas) { 
					if(this.ListaEmpresas[emp].emp_id == this.data.emp_id){
						empNombre = this.ListaEmpresas[emp].emp_nombre 
					}
				}
				//compruebo si es una insercion o una actualizacion
				//y dependiendo actualizao en local lista o agrego un mas.
				if(data.datos.insertId == 0){
					for (let pve in this.Listaproveedors) { 
						if(this.Listaproveedores[pve].prod_id == this.data.pve_id){ 

							this.Listaproveedores[pve].pve_id  		= this.data.pve_id
							this.Listaproveedores[pve].pve_nombre  	= this.data.pve_nombre
							this.Listaproveedores[pve].pve_ubicacion	= this.data.pve_ubicacion
							this.Listaproveedores[pve].telefono   	= this.data.telefono
							this.Listaproveedores[pve].emp_id		= this.data.emp_id
						}
					}	
				}else{
					this.Listaproveedores.push({
							pve_id  		: data.datos.insertId,
							pve_nombre  	: this.data.pve_nombre,
							pve_ubicacion	: this.data.pve_ubicacion,
							telefono   		: this.data.telefono,
							emp_id			: this.data.emp_id
					});
					this.data.prod_id = 	data.datos.insertId			
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
		updproveedor(proveedor){
			this.visible = true
			this.data={
				pve_id			:proveedor.pve_id,
				pve_nombre		:proveedor.pve_nombre,
				pve_ubicacion	:proveedor.pve_ubicacion, 
				telefono		:proveedor.telefono
			}
			this.updateComplementos = proveedor.pve_id
		}
		mostrarForm(){
			this.visible = !this.visible
		}
		btnLimpiar (form) {
			this.data = {
				pve_id			:0,
				pve_nombre		:"",
				pve_ubicacion	:"", 
				telefono		:"", 
				emp_id 			:""
			}
			this.updateComplementos = -1 
			form.$setPristine();
	}
}
export default proveedorListformController
