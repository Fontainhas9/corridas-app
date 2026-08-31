// Formulário de registo de treino e exibição de detalhes

class TreinoView {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    renderizarFormulario(treinoExistente = null) {
        const sapatilhas = StorageManager.getSapatilhas();
        const hoje = formatarData(new Date());
        const data = treinoExistente ? treinoExistente.data : hoje;
        const distancia = treinoExistente ? treinoExistente.distancia_total : '';
        const tempoTotal = treinoExistente ? this.segundosParaTempoStr(treinoExistente.tempo_total) : '';
        const fcMedia = treinoExistente ? treinoExistente.fc_media : '';
        const fcMax = treinoExistente ? treinoExistente.fc_maxima : '';
        const sapatilhaId = treinoExistente ? treinoExistente.sapatilha_id : '';
        const notas = treinoExistente ? treinoExistente.notas : '';
        const splits = treinoExistente && treinoExistente.splits ? treinoExistente.splits : [];

        let sapatilhasOptions = '<option value="">Selecione...</option>';
        sapatilhas.forEach(s => {
            sapatilhasOptions += `<option value="${s.id}" ${s.id === sapatilhaId ? 'selected' : ''}>${s.nome}</option>`;
        });

        let splitsHtml = '';
        if (splits.length > 0) {
            splits.forEach((split, index) => {
                splitsHtml += this.gerarLinhaSplit(split, index);
            });
        } else {
            splitsHtml = this.gerarLinhaSplit(null, 0);
        }

        this.container.innerHTML = `
            <h2>${treinoExistente ? 'Editar Treino' : 'Registrar Novo Treino'}</h2>
            <form id="form-treino">
                <div class="row">
                    <div>
                        <label for="data">Data</label>
                        <input type="date" id="data" value="${data}" required>
                    </div>
                    <div>
                        <label for="distancia">Distância (km)</label>
                        <input type="number" step="0.01" id="distancia" value="${distancia}" required>
                    </div>
                </div>
                <div class="row">
                    <div>
                        <label for="tempo-total">Tempo Total (HH:MM:SS)</label>
                        <input type="text" id="tempo-total" placeholder="ex: 00:45:30" value="${tempoTotal}" required>
                    </div>
                    <div>
                        <label for="ritmo-medio">Ritmo Médio (calculado)</label>
                        <input type="text" id="ritmo-medio" disabled>
                    </div>
                </div>
                <div class="row">
                    <div>
                        <label for="fc-media">FC Média</label>
                        <input type="number" id="fc-media" value="${fcMedia}">
                    </div>
                    <div>
                        <label for="fc-max">FC Máxima</label>
                        <input type="number" id="fc-max" value="${fcMax}">
                    </div>
                </div>
                <div>
                    <label for="sapatilha">Sapatilhas</label>
                    <select id="sapatilha">${sapatilhasOptions}</select>
                </div>
                <div>
                    <label>Splits por km</label>
                    <div id="splits-container">${splitsHtml}</div>
                    <button type="button" id="add-split" class="secondary">+ Adicionar km</button>
                </div>
                <div>
                    <label for="notas">Notas</label>
                    <textarea id="notas" rows="3">${notas}</textarea>
                </div>
                <button type="submit">${treinoExistente ? 'Atualizar' : 'Salvar'}</button>
                ${treinoExistente ? `<button type="button" id="cancelar-edicao" class="secondary">Cancelar</button>` : ''}
            </form>
        `;

        this.adicionarEventos(treinoExistente);
    }

    gerarLinhaSplit(split = null, index) {
        const km = split ? (split.distancia || 1) : 1;
        const tempo = split ? this.segundosParaTempoStr(split.tempo_km) : '';
        const fc = split ? split.fc_media_km : '';
        const ritmo = split ? formatarRitmo(split.ritmo_km) : '';
        return `
            <div class="row split-row" data-index="${index}">
                <div style="max-width:60px;"><label>Km</label><input type="number" step="0.01" class="split-distancia" value="${km}"></div>
                <div><label>Tempo Total (MM:SS)</label><input type="text" class="split-tempo" placeholder="ex: 5:30" value="${tempo}"></div>
                <div><label>FC Média</label><input type="number" class="split-fc" value="${fc}"></div>
                <div><label>Ritmo (/km)</label><input type="text" class="split-ritmo" value="${ritmo}" disabled></div>
                <div style="align-self:flex-end;"><button type="button" class="remove-split danger">X</button></div>
            </div>
        `;
    }

    segundosParaTempoStr(segundos) {
        if (!segundos || isNaN(segundos)) return '';
        const h = Math.floor(segundos / 3600);
        const m = Math.floor((segundos % 3600) / 60);
        const s = Math.floor(segundos % 60);
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }

