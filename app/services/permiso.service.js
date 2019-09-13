"use strict"
export default class permisoService {
	constructor ($http) {
		this.$http = $http
	}

	guardarPermiso (data) {
		return this.$http({
				method: 'POST',
				url: '/permiso/newPermiso',
				data:data
			})
	}

	listaOperaciones (userId) {
		return this.$http({
				method: 'POST',
				url: '/permiso/listaOperaciones',
				data:{userId:userId}
			})
	}

	FKUsuarios () {
		return this.$http({
				method: 'GET',
				url: '/permiso/FKUsuarios',
			})
	}

	guardarOperacionesUser (operacionesIds,userId){

		return this.$http({
				method: 'POST',
				url: '/permiso/guardarOpeUser',
				data:{
						operacionesIds:operacionesIds,
						userId:userId
					}
			})
	}


	delPermiso (id) {
		return this.$http({
				method: 'POST',
				url: '/permiso/delPermiso',
				data:{id:id}
			})
	}
}