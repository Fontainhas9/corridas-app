// Renderização do calendário mensal

class Calendario {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.dataAtual = new Date();
        this.ano = this.dataAtual.getFullYear();
        this.mes = this.dataAtual.getMonth();
        this.treinos = StorageManager.getTreinos();
    }

    renderizar() {
        const primeiroDia = new Date(this.ano, this.mes, 1);
        const ultimoDia = new Date(this.ano, this.mes + 1, 0);
        const diasNoMes = ultimoDia.getDate();
        const diaSemanaInicio = primeiroDia.getDay(); // 0 = Domingo

        const diasMesAnterior = new Date(this.ano, this.mes, 0).getDate();

        let html = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <button onclick="app.mudarMes(-1)">← Mês anterior</button>
                <h2>${this.nomeMes(this.mes)} ${this.ano}</h2>
                <button onclick="app.mudarMes(1)">Próximo mês →</button>
            </div>
            <div class="calendar-grid">
                <div class="calendar-header">Dom</div>
                <div class="calendar-header">Seg</div>
                <div class="calendar-header">Ter</div>
                <div class="calendar-header">Qua</div>
                <div class="calendar-header">Qui</div>
                <div class="calendar-header">Sex</div>
                <div class="calendar-header">Sáb</div>
        `;

        // Dias do mês anterior
        for (let i = diaSemanaInicio - 1; i >= 0; i--) {
            const dia = diasMesAnterior - i;
            html += `<div class="calendar-day other-month">${dia}</div>`;
        }

        // Dias do mês atual
        const hoje = new Date();
        for (let dia = 1; dia <= diasNoMes; dia++) {
            // Construir a data como string no formato YYYY-MM-DD (sem conversão)
            const dataStr = `${this.ano}-${String(this.mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;

            const treinosDoDia = this.treinos.filter(t => t.data === dataStr);
            const temTreinoPlanejado = treinosDoDia.some(t => t.status === 'planejado');
            const temTreinoConcluido = treinosDoDia.some(t => t.status === 'concluido');
            const isToday = hoje.getFullYear() === this.ano && hoje.getMonth() === this.mes && hoje.getDate() === dia;

            let classes = 'calendar-day';
            if (isToday) classes += ' today';
            if (temTreinoPlanejado) classes += ' planejado';
            if (temTreinoConcluido) classes += ' concluido';

            html += `<div class="${classes}" data-data="${dataStr}">${dia}`;
            if (temTreinoPlanejado) {
                html += `<span class="treino-dot planejado">📅</span>`;
            }
            if (temTreinoConcluido) {
                html += `<span class="treino-dot concluido">✅</span>`;
            }
            html += `</div>`;
        }

        // Completar a última semana com dias do próximo mês
        const totalCelulas = Math.ceil((diaSemanaInicio + diasNoMes) / 7) * 7;
        const celulasRestantes = totalCelulas - (diaSemanaInicio + diasNoMes);
        for (let i = 1; i <= celulasRestantes; i++) {
            html += `<div class="calendar-day other-month">${i}</div>`;
        }

        html += `</div>`;

        this.container.innerHTML = html;

        // Evento de clique nos dias
        this.container.querySelectorAll('.calendar-day[data-data]').forEach(el => {
            el.addEventListener('click', () => {
                const data = el.dataset.data;
                const treinosDoDia = this.treinos.filter(t => t.data === data);
                if (treinosDoDia.length > 0) {
                    app.mostrarTreinosDoDia(data);
                }
            });
        });
    }

    nomeMes(mes) {
        const nomes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        return nomes[mes];
    }
}