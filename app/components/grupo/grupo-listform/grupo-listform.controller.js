class grupoListformController {
	constructor (grupoService,notify) {
		'ngInject';
		this.grupoService = grupoService
		this.notify = notify
		this.data={
			gru_id:0,
			gru_clave:"",
			gru_tipo:"",
			gru_descrip:"",
			emp_id:"" 
		}
		this.Listagrupos = []
		this.visible = false

		/*
		gru_id
		gru_clave
		gru_tipo
		gru_descrip 
		emp_id                  
		*/
	}
    
    mostrarForm(){
			this.visible = !this.visible
		}
	$onInit() {
    }
    btnLimpiar (form) {
			this.data = {
				gru_id:0,
				gru_clave:"",
				gru_tipo:"",
				gru_descrip:"",
				emp_id:""
			}
			form.$setPristine();
	}
    btnAgregar () {
		this.grupoService.guardargrupo(this.data).success((data)=>{		
			console.log(data)	
			if(data.sts == 'ok'){

				//compruebo si es una insercion o una actualizacion
				//y dependiendo actualizao en local lista o agrego un mas.
				if(data.datos.insertId == 0){
					for (let gru in this.Listagrupos) { 
						if(this.Listagrupos[gru].gru_id == this.data.gru_id){

							this.Listagrupos[gru].gru_id 		=this.data.gru_id
							this.Listagrupos[gru].gru_clave		=this.data.gru_clave
							this.Listagrupos[gru].gru_tipo		=this.data.gru_tipo
							this.Listagrupos[gru].gru_descrip 	=this.data.gru_descrip
						}
					}	
				}else{
					this.Listagrupos.push({
							gru_id 		:data.datos.insertId,
							gru_clave	:this.data.gru_clave,
							gru_tipo	:this.data.gru_tipo,
							gru_descrip :this.data.gru_descrip,
					});
					this.data.gru_id = 	data.datos.insertId			
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

	updgrupo(grupo){
		console.log(grupo)
		this.visible = true
		this.data = {
			gru_id 		:grupo.gru_id,
			gru_clave	:grupo.gru_clave,
			gru_tipo	:grupo.gru_tipo,
			gru_descrip	:grupo.gru_descrip
		}
		
	}

	Cargagrupo (){
		this.grupoService.cargaGrupo().success((data)=>{
			console.log(data)
			if(data.tipo = "ok"){
				this.Listagrupos = data.data
			}else{
				notify.show('ERROR: No se cargaron las granjas.')
			}
		}).catch((err)=>{
			console.log(err)
		})
	}
}
export default grupoListformController

