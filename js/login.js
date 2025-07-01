const apiBaseUrl = "http://localhost:3000";

// Verifica se o usuário já está logado e, em caso afirmativo, redireciona para a home
if (localStorage.getItem("token")) {
    window.location.href = "index.html";
}

function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    axios.post(`${apiBaseUrl}/auth`, { email, password })
        .then((res) => {
            const token = res.data.token;
            localStorage.setItem("token", token);
            window.location.href = "index.html"; // Redireciona para a home
        })
        .catch((err) => {
            errorMessage.textContent = "Email ou senha incorretos. Tente novamente.";
            console.error(err);
        });
}