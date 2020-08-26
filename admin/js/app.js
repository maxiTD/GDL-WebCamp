$(document).ready(function() {
    $('.sidebar-menu').tree()

    $('#registros').DataTable({
        'paging'      : true,
        'pagelength'  : 10,
        'lengthChange': false,
        'searching'   : true,
        'ordering'    : true,
        'info'        : true,
        'autoWidth'   : false,
        'language'    : {
            paginate: {
                next: 'Siguiente',
                previous: 'Anerior',
                last: 'Último',
                first: 'Primero'
            },
            info: 'Mostrando _START_ a _END_ de _TOTAL_ resultados',
            emptyTable: 'No hay registros',
            infoEmpty: '0 Registros',
            search: 'Buscar: '
        }
    });
});