$(document).ready(function () {
    // Hacer la solicitud AJAX para obtener las conferencias
    $.ajax({
        url: 'http://localhost:5190/api/Conferencias/todasLasConferencias',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // Llenar la tabla con los datos obtenidos
            llenarTabla(data);
        },
        error: function (error) {
            console.error('Error al obtener las conferencias:', error);
        }
    });

    // Función para llenar la tabla con los datos
    function llenarTabla(conferencias) {
        var tableBody = $('#table tbody');

        // Limpiar la tabla antes de llenarla para evitar duplicados
        tableBody.empty();

        // Iterar sobre las conferencias y agregarlas a la tabla
        conferencias.forEach(function (conferencia, index) {
            var row = '<tr>' +
                '<th scope="row">' + (index + 1) + '</th>' +
                '<td>' + conferencia.horario + '</td>' +
                '<td><a href="asistentes.html?id=' + conferencia.idConference + '&nombre=' + conferencia.nombre + '">' + conferencia.nombre +'</a></td>' +
                '<td>' + conferencia.conferencista + '</td>' +
                '<td><a href="registroconferencia.html?id=' + conferencia.idConference + '"><button class="form-control btn btn-danger border-2 border-black">Registrarse</button></a></td>' +
                '</tr>';
            tableBody.append(row);
        });
    }
});