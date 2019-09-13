class vendedorListformController {
	constructor (vendedorService,notify) {
		'ngInject';
		this.vendedorService = vendedorService
		this.notify = notify
		this.ListaVendedores={}
		this.ListaEmpresas = {}
		this.ListaUsuarios = {}
		this.data = {
			ven_id:0,
			ven_nombre:"",
			ven_codigo:"",
			ven_identidad:"",
			ven_direccion:"", 
			ven_sts:1,
			emp_id:"",
			user_id:""
		}
		this.visible = false
	}

	$onInit() {
		this.vendedorService.FKEmpresas().success((response) => {
			this.ListaEmpresas = response.data
		});
		this.vendedorService.FKUsuarios().success((response) => {
			this.ListaUsuarios = response.data
		});
    }

    cargaVendedores(){
    	this.vendedorService.listaVendedores().success((response) => {
    		console.log(response.data)
			this.ListaVendedores = response.data
		});
    }

    updateVen(vendedor){
    	this.visible = true
    	this.data = {
			ven_id:parseInt(vendedor.ven_id),
			ven_nombre:vendedor.ven_nombre,
			ven_codigo:vendedor.ven_codigo,
			ven_identidad:vendedor.ven_identidad,
			ven_direccion:vendedor.ven_direccion, 
			ven_sts:parseInt(vendedor.ven_sts),
			emp_id:parseInt(vendedor.emp_id),
			user_id:parseInt(vendedor.user_id)
		}
    }

    btnAgregar(){
		this.vendedorService.guardarVendedor(this.data).success((data)=>{			
			if(data.sts == 'ok'){
				let empNombre = ""
				let userNombre = ""
				//Buscar en la lista de empresas y usuarios el nombre de ambos
				//ya que al momento de retornar un ingreso estos no vienen.
				for (let emp in this.ListaEmpresas) { 
					if(this.ListaEmpresas[emp].emp_id == this.data.emp_id){
						empNombre = this.ListaEmpresas[emp].emp_nombre 
					}
				}
				for (let us in this.ListaUsuarios) { 
					if(this.ListaUsuarios[us].tusuario_id == this.data.user_id){
						userNombre = this.ListaUsuarios[us].tusuario_name 
					}
				}
				//compruebo si es una insercion o una actualizacion
				//y dependiendo actualizao en local lista o agrego un mas.
				if(data.datos.insertId == 0){
					for (let ven in this.ListaVendedores) { 
						if(this.ListaVendedores[ven].ven_id == this.data.ven_id){ 
							this.ListaVendedores[ven].ven_id=this.data.ven_id
							this.ListaVendedores[ven].ven_nombre=this.data.ven_nombre
							this.ListaVendedores[ven].ven_codigo=this.data.ven_codigo
							this.ListaVendedores[ven].ven_identidad=this.data.ven_identidad
							this.ListaVendedores[ven].ven_direccion=this.data.ven_direccion 
							this.ListaVendedores[ven].ven_sts=this.data.ven_sts
							this.ListaVendedores[ven].emp_id=this.data.emp_id
							this.ListaVendedores[ven].user_id=this.data.user_id
							this.ListaVendedores[ven].emp_nombre		= empNombre
							this.ListaVendedores[ven].tusuario_name	= userNombre
						}
					}	
				}else{
					
					this.ListaVendedores.push({
							ven_id 			:data.datos.insertId,
	    					emp_id			:this.data.emp_id,
							ven_nombre		:this.data.ven_nombre,
							ven_codigo		:this.data.ven_codigo,
							ven_identidad	:this.data.ven_identidad,
							ven_direccion	:this.data.ven_direccion, 
							ven_sts			:this.data.ven_sts,
							user_id			:this.data.user_id,
							emp_nombre		:empNombre,
							tusuario_name	:userNombre

					});	
					this.data.ven_id = data.datos.insertId			
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
    mostrarForm(){
			this.visible = !this.visible
		}
    btnLimpiar(form){
    	this.data = {
			ven_id:0,
			ven_nombre:"",
			ven_codigo:"",
			ven_identidad:"",
			ven_direccion:"", 
			ven_sts:1,
			emp_id:"",
			user_id:""
		}
		form.$setPristine()
    }
}
export default vendedorListformController
