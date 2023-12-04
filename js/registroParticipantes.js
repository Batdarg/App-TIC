$(document).ready(function () {

  function registrarParticipante() {
    var confirmacion = window.confirm("¿Estás seguro de que deseas registrarte?");

    if (!confirmacion) {
      return;
    }

    // Obtener los valores del formulario
    var nombre = $("#nombreInput").val();
    var apellidos = $("#apellidosInput").val();
    var email = $("#emailInput").val();
    var twitter = $("#inputTwitter").val();
    var avatarSeleccionado = $("input[name='opcion']:checked").val();
    var valorCheckbox = $('#flexCheckDefault').is(':checked');

    // Validar que los campos no estén vacíos
    if (!nombre || !apellidos || !email || !twitter) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    // Validar que se haya seleccionado un avatar
    if (avatarSeleccionado == null) {
      alert('Por favor, selecciona un avatar.');
      return;
    }

    // Validar el formato del email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, ingresa una dirección de correo electrónico válida.');
      return;
    }

    if (!valorCheckbox) {
      alert('Por favor, aceptar terminos y condiciones.');
      return;
    }

    // Crear el objeto de participante
    var participante = {
      "nombre": nombre,
      "apellidos": apellidos,
      "email": email,
      "twitter": twitter,
      "avatar": avatarSeleccionado
    };

    // Realizar la solicitud AJAX para insertar el participante
    $.ajax({
      url: 'http://localhost:5190/api/insertarParticipantes',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(participante),
      success: function (response) {
        console.log('Participante insertado con éxito:', response);
        alert('Participante insertado con éxito');
        window.location.href = '../web/participantes.html';
        // Puedes redirigir a otra página o realizar alguna acción adicional si es necesario
      },
      error: function (error) {
        console.error('Error al insertar el participante:', error);
        alert('Error al insertar el participante');
      }
    });
  }

  // Asociar la función de registro al evento del botón (puedes cambiar esto según tu estructura HTML)
  $('#formularioRegistro').on('click', function () {
    registrarParticipante();
  });
});