class UsuarioListformController {
	constructor (usuarioService,notify,md5) {
		'ngInject';
		this.usuarioService = usuarioService
		this.notify = notify
		this.md5 = md5
		this.ListaEmpresas={}//para el select del form
		this.ListaPerfiles={}//para el select del form
		this.ListaUsuarios = {}
		this.data= {
			tusuario_id:0,
			tusuario_name:"",
			tusuario_pass:"",
		    tusuario_sts:"",
		    emp_id:"", 
		    tperfil_id:"",
			tusuario_lasing:"",
			tusuario_global:0
		}
		this.visible = false
	}

	$onInit() {
      	this.usuarioService.FKEmpresas().success((response) => {
      		this.ListaEmpresas = response.data
      	});
      	this.usuarioService.FKPerfiles().success((response) => {
      		this.ListaPerfiles = response.data
      	});
      	/*this.usuarioService.SaberGlobal().success((response) => {
      		this.userGlobal =  response.data
      	});*/
      			
    }

    btnAgregar () {
    	let gusrLocalPass = this.data.tusuario_pass
    	if(this.data.tusuario_pass != ""){
    		this.data.tusuario_pass = this.md5.createHash(this.data.tusuario_pass || '')
    	}
		this.usuarioService.guardarUsuario(this.data).success((data)=>{			
			if(data.sts == 'ok'){
				let empNombre = ""
				let perfNombre = ""
				//Buscar en la lista de empresas y perfiles el nombre de ambos
				//ya que al momento de retornar un ingreso estos no vienen.
				for (let emp in this.ListaEmpresas) { 
					if(this.ListaEmpresas[emp].emp_id == this.data.emp_id){
						empNombre = this.ListaEmpresas[emp].emp_nombre 
					}
				}
				for (let per in this.ListaPerfiles) { 
					if(this.ListaPerfiles[per].tperfil_id == this.data.tperfil_id){
						perfNombre = this.ListaPerfiles[per].tperfil_name 
					}
				}
				//compruebo si es una insercion o una actualizacion
				//y dependiendo actualizao en local lista o agrego un mas.
				if(data.datos.insertId == 0){
					for (let emp in this.ListaUsuarios) { 
						if(this.ListaUsuarios[emp].tusuario_id == this.data.tusuario_id){
							this.ListaUsuarios[emp].emp_id = this.data.emp_id
							this.ListaUsuarios[emp].emp_nombre = empNombre
							this.ListaUsuarios[emp].tperfil_name = perfNombre
							this.ListaUsuarios[emp].perfil_id = this.data.tperfil_id
							this.ListaUsuarios[emp].tusuario_name = this.data.tusuario_name
							this.ListaUsuarios[emp].tusuario_sts = this.data.tusuario_sts
							this.data.tusuario_pass = gusrLocalPass
							this.data.tusuario_global = this.data.tusuario_global
						}
					}	
				}else{
					this.ListaUsuarios.push({
	    					emp_id			:this.data.emp_id,
	    					emp_nombre		:empNombre,
	    					tperfil_name	:perfNombre,
							tperfil_id		:this.data.tperfil_id,
							tusuario_id		:data.datos.insertId,
							tusuario_lasing	:this.data.tusuario_lasing,
							tusuario_name	:this.data.tusuario_name,
							tusuario_pass	:gusrLocalPass,
							tusuario_sts	:this.data.tusuario_sts,
							tusuario_global	:this.data.tusuario_global
					});	
					this.data.tusuario_id = 	data.datos.insertId				
				}
				console.log(gusrLocalPass)
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
	updUsuario (usuario){
		this.visible = true
		this.data = {
			tusuario_id:usuario.tusuario_id,
			tusuario_name:usuario.tusuario_name,
		    tusuario_sts:usuario.tusuario_sts,
		    emp_id:usuario.emp_id, 
		    tperfil_id:usuario.tperfil_id,
			tusuario_lasing:usuario.tusuario_lasing,
			tusuario_global:usuario.tusuario_global,
			tusuario_pass:""
		}
	}
	mostrarForm(){
			this.visible = !this.visible
		}
	CargaUsuarios (){
		this.usuarioService.listaUsuario().success((data)=>{
			console.log(data)
			if(data.tipo = "ok"){
				this.ListaUsuarios = data.data
			}else{
				notify.show('ERROR: No se cargaron los usuarios.')
			}
		}).catch((err)=>{
			console.log(err)
		})
	}

	btnLimpiar (mainF) {
		this.data= {
			tusuario_id:0,
			tusuario_name:"",
			tusuario_pass:"",
		    tusuario_sts:"",
		    emp_id:"", 
		    tperfil_id:"",
		    tusuario_global:0,
		    tusuario_pass:""
		}
		mainF.$setPristine();
	}
}
export default UsuarioListformController
