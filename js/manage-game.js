// A função getAxiosConfig() está em auth.js, que já foi carregado

const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('id');

const formTitle = document.getElementById('form-title');
const submitButton = document.getElementById('submit-button');
const gameIdInput = document.getElementById('gameId');
const titleInput = document.getElementById('title');
const yearInput = document.getElementById('year');
const priceInput = document.getElementById('price');

// Verifica se está em modo de edição
if (gameId) {
    formTitle.textContent = "Editar Game";
    submitButton.textContent = "Atualizar";
    loadGameData(gameId);
}

function loadGameData(id) {
    axios.get(`${apiBaseUrl}/game/${id}`, getAxiosConfig())
        .then(response => {
            const game = response.data;
            gameIdInput.value = game.id;
            titleInput.value = game.title;
            yearInput.value = game.year;
            priceInput.value = game.price;
        }).catch(console.error);
}

function handleFormSubmit() {
    if (gameId) {
        updateGame();
    } else {
        createGame();
    }
}

function createGame() {
    const game = {
        title: titleInput.value,
        year: yearInput.value,
        price: priceInput.value,
    };

    axios.post(`${apiBaseUrl}/game`, game, getAxiosConfig())
        .then(() => {
            alert("Game cadastrado com sucesso!");
            window.location.href = "index.html"; // Volta para a home
        })
        .catch(console.error);
}

function updateGame() {
    const game = {
        title: titleInput.value,
        year: yearInput.value,
        price: priceInput.value,
    };

    axios.put(`${apiBaseUrl}/game/${gameId}`, game, getAxiosConfig())
        .then(() => {
            alert("Game atualizado com sucesso!");
            window.location.href = "index.html"; // Volta para a home
        })
        .catch(console.error);
}