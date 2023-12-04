$(document).ready(function () {
    function registrarParticipacion(participanteId) {
        var confirmacion = window.confirm("¿Estás seguro de que deseas editar este registro?");

        if (!confirmacion) {
          return;
        }
    
        // Obtener el ID de la conferencia seleccionada
        var idConferencia = conferenciaId;
        var participanteId = $('#selectParticipantes').val();
        var valorCheckbox = $('#flexSwitchCheckDefault').is(':checked');

        // Verificar que se hayan seleccionado tanto la conferencia como el participante
        if (!idConferencia || !participanteId) {
            alert('Por favor, selecciona una conferencia y un participante.');
            return;
        }

        if (!valorCheckbox) {
            alert('Por favor, acepta la inscripción.');
            return;
        }

        // Crear el objeto de registro de participación
        var registroParticipacion = {
            "idConference": idConferencia,
            "idParticipante": participanteId,
            "confirmacion": 1
        };

        // Hacer la solicitud AJAX para realizar el registro
        $.ajax({
            url: 'http://localhost:5190/api/Registros/insertarRegistros',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(registroParticipacion),
            success: function (response) {
                console.log('Registro de participación exitoso:', response);
                alert('Registro de participación exitoso');
                window.location.href = '../web/participantes.html';
                // Puedes redirigir a otra página o realizar alguna acción adicional si es necesario
            },
            error: function (error) {
                console.error('Error al realizar el registro de participación:', error);
                alert('Error al realizar el registro de participación');
            }
        });
    }

    // Asociar la función de registro al evento del botón (puedes cambiar esto según tu estructura HTML)
    $('#registroConferencia').on('click', function () {
        var participanteId = $('#selectParticipantes').val();
        registrarParticipacion(participanteId);
    });

});

// Obtener el parámetro de la URL que contiene el ID de la conferencia
var urlParams = new URLSearchParams(window.location.search);
var conferenciaId = urlParams.get("id");

// Verificar si hay un ID antes de llamar a cargarRegistros
if (conferenciaId) {
    cargarRegistros();
}
else{
    window.location.href = "../web/conferencias.html";
}

function cargarRegistros(){
    // Hacer la solicitud AJAX para obtener el nombre de la conferencia por ID
    $.ajax({
        url: 'http://localhost:5190/api/Conferencias/conferenciasPorID?id=' + conferenciaId,
        type: 'GET',
        dataType: 'json',
        success: function (conferencia) {
            // Obtener el nombre de la conferencia
            var nombreConferencia = conferencia.nombre;

            // Llenar un elemento HTML con el nombre de la conferencia
            $('#nombreConferencia').val(nombreConferencia);
        },
        error: function (error) {
            console.error('Error al obtener la conferencia por ID:', error);
        }
    });

    // Hacer la solicitud AJAX para obtener la lista de participantes
    $.ajax({
        url: 'http://localhost:5190/api/participantes',
        type: 'GET',
        dataType: 'json',
        success: function (participantes) {
            // Llenar el elemento <select> con los datos obtenidos
            llenarSelect(participantes);
        },
        error: function (error) {
            console.error('Error al obtener la lista de participantes:', error);
        }
    });
    
    // Función para llenar el elemento <select> con los datos
    function llenarSelect(participantes) {
        var selectElement = $('#selectParticipantes');

        // Limpiar el elemento <select> antes de llenarlo para evitar duplicados
        selectElement.empty();

        // Agregar una opción por cada participante
        participantes.forEach(function (participante) {
            var option = '<option value="' + participante.idParticipante + '">' + participante.nombre + ' ' + participante.apellidos + '</option>';
            selectElement.append(option);
        });
        $('#registroConferencia').prop('disabled', false);
    }
}

document.addEventListener("DOMContentLoaded", cargarRegistros);