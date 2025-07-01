const apiBaseUrl = "http://localhost:3000";

function checkAuth() {
    const token = localStorage.getItem("token");
    if (!token) {
        // Se não houver token, redireciona para a página de login
        window.location.href = "login.html";
    }
}

function getAxiosConfig() {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

// Executa a verificação de autenticação assim que o script é carregado
checkAuth();