    adicionarEventos(treinoExistente) {
        const form = document.getElementById('form-treino');
        const distanciaInput = document.getElementById('distancia');
        const tempoTotalInput = document.getElementById('tempo-total');
        const ritmoMedioInput = document.getElementById('ritmo-medio');
        const splitsContainer = document.getElementById('splits-container');
        const addSplitBtn = document.getElementById('add-split');

        // Atualizar ritmo médio quando distância ou tempo mudam
        const atualizarRitmoMedio = () => {
            const distancia = parseFloat(distanciaInput.value);
            const tempoSeg = parseTempoParaSegundos(tempoTotalInput.value);
            if (distancia > 0 && tempoSeg > 0) {
                const ritmo = calcularRitmo(tempoSeg, distancia);
                ritmoMedioInput.value = formatarRitmo(ritmo);
            } else {
                ritmoMedioInput.value = '';
            }
        };

        distanciaInput.addEventListener('input', atualizarRitmoMedio);
        tempoTotalInput.addEventListener('input', atualizarRitmoMedio);

        // Adicionar split
        addSplitBtn.addEventListener('click', () => {
            const rows = splitsContainer.querySelectorAll('.split-row');
            const novoIndex = rows.length;
            splitsContainer.insertAdjacentHTML('beforeend', this.gerarLinhaSplit(null, novoIndex));
            this.adicionarEventosSplit(splitsContainer);
        });

        // Eventos para splits existentes
        this.adicionarEventosSplit(splitsContainer);

        // Remover split
        splitsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-split')) {
                e.target.closest('.split-row').remove();
            }
        });

        // Submeter formulário
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.salvarTreino(treinoExistente);
        });

        if (treinoExistente) {
            document.getElementById('cancelar-edicao').addEventListener('click', () => {
                app.mostrarTreinosDoDia(treinoExistente.data);
            });
        }
    }

    adicionarEventosSplit(container) {
        container.querySelectorAll('.split-tempo, .split-distancia').forEach(input => {
            input.addEventListener('input', (e) => {
                const row = e.target.closest('.split-row');
                const tempoStr = row.querySelector('.split-tempo').value;
                const distancia = parseFloat(row.querySelector('.split-distancia').value) || 0;
                const tempoSeg = parseTempoParaSegundos(tempoStr);
                if (tempoSeg > 0 && distancia > 0) {
                    const ritmo = tempoSeg / distancia;
                    row.querySelector('.split-ritmo').value = formatarRitmo(ritmo);
                } else {
                    row.querySelector('.split-ritmo').value = '';
                }
            });
        });
    }

    salvarTreino(treinoExistente) {
        const data = document.getElementById('data').value;
        const distancia = parseFloat(document.getElementById('distancia').value);
        const tempoTotalStr = document.getElementById('tempo-total').value;
        const tempoTotal = parseTempoParaSegundos(tempoTotalStr);
        const fcMedia = parseInt(document.getElementById('fc-media').value) || null;
        const fcMax = parseInt(document.getElementById('fc-max').value) || null;
        const sapatilhaId = document.getElementById('sapatilha').value;
        const notas = document.getElementById('notas').value;

        const splits = [];
        const splitRows = document.querySelectorAll('.split-row');
        splitRows.forEach((row, index) => {
            const distanciaSplit = parseFloat(row.querySelector('.split-distancia').value) || 0;
            const tempoStr = row.querySelector('.split-tempo').value;
            const fcSplit = parseInt(row.querySelector('.split-fc').value) || null;
            if (distanciaSplit > 0 && tempoStr) {
                const tempoSeg = parseTempoParaSegundos(tempoStr);
                const ritmo = tempoSeg / distanciaSplit;
                splits.push({
                    numero_km: index + 1,
                    distancia: distanciaSplit,
                    tempo_km: tempoSeg,
                    ritmo_km: ritmo,
                    fc_media_km: fcSplit
                });
            }
        });

        const treino = {
            id: treinoExistente ? treinoExistente.id : gerarId(),
            data,
            distancia_total: distancia,
            tempo_total: tempoTotal,
            ritmo_medio: distancia > 0 ? tempoTotal / distancia : 0,
            fc_media: fcMedia,
            fc_maxima: fcMax,
            sapatilha_id: sapatilhaId || null,
            notas,
            splits,
            status: 'concluido', // ao salvar, marca como concluído
            data_criacao: treinoExistente ? treinoExistente.data_criacao : new Date().toISOString()
        };

        if (treinoExistente) {
            // Se trocou de sapatilha, ajustar km acumulados
            if (treinoExistente.sapatilha_id && treinoExistente.sapatilha_id !== treino.sapatilha_id) {
                StorageManager.atualizarKmSapatilha(treinoExistente.sapatilha_id, -treinoExistente.distancia_total);
            }
            StorageManager.atualizarTreino(treino.id, treino);
            if (treino.sapatilha_id) {
                StorageManager.atualizarKmSapatilha(treino.sapatilha_id, treino.distancia_total - (treinoExistente.distancia_total || 0));
            }
            app.mostrarTreinosDoDia(data);
        } else {
            StorageManager.adicionarTreino(treino);
            if (treino.sapatilha_id) {
                StorageManager.atualizarKmSapatilha(treino.sapatilha_id, treino.distancia_total);
            }
            app.mostrarCalendario();
        }
        app.atualizarTodasAbas();
    }

    renderizarDetalhesTreino(treinoId) {
        const treino = StorageManager.getTreinoPorId(treinoId);
        if (!treino) return;

        const sapatilha = treino.sapatilha_id ? StorageManager.getSapatilhaPorId(treino.sapatilha_id) : null;
        const sapatilhaNome = sapatilha ? sapatilha.nome : 'Nenhuma';

        let splitsHtml = '';
        if (treino.splits && treino.splits.length > 0) {
            splitsHtml = `
                <h3>Splits</h3>
                <table>
                    <tr><th>#</th><th>Distância (km)</th><th>Tempo Total</th><th>Ritmo (/km)</th><th>FC Média</th></tr>
                    ${treino.splits.map((s, i) => `
                        <tr>
                            <td>${i + 1}</td>
                            <td>${s.distancia ? s.distancia.toFixed(2) : '1.00'}</td>
                            <td>${formatarTempo(s.tempo_km)}</td>
                            <td>${formatarRitmo(s.ritmo_km)}</td>
                            <td>${s.fc_media_km || '--'}</td>
                        </tr>
                    `).join('')}
                </table>
            `;
        }

        this.container.innerHTML = `
            <h2>Detalhes do Treino</h2>
            <div class="card">
                <p><strong>Data:</strong> ${formatarData(treino.data)}</p>
                <p><strong>Status:</strong> ${treino.status === 'planejado' ? '📅 Planejado' : '✅ Concluído'}</p>
                <p><strong>Distância:</strong> ${treino.distancia_total} km</p>
                ${treino.tempo_total ? `<p><strong>Tempo Total:</strong> ${formatarTempo(treino.tempo_total)}</p>` : ''}
                ${treino.ritmo_medio ? `<p><strong>Ritmo Médio:</strong> ${formatarRitmo(treino.ritmo_medio)} /km</p>` : ''}
                ${treino.fc_media ? `<p><strong>FC Média:</strong> ${treino.fc_media} bpm</p>` : ''}
                ${treino.fc_maxima ? `<p><strong>FC Máxima:</strong> ${treino.fc_maxima} bpm</p>` : ''}
                <p><strong>Sapatilhas:</strong> ${sapatilhaNome}</p>
                ${treino.ritmo_alvo ? `<p><strong>Ritmo Alvo:</strong> ${treino.ritmo_alvo}</p>` : ''}
                ${treino.notas ? `<p><strong>Notas:</strong> ${treino.notas}</p>` : ''}
            </div>
            ${splitsHtml}
            <button onclick="app.editarTreino('${treino.id}')">Editar</button>
            <button onclick="app.excluirTreino('${treino.id}')" class="danger">Excluir</button>
            <button onclick="app.mostrarCalendario()">Voltar</button>
        `;
    }

    renderizarListaTreinosDia(data) {
        const treinos = StorageManager.getTreinos().filter(t => t.data === data);
        let html = `<h2>Treinos em ${data}</h2>`;
        if (treinos.length === 0) {
            html += `<p>Nenhum treino registado.</p>`;
        } else {
            html += `<div class="card-list">`;
            treinos.forEach(t => {
                const statusBadge = t.status === 'planejado' ? '📅 Planejado' : '✅ Concluído';
                html += `
                    <div class="card">
                        <p><strong>Status:</strong> ${statusBadge}</p>
                        <p><strong>Distância:</strong> ${t.distancia_total} km</p>
                        ${t.tempo_total ? `<p><strong>Tempo:</strong> ${formatarTempo(t.tempo_total)}</p>` : ''}
                        ${t.ritmo_alvo ? `<p><strong>Ritmo Alvo:</strong> ${t.ritmo_alvo}</p>` : ''}
                        ${t.ritmo_medio ? `<p><strong>Ritmo Real:</strong> ${formatarRitmo(t.ritmo_medio)} /km</p>` : ''}
                        ${t.notas ? `<p><strong>Notas:</strong> ${t.notas}</p>` : ''}
                        <button onclick="app.verDetalhesTreino('${t.id}')">Ver detalhes</button>
                        ${t.status === 'planejado' ? `<button onclick="app.registrarConcluido('${t.id}')">✅ Registrar como concluído</button>` : ''}
                    </div>
                `;
            });
            html += `</div>`;
        }
        html += `<button onclick="app.mostrarCalendario()">Voltar ao calendário</button>`;
        this.container.innerHTML = html;
    }
}