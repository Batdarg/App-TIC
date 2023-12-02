$(document).ready(function () {
  // Función para cargar los registros
  function cargarRegistros() {
    // URL del servidor que maneja la solicitud GET
    var url = "http://localhost:5238/api/participantePorID?id=4"; // Reemplaza con la URL de tu servidor y el ID del registro

    // Realizar la solicitud GET
    $.get(url, function (data) {
      // Llenar los campos del formulario con los datos obtenidos
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
      console.log(data);
    });
  }

  function actualizarRegistro() {
    var url1 = "http://localhost:5238/api/actualizarParticipante?id=4"; // Reemplaza con la URL de tu servidor y el ID del registro

    // Obtener datos del formulario
    var nombre = $("#nombreInput").val();
    var apellidos = $("#apellidosInput").val();
    var email = $("#emailInput").val();
    var twitter = $("#inputTwitter").val();
    
    // Obtener valor del radio button seleccionado
    var avatar = $("input[name='opcion']:checked").val();

    // Construir objeto con los datos a actualizar
    var datosActualizar = {
      nombre: nombre,
      apellidos: apellidos,
      email: email,
      twitter: twitter,
      avatar: avatar
    };
    console.log(datosActualizar);

    // Realizar solicitud PUT
    $.ajax({
      url: url1,
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify(datosActualizar),
      success: function (response) {
        console.log("Registro actualizado con éxito:", response);
      },
      error: function (error) {
        console.error("Error al actualizar el registro:", error);
      }
    });
  }
  
  $("#actualizarRegistroBtn").on("click", function () {
    actualizarRegistro();
  });
  // Llamada inicial para cargar los registros al cargar la página
  cargarRegistros();
});
