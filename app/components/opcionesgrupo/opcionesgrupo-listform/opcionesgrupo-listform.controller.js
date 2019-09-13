class opcionesgrupoListformController {
	constructor (opcionesgrupoService,notify,$stateParams) {
		'ngInject';
		this.opcionesgrupoService = opcionesgrupoService
		this.$stateParams = $stateParams
		this.notify = notify
		this.data={
			ogru_id	:0,
			gru_id	:"",
			ogru_descrip:""	 
		}
		this.Listaopcionesgrupos = []
		this.visible = false

		/*
		ogru_id,
		gru_id,
		ogru_descrip                  
		*/
	}
    
    mostrarForm(){
			this.visible = !this.visible
		}
	$onInit() {
		this.idGrupo = this.$stateParams.idGrupo
		this.claveGrupo = this.$stateParams.claveGrupo
    }
    btnLimpiar (form) {
			this.data = {
				ogru_id	:0,
				gru_id	:this.idGrupo,
				ogru_descrip:""
			}
			form.$setPristine();
	}
    btnAgregar () {
    	this.data.gru_id = this.idGrupo
		this.opcionesgrupoService.guardaropcionesgrupo(this.data).success((data)=>{		
			console.log(data)	
			if(data.sts == 'ok'){

				//compruebo si es una insercion o una actualizacion
				//y dependiendo actualizao en local lista o agrego un mas.
				if(data.datos.insertId == 0){
					for (let Ogru in this.Listaopcionesgrupos) { 
						if(this.Listaopcionesgrupos[Ogru].ogru_id == this.data.ogru_id){

							this.Listaopcionesgrupos[Ogru].ogru_id		=this.data.ogru_id
							this.Listaopcionesgrupos[Ogru].gru_id		=this.data.gru_id
							this.Listaopcionesgrupos[Ogru].ogru_descrip	=this.data.ogru_descrip
						}
					}	
				}else{
					this.Listaopcionesgrupos.push({
							ogru_id 		:data.datos.insertId,
							gru_id			:this.data.gru_id,
							ogru_descrip 	:this.data.ogru_descrip,
					});
					this.data.ogru_id = 	data.datos.insertId			
				}
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

	updopcionesgrupo(opcionesgrupo){
		this.visible = true
		this.data = {
			ogru_id		:opcionesgrupo.ogru_id,
			gru_id		:opcionesgrupo.gru_id,
			ogru_descrip:opcionesgrupo.ogru_descrip
		}	
	}
	Cargaopcionesgrupo (){
		this.opcionesgrupoService.cargaopcionesGrupo(this.idGrupo).success((data)=>{
			if(data.tipo = "ok"){
				this.Listaopcionesgrupos = data.data
			}else{
				notify.show('ERROR: No se cargaron las granjas.')
			}
		}).catch((err)=>{
			console.log(err)
		})
	}
}
export default opcionesgrupoListformController

