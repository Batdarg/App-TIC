const form = document.getElementById("buscarConferencia");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const bookData = eventToBooksData(event);
    const encodedBookData = encodeURIComponent(bookData);
    console.log(encodedBookData);

    const title = await fetch(`http://localhost:5181/api/Book?title=${encodedBookData}`);
    const query = await title.json();
    
    deleteRows();
    updateTableTitle(query);
});

const eventToBooksData = (event) => {
    const elements = event.target.elements;
    return elements.book.value;
}

const updateTableTitle = (query) => {
    drawTable(query);
}

const updateTable = () => {
    queryBooksApi()
        .then(books => drawTable(books));
}

const queryBooksApi = async () => {
    const answer = await fetch("http://localhost:5190/api/Conferencias/todasLasConferencias");
    return await answer.json();
}

const drawTable = (books) => {
    books.forEach(addBookToTable);
} 

const addBookToTable = (book) => {
    const dataBook = document.getElementById("table");
    const row = dataBook.insertRow(-1);
    const [cell1, cell2, cell3, cell4] = Array.from({ length: 4 }, () => row.insertCell());
    
    cell1.textContent = book.idConference;
    cell2.textContent = book.horario;
    cell3.textContent = book.nombre;
    cell4.textContent = book.conferencista;

}

function deleteRows() {
    const num = document.getElementById("table").rows.length;
    for(i = 1; i< num; i++){
        console.log(i);
        document.getElementById("table").deleteRow(1);
    }
}

document.addEventListener("DOMContentLoaded", updateTable);