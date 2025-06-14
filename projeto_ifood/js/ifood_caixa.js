// Recupera o carrinho do localStorage (adicionado!)
const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Referência ao elemento onde será exibido o carrinho
const carrinhoDiv = document.getElementById('carrinho');

// Atualiza a visualização do carrinho com os itens e o valor total
function atualizar() {
    carrinhoDiv.innerHTML = ''; // Limpa o conteúdo anterior do carrinho na tela

    // Se o carrinho estiver vazio, mostra a mensagem "Carrinho vazio" e para a função
    if (carrinho.length === 0) {
        carrinhoDiv.textContent = 'Carrinho vazio';
        return; // Encerra a execução da função
    }

    const resumo = {}; // Objeto que irá armazenar a quantidade de cada item

    // Percorre todos os itens do carrinho
    carrinho.forEach(item => {
        // Se o item já estiver no resumo, incrementa a quantidade; senão, define como 1
        resumo[item.nome] = resumo[item.nome] ? resumo[item.nome] + 1 : 1;
    });

    // Para cada item no resumo (chave = nome do item)
    for (const nome in resumo) {
        const itemDiv = document.createElement('div'); // Cria uma div para representar o item no carrinho
        itemDiv.classList.add('item-carrinho'); // Adiciona a classe de estilo ao item

        const span = document.createElement('span'); // Cria um span para mostrar a quantidade e o nome do item
        span.textContent = `${resumo[nome]}x ${nome}`; // Define o texto, ex: "2x Brigadeiro"

        const botao = document.createElement('button'); // Cria o botão de lixeira para remover item
        botao.innerHTML = '🗑️'; // Define o ícone de lixeira no botão
        botao.classList.add('botao-lixeira'); // Adiciona a classe de estilo ao botão
        botao.onclick = () => removerItem(nome); // Define a ação ao clicar: remove 1 unidade desse item

        itemDiv.appendChild(span); // Adiciona o span dentro da div do item
        itemDiv.appendChild(botao); // Adiciona o botão de remover na mesma div
        carrinhoDiv.appendChild(itemDiv); // Adiciona a div do item na visualização do carrinho
    }

    const total = calcularTotal(); // Calcula o valor total dos itens no carrinho

    const totalDiv = document.createElement('div'); // Cria uma nova div para mostrar o total
    totalDiv.innerHTML = `<strong>Total: R$ ${total}</strong>`; // Define o conteúdo HTML com o valor total
    carrinhoDiv.appendChild(totalDiv); // Adiciona a div do total ao final do carrinho
}


// Função para remover um item do carrinho
function removerItem(nomeProduto) {
    const index = carrinho.findIndex(item => item.nome === nomeProduto);
    if (index !== -1) {
        carrinho.splice(index, 1); // Remove 1 item
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizar();
    }
}

// Calcula o total dos itens no carrinho
function calcularTotal() {
    let total = 0;
    carrinho.forEach(item => {
        total += item.preco;
    });
    return total.toFixed(2);
}

// Função para pedir a forma de pagamento e validar entrada
function escolherPagamento() {
    let forma = '';
    const opcoesValidas = ['cartão de crédito', 'cartão de débito', 'pix'];

    while (true) {
        forma = prompt('Qual a forma de pagamento? (Cartão de crédito, Cartão de débito, Pix)');
        if (forma) {
            forma = forma.trim().toLowerCase();
            if (opcoesValidas.includes(forma)) {
                if (forma === 'pix') return 'Pix';
                if (forma === 'cartão de crédito') return 'Cartão de crédito';
                if (forma === 'cartão de débito') return 'Cartão de débito';
            }
        }
        alert('Por favor, informe uma forma de pagamento válida: Cartão de crédito, Cartão de débito ou Pix.');
    }
}

// Finaliza o pedido
function finalizar() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio! Por favor, adicione itens antes de finalizar.');
        return;
    }

    const total = calcularTotal();
    const formaPagamento = escolherPagamento();

    alert(`Pedido finalizado!\nTotal: R$ ${total}\nForma de pagamento: ${formaPagamento}`);

    localStorage.removeItem('carrinho');
    carrinho.length = 0;
    atualizar();
    window.location.href = 'ifood_dados.html';
}

// Transfere para o outro HTML
document.getElementById('voltar').addEventListener('click', function () {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    window.location.href = 'ifood_produtos.html';
});

// Atualiza a visualização inicial ao carregar a página
atualizar();
