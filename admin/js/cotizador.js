(function(){
    "use strict";

    var regalo = document.getElementById('regalo');

    document.addEventListener('DOMContentLoaded', function(){
        // Campos datos usuario
        var nombre = document.getElementById('nombre');
        var apellido = document.getElementById('apellido');
        var email = document.getElementById('email');

        // Campos pases
        var paseDia = document.getElementById('pase_dia');
        var paseDosDias = document.getElementById('pase_dos_dias');
        var paseCompleto = document.getElementById('pase_completo');

        // Botones y divs
        var calcular = document.getElementById('calcular');
        var errorDiv = document.getElementById('error');
        var botonRegistro = document.getElementById('btnRegistro');
        var listaProductos = document.getElementById('lista-productos');
        var suma = document.getElementById('suma-total');

        // Extras
        var etiquetas = document.getElementById('etiquetas');
        var camisas = document.getElementById('camisa_evento');

        if (document.getElementById('registro')) {
            botonRegistro.disabled = true;
        }

        if (document.getElementById('calcular')) {
            calcular.addEventListener('click', calcularMontos);

            paseDia.addEventListener('blur', mostrarDias);
            paseDosDias.addEventListener('blur', mostrarDias);
            paseCompleto.addEventListener('blur', mostrarDias);

            nombre.addEventListener('blur', validarCampos);
            apellido.addEventListener('blur', validarCampos);
            email.addEventListener('blur', validarCampos);
            email.addEventListener('blur', validarMail);

            if(paseDia.value || paseDosDias.value || paseCompleto.value) {
                mostrarDias();
            }

            function validarCampos(){
                if (this.value == ''){
                    errorDiv.style.display = 'block';
                    errorDiv.innerHTML = "este campo es obligatorio";
                    this.style.border = '1px solid red';
                    errorDiv.style.border = '1px solid red';
                } else {
                    errorDiv.style.display = 'none';
                    this.style.border = '1px solid #cccccc';
                }
            }
                        function validarMail(){
                if (this.value.indexOf("@") > -1){
                    errorDiv.style.display = 'none';
                    this.style.border = '1px solid #cccccc';
                } else {
                    errorDiv.style.display = 'block';
                    errorDiv.innerHTML = "Ingresa un email válido";
                    this.style.border = '1px solid red';
                    errorDiv.style.border = '1px solid red';
                }
            }

            function calcularMontos(event){
                event.preventDefault();
                if (regalo.value == ''){
                    alert("Debes elegir un regalo");
                    regalo.focus();
                } else {
                    var boletosDia = parseInt(paseDia.value, 10) || 0,
                        boletosDosDias = parseInt(paseDosDias.value, 10) || 0,
                        boletosCompleto = parseInt(paseCompleto.value, 10) || 0,
                        cantCamisas = parseInt(camisas.value, 10) || 0,
                        cantEtiquetas = parseInt(etiquetas.value,10 ) || 0;
                    var totalPagar = (boletosDia * 30) + (boletosDosDias * 45) + (boletosCompleto * 50) + ((cantCamisas * 10) * .93) + (cantEtiquetas * 2);
                    var listadoProductos = [];

                    if(boletosDia > 0){
                        listadoProductos.push(boletosDia + ' Pases por día');
                    }
                    if(boletosDosDias > 0){
                        listadoProductos.push(boletosDosDias + ' Pases por dos días');
                    }
                    if(boletosCompleto > 0){
                        listadoProductos.push(boletosCompleto + ' Pases completos');
                    }
                    if(cantEtiquetas > 0){
                        listadoProductos.push(cantEtiquetas + ' Paquetes de etiquetas');
                    }if(cantCamisas > 0){
                        listadoProductos.push(cantCamisas + ' Camisas');
                    }

                    listaProductos.style.display = 'block';
                    listaProductos.innerHTML = '';
                    for (var i = 0; i < listadoProductos.length; i++){
                        listaProductos.innerHTML += listadoProductos[i] + '</br>';
                    }

                    suma.innerHTML = '$ ' + totalPagar.toFixed(2);

                    botonRegistro.disabled = false;
                    document.getElementById('total_pedido').value = totalPagar;
                };
            };

            function mostrarDias(event){
                var boletosDia = parseInt(paseDia.value, 10) || 0,
                    boletosDosDias = parseInt(paseDosDias.value, 10) || 0,
                    boletosCompleto = parseInt(paseCompleto.value,10) || 0;
                var diasElegidos = [];

                if (boletosDia > 0){
                    diasElegidos.push('viernes');
                };

                if (boletosDosDias > 0){
                    diasElegidos.push('viernes', 'sabado');
                };

                if (boletosCompleto > 0){
                    diasElegidos.push('viernes', 'sabado', 'domingo');
                };

                for (var i = 0; i < diasElegidos.length; i++){
                    document.getElementById(diasElegidos[i]).style.display = 'block';
                };
            };
        };
    })
})();