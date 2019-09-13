"use strict"
export default class proveedorService {
	constructor ($http) {
		this.$http = $http
	}

	guardarproveedor (data,complementos) {
		return this.$http({
				method: 'POST',
				url: '/proveedor/newproveedores',
				data:{data:data,complementos:complementos}
			})
	}

	listarproveedores () {
		return this.$http({
				method: 'GET',
				url: '/proveedor/listaproveedores',
			})
	}

	FKEmpresa () {
		return this.$http({
				method: 'GET',
				url: '/proveedores/FKEmpresa',
			})
	}
	FKFamilia () {
		return this.$http({
				method: 'GET',
				url: '/proveedores/listaFamilias',
			})
	}
}