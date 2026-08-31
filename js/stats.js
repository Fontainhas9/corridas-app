// Estatísticas e gráficos simples

class StatsView {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    renderizar() {
        const treinos = StorageManager.getTreinos().filter(t => t.status === 'concluido');
        if (treinos.length === 0) {
            this.container.innerHTML = `<h2>Estatísticas</h2><p>Nenhum treino concluído ainda.</p>`;
            return;
        }

        const totalKm = treinos.reduce((acc, t) => acc + t.distancia_total, 0);
        const totalTempo = treinos.reduce((acc, t) => acc + (t.tempo_total || 0), 0);
        const mediaRitmo = totalKm > 0 ? totalTempo / totalKm : 0;
        const totalTreinos = treinos.length;

        // Agrupar por semana (últimos 30 dias)
        const hoje = new Date();
        const ultimos30dias = treinos.filter(t => {
            const data = new Date(t.data);
            const diff = (hoje - data) / (1000 * 60 * 60 * 24);
            return diff <= 30;
        });

        const kmPorSemana = {};
        ultimos30dias.forEach(t => {
            const data = new Date(t.data);
            const semana = this.getSemanaAno(data);
            if (!kmPorSemana[semana]) kmPorSemana[semana] = 0;
            kmPorSemana[semana] += t.distancia_total;
        });

        let html = `
            <h2>Estatísticas</h2>
            <div class="row">
                <div class="stat-box">
                    <h3>Total de Treinos</h3>
                    <p>${totalTreinos}</p>
                </div>
                <div class="stat-box">
                    <h3>Distância Total</h3>
                    <p>${totalKm.toFixed(1)} km</p>
                </div>
                <div class="stat-box">
                    <h3>Tempo Total</h3>
                    <p>${formatarTempo(totalTempo)}</p>
                </div>
                <div class="stat-box">
                    <h3>Ritmo Médio Geral</h3>
                    <p>${formatarRitmo(mediaRitmo)} /km</p>
                </div>
            </div>
            <h3>Distância por Semana (últimos 30 dias)</h3>
            <canvas id="grafico-semanal" width="600" height="300"></canvas>
        `;

        this.container.innerHTML = html;
        this.desenharGrafico(kmPorSemana);
    }

    getSemanaAno(data) {
        const primeiroDiaAno = new Date(data.getFullYear(), 0, 1);
        const dias = Math.floor((data - primeiroDiaAno) / (24 * 60 * 60 * 1000));
        return Math.ceil((dias + primeiroDiaAno.getDay() + 1) / 7);
    }

    desenharGrafico(dados) {
        const canvas = document.getElementById('grafico-semanal');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const labels = Object.keys(dados).sort();
        const valores = labels.map(l => dados[l]);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const margem = 40;
        const larguraGrafico = canvas.width - 2 * margem;
        const alturaGrafico = canvas.height - 2 * margem;

        // Eixo Y
        ctx.beginPath();
        ctx.moveTo(margem, margem);
        ctx.lineTo(margem, canvas.height - margem);
        ctx.lineTo(canvas.width - margem, canvas.height - margem);
        ctx.stroke();

        const maxValor = Math.max(...valores, 10);
        const escalaY = alturaGrafico / maxValor;

        // Linha do gráfico
        ctx.beginPath();
        valores.forEach((v, i) => {
            const x = margem + (i / (valores.length - 1)) * larguraGrafico;
            const y = canvas.height - margem - (v * escalaY);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.strokeStyle = '#4CAF50';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Pontos e rótulos
        valores.forEach((v, i) => {
            const x = margem + (i / (valores.length - 1)) * larguraGrafico;
            const y = canvas.height - margem - (v * escalaY);
            ctx.fillStyle = '#4CAF50';
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillStyle = '#333';
            ctx.font = '10px Arial';
            ctx.fillText(`Sem ${labels[i]}`, x - 15, canvas.height - margem + 15);
            ctx.fillText(v.toFixed(1), x - 10, y - 10);
        });
    }
}