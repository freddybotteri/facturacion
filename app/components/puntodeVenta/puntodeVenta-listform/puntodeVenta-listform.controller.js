class puntodeVentaListformController {
	constructor (puntodeVentaService,notify) {
		'ngInject';
		this.notify = notify
		this.puntodeVentaService = puntodeVentaService
		this.ListaEmpresas = {}
		this.ListaCorrelativos = {}
		this.ListapuntodeVenta = {}
		this.data={
			pv_id		:0, 
			emp_id		:"", 
			corr_id		:"", 
			pv_nombre	:"", 
			pv_movil	:"", 
			pv_sts		:1, 
			pv_fechacre	:""
		}
		this.visible = false
	}

	$onInit() {
		this.puntodeVentaService.FKEmpresas().success((response) => {
      		this.ListaEmpresas = response.data
      	});
      	this.puntodeVentaService.FKCorrelativos().success((response) => {
      		this.ListaCorrelativos = response.data
      	});
    }
    cargapuntodeVenta(){
    	this.puntodeVentaService.listapuntodeVenta().success((response) => {
      		this.ListapuntodeVenta = response.data
      	});	
    }
	mostrarForm(){
		this.visible = !this.visible
	}
    updpuntodeVenta(puntodeVenta){
    	this.visible = true
    	this.data={
			pv_id		:puntodeVenta.pv_id, 
			emp_id		:parseInt(puntodeVenta.emp_id), 
			corr_id		:parseInt(puntodeVenta.corr_id), 
			pv_nombre	:puntodeVenta.pv_nombre, 
			pv_movil	:puntodeVenta.pv_movil, 
			pv_sts		:puntodeVenta.pv_sts, 
			pv_fechacre	:puntodeVenta.pv_fechacre
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
    	if(this.data.pv_fechacre == "")
    		this.data.pv_fechacre = new Date()
		this.puntodeVentaService.guardarpuntodeVenta(this.data).success((data)=>{			
			if(data.sts == 'ok'){
				let empNombre = ""
				let corrVal = ""
				//Buscar en la lista de empresas el nombre de ambos
				//ya que al momento de retornar un ingreso estos no vienen.
				for (let emp in this.ListaEmpresas) { 
					if(this.ListaEmpresas[emp].emp_id == this.data.emp_id){
						empNombre = this.ListaEmpresas[emp].emp_nombre 
					}
				}
				for (let corr in this.ListaCorrelativos) { 
					if(this.ListaCorrelativos[corr].corr_id == this.data.corr_id){
						corrVal = this.ListaCorrelativos[corr].corr_sigval 
					}
				}
				//compruebo si es una insercion o una actualizacion
				//y dependiendo actualizao en local lista o agrego un mas.
				if(data.datos.insertId == 0){
					for (let punVenta in this.ListapuntodeVenta) { 
						if(this.ListapuntodeVenta[punVenta].pv_id == this.data.pv_id){
							this.ListapuntodeVenta[punVenta].pv_id = this.data.pv_id
							this.ListapuntodeVenta[punVenta].emp_id		= parseInt(this.data.emp_id) 
							this.ListapuntodeVenta[punVenta].corr_id	= parseInt(this.data.corr_id) 
							this.ListapuntodeVenta[punVenta].pv_nombre	= this.data.pv_nombre 
							this.ListapuntodeVenta[punVenta].pv_movil	= this.data.pv_movil 
							this.ListapuntodeVenta[punVenta].pv_sts		= this.data.pv_sts
							this.ListapuntodeVenta[punVenta].pv_fechacre= this.data.pv_fechacre
							this.ListapuntodeVenta[punVenta].emp_nombre = empNombre
							this.ListapuntodeVenta[punVenta].corr_sigval= corrVal
						}
					}	
				}else{
					this.ListapuntodeVenta.push({
	    					pv_id 		: data.datos.insertId,
							emp_id		: parseInt(this.data.emp_id), 
							corr_id		: parseInt(this.data.corr_id), 
							pv_nombre	: this.data.pv_nombre, 
							pv_movil	: this.data.pv_movil, 
							pv_sts		: this.data.pv_sts, 
							pv_fechacre	: this.data.pv_fechacre,
							emp_nombre  : empNombre,
							corr_sigval : corrVal
							
					});	
					this.data.pv_id = 	data.datos.insertId				
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

    btnLimpiar (form) {
    	this.data={
			pv_id		:0, 
			emp_id		:"", 
			corr_id		:"", 
			pv_nombre	:"", 
			pv_movil	:"", 
			pv_sts		:1, 
			pv_fechacre	:""
		}
		form.$setPristine();
	}
}
export default puntodeVentaListformController