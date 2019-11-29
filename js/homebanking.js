//Declaración de variables
var nombreUsuario = 'Pedro';
var limiteExtraccion = '100000';
var saldoCuenta = '12000';
var cuentaAmiga1 = '1';
var cuentaAmiga2 = '2';
var codigoCuenta = '1245';
var inicioSesion = true;

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
	inicioSesion = iniciarSesion();
	
	if(inicioSesion == true){
		cargarNombreEnPantalla();
		actualizarLimiteEnPantalla();
	}else{
		retencionDinero()
	}    
    actualizarSaldoEnPantalla();
}

function sumarDinero(deposito){
	var saldoActual = parseInt(saldoCuenta);
	var suma = saldoActual + deposito;
	
	saldoCuenta = suma;
}

//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
	if(inicioSesion == true){
		var limExtraccion = prompt("Ingrese el nuevo limite de extraccion",'0');
		if(!isNaN(limExtraccion) && limExtraccion != null){
			limiteExtraccion = limExtraccion;
			alert("El nuevo limite de extraccion es "+ limExtraccion);
			actualizarLimiteEnPantalla();
		}else{
			alert("Ingreso un valor invalido. Por favor, vuelva a intentar.");
		}
	}else{
		alert("Debido a un intento incorrecto de iniciar sesion se retuvo su dinero. \n Por favor, comuniquese con el banco.");
	}
}

function extraerDinero() {
	if(inicioSesion == true){
		if(saldoCuenta > 0){
			var saldoAnterior = saldoCuenta;
			var dinero = prompt("Ingrese el dinero a extraer. Saldo actual: "+saldoCuenta,'0');

			if(!isNaN(dinero) && dinero != null){
				var resto = dinero % 100; 
				
				if(resto == 0){
					if(parseInt(saldoCuenta) > parseInt(dinero) && parseInt(dinero) <= parseInt(limiteExtraccion)){
						saldoCuenta -= dinero;
						alert("Ha retirado: "+ dinero +" pesos \n Saldo actual: "+ saldoCuenta +" pesos \n Saldo anterior: "+ saldoAnterior +" pesos");
					}else{
						alert("El monto ingresado ("+ dinero +") supera el saldo de su cuenta "+ saldoCuenta +" o el del limite de extraccion "+ limiteExtraccion +". \n Por favor, ingrese un monto valido.");
					}
				}else{
					alert("Solo se permite extraer billetes de 100. Por favor, ingrese un monto multiplo de 100. \n (Monto ingresado: "+ dinero +").");
				}
			}else{
				alert("Ingreso un valor invalido. Por favor, vuelva a intentar.");
			}
		}else{
			alert("No tiene saldo suficiente. Saldo actual: "+ saldoCuenta);
		}
		actualizarSaldoEnPantalla()
	}else{
		alert("Debido a un intento incorrecto de iniciar sesion se retuvo su dinero. \n Por favor, comuniquese con el banco.");
	}
}

function depositarDinero() {
	if(inicioSesion == true){
		var dinero = prompt("Ingrese el dinero a depositar",'0');
		
		if(!isNaN(dinero) && dinero != null){
			var deposito = parseInt(dinero);
			sumarDinero(deposito);
			actualizarSaldoEnPantalla();
		}else{
			alert("Ingreso un valor invalido. Por favor, vuelva a intentar.");
		}
	}else{
		alert("Debido a un intento incorrecto de iniciar sesion se retuvo su dinero. \n Por favor, comuniquese con el banco.");
	}
}

function pagarServicio() {
	if(inicioSesion == true){
		var servicio = prompt("Ingrese el servicio que desea abonar \n 1-Agua \n 2-Telefono \n 3-Luz \n 4-Internet",'0');
		
		if(!isNaN(servicio) && servicio != null){
			switch(servicio){
				case '1':
					var saldoActual = parseInt(saldoCuenta) - 350;
					saldoCuenta = saldoActual;
					actualizarSaldoEnPantalla();
					break;
				case '2':
					var saldoActual = parseInt(saldoCuenta) - 425;
					saldoCuenta = saldoActual;
					actualizarSaldoEnPantalla();
					break;
				case '3':
					var saldoActual = parseInt(saldoCuenta) - 210;
					saldoCuenta = saldoActual;
					actualizarSaldoEnPantalla();
					break;
				case '4':
					var saldoActual = parseInt(saldoCuenta) - 300;
					saldoCuenta = saldoActual;
					actualizarSaldoEnPantalla();
					break;
				default:
					alert("Por favor, ingrese un valor valido.");
					break;
			}
		}else{
			alert("Ingreso un valor invalido. Por favor, vuelva a intentar.");
		}
	}else{
		alert("Debido a un intento incorrecto de iniciar sesion se retuvo su dinero. \n Por favor, comuniquese con el banco.");
	}
}

function transferirDinero() {
	if(inicioSesion == true){
		var dinero = prompt("Ingrese el dinero a transferir. Saldo actual: "+saldoCuenta,'0');
		
		if(!isNaN(dinero) && dinero != null){
			var transferencia = parseInt(dinero);
			var saldoActual = parseInt(saldoCuenta)
			
			if(saldoActual > transferencia){
				var cuentaTransf = prompt("Ingrese cuenta amiga a la que transferir \n 1-Cuenta Amiga 1 \n 2-Cuenta Amiga 2",'0');
				
				if(cuentaTransf == cuentaAmiga1 || cuentaTransf == cuentaAmiga2){
					saldoActual -= transferencia;
					saldoCuenta = saldoActual;
					actualizarSaldoEnPantalla();
					alert("Se ha transferido "+ dinero +" pesos. \n Destino: cuenta amiga "+ cuentaTransf);
				}else{
					alert("Solo puede transferirse dinero a una cuenta amiga.");
				}
			}else{
				alert("No puede transferirse esa cantidad de dinero. Saldo actual: "+saldoCuenta+". Monto ingresado: "+dinero);
			}
		}else{
			alert("Ingreso un valor invalido. Por favor, vuelva a intentar.");
		}
	}else{
		alert("Debido a un intento incorrecto de iniciar sesion se retuvo su dinero. \n Por favor, comuniquese con el banco.");
	}
}

function iniciarSesion() {
	var codigo = prompt("Ingrese el código de su cuenta",'');
	
	if(codigo == codigoCuenta){
		alert("¡Bienvenido "+ nombreUsuario +"! \n Ya puedes comenzar a realizar operaciones.");
		
		return true;
	}else{
		saldoCuenta = 0;
		actualizarSaldoEnPantalla();
		alert("Codigo incorrecto. Se ha retenido su dinero");
		
		return false;
	}
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}

function retencionDinero() {
    document.getElementById("nombre").innerHTML = "Se ha retenido su dinero";
}