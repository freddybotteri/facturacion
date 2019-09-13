class inventarioListformController {
	constructor (notify,$window,$stateParams,inventarioService) {
		'ngInject';
		this.notify = notify
		this.$window = $window
		this.$stateParams = $stateParams
		this.inventarioService = inventarioService
		this.ListaBodegas = {}
		this.ListaProductos = {}
		this.ListaInventarios = {}
		/*
		inv_id,
		bod_id,
		prod_id,
		inv_cantidad
		*/ 
		this.data={
			inv_id:0,
			bod_id:"",
			prod_id:"",
			inv_cantidad:""
		}
		this.visible = false
		this.modal = ""
		this.modalTrans = ""
		this.modalTransf = ""
		this.idBod = 0
		this.tipo=1//tipo de bodega
		this.nameBod=""//nombre de la bodega dede router

		//variables para filtrar los productoe
		//en el moddal de transacciones
		this.productoFiltro = ""
		this.productosFiltrados= {}
		this.prodSelect = 0
		this.cantSelect = 0
		this.cantidadNew
		this.descripcion = ""
		this.validarCantidad=true
		//variables para el modal de traferencias
		this.proBodSelect = 0//para saber el id del producto e la bodega
		this.bodSelect = 0//para saber el id de la bodega seleccionada
		this.cantActualSelect = ""//para saber la cantidad de ese producto en bodega
		this.validarCantidadTranf = true
		this.cantidadTranfNew//para la cantidad a transferir
	}
		activeModal(){
			this.modal = "is-active"
		}
		cerrarModal(){
			this.modal = ""
		}
		activeModalTrans(){
			this.productosFiltrados = this.ListaProductos
			this.modalTrans = "is-active"
		}
		cerrarModalTrans(){
			this.modalTrans = ""
		}
		activeModalTransf(){
			this.modalTransf = "is-active"
		}
		cerrarModalTransf(){
			this.modalTransf = ""
		}
		$onInit() {
			this.idBod = this.$stateParams.idBod
			this.tipo = this.$stateParams.tipo
			this.nameBod = this.$stateParams.nameBod
			this.data.bod_id = this.idBod
			this.inventarioService.FKBodegas().success((response) => {
				this.ListaBodegas = response.data
				this.bodegaFiltrada = response.data
			});
			this.inventarioService.FKProductos().success((response) => {
				this.ListaProductos = response.data
				this.productosFiltrados = response.data
			});
		}
		cargainventarios(){
			this.inventarioService.listarinventarios(this.idBod).success((response) => {
				this.ListaInventarios = response.data
			});
		}
		filtrarProducto(){
			let that = this
			let arrPorID	=	this.ListaProductos.filter(function(item) {
				return item.prod_nombre.indexOf(that.productoFiltro) > -1
			});
			this.productosFiltrados = arrPorID
		}
		filtrarBodega(){
			let that = this
			let arrBod	=	this.ListaBodegas.filter(function(item) {
				return item.bod_nombre.indexOf(that.bodegaFiltro) > -1
			});
			this.bodegaFiltrada = arrBod
		}
		productoSeleccionado(){
			//busco un producto en el inventario de una bodega
			if(this.prodSelect in this.ListaInventarios){
				this.cantSelect = this.ListaInventarios[this.prodSelect].inv_cantidad
			}
		}
		verificarHaySuficiente(){
			if(this.cantidadNew >= 0){
				this.validarCantidad = true
			}else if(this.cantidadNew <= -1){
				if((this.cantSelect + this.cantidadNew) >= 0){
					this.validarCantidad = true
				}else{
					this.validarCantidad = false
				} 
			}
		}
		verificarHayProTranferir(){
				if(this.cantActualSelect >= this.cantidadTranfNew){
					this.validarCantidadTranf = true
				}else{
					this.validarCantidadTranf = false
				}
		}
		btnGuardarTrans(){
			this.modal = ""		
				//Para registro en transaccion								
				let localSave = {
								bod_id			: this.idBod,
								prod_id			: parseInt(this.prodSelect),
								tran_cantidad	: this.cantidadNew,
								tran_saldo		: "",
								tran_descr		: this.descripcion,
								tran_fechazin	: new Date(),
								tran_fechamovil	: new Date(),
								emp_id			: ""
						}
			
				//para guardar en invnetario
				this.data={
						bod_id			:this.idBod,
						prod_id			:parseInt(this.prodSelect),
						inv_cantidad	:parseInt(this.cantidadNew),
				}
				this.inventarioService.guardarInventario(localSave,this.data).success((data)=>{			
					//buscar en lista y actualizarla con otra operacion en local.
					if(data.sts == 'ok'){
						//Actualizo la cantidad del producto actual
						this.cantSelect = this.cantSelect + this.cantidadNew
						if(data.data[1][0].idInv == 0){
							for(let id in this.ListaInventarios){
								if(this.ListaInventarios[id].inv_id == data.data[1][0].idInvUpd){
									this.ListaInventarios[id].inv_cantidad = this.cantSelect
								}
							}
							
						}else{
							this.inventarioService.listarinventarios(this.idBod).success((response) => {
								this.ListaInventarios = response.data
							});
						}
						this.cantidadNew = ""
						this.descripcion = ""
						this.notify.show('GUARDADO EXITOSAMENTE...')
					}else if(data.sts == 'fail'){
						switch(data.erro.code){
							case 'ER_DUP_ENTRY':
								this.notify.show('ERROR:Inventario')
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
		btnGuardadTranf(){
			this.modal = ""		
				//Para registro en transferecia
				let npmbreBodDest	
				for(let i in this.ListaBodegas){
					if(this.ListaBodegas[i].bod_id == this.bodSelect){
						npmbreBodDest = this.ListaBodegas[i].bod_nombre
					}
				}
				let descr = 'Tranferencia de la bodega '+this.nameBod+' a la bodega '+npmbreBodDest+' '+this.descripcionTranf					
				let localSaveTranf = {
								prod_id			: parseInt(this.proBodSelect),
								tran_cantidad	: this.cantidadTranfNew,
								tran_saldo		: "",
								tran_descr		: descr,
								tran_fechazin	: new Date(),
								tran_fechamovil	: new Date(),
								emp_id			: ""
						}
			
				//para guardar en invnetario
				this.dataTranf={
						prod_id			:parseInt(this.proBodSelect),
						inv_cantidad	:parseInt(this.cantidadTranfNew),
				}
				this.bodegasId={
					bod_idDestino	:this.bodSelect,
					bod_idOrigen	:this.idBod,
				}
				this.inventarioService.guardarInventarioTransf(localSaveTranf,this.dataTranf,this.bodegasId).success((data)=>{			
					//buscar en lista y actualizarla con otra operacion en local.
					if(data.sts == 'ok'){
						//Actualizo la cantidad del producto actual
						this.cantActualSelect = this.cantActualSelect - this.cantidadTranfNew
						if(data.data[1][0].idInv == 0){
							for(let id in this.ListaInventarios){
								if(this.ListaInventarios[id].inv_id == this.proBodSelect){
									this.ListaInventarios[id].inv_cantidad = this.cantActualSelect
								}
							}
							
						}else{
							this.inventarioService.listarinventarios(this.idBod).success((response) => {
								this.ListaInventarios = response.data
							});
						}
						this.cantidadTranfNew = ""
						this.descripcion = ""
						this.notify.show('GUARDADO EXITOSAMENTE...')
					}else if(data.sts == 'fail'){
						switch(data.erro.code){
							case 'ER_DUP_ENTRY':
								this.notify.show('ERROR:Inventario')
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
		bodegaSeleccionada(name){
			console.log(name)
		}
		prodBodSeleccionado(){
			if(this.proBodSelect in this.ListaInventarios){
				//problema no selecciona bien la cantidad.
				this.cantActualSelect = this.ListaInventarios[this.proBodSelect].inv_cantidad
			}
		}
		btnAgregar () {
			this.inventarioService.guardarinventario(this.data).success((data)=>{			
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
						for (let prod in this.Listainventarios) { 
							if(this.Listainventarios[prod].prod_id == this.data.prod_id){

								this.Listainventarios[prod].prod_id		= this.data.prod_id
								this.Listainventarios[prod].prod_nombre	= this.data.prod_nombre 
								this.Listainventarios[prod].prod_unidades	= this.data.prod_unidades
								this.Listainventarios[prod].prod_subpre 	= this.data.prod_subpre
								this.Listainventarios[prod].prod_subcant	= this.data.prod_subcant
								this.Listainventarios[prod].prod_sts		= this.data.prod_sts
								this.Listainventarios[prod].emp_id		= parseInt(this.data.emp_id)
								this.Listainventarios[prod].emp_nombre 	= empNombre 
							}
						}	
					}else{
						this.Listainventarios.push({
								prod_id			:data.datos.insertId, 
								prod_nombre		:this.data.prod_nombre, 
								prod_unidades	:this.data.prod_unidades, 
								prod_subpre		:this.data.prod_subpre, 
								prod_subcant	:this.data.prod_subcant, 
								prod_sts		:this.data.prod_sts, 
								emp_id			:parseInt(this.data.emp_id),
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
		updinventario(inventario){
			this.visible = true
			this.data={
				prod_id			:inventario.prod_id, 
				prod_nombre		:inventario.prod_nombre, 
				prod_unidades	:inventario.prod_unidades, 
				prod_subpre		:inventario.prod_subpre, 
				prod_subcant	:inventario.prod_subcant, 
				prod_sts		:inventario.prod_sts, 
				emp_id			:parseInt(inventario.emp_id)
			}
		}
		mostrarForm(){
			this.visible = !this.visible
		}
		btnLimpiar (form) {
			this.data = {
				inv_id:0,
				bod_id:"",
				prod_id:"",
				inv_cantidad:""
			}
			form.$setPristine();
	}
}
export default inventarioListformController
