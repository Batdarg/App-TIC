$(document).ready(function () {
  var urlParams = new URLSearchParams(window.location.search);
  var participanteId = urlParams.get("id");

  // Verificar si hay un ID antes de llamar a cargarRegistros
  if (participanteId) {
    cargarRegistros();
  }
  else {
    window.location.href = "../web/participantes.html";
  }

  function cargarRegistros() {
    var url = "http://localhost:5190/api/participantePorID?id=" + participanteId;

    $.get(url, function (data) {
      $("#nombreInput").val(data.nombre);
      $("#apellidosInput").val(data.apellidos);
      $("#emailInput").val(data.email);
      $("#inputTwitter").val(data.twitter);
      switch (data.avatar) {
        case 1:
          var opcionRadioButton = document.getElementById("opcion1");
          opcionRadioButton.checked = true;
          break;
        case 2:
          var opcion2RadioButton = document.getElementById("opcion2");
          opcion2RadioButton.checked = true;
          break;
        case 3:
          var opcion3RadioButton = document.getElementById("opcion3");
          opcion3RadioButton.checked = true;
          break;
        case 4:
          var opcion4RadioButton = document.getElementById("opcion4");
          opcion4RadioButton.checked = true;
          break;
      }
    });
  }

  function actualizarRegistro() {
    var confirmacion = window.confirm("¿Estás seguro de que deseas editar este registro?");

    if (!confirmacion) {
      return;
    }

    var url1 = "http://localhost:5190/api/actualizarParticipantes";

    var nombre = $("#nombreInput").val();
    var apellidos = $("#apellidosInput").val();
    var email = $("#emailInput").val();
    var twitter = $("#inputTwitter").val();
    var avatarSeleccionado = $("input[name='opcion']:checked").val();

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

    var datosActualizar = {
      "idparticipante": participanteId,
      "nombre": nombre,
      "apellidos": apellidos,
      "email": email,
      "twitter": twitter,
      "avatar": avatarSeleccionado,
    };

    $.ajax({
      url: url1,
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify(datosActualizar),
      success: function (response) {
        console.log("Registro actualizado con éxito:", response);
        alert('Registro actualizado con éxito.');
        window.location.href = '../web/participantes.html';
      },
      error: function (error) {
        console.error("Error al actualizar el registro:", error);
        alert("Error al actualizar el registro.");
      },
    });
  }

  $("#actualizarRegistroBtn").on("click", function () {
    actualizarRegistro();
  });
});
