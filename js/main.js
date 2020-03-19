 (function(){
     "use strict";

     var regalo = document.getElementById('regalo');

     document.addEventListener('DOMContentLoaded', function(){
        
         //Mapa
         if (document.getElementById('pagina-principal')){
             var map = L.map('mapa').setView([-34.603775, -58.381594], 15);

             L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                 attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
             }).addTo(map);
            
             L.marker([-34.603775, -58.381594]).addTo(map)
                 .bindPopup('GDLWebcamp 2019.<br> Boletos ya disponibles')
                 .openPopup();

        };

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
                     var boletosDia = parseInt(paseDia.value, 10) || 0, //parseIn(A,B) "castea" el valor de A, a un                                                    nro de base B, es este caso 10(decimal).
                         boletosDosDias = parseInt(paseDosDias.value, 10) || 0,
                         boletosCompleto = parseInt(paseCompleto.value, 10) || 0,
                         cantCamisas = parseInt(camisas.value, 10) || 0,
                         cantEtiquetas = parseInt(etiquetas.value,10 ) || 0;
                     var totalPagar = (boletosDia * 30) + (boletosDosDias * 45) + (boletosCompleto * 50) +                           ((cantCamisas * 10) * .93) + (cantEtiquetas * 2);
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

                     suma.innerHTML = '$ ' + totalPagar.toFixed(2); //toFixed(N) corta el float a los N decimales

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

         //Lettering
         $('.nombre-sitio').lettering();

         //Agregar Clase a Menu
         $('.conferencia .navegacion-principal a:contains("Conferencia")').addClass('activo');
         $('.calendario .navegacion-principal a:contains("Calendario")').addClass('activo');
         $('.invitados .navegacion-principal a:contains("Invitados")').addClass('activo');

         //Menu Fijo
         var windowHeigth = $(window).height();
         var barraAltura = $('.barra').innerHeight();      
         $(window).scroll(function(){
             var scroll = $(window).scrollTop();
             if (scroll > windowHeigth){
                 $('.barra').addClass('fixed');
                 $('body').css({'margin-top': barraAltura+ 'px'});
             } else {
                 $('.barra').removeClass('fixed');
                 $('body').css({'margin-top': '0px'});
             }
         });  

         //Menu Responsive
         $('.menu-movil').on('click', function(){
             $('.navegacion-principal').slideToggle();
         });
        
         //Programa de conferencias
         $('.ocultar').hide();
         $('.programa-evento .info-curso:first').show();
         $('.menu-programa a:first').addClass('activo');
         $('.menu-programa a').on('click', function(){
             $('.menu-programa a').removeClass('activo');
             $(this).addClass('activo');
             $('.ocultar').hide();
             var enlace = $(this).attr('href');
             $(enlace).fadeIn(750);
             return false;
         });
        
        
        if (document.getElementById('pagina-principal')){
            
             //Animaciones para los numeros
             $('.resumen-evento li:nth-child(1) p').animateNumber({number: 6}, 1200);
             $('.resumen-evento li:nth-child(2) p').animateNumber({number: 15}, 1200);
             $('.resumen-evento li:nth-child(3) p').animateNumber({number: 3}, 1200);
             $('.resumen-evento li:nth-child(4) p').animateNumber({number: 9}, 1200);
            
             //Cuenta Regresiva
             $('.cuenta-regresiva').countdown('2020/12/10 09:00:00', function(event){
                 $('#dias').html(event.strftime('%D'));
                 $('#horas').html(event.strftime('%H'));
                 $('#minutos').html(event.strftime('%M'));
                 $('#segundos').html(event.strftime('%S'));
             });
        };
            
        if (document.getElementById('pagina-principal') || document.getElementById('pagina-invitados')){
             //Colorbox
             $('.invitado-info').colorbox({inline:true, width:"50%"});
             $('.boton_newsletter').colorbox({inline:true, width:"50%"});
        };
        
     });// DOM CONTENT LOADED
 })();

