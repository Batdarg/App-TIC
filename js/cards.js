document.addEventListener("DOMContentLoaded", function () {
    // Función para realizar la solicitud GET
    async function fetchData() {
        try {
            const response = await fetch('http://localhost:5190/api/participantes');

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
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        ${hasAvatar ? `<img src="../img/avatar-${participante.avatar}.png" class="card-img-top" alt="${participante.nombre}">` : ''}
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${participante.nombre} ${participante.apellidos}</h5>
                            <p class="card-text">Email: ${participante.email}</p>
                            <p class="card-text">Twitter: ${participante.twitter}</p>
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