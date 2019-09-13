class familiaListformController {
	constructor (familiaService,notify) {
		'ngInject';
		this.familiaService = familiaService
		this.notify = notify
		this.data={
			fam_id:0,
			fam_nombre:"",
			fam_descrip:"",
			fam_sts:1,
			emp_id:""
		}
		this.Listafamilias = {}
		this.visible = false

		/*
		fam_i,
		fam_nombr,
		fam_descri,
		fam_st 
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
				fam_id:0,
				fam_nombre:"",
				fam_descrip:"",
				fam_sts:1,
				emp_id:""
			}
			form.$setPristine();
	}
    btnAgregar () {
		this.familiaService.guardarfamilia(this.data).success((data)=>{		
			console.log(data)	
			if(data.sts == 'ok'){

				//compruebo si es una insercion o una actualizacion
				//y dependiendo actualizao en local lista o agrego un mas.
				if(data.datos.insertId == 0){
					for (let fam in this.ListaFamilias) { 
						if(this.ListaFamilias[fam].fam_id == this.data.fam_id){
							this.ListaFamilias[fam].fam_id		= this.data.fam_id
							this.ListaFamilias[fam].fam_nombre	= this.data.fam_nombre
							this.ListaFamilias[fam].fam_descrip	= this.data.fam_descrip
							this.ListaFamilias[fam].fam_sts		= this.data.fam_sts 
							this.ListaFamilias[fam].emp_id		= this.data.emp_id
						}
					}	
				}else{
					this.ListaFamilias.push({
							fam_id		:data.datos.insertId,
							fam_nombre	:this.data.fam_nombre,
							fam_descrip	:this.data.fam_descrip,
							fam_sts		:this.data.fam_sts,
							emp_id		:this.data.emp_id
					});
					this.data.fam_id = 	data.datos.insertId			
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

	updfamilia(familia){
		this.visible = true
		this.data.fam_id 		= 	familia.fam_id
		this.data.fam_nombre	=	familia.fam_nombre
		this.data.fam_descrip	=	familia.fam_descrip
		this.data.fam_sts	 	=	familia.fam_sts
		this.data.emp_id		=	familia.emp_id
	}

	Cargafamilia (){
		this.familiaService.listFamilia().success((data)=>{
			if(data.tipo = "ok"){
				this.ListaFamilias = data.data
			}else{
				notify.show('ERROR: No se cargaron las granjas.')
			}
		}).catch((err)=>{
			console.log(err)
		})
	}
}
export default familiaListformController

