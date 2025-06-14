// Atualiza o H2 com o nome do usuário
window.addEventListener('DOMContentLoaded', function () {
    const nome = localStorage.getItem('nomeUsuario');
    if (nome) {
        const h2 = document.getElementById('boas-vindas');
        h2.textContent = `Seja bem-vindo, ${nome}! Este é o nosso cardápio online. Faça seu pedido!`;
    }
});
// Lista de comidas, bebidas e sobremesas disponíveis com preço
const comidas = [
  { nome: "Hambúrguer artesanal", preco: 30 },
  { nome: "Batata frita", preco: 15 },
  { nome: "Nuggets", preco: 18 },
  { nome: "Cachorro-quente", preco: 14 },
  { nome: "Pizza tradicional", preco: 55 },
  { nome: "Lasanha", preco: 32 },
  { nome: "Espaguete", preco: 28 },
  { nome: "Prato feito (PF)", preco: 25 },
  { nome: "Feijoada", preco: 35 },
  { nome: "Estrogonofe", preco: 30 },
  { nome: "Frango assado", preco: 45 },
  { nome: "Sushi (combinado)", preco: 60 },
  { nome: "Pastel", preco: 10 },
  { nome: "Coxinha (salgado)", preco: 8 },
  { nome: "Misto quente", preco: 12 },
  { nome: "Salada de frutas", preco: 10 },
  { nome: "Pão de queijo", preco: 7 },
  { nome: "Porção de Tilápia", preco: 38 },
  { nome: "Baguete", preco: 14 },
  { nome: "Sanduíche", preco: 16 }
];

const bebidas = [
  { nome: "Água mineral", preco: 4 },
  { nome: "Água com gás", preco: 5 },
  { nome: "Refrigerante (lata)", preco: 6 },
  { nome: "Refrigerante (600ml)", preco: 8 },
  { nome: "Refrigerante (2L)", preco: 12 },
  { nome: "Suco natural", preco: 10 },
  { nome: "Suco de caixinha", preco: 6 },
  { nome: "Chá gelado (lata ou garrafa)", preco: 7 },
  { nome: "Energético (lata)", preco: 10 },
  { nome: "Milk-shake", preco: 14 },
  { nome: "Smoothie", preco: 15 },
  { nome: "Cerveja (lata)", preco: 7 }
];

const sobremesas = [
  { nome: "Bolo de chocolate (fatia)", preco: 10 },
  { nome: "Bolo de cenoura com cobertura", preco: 10 },
  { nome: "Brownie", preco: 8 },
  { nome: "Pudim (unidade)", preco: 10 },
  { nome: "Mousse de maracujá", preco: 9 },
  { nome: "Mousse de chocolate", preco: 9 },
  { nome: "Sorvete (pote pequeno)", preco: 12 },
  { nome: "Açaí com complementos", preco: 16 },
  { nome: "Churros (2 unid.)", preco: 10 },
  { nome: "Palha italiana", preco: 8 },
  { nome: "Banoffee (fatia)", preco: 13 },
  { nome: "Petit gâteau", preco: 18 },
];

// Carrinho é recuperado do localStorage, ou inicia vazio se não houver
const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Elementos do HTML
const comidasDiv = document.getElementById('comidas');
const bebidasDiv = document.getElementById('bebidas');
const sobremesasDiv = document.getElementById('sobremesas');

// Função para criar botões dos produtos e adicionar ao HTML
function criarBotoes(lista, container) {
    lista.forEach(p => {
        const btn = document.createElement('button'); // Cria botão para o produto
        btn.textContent = `${p.nome} - R$${p.preco.toFixed(2)}`; // Define o texto do botão
        btn.onclick = () => {
            carrinho.push(p); // Adiciona o produto ao carrinho
            alert(`${p.nome} adicionado ao carrinho.`); // Mostra alerta ao usuário
        };
        container.appendChild(btn); // Adiciona o botão ao container (div)
    });
}

// Cria os botões para cada categoria de produto
criarBotoes(comidas, comidasDiv);
criarBotoes(bebidas, bebidasDiv);
criarBotoes(sobremesas, sobremesasDiv);

// Evento de clique para o botão "Ir para o carrinho"
document.getElementById('irparaocarrinho').addEventListener('click', function () {
    localStorage.setItem('carrinho', JSON.stringify(carrinho)); // Salva o carrinho no localStorage (formato texto)
    window.location.href = 'ifood_caixa.html'; // Redireciona para a página do carrinho (caixa)
});
