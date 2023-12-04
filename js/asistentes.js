document.addEventListener("DOMContentLoaded", function () {
    // Obtener el parámetro de la URL que contiene el ID de la conferencia
    var urlParams = new URLSearchParams(window.location.search);
    var conferenciaId = urlParams.get("id");
    var fragmento = document.querySelector('.col h2');
    fragmento.textContent = 'Lista de participantes: ' + urlParams.get("nombre");
    // Función para realizar la solicitud GET
    async function fetchData() {
        try {
            const response = await fetch('http://localhost:5190/api/Registros/registrosPorConferencia?idConferecia='+conferenciaId);

            if (!response.ok) {
                throw new Error(`Error de la API: ${response.status}`);
            }

            const data = await response.json();
            console.log(data); // Agrega este console.log para depuración
            displayData(data);
        } catch (error) {
            console.error('Error al obtener datos:', error.message);
        }
    }

    // Función para mostrar los datos en tarjetas
    function displayData(data) {
        const cardsContainer = document.getElementById('cards-container');
        
        // Itera sobre los participantes y crea una tarjeta para cada uno
        data.forEach(participante => {
            const hasAvatar = 'avatar' in participante;
            const cardHtml = `
            <div class="card mb-3 w-100 bg-danger border-4 border-black rounded-5">
                <div class="row g-0">
                    <div class="col-md-4 px-4 py-4">
                    <a>
                        ${hasAvatar ? `<img src="../img/avatar-${participante.avatar}.png" class="card-img-top" alt="${participante.nombre}">` : ''}
                    </a>    
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h2 class="card-title text-white">${participante.nombre} ${participante.apellidos}</h2>
                            <p class="card-text"><h5 class="text-white">${participante.email}</h5></p>
                            <a href="https://twitter.com/${participante.twitter}" target="_blank" class="card-link">
                                <div class="d-flex align-items-center">
                                    <img src="../img/twitter.webp" alt="Twitter Logo" class="img-fluid" width="50px">
                                    <h5 class="ml-2 mb-0">@${participante.twitter}</h5>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            `;
            cardsContainer.innerHTML += cardHtml;
        });
    }

    // Llama a la función fetchData cuando se carga la página
    fetchData();
});

