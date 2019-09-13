class productoListformController {
	constructor (notify,$window,productoService) {
		'ngInject';
		this.notify = notify
		this.$window = $window
		this.productoService = productoService
		this.ListaEmpresas = {}
		this.ListaProductos = {}
		/*
		 prod_id, 
		 prod_nombre, 
		 prod_familia, 
		 prod_subproducto, 
		 prod_subcant, 
		 prod_sts, 
		 emp_id, 
		 prod_aplicaImp 
		 */ 

		this.data={
			prod_id:0, 
			prod_nombre:"", 
			prod_familia:0, 
			prod_subproducto:"", 
			prod_subcant:"", 
			prod_sts:1, 
			emp_id:"",
			prod_aplicaImp:1
		}
		this.visible = false
		this.modal = ""
		this.desdeComp = ""
		this.complementos = []
		this.ListaFamilia = []
		this.updateComplementos = 0

	}
		$onInit() {
			this.productoService.FKEmpresa().success((response) => {
				this.ListaEmpresas = response.data
			});
			this.productoService.FKFamilia().success((response) => {
				this.ListaFamilia = response.data
			});
		}
		cargaProductos(){
			this.productoService.listarProductos().success((response) => {
				this.ListaProductos = response.data
			});
		}
		btnAgregar () {
		for(let fr in this.complementos){
			delete this.complementos[fr].gru_id
		}
		console.log(this.complementos)
		this.productoService.guardarProducto(this.data,this.complementos).success((data)=>{			
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
					for (let prod in this.ListaProductos) { 
						if(this.ListaProductos[prod].prod_id == this.data.prod_id){

							this.ListaProductos[prod].prod_id		= this.data.prod_id
							this.ListaProductos[prod].prod_nombre	= this.data.prod_nombre 
							this.ListaProductos[prod].prod_familia  = this.data.prod_familia
							this.ListaProductos[prod].prod_subproducto = this.data.prod_subproducto
							this.ListaProductos[prod].prod_subcant	= this.data.prod_subcant
							this.ListaProductos[prod].prod_sts		= this.data.prod_sts
							this.ListaProductos[prod].emp_id		= parseInt(this.data.emp_id)
							this.ListaProductos[prod].prod_aplicaImp = this.data.prod_aplicaImp
							this.ListaProductos[prod].emp_nombre 	= empNombre 
						}
					}	
				}else{
					this.ListaProductos.push({
								prod_id 		:data.datos.insertId, 
								prod_nombre 	:this.data.prod_nombre, 
								prod_familia 	:this.data.prod_familia, 
								prod_subproducto:this.data.prod_subproducto, 
								prod_subcant 	:this.data.prod_subcant, 
								prod_sts 		:this.data.prod_sts, 
								emp_id 			:parseInt(this.data.emp_id),
								prod_aplicaImp 	:this.data.prod_aplicaImp,
								emp_nombre		:empNombre
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
		updProducto(producto){
			this.visible = true
			this.data={
				prod_id 		:producto.prod_id, 
				prod_nombre 	:producto.prod_nombre, 
				prod_familia 	:producto.prod_familia, 
				prod_subproducto:producto.prod_subproducto, 
				prod_subcant 	:producto.prod_subcant, 
				prod_sts 		:producto.prod_sts, 
				emp_id 			:parseInt(producto.emp_id),
				prod_aplicaImp 	:producto.prod_aplicaImp
			}
			this.updateComplementos = producto.prod_id
		}
		mostrarForm(){
			this.visible = !this.visible
		}
		btnLimpiar (form) {
			this.data = {
				prod_id:0, 
				prod_nombre:"", 
				prod_familia:0, 
				prod_subproducto:"", 
				prod_subcant:"", 
				prod_sts:1, 
				emp_id:"",
				prod_aplicaImp:1
			}
			this.updateComplementos = -1 
			form.$setPristine();
	}
}
export default productoListformController
