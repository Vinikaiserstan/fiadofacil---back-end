const API_URL = "http://localhost:3000/api";

// Função para mudar de tela (Home, Cliente, Venda, etc)
function navegar(telaId) {
    // Esconde todas as telas
    document.querySelectorAll('.tela').forEach(t => t.style.display = 'none');
    // Mostra a tela clicada
    const tela = document.getElementById(`tela-${telaId}`);
    if (tela) tela.style.display = 'block';

    // Se for para a tela de venda, carrega a lista de clientes no select
    if (telaId === 'venda') carregarClientesNoSelect();
    // Se for para o histórico, carrega a lista de dívidas
    if (telaId === 'historico') carregarHistorico();
}

// 1. CADASTRAR CLIENTE (Entidade Secundária)
async function salvarCliente() {
    const nome = document.getElementById('nome-cliente').value;
    const tel = document.getElementById('tel-cliente').value;

    if (!nome) return alert("O nome do cliente é obrigatório!");

    await fetch(`${API_URL}/clientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, telefone: tel })
    });

    alert("Cliente cadastrado!");
    navegar('venda'); // Vai direto para a venda após cadastrar
}

// 2. CARREGAR CLIENTES NO SELECT (Para a Venda)
async function carregarClientesNoSelect() {
    const res = await fetch(`${API_URL}/clientes`);
    const clientes = await res.json();
    const select = document.getElementById('select-cliente');
    
    select.innerHTML = '<option value="">Selecione o Cliente</option>';
    clientes.forEach(c => {
        select.innerHTML += `<option value="${c.nome}">${c.nome}</option>`;
    });
}

// 3. SALVAR VENDA (Entidade Principal - CRUD Completo)
async function salvarVenda() {
    const id = document.getElementById('venda-id').value; // Usado para Editar
    const dados = {
        cliente: document.getElementById('select-cliente').value,
        valor: document.getElementById('valor-venda').value,
        descricao: document.getElementById('desc-venda').value,
        dataVencimento: document.getElementById('vencimento-venda').value
    };

    const metodo = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/vendas/${id}` : `${API_URL}/vendas`;

    await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });

    alert(id ? "Venda atualizada!" : "Venda registrada!");
    navegar('historico');
}

// 4. CARREGAR HISTÓRICO (Listar e Deletar)
async function carregarHistorico() {
    const res = await fetch(`${API_URL}/vendas`);
    const vendas = await res.json();
    const container = document.getElementById('lista-historico');
    container.innerHTML = "";

    vendas.forEach(v => {
        container.innerHTML += `
            <div class="card">
                <p><strong>${v.cliente}</strong> - R$ ${v.valor}</p>
                <button onclick="excluirVenda('${v.id}')">🗑️ Excluir</button>
            </div>`;
    });
}

async function excluirVenda(id) {
    if (confirm("Deseja apagar este registro?")) {
        await fetch(`${API_URL}/vendas/${id}`, { method: 'DELETE' });
        carregarHistorico();
    }
}

// Inicia o sistema escondendo o login e indo para a home
function fazerLogin() {
    document.body.classList.remove('not-logged-in');
    navegar('home');
}