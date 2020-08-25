$(document).ready(function() {
    $('#crear-admin').on('submit', function(e) {
        e.preventDefault();

        var datos = $(this).serializeArray();

        $.ajax({
            type: $(this).attr('method'),
            data: datos,
            url: $(this).attr('action'),
            dataType: 'json',
            success: function(data) {
                var resultado = data;
                if (resultado.respuesta == 'exito') {
                    Swal.fire(
                    '¡Correcto!',
                    'Administrador creado correctamente.',
                    'success'
                    )
                } else {
                    Swal.fire(
                        '¡Error!',
                        'Error al crear el Administrador. Pruebe con otro nombre de usuario',
                        'error'
                    )
                }
            }
        })
    });
});