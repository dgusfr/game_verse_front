// A função getAxiosConfig() e logout() estão em auth.js, que já foi carregado

function loadGames() {
    axios.get(`${apiBaseUrl}/games`, getAxiosConfig())
        .then((response) => {
            // Acessamos a propriedade 'data' dentro da resposta da API
            const games = response.data.data; // <<-- AJUSTE AQUI
            
            const list = document.getElementById("games-list");
            list.innerHTML = ""; 

            if (games.length === 0) {
                list.innerHTML = "<li>Nenhum jogo cadastrado.</li>";
                return;
            }

            games.forEach((game) => {
                const item = document.createElement("li");
                
                const gameInfo = document.createElement("span");
                gameInfo.textContent = `${game.title} (Ano: ${game.year}) - R$ ${game.price}`;
                
                const buttonsDiv = document.createElement("div");

                const deleteBtn = createButton("Deletar", () => deleteGame(game.id), "delete-btn");
                const editBtn = createButton("Editar", () => editGame(game.id), "edit-btn");

                buttonsDiv.append(deleteBtn, editBtn);
                item.append(gameInfo, buttonsDiv);
                list.appendChild(item);
            });
        })
        .catch(console.error);
}

function deleteGame(gameId) {
    if (confirm("Tem certeza que deseja deletar este jogo?")) {
        axios.delete(`${apiBaseUrl}/game/${gameId}`, getAxiosConfig())
            .then(() => {
                alert("Game deletado!");
                loadGames(); // Recarrega a lista
            })
            .catch(console.error);
    }
}

function editGame(gameId) {
    // Redireciona para a página de gerenciamento, passando o ID como parâmetro na URL
    window.location.href = `manage-game.html?id=${gameId}`;
}

function createButton(text, onClick, className) {
    const button = document.createElement("button");
    button.textContent = text;
    button.className = className;
    button.addEventListener("click", onClick);
    return button;
}

// Carrega os jogos quando a página é carregada
window.onload = loadGames;