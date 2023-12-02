const url_api = "http://localhost:5238/api/insertarParticipantes";

function clearForm() {
  $("#nombreInput").val("");
  $("#apellidosInput").val("");
  $("#emailInput").val("");
  $("#inputTwitter").val("");
}

function obtenerValorRadioSeleccionado() {
  var elementosRadio = document.getElementsByName("opcion");
  for (var i = 0; i < elementosRadio.length; i++) {
    if (elementosRadio[i].checked) {
      return elementosRadio[i].value;
    }
  }
  return null;
}

function submitForm() {
  var avatarSeleccionado = obtenerValorRadioSeleccionado();
  var formData = {
    nombre: $("#nombreInput").val(),
    apellidos: $("#apellidosInput").val(),
    email: $("#emailInput").val(),
    twitter: $("#inputTwitter").val(),
    avatar: avatarSeleccionado,
  };

  $.ajax({
    type: "POST",
    url: url_api,
    data: JSON.stringify(formData),
    contentType: "application/json",
    success: function (response) {
      alert("Registro enviado exitosamente");
      console.log("Respuesta del servidor:", response);
      clearForm();
    },
    error: function (error) {
      console.error("Error en la solicitud:", error);
    },
  });
}
