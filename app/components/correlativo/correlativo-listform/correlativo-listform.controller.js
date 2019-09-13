class correlativoListformController {
	constructor (correlativoService,notify) {
		'ngInject';
		this.notify = notify
		this.correlativoService = correlativoService
		this.ListaEmpresas = {}
		this.ListaCorrelativos = {}

		/*corr_id,
		corr_vini,
		corr_vfin,
		corr_sigval, 
		corr_fechacre,
		corr_fechaemi, 
		corr_fechalim,
		emp_id,
		corr_estado,
		corr_cai, 
		corr_prefijo,
		corr_descrip*/

		this.data={
			corr_id:0,
			corr_vini:"",
			corr_vfin:"",
			corr_sigval:"", 
			corr_fechacre:"",
			corr_fechaemi:"", 
			corr_fechalim:"",
			emp_id:"",
			corr_estado:1,
			corr_cai:"", 
			corr_prefijo:"",
			corr_descrip:""
		}
		this.visible = false
	}

	$onInit() {
		this.correlativoService.FKEmpresas().success((response) => {
      		this.ListaEmpresas = response.data
      	});
    }
    cargaCorrelativos(){
    	this.correlativoService.listaCorrelativo().success((response) => {
      		this.ListaCorrelativos = response.data
      	});	
    }
    updCorrelativo(correlativo){
    	this.visible = true
    	this.data ={
			corr_id		:correlativo.corr_id,
			corr_vini	:correlativo.corr_vini,
			corr_vfin	:correlativo.corr_vfin,
			corr_sigval	:correlativo.corr_sigval, 
			corr_fechacre:this.fechaDatetime(correlativo.corr_fechacre),
			corr_fechaemi:this.fechaDatetime(correlativo.corr_fechaemi), 
			corr_fechalim:this.fechaDatetime(correlativo.corr_fechalim),
			emp_id		:parseInt(correlativo.emp_id),
			corr_estado	:correlativo.corr_estado,
			corr_cai	:correlativo.corr_cai, 
			corr_prefijo:correlativo.corr_prefijo,
			corr_descrip:correlativo.corr_descrip
    	}
    }   
	fechaDatetime(fecha){
		try{
			var vini = new Date(fecha);
			var newvini = new Date(vini);
			newvini.setHours(vini.getHours() - 6);
			var n = newvini.toISOString().split('.')[0].replace('T',' ');
			return vini;
		}catch(err){
			console.log(err);
		}
	}
    btnAgregar(){
		this.correlativoService.guardarCorrelativo(this.data).success((data)=>{			
			if(data.sts == 'ok'){
				let empNombre = ""
				//Buscar en la lista de empresas el nombre de ambos
				//ya que al momento de retornar un ingreso estos no vienen.
				for (let emp in this.ListaEmpresas) { 
					if(this.ListaEmpresas[emp].emp_id == this.data.emp_id){
						empNombre = this.ListaEmpresas[emp].emp_nombre 
					}
				}
				//compruebo si es una insercion o una actualizacion
				//y dependiendo actualizao en local lista o agrego un mas.
				if(data.datos.insertId == 0){
					for (let corr in this.ListaCorrelativos) { 
						if(this.ListaCorrelativos[corr].corr_id == this.data.corr_id){

							this.ListaCorrelativos[corr].corr_id		=this.data.corr_id
							this.ListaCorrelativos[corr].corr_vini		=this.data.corr_vini
							this.ListaCorrelativos[corr].corr_vfin		=this.data.corr_vfin
							this.ListaCorrelativos[corr].corr_sigval	=this.data.corr_sigval
							this.ListaCorrelativos[corr].corr_fechacre	=this.data.corr_fechacre
							this.ListaCorrelativos[corr].corr_fechaemi	=this.data.corr_fechaemi 
							this.ListaCorrelativos[corr].corr_fechalim	=this.data.corr_fechalim
							this.ListaCorrelativos[corr].emp_id			=parseInt(this.data.emp_id)
							this.ListaCorrelativos[corr].corr_estado	=this.data.corr_estado
							this.ListaCorrelativos[corr].corr_cai		=this.data.corr_cai 
							this.ListaCorrelativos[corr].corr_prefijo	=this.data.corr_prefijo
							this.ListaCorrelativos[corr].corr_descrip	=this.data.corr_descrip
							this.ListaCorrelativos[corr].emp_nombre		=empNombre
						}
					}	
				}else{
					this.ListaCorrelativos.push({
							corr_id			:data.datos.insertId,
							corr_vini		:this.data.corr_vini,
							corr_vfin		:this.data.corr_vfin,
							corr_sigval		:this.data.corr_sigval, 
							corr_fechacre	:this.data.corr_fechacre,
							corr_fechaemi	:this.data.corr_fechaemi, 
							corr_fechalim	:this.data.corr_fechalim,
							emp_id			:parseInt(this.data.emp_id),
							corr_estado		:this.data.corr_estado,
							corr_cai		:this.data.corr_cai, 
							corr_prefijo	:this.data.corr_prefijo,
							corr_descrip	:this.data.corr_descrip,
							emp_nombre		:empNombre
					});		
					this.data.corr_id = 	data.datos.insertId		
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
    btnLimpiar (form) {
		this.data= {
			corr_id:0,
			corr_vini:"",
			corr_vfin:"",
			corr_sigval:"", 
			corr_fechacre:"",
			corr_fechaemi:"", 
			corr_fechalim:"",
			emp_id:"",
			corr_estado:1,
			corr_cai:"", 
			corr_prefijo:"",
			corr_descrip:""
		}
		form.$setPristine();
	}
}
export default correlativoListformController