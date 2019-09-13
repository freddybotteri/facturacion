 import controller from './mensaje-controller'
 const mensajeComponent = {  
	bindings: {
		mensaje: '<',
		tiempo:'<'
	},
	/*recibo como parametro desde el boton de guardar en el controlador de empresa*/
	template: `
		<div id="mensaje" ng-if="visible == true && $ctrl.mensaje.visible == true"  data-ng-class="$ctrl.mensaje.color" data-ng-init="init($ctrl.tiempo)">
			{{visible ? inicio($ctrl.tiempo,$ctrl.mensaje.visible) : " "}}
			<button class="delete" id="cerrarMensaje" ng-click = "cerrarMensaje($ctrl.mensaje)"></button>
				{{$ctrl.mensaje}}
		</div>
		{{$ctrl.mensaje}}
	`,
	controller: function($scope,$timeout){
		    $scope.visible = true
			$scope.inicio = function(time,visible){
				console.log(time)
				console.log(visible)
				$scope.visible = visible
					 $timeout(function () {
						console.log("se quita")
					$scope.visible = false
				}, time);
			$scope.visible = true
			}

			$scope.cerrarMensaje = function(vd){
				console.log(vd)
			}
		}
}
export default mensajeComponent

/*<div id="mensaje" ng-if="visible == true && $ctrl.mensaje.visible == true"  data-ng-class="$ctrl.mensaje.color" data-ng-init="init($ctrl.tiempo)">
			<button class="delete" id="cerrarMensaje" ng-click = "cerrarMensaje()"></button>
				{{$ctrl.mensaje}}
		</div>



		<script type="text/javascript">
			$(document).ready(function() {
				$('#cerrarMensaje').click(function(event) {
				});
			});
		</script>

$( "#mensaje" ).slideUp( 300 ).delay( 800 ).fadeIn( 400 );
timer = temporizador(0);
				function temporizador(cont) {

					if(cont >= 1){
						$("#mensaje").hide()
					}else{
						$("#mensaje").slideUp(1500).delay(200).fadeIn(0, function(){
							console.log("2")
							timer = temporizador(1)
						});
					}
					
				}	
			}*/