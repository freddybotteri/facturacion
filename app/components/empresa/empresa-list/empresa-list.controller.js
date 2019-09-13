'use strict'
const EmpresaListController = ['$scope','$timeout','empresaService','notify', function($scope,$timeout,empresaService,notify){
	$scope.data = {
			emp_id:0,
			emp_nombre:"",
			emp_razons:"",
			emp_telefonos:"",
			emp_rtn:"",
			emp_sts:0,
			emp_codigo:""
		}
		$scope.visible = false

	$scope.mostrarForm = ()=>{
		$scope.visible = !$scope.visible
	}
	$scope.btnAgregar = ()=> {
		empresaService.guardarEmpresa($scope.data).success((data)=>{
			if(data.sts == 'ok'){

				if(data.datos.insertId == 0){
					for (let user in $scope.ListaEmpresa) { 
						if($scope.ListaEmpresa[user].emp_id == $scope.data.emp_id){
							 $scope.ListaEmpresa[user].emp_nombre = $scope.data.emp_nombre
							 $scope.ListaEmpresa[user].emp_razons = $scope.data.emp_razons
							 $scope.ListaEmpresa[user].emp_telefonos = $scope.data.emp_telefonos
							 $scope.ListaEmpresa[user].emp_rtn = $scope.data.emp_rtn
							 $scope.ListaEmpresa[user].emp_sts = $scope.data.emp_sts
							 $scope.ListaEmpresa[user].emp_codigo = $scope.data.emp_codigo
						}
					}	
				}else{
					$scope.data.emp_id=data.datos.insertId
					$scope.ListaEmpresa.push({
	    				emp_id:$scope.data.emp_id,
						emp_nombre:$scope.data.emp_nombre,
						emp_razons:$scope.data.emp_razons,
						emp_telefonos:$scope.data.emp_telefonos,
						emp_rtn:$scope.data.emp_rtn,
						emp_sts:$scope.data.emp_sts,
						emp_codigo:$scope.data.emp_codigo
					});				
				}
				notify.show('GUARDADO EXITOSAMENTE...')
			}else if(data.sts == 'fail'){
				switch(data.erro.code){
					case 'ER_DUP_ENTRY':
						notify.show('ERROR:El nombre de la empresa ya existe')
						break;
					default:
						notify.show('ERROR:Problema en el servidor.')
						break;
				}
			}
		}).catch((err)=>{
			console.log(err)
		})
	}
	$scope.ListaEmpresa = {}
	$scope.CargaEmpresa = ()=>{
		empresaService.listaEmpresas().success((data)=>{
			if(data.tipo = "ok"){
				$scope.ListaEmpresa = data.data
			}else{
				notify.show('ERROR: No se cargaron las empresas.')
			}
		}).catch((err)=>{
			console.log(err)
		})
	}

	$scope.delEmpresa = (id)=>{
		empresaService.delEmpresa(id).success((data)=>{
			if(data.tipo = "ok"){
				notify.show('Eliminado correctamente')
				$scope.CargaEmpresa()
			}else{
				notify.show('ERROR: No se elimino la empresa.')
			}
		}).catch((err)=>{
			console.log(err)
		})
	}

	$scope.updEmpresa = (empresa)=>{
		$scope.visible = true
		$scope.data = {
			emp_id:empresa.emp_id,
			emp_nombre:empresa.emp_nombre,
			emp_razons:empresa.emp_razons,
			emp_telefonos:empresa.emp_telefonos,
			emp_rtn:empresa.emp_rtn,
			emp_sts:empresa.emp_sts,
			emp_codigo:empresa.emp_codigo
		}
	}
	$scope.btnLimpiar = (form)=> {
		$scope.data = {
			emp_id:0,
			emp_nombre:"",
			emp_razons:"",
			emp_telefonos:"",
			emp_rtn:"",
			emp_sts:0,
			emp_codigo:""
		}
		form.$setPristine();
	}



}];
export default EmpresaListController