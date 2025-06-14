document.getElementById('enviar-btn').addEventListener('click', function () {
    const nome = document.getElementById('nome').value.trim();
    const endereco = document.getElementById('location').value.trim();

    if (nome && endereco) {
        // Salva os dados no localStorage
        localStorage.setItem('nomeUsuario', nome);
        localStorage.setItem('enderecoUsuario', endereco);

        // Redireciona para o cardápio
        window.location.href = 'ifood_produtos.html';
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});