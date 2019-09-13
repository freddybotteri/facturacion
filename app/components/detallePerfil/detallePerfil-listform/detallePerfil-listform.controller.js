class detallePerfilListformController {
	constructor (detallePerfilService,notify) {
		'ngInject';
		this.detallePerfilService = detallePerfilService
		this.notify = notify
		this.ListaPerfiles = {}
		this.perfilSelected = 0
		this.data={
		}
		this.ListaOperaciones = {}
		this.asignarOperaciones = false
		this.OperacionesCheck = {}
		this.perfilIdAcual = 0
		this.arr = []
	}

	$onInit() {
      	this.detallePerfilService.FKPerfiles().success((response) => {
      		this.ListaPerfiles = response.data
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
    		nuevosRegistros.push({tperfil_id:this.perfilIdAcual,
    								tops_id:this.arr[nuevoDP]})
    	}
		this.detallePerfilService.guardardetallePerfil(nuevosRegistros,this.perfilIdAcual).success((data)=>{			
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
	asigOperaciones (perfilId){
		this.perfilIdAcual = perfilId.tperfil_id
		this.asignarOperaciones = true;
		this.detallePerfilService.listaOperaciones(perfilId.tperfil_id).success((data)=>{
			if(data.tipo = "ok"){
				this.arr = []
				for(let verAsignado in data.data){
					 if (data.data[verAsignado].asignado){
					 		console.log(data.data[verAsignado].asignado)
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

	CargadetallePerfil (){
		this.detallePerfilService.listPerfil().success((data)=>{
			if(data.tipo = "ok"){
				this.ListaUsuarios = data.data
			}else{
				notify.show('ERROR: No se cargaron las granjas.')
			}
		}).catch((err)=>{
			console.log(err)
		})
	}
}
export default detallePerfilListformController

