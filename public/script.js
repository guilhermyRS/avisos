// Função para buscar os avisos do backend
async function fetchAvisos() {
    const response = await fetch('/api/avisos');
    return await response.json();
}

// Função para exibir avisos na página `index.html`
async function renderAvisos() {
    const avisos = await fetchAvisos();
    const container = document.getElementById('avisosContainer');
    container.innerHTML = avisos.map(aviso => `
        <div class="p-4 bg-white rounded shadow">
            <p><strong>Docente:</strong> ${aviso.docente}</p>
            <p><strong>Sala:</strong> ${aviso.sala}</p>
            <p><strong>Horário:</strong> ${aviso.horario}</p>
        </div>
    `).join('');
}

// Função para adicionar um aviso ao backend
async function adicionarAviso(aviso) {
    await fetch('/api/avisos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aviso)
    });
    renderAvisos(); // Atualiza a lista de avisos
}

// Para `index.html`: Carrega os avisos automaticamente ao abrir a página
if (window.location.pathname.includes('index.html')) {
    document.addEventListener('DOMContentLoaded', renderAvisos);
}

// Para `crud.html`: Adiciona um aviso quando o formulário for enviado
if (window.location.pathname.includes('crud.html')) {
    document.getElementById('avisoForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const docente = document.getElementById('docente').value;
        const sala = document.getElementById('sala').value;
        const horario = document.getElementById('horario').value;
        await adicionarAviso({ docente, sala, horario });
        renderAvisos(); // Atualiza a lista de avisos
    });
}
