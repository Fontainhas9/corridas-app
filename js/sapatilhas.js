// Gestão de sapatilhas

class SapatilhasView {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    renderizar() {
        const sapatilhas = StorageManager.getSapatilhas();
        let html = `
            <h2>Sapatilhas</h2>
            <button onclick="app.novaSapatilha()">+ Nova Sapatilha</button>
            <div id="sapatilhas-lista">
        `;

        if (sapatilhas.length === 0) {
            html += `<p>Nenhuma sapatilha registada.</p>`;
        } else {
            sapatilhas.forEach(s => {
                const km = s.km_acumulados || 0;
                const kmMax = s.km_max_recomendado || 0;
                const percentual = kmMax > 0 ? Math.min(100, (km / kmMax) * 100) : 0;
                html += `
                    <div class="sapatilha-item">
                        <div>
                            <strong>${s.nome}</strong> (${s.modelo || 'sem modelo'})
                            <div class="km-badge">${km.toFixed(1)} km</div>
                            ${kmMax > 0 ? `<div style="font-size:0.8rem;">Meta: ${kmMax} km (${percentual.toFixed(0)}%)</div>` : ''}
                        </div>
                        <div>
                            <button onclick="app.editarSapatilha('${s.id}')">Editar</button>
                            <button onclick="app.excluirSapatilha('${s.id}')" class="danger">Excluir</button>
                        </div>
                    </div>
                `;
            });
        }
        html += `</div>`;
        this.container.innerHTML = html;
    }

    renderizarFormulario(sapatilhaExistente = null) {
        const nome = sapatilhaExistente ? sapatilhaExistente.nome : '';
        const modelo = sapatilhaExistente ? sapatilhaExistente.modelo : '';
        const dataCompra = sapatilhaExistente ? sapatilhaExistente.data_compra : '';
        const kmInicial = sapatilhaExistente ? (sapatilhaExistente.km_acumulados || 0) : 0;
        const kmMax = sapatilhaExistente ? (sapatilhaExistente.km_max_recomendado || '') : '';

        this.container.innerHTML = `
            <h2>${sapatilhaExistente ? 'Editar Sapatilha' : 'Nova Sapatilha'}</h2>
            <form id="form-sapatilha">
                <div>
                    <label for="nome">Nome</label>
                    <input type="text" id="nome" value="${nome}" required>
                </div>
                <div>
                    <label for="modelo">Modelo</label>
                    <input type="text" id="modelo" value="${modelo}">
                </div>
                <div>
                    <label for="data-compra">Data de Compra</label>
                    <input type="date" id="data-compra" value="${dataCompra}">
                </div>
                <div>
                    <label for="km-inicial">Km acumulados atuais</label>
                    <input type="number" step="0.1" id="km-inicial" value="${kmInicial}">
                </div>
                <div>
                    <label for="km-max">Km máximo recomendado</label>
                    <input type="number" step="0.1" id="km-max" value="${kmMax}">
                </div>
                <button type="submit">${sapatilhaExistente ? 'Atualizar' : 'Salvar'}</button>
                ${sapatilhaExistente ? `<button type="button" onclick="app.mostrarSapatilhas()" class="secondary">Cancelar</button>` : ''}
            </form>
        `;

        document.getElementById('form-sapatilha').addEventListener('submit', (e) => {
            e.preventDefault();
            const dados = {
                id: sapatilhaExistente ? sapatilhaExistente.id : gerarId(),
                nome: document.getElementById('nome').value,
                modelo: document.getElementById('modelo').value,
                data_compra: document.getElementById('data-compra').value,
                km_acumulados: parseFloat(document.getElementById('km-inicial').value) || 0,
                km_max_recomendado: parseFloat(document.getElementById('km-max').value) || null,
                ativa: true
            };
            if (sapatilhaExistente) {
                StorageManager.atualizarSapatilha(sapatilhaExistente.id, dados);
            } else {
                StorageManager.adicionarSapatilha(dados);
            }
            app.mostrarSapatilhas();
        });
    }
}