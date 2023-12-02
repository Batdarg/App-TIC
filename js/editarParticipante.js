$(document).ready(function () {
  var urlParams = new URLSearchParams(window.location.search);
  var participanteId = urlParams.get("id");

  function cargarRegistros() {
    var url =
      "http://localhost:5238/api/participantePorID?id=" + participanteId;

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
    var url1 = "http://localhost:5238/api/actualizarParticipantes";

    var nombre = $("#nombreInput").val();
    var apellidos = $("#apellidosInput").val();
    var email = $("#emailInput").val();
    var twitter = $("#inputTwitter").val();
    var avatar = $("input[name='opcion']:checked").val();

    var datosActualizar = {
      idparticipante: participanteId,
      nombre: nombre,
      apellidos: apellidos,
      email: email,
      twitter: twitter,
      avatar: avatar,
    };

    $.ajax({
      url: url1,
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify(datosActualizar),
      success: function (response) {
        console.log("Registro actualizado con éxito:", response);
        window.location.href = window.location.origin + window.location.pathname + "?id=" + participanteId;
      },
      error: function (error) {
        console.error("Error al actualizar el registro:", error);
      },
    });
  }

  cargarRegistros();

  $("#actualizarRegistroBtn").on("click", function () {
    actualizarRegistro();
  });

  function regresar() {
    window.location.href = "participantes.html"; // Reemplaza con la URL de la otra página
    }
});
