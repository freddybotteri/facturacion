'use strict'
class selectorRutaListformController {
	constructor (notify,$window,selectorRutaService,$timeout) {
		'ngInject';
		this.notify = notify
		this.selectorRutaService = selectorRutaService
		this.ListaRutas = {}
	}
		$onInit() {
			this.selectorRutaService.ListarRutas().success((response) => {
				this.ListaRutas = response.data
			});
		}
		
		btnSeleccionarRuta (id,nombre) {

		}
}
export default selectorRutaListformController