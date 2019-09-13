class permisoListformController {
	constructor (permisoService,notify) {
		'ngInject';
		this.permisoService = permisoService
		this.notify = notify
		this.ListaUsuarios = {}
		this.usuarioSelected = 0
		this.ListaOperaciones = {}
		this.asignarOperaciones = false
		this.OperacionesCheck = {}
		this.usuarioIdAcual = 0
		this.arr = []
	}

	$onInit() {
      	this.permisoService.FKUsuarios().success((response) => {
      		this.ListaUsuarios = response.data
      	});
    }
    elegirOpe (id,isTrue){
    	 if (isTrue) {
                this.arr.push(id);
            
        }else {
            let indexOp = this.arr.indexOf(id);
            this.arr.splice(indexOp, 1);
        }
    }
    btnAgregar () {
    	let nuevosRegistros = []
    	for(let nuevoDP in this.arr){
    		nuevosRegistros.push({tusuario_id:this.usuarioIdAcual,
    								tops_id:this.arr[nuevoDP],tpermis_tipo:1})
    	}
		this.permisoService.guardarOperacionesUser(nuevosRegistros,this.usuarioIdAcual).success((data)=>{			
			if(data.sts == 'ok'){
				this.notify.show('GUARDADO EXITOSAMENTE...')
			}else if(data.sts == 'fail'){
				switch(data.erro.code){
					case 'ER_DUP_ENTRY':
						this.notify.show('ERROR: Duplicados')
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
	//al momento de asignarle operaciones a un perfil
	//se almacena el id de ese prfil
	//para utilizarleo al momento de guardar el detalla de perfil
	asigOperaciones (userId){
		this.usuarioIdAcual = userId.tusuario_id
		this.asignarOperaciones = true;
		this.permisoService.listaOperaciones(userId.tusuario_id).success((data)=>{
			if(data.tipo = "ok"){
				this.arr = []
				for(let verAsignado in data.data){
					 if (data.data[verAsignado].asignado){
					 	this.arr.push(data.data[verAsignado].tops_id);
			        }
				}
				this.ListaOperaciones = data.data
			}else{
				notify.show('ERROR: No se cargaron los perfiles.')
			}
		}).catch((err)=>{
			console.log(err)
		})
	}
}
export default permisoListformController