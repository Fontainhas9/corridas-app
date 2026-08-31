// Funções utilitárias gerais

function formatarData(data) {
    // Se já é string, retorna como está (formato YYYY-MM-DD)
    if (typeof data === 'string') {
        return data;
    }
    // Se for objeto Date, usa componentes locais
    const d = new Date(data);
    const ano = d.getFullYear();
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
}

function formatarDataHora(data) {
    const d = new Date(data);
    return d.toLocaleString('pt-PT');
}

function formatarTempo(segundos) {
    const h = Math.floor(segundos / 3600);
    const m = Math.floor((segundos % 3600) / 60);
    const s = Math.floor(segundos % 60);
    if (h > 0) {
        return `${h}h ${m.toString().padStart(2, '0')}min`;
    } else if (m > 0) {
        return `${m}min ${s.toString().padStart(2, '0')}s`;
    } else {
        return `${s}s`;
    }
}

function formatarRitmo(segundosPorKm) {
    if (!segundosPorKm || isNaN(segundosPorKm)) return '--:--';
    const m = Math.floor(segundosPorKm / 60);
    const s = Math.floor(segundosPorKm % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
}

function parseTempoParaSegundos(tempoStr) {
    const partes = tempoStr.split(':').map(Number);
    if (partes.length === 3) {
        return partes[0] * 3600 + partes[1] * 60 + partes[2];
    } else if (partes.length === 2) {
        return partes[0] * 60 + partes[1];
    } else {
        return Number(tempoStr) || 0;
    }
}

function calcularRitmo(tempoSegundos, distanciaKm) {
    if (!distanciaKm || distanciaKm <= 0) return 0;
    return tempoSegundos / distanciaKm;
}

function obterDiaSemana(data) {
    const dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return dias[data.getDay()];
}

function gerarId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

function obterMesAtual() {
    const agora = new Date();
    return { ano: agora.getFullYear(), mes: agora.getMonth() };
}