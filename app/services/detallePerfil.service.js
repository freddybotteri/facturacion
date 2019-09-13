"use strict"
export default class detallePerfilService {
	constructor ($http) {
		this.$http = $http
	}

	guardardetallePerfil (operacionesIds,perfilId) {
		
		return this.$http({
				method: 'POST',
				url: '/detallePerfil/newdetallePerfil',
				data:{
						operacionesIds:operacionesIds,
						perfilId:perfilId
					}
			})
	}

	deldetallePerfil (id) {
		return this.$http({
				method: 'POST',
				url: '/detallePerfil/deldetallePerfil',
				data:{id:id}
			})
	}
	FKPerfiles(){
		return this.$http({
				method: 'GET',
				url: '/detallePerfil/listaFKPerfil',
			})
	}
	listaOperaciones(perfilId){
		return this.$http({
				method: 'POST',
				url: '/detallePerfil/listaFKOperaciones',
				data:{perfilId:perfilId}
			})
	}
}