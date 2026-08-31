// Controlador principal da aplicação

class App {
    constructor() {
        this.calendario = new Calendario('conteudo-calendario');
        this.treinoView = new TreinoView('conteudo-treino');
        this.sapatilhasView = new SapatilhasView('conteudo-sapatilhas');
        this.statsView = new StatsView('conteudo-stats');

        this.inicializarNavegacao();
        this.mostrarCalendario();
    }

    inicializarNavegacao() {
        const botoes = document.querySelectorAll('.tab-btn');
        botoes.forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                this.mostrarTab(tab);
            });
        });
    }

    mostrarTab(tab) {
        document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

        const tabContent = document.getElementById(`tab-${tab}`);
        if (tabContent) tabContent.classList.add('active');
        document.querySelector(`.tab-btn[data-tab="${tab}"]`).classList.add('active');

        switch (tab) {
            case 'calendario':
                this.mostrarCalendario();
                break;
            case 'treino':
                this.mostrarFormularioTreino();
                break;
            case 'sapatilhas':
                this.mostrarSapatilhas();
                break;
            case 'stats':
                this.mostrarStats();
                break;
        }
    }

    mostrarCalendario() {
        const main = document.getElementById('app');
        main.innerHTML = `
            <div class="tab-content active" id="tab-calendario">
                <div id="conteudo-calendario"></div>
            </div>
            <div class="tab-content" id="tab-treino"></div>
            <div class="tab-content" id="tab-sapatilhas"></div>
            <div class="tab-content" id="tab-stats"></div>
        `;
        this.calendario = new Calendario('conteudo-calendario');
        this.calendario.renderizar();
        this.treinoView = new TreinoView('conteudo-treino');
        this.sapatilhasView = new SapatilhasView('conteudo-sapatilhas');
        this.statsView = new StatsView('conteudo-stats');
    }

    mostrarTreinosDoDia(data) {
        const main = document.getElementById('app');
        main.innerHTML = `
            <div class="tab-content" id="tab-calendario"></div>
            <div class="tab-content active" id="tab-treino">
                <div id="conteudo-treino"></div>
            </div>
            <div class="tab-content" id="tab-sapatilhas"></div>
            <div class="tab-content" id="tab-stats"></div>
        `;
        this.treinoView = new TreinoView('conteudo-treino');
        this.treinoView.renderizarListaTreinosDia(data);
    }

    mostrarFormularioTreino() {
        const main = document.getElementById('app');
        main.innerHTML = `
            <div class="tab-content" id="tab-calendario"></div>
            <div class="tab-content active" id="tab-treino">
                <div id="conteudo-treino"></div>
            </div>
            <div class="tab-content" id="tab-sapatilhas"></div>
            <div class="tab-content" id="tab-stats"></div>
        `;
        this.treinoView = new TreinoView('conteudo-treino');
        this.treinoView.renderizarFormulario();
    }

    mostrarSapatilhas() {
        const main = document.getElementById('app');
        main.innerHTML = `
            <div class="tab-content" id="tab-calendario"></div>
            <div class="tab-content" id="tab-treino"></div>
            <div class="tab-content active" id="tab-sapatilhas">
                <div id="conteudo-sapatilhas"></div>
            </div>
            <div class="tab-content" id="tab-stats"></div>
        `;
        this.sapatilhasView = new SapatilhasView('conteudo-sapatilhas');
        this.sapatilhasView.renderizar();
    }

    mostrarStats() {
        const main = document.getElementById('app');
        main.innerHTML = `
            <div class="tab-content" id="tab-calendario"></div>
            <div class="tab-content" id="tab-treino"></div>
            <div class="tab-content" id="tab-sapatilhas"></div>
            <div class="tab-content active" id="tab-stats">
                <div id="conteudo-stats"></div>
            </div>
        `;
        this.statsView = new StatsView('conteudo-stats');
        this.statsView.renderizar();
    }

    verDetalhesTreino(id) {
        const main = document.getElementById('app');
        main.innerHTML = `
            <div class="tab-content" id="tab-calendario"></div>
            <div class="tab-content active" id="tab-treino">
                <div id="conteudo-treino"></div>
            </div>
            <div class="tab-content" id="tab-sapatilhas"></div>
            <div class="tab-content" id="tab-stats"></div>
        `;
        this.treinoView = new TreinoView('conteudo-treino');
        this.treinoView.renderizarDetalhesTreino(id);
    }

    editarTreino(id) {
        const treino = StorageManager.getTreinoPorId(id);
        if (!treino) return;
        const main = document.getElementById('app');
        main.innerHTML = `
            <div class="tab-content" id="tab-calendario"></div>
            <div class="tab-content active" id="tab-treino">
                <div id="conteudo-treino"></div>
            </div>
            <div class="tab-content" id="tab-sapatilhas"></div>
            <div class="tab-content" id="tab-stats"></div>
        `;
        this.treinoView = new TreinoView('conteudo-treino');
        this.treinoView.renderizarFormulario(treino);
    }

    excluirTreino(id) {
        if (confirm('Tem certeza que deseja excluir este treino?')) {
            const treino = StorageManager.getTreinoPorId(id);
            if (treino && treino.sapatilha_id && treino.status === 'concluido') {
                StorageManager.atualizarKmSapatilha(treino.sapatilha_id, -treino.distancia_total);
            }
            StorageManager.removerTreino(id);
            this.mostrarCalendario();
        }
    }

    registrarConcluido(id) {
        // Abre o formulário de edição para inserir dados reais e marcar como concluído
        this.editarTreino(id);
    }

    novaSapatilha() {
        const main = document.getElementById('app');
        main.innerHTML = `
            <div class="tab-content" id="tab-calendario"></div>
            <div class="tab-content" id="tab-treino"></div>
            <div class="tab-content active" id="tab-sapatilhas">
                <div id="conteudo-sapatilhas"></div>
            </div>
            <div class="tab-content" id="tab-stats"></div>
        `;
        this.sapatilhasView = new SapatilhasView('conteudo-sapatilhas');
        this.sapatilhasView.renderizarFormulario();
    }

    editarSapatilha(id) {
        const sapatilha = StorageManager.getSapatilhaPorId(id);
        if (!sapatilha) return;
        const main = document.getElementById('app');
        main.innerHTML = `
            <div class="tab-content" id="tab-calendario"></div>
            <div class="tab-content" id="tab-treino"></div>
            <div class="tab-content active" id="tab-sapatilhas">
                <div id="conteudo-sapatilhas"></div>
            </div>
            <div class="tab-content" id="tab-stats"></div>
        `;
        this.sapatilhasView = new SapatilhasView('conteudo-sapatilhas');
        this.sapatilhasView.renderizarFormulario(sapatilha);
    }

    excluirSapatilha(id) {
        if (confirm('Tem certeza que deseja excluir esta sapatilha? Os treinos associados não serão excluídos.')) {
            StorageManager.removerSapatilha(id);
            this.mostrarSapatilhas();
        }
    }

    mudarMes(delta) {
        this.calendario.mes += delta;
        if (this.calendario.mes < 0) {
            this.calendario.mes = 11;
            this.calendario.ano--;
        } else if (this.calendario.mes > 11) {
            this.calendario.mes = 0;
            this.calendario.ano++;
        }
        this.calendario.renderizar();
    }

    atualizarTodasAbas() {
        // Método para atualizar dados quando necessário
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});