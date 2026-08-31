// js/importar_dados.js
// Importa os treinos reais fornecidos e o plano futuro

function importarDadosIniciais() {
    // Limpar dados antigos para evitar duplicações
    localStorage.removeItem('corridas_treinos');
    localStorage.removeItem('corridas_sapatilhas');

    // Função auxiliar para criar split a partir de ritmo (seg/km) e FC
    function criarSplit(distancia, ritmoSeg, fc = null) {
        return {
            numero_km: 0, // será preenchido depois
            distancia: distancia,
            tempo_km: Math.round(ritmoSeg * distancia),
            ritmo_km: ritmoSeg,
            fc_media_km: fc,
            elevacao: null,
            cadencia: null
        };
    }

    // Função auxiliar para criar split a partir de tempo total (segundos)
    function criarSplitTempo(distancia, tempoTotalSeg, fc = null) {
        return {
            numero_km: 0,
            distancia: distancia,
            tempo_km: tempoTotalSeg,
            ritmo_km: distancia > 0 ? tempoTotalSeg / distancia : 0,
            fc_media_km: fc,
            elevacao: null,
            cadencia: null
        };
    }

    // Converter string "5:22" para segundos
    function ritmoParaSeg(ritmoStr) {
        const partes = ritmoStr.split(':').map(Number);
        if (partes.length === 2) return partes[0] * 60 + partes[1];
        return 0;
    }

    // Converter string "MM:SS" para segundos
    function tempoParaSeg(tempoStr) {
        const partes = tempoStr.split(':').map(Number);
        if (partes.length === 2) return partes[0] * 60 + partes[1];
        if (partes.length === 3) return partes[0] * 3600 + partes[1] * 60 + partes[2];
        return 0;
    }

    // --- Treinos concluídos (ordenados por data) ---
    const treinosConcluidos = [
        // 29/07/2026 - 4.94 km a 5:05/km
        {
            data: '2026-07-29',
            distancia_total: 4.94,
            ritmo_medio: ritmoParaSeg('5:05'),
            fc_media: null,
            fc_maxima: null,
            notas: '',
            splits: [
                criarSplit(1, ritmoParaSeg('4:59')),
                criarSplit(1, ritmoParaSeg('4:56')),
                criarSplit(1, ritmoParaSeg('4:36')),
                criarSplit(1, ritmoParaSeg('5:33')),
                criarSplit(0.94, ritmoParaSeg('5:24'))
            ]
        },
        // 30/07/2026 - 10.04 km a 5:40/km
        {
            data: '2026-07-30',
            distancia_total: 10.04,
            ritmo_medio: ritmoParaSeg('5:40'),
            fc_media: null,
            fc_maxima: null,
            notas: '',
            splits: [
                criarSplit(1, ritmoParaSeg('5:31')),
                criarSplit(1, ritmoParaSeg('5:08')),
                criarSplit(1, ritmoParaSeg('5:21')),
                criarSplit(1, ritmoParaSeg('5:36')),
                criarSplit(1, ritmoParaSeg('5:30')),
                criarSplit(1, ritmoParaSeg('5:31')),
                criarSplit(1, ritmoParaSeg('6:06')),
                criarSplit(1, ritmoParaSeg('5:54')),
                criarSplit(1, ritmoParaSeg('6:05')),
                criarSplit(1, ritmoParaSeg('5:57')),
                criarSplit(0.04, ritmoParaSeg('5:57')) // aproximado
            ]
        },
        // 04/08/2026 - 10.05 km a 5:27/km
        {
            data: '2026-08-04',
            distancia_total: 10.05,
            ritmo_medio: ritmoParaSeg('5:27'),
            fc_media: null,
            fc_maxima: null,
            notas: '',
            splits: [
                criarSplit(1, ritmoParaSeg('5:41')),
                criarSplit(1, ritmoParaSeg('5:52')),
                criarSplit(1, ritmoParaSeg('5:33')),
                criarSplit(1, ritmoParaSeg('5:27')),
                criarSplit(1, ritmoParaSeg('5:12')),
                criarSplit(1, ritmoParaSeg('5:16')),
                criarSplit(1, ritmoParaSeg('5:28')),
                criarSplit(1, ritmoParaSeg('5:36')),
                criarSplit(1, ritmoParaSeg('5:00')),
                criarSplit(1, ritmoParaSeg('5:30')),
                criarSplit(0.05, ritmoParaSeg('5:30'))
            ]
        },
        // 06/08/2026 - 12.28 km a 5:37/km
        {
            data: '2026-08-06',
            distancia_total: 12.28,
            ritmo_medio: ritmoParaSeg('5:37'),
            fc_media: null,
            fc_maxima: null,
            notas: '',
            splits: [
                criarSplit(1, ritmoParaSeg('5:37'), 127),
                criarSplit(1, ritmoParaSeg('5:26'), 144),
                criarSplit(1, ritmoParaSeg('5:52'), 138),
                criarSplit(1, ritmoParaSeg('5:55'), 139),
                criarSplit(1, ritmoParaSeg('5:37'), 145),
                criarSplit(1, ritmoParaSeg('5:33'), 147),
                criarSplit(1, ritmoParaSeg('5:44'), 146),
                criarSplit(1, ritmoParaSeg('5:21'), 150),
                criarSplit(1, ritmoParaSeg('5:50'), 144),
                criarSplit(1, ritmoParaSeg('5:25'), 145),
                criarSplit(1, ritmoParaSeg('5:27'), 152),
                criarSplit(1, ritmoParaSeg('5:45'), 150),
                criarSplit(0.28, ritmoParaSeg('5:22'), 159)
            ]
        },
        // 10/08/2026 - 5.03 km a 4:53/km (com tempos totais)
        {
            data: '2026-08-10',
            distancia_total: 5.03,
            ritmo_medio: ritmoParaSeg('4:53'),
            fc_media: null,
            fc_maxima: null,
            notas: '',
            splits: [
                criarSplitTempo(1, tempoParaSeg('04:56'), 130),
                criarSplitTempo(1, tempoParaSeg('04:34'), 154),
                criarSplitTempo(1, tempoParaSeg('04:53'), 153),
                criarSplitTempo(1, tempoParaSeg('04:54'), 155),
                criarSplitTempo(1, tempoParaSeg('05:04'), 156),
                criarSplitTempo(0.03, tempoParaSeg('00:09'), 156) // aproximado
            ]
        },
        // 11/08/2026 - 7.04 km a 5:59/km
        {
            data: '2026-08-11',
            distancia_total: 7.04,
            ritmo_medio: ritmoParaSeg('5:59'),
            fc_media: null,
            fc_maxima: null,
            notas: '',
            splits: [
                criarSplit(1, ritmoParaSeg('6:03')),
                criarSplit(1, ritmoParaSeg('5:48')),
                criarSplit(1, ritmoParaSeg('6:05')),
                criarSplit(1, ritmoParaSeg('5:36')),
                criarSplit(1, ritmoParaSeg('6:27')),
                criarSplit(1, ritmoParaSeg('5:53')),
                criarSplit(1, ritmoParaSeg('6:02')),
                criarSplit(0.04, ritmoParaSeg('6:02'))
            ]
        },
        // 13/08/2026 - 7.93 km a 5:28/km
        {
            data: '2026-08-13',
            distancia_total: 7.93,
            ritmo_medio: ritmoParaSeg('5:28'),
            fc_media: null,
            fc_maxima: null,
            notas: '',
            splits: [
                criarSplit(1, ritmoParaSeg('6:04')),
                criarSplit(1, ritmoParaSeg('5:52')),
                criarSplit(1, ritmoParaSeg('5:40')),
                criarSplit(1, ritmoParaSeg('5:21')),
                criarSplit(1, ritmoParaSeg('5:07')),
                criarSplit(1, ritmoParaSeg('4:58')),
                criarSplit(1, ritmoParaSeg('5:14')),
                criarSplit(0.93, ritmoParaSeg('5:29'))
            ]
        },
        // 14/08/2026 - 6.14 km a 6:38/km
        {
            data: '2026-08-14',
            distancia_total: 6.14,
            ritmo_medio: ritmoParaSeg('6:38'),
            fc_media: null,
            fc_maxima: null,
            notas: '',
            splits: [
                criarSplit(1, ritmoParaSeg('6:41')),
                criarSplit(1, ritmoParaSeg('6:39')),
                criarSplit(1, ritmoParaSeg('6:34')),
                criarSplit(1, ritmoParaSeg('6:30')),
                criarSplit(1, ritmoParaSeg('6:48')),
                criarSplit(1, ritmoParaSeg('6:26')),
                criarSplit(0.14, ritmoParaSeg('7:39'))
            ]
        },
        // 19/08/2026 - 5.93 km a 5:36/km
        {
            data: '2026-08-19',
            distancia_total: 5.93,
            ritmo_medio: ritmoParaSeg('5:36'),
            fc_media: null,
            fc_maxima: null,
            notas: '',
            splits: [
                criarSplit(1, ritmoParaSeg('5:11'), 131),
                criarSplit(1, ritmoParaSeg('5:30'), 148),
                criarSplit(1, ritmoParaSeg('5:30'), 148),
                criarSplit(1, ritmoParaSeg('6:13'), 153),
                criarSplit(1, ritmoParaSeg('5:38'), 153),
                criarSplit(0.93, ritmoParaSeg('5:32'), 158)
            ]
        },
        // 20/08/2026 - 9.04 km a 5:11/km
        {
            data: '2026-08-20',
            distancia_total: 9.04,
            ritmo_medio: ritmoParaSeg('5:11'),
            fc_media: null,
            fc_maxima: null,
            notas: '',
            splits: [
                criarSplit(1, ritmoParaSeg('5:19'), 128),
                criarSplit(1, ritmoParaSeg('5:37'), 142),
                criarSplit(1, ritmoParaSeg('4:58'), 149),
                criarSplit(1, ritmoParaSeg('4:49'), 157),
                criarSplit(1, ritmoParaSeg('4:49'), 156),
                criarSplit(1, ritmoParaSeg('4:57'), 156),
                criarSplit(1, ritmoParaSeg('5:31'), 147),
                criarSplit(1, ritmoParaSeg('5:08'), 151),
                criarSplit(1, ritmoParaSeg('5:27'), 160),
                criarSplit(0.04, ritmoParaSeg('4:33'), 161)
            ]
        },
        // 21/08/2026 - 5.61 km a 5:51/km
        {
            data: '2026-08-21',
            distancia_total: 5.61,
            ritmo_medio: ritmoParaSeg('5:51'),
            fc_media: null,
            fc_maxima: null,
            notas: '',
            splits: [
                criarSplit(1, ritmoParaSeg('6:02'), 132),
                criarSplit(1, ritmoParaSeg('6:02'), 140),
                criarSplit(1, ritmoParaSeg('6:08'), 150),
                criarSplit(1, ritmoParaSeg('5:42'), 146),
                criarSplit(1, ritmoParaSeg('5:36'), 146),
                criarSplit(0.61, ritmoParaSeg('5:31'), 155)
            ]
        },
        // 22/08/2026 - 9.83 km a 5:04/km
        {
            data: '2026-08-22',
            distancia_total: 9.83,
            ritmo_medio: ritmoParaSeg('5:04'),
            fc_media: null,
            fc_maxima: null,
            notas: '',
            splits: [
                criarSplit(1, ritmoParaSeg('5:45'), 135),
                criarSplit(1, ritmoParaSeg('5:28'), 152),
                criarSplit(1, ritmoParaSeg('4:46'), 156),
                criarSplit(1, ritmoParaSeg('4:46'), 155),
                criarSplit(1, ritmoParaSeg('4:46'), 157),
                criarSplit(1, ritmoParaSeg('4:40'), 159),
                criarSplit(1, ritmoParaSeg('4:51'), 156),
                criarSplit(1, ritmoParaSeg('4:44'), 163),
                criarSplit(1, ritmoParaSeg('5:27'), 162),
                criarSplit(0.83, ritmoParaSeg('5:36'), 165)
            ]
        },
        // 26/08/2026 - 6.80 km a 5:22/km
        {
            data: '2026-08-26',
            distancia_total: 6.80,
            ritmo_medio: ritmoParaSeg('5:22'),
            fc_media: 118,
            fc_maxima: 151,
            notas: '',
            splits: [
                criarSplit(1, ritmoParaSeg('5:51'), 118),
                criarSplit(1, ritmoParaSeg('5:12'), 137),
                criarSplit(1, ritmoParaSeg('5:18'), 141),
                criarSplit(1, ritmoParaSeg('5:30'), 139),
                criarSplit(1, ritmoParaSeg('5:17'), 143),
                criarSplit(1, ritmoParaSeg('5:13'), 148),
                criarSplit(0.80, ritmoParaSeg('5:08'), 151)
            ]
        },
        // 28/08/2026 - 7.00 km a 5:08/km
        {
            data: '2026-08-28',
            distancia_total: 7.00,
            ritmo_medio: ritmoParaSeg('5:08'),
            fc_media: null,
            fc_maxima: null,
            notas: '',
            splits: [
                criarSplit(1, ritmoParaSeg('6:04'), 117),
                criarSplit(1, ritmoParaSeg('5:32'), 134),
                criarSplit(1, ritmoParaSeg('5:22'), 139),
                criarSplit(1, ritmoParaSeg('4:59'), 145),
                criarSplit(1, ritmoParaSeg('4:45'), 154),
                criarSplit(1, ritmoParaSeg('4:37'), 158),
                criarSplit(1, ritmoParaSeg('4:40'), 160)
            ]
        },
        // 30/08/2026 - 12.00 km a 5:33/km
        {
            data: '2026-08-30',
            distancia_total: 12.00,
            ritmo_medio: ritmoParaSeg('5:33'),
            fc_media: 122,
            fc_maxima: 158,
            notas: '',
            splits: [
                criarSplit(1, ritmoParaSeg('5:46'), 122),
                criarSplit(1, ritmoParaSeg('5:51'), 135),
                criarSplit(1, ritmoParaSeg('5:55'), 137),
                criarSplit(1, ritmoParaSeg('5:51'), 139),
                criarSplit(1, ritmoParaSeg('5:36'), 146),
                criarSplit(1, ritmoParaSeg('5:34'), 148),
                criarSplit(1, ritmoParaSeg('5:50'), 146),
                criarSplit(1, ritmoParaSeg('5:32'), 152),
                criarSplit(1, ritmoParaSeg('5:00'), 153),
                criarSplit(1, ritmoParaSeg('5:10'), 154),
                criarSplit(1, ritmoParaSeg('5:15'), 156),
                criarSplit(1, ritmoParaSeg('5:16'), 158)
            ]
        }
    ];

    // Calcular tempo_total para cada treino com base nos splits
    treinosConcluidos.forEach(t => {
        let tempoTotal = 0;
        t.splits.forEach(s => {
            tempoTotal += s.tempo_km;
        });
        t.tempo_total = tempoTotal;
        t.status = 'concluido';
        t.id = gerarId();
    });

    // --- Plano futuro (treinos planeados) ---
    const treinosPlaneados = [
        // Semana 2 (01/09 a 06/09)
        { data: '2026-09-01', distancia: 7, ritmoAlvo: '5:35–5:50/km', notas: 'Treino fácil' },
        { data: '2026-09-03', distancia: 8, ritmoAlvo: '2 km 5:45–5:50 + 3 km 5:15–5:25 + 3 km 5:40–5:50', notas: 'Treino ritmo' },
        { data: '2026-09-05', distancia: 14, ritmoAlvo: '5:35–5:50/km', notas: 'Longão + Gel 1 (1 unidade aos 45-50 min)' },
        // Semana 3 (08/09 a 13/09)
        { data: '2026-09-08', distancia: 8, ritmoAlvo: '5:35–5:50/km', notas: 'Treino fácil' },
        { data: '2026-09-10', distancia: 8, ritmoAlvo: '6:00 → 5:20/km progressivo', notas: 'Progressivo' },
        { data: '2026-09-12', distancia: 16, ritmoAlvo: '5:35–5:50/km', notas: 'Longão + Gel 2 (2 unidades aos 45-50 e 85-90 min)' },
        // Semana 4 (15/09 a 21/09)
        { data: '2026-09-15', distancia: 5, ritmoAlvo: '5:50–6:05/km', notas: 'Recuperação' },
        { data: '2026-09-17', distancia: 9, ritmoAlvo: '3 km 5:45–5:50 + 3 km 5:15–5:25 + 3 km 5:45–5:50', notas: 'Treino ritmo' },
        { data: '2026-09-19', distancia: 18, ritmoAlvo: '5:35–5:50/km', notas: 'Longão 18 km + 2 géis (45 e 90 min)' },
        // Semana 5 (22/09 a 27/09)
        { data: '2026-09-22', distancia: 6, ritmoAlvo: '5:40–5:55/km', notas: 'Fácil' },
        { data: '2026-09-24', distancia: 7, ritmoAlvo: '5:55 → 5:25/km progressivo', notas: 'Progressivo' },
        { data: '2026-09-26', distancia: 13, ritmoAlvo: '5:40–5:55/km', notas: 'Longão + teste gel (1 unidade aos 45-50 min)' },
        // Semana 6 (29/09 a 05/10)
        { data: '2026-09-29', distancia: 7, ritmoAlvo: '5:35–5:50/km + 5x100m', notas: 'Fácil + strides' },
        { data: '2026-10-01', distancia: 8, ritmoAlvo: '3 km fácil + 3 km 5:15–5:25 + 2 km fácil', notas: 'Treino ritmo' },
        { data: '2026-10-03', distancia: 14.5, ritmoAlvo: '5:35–5:50/km; últimos 3 km 5:50–6:00/km', notas: 'Ensaio geral: 2-3 géis (30-40, 75-80, 105-110 min)' },
        // Semana 7 (06/10 a 14/10) - taper e provas
        { data: '2026-10-06', distancia: 6, ritmoAlvo: '5:40–5:55/km + 4x100m', notas: 'Taper' },
        { data: '2026-10-08', distancia: 5, ritmoAlvo: '1,5 km fácil + 2 km 5:45–5:50 + 1,5 km fácil', notas: 'Ativação' },
        { data: '2026-10-10', distancia: 4, ritmoAlvo: '6:20–6:40/km', notas: 'Muito fácil' },
        { data: '2026-10-11', distancia: 10, ritmoAlvo: '5:55–6:00/km (controlado)', notas: '🏁 Corrida da Ponte Viana — 10 km' },
        { data: '2026-10-14', distancia: 21.1, ritmoAlvo: 'Km 0-3: 6:00–6:05; Km 3-10: 5:50–5:55; Km 10-15: 5:45–5:50; Km 15-18: 5:45–5:50; Km 18-21,1: acelerar', notas: '🏁 MEIA MARATONA — 21,1 km' }
    ];

    const treinosPlaneadosFormatados = treinosPlaneados.map(t => ({
        id: gerarId(),
        data: t.data,
        distancia_total: t.distancia,
        tempo_total: null,
        ritmo_medio: null,
        ritmo_alvo: t.ritmoAlvo,
        fc_media: null,
        fc_maxima: null,
        sapatilha_id: null,
        notas: t.notas,
        splits: [],
        status: 'planejado'
    }));

    // Juntar todos os treinos
    const todosTreinos = [...treinosConcluidos, ...treinosPlaneadosFormatados];

    // Criar sapatilha padrão (ASICS Nimbus 27)
    const sapatilha = {
        id: gerarId(),
        nome: 'ASICS Nimbus 27',
        modelo: 'Nimbus 27',
        data_compra: '2026-01-01',
        km_acumulados: 130, // km inicial
        km_max_recomendado: 800,
        ativa: true
    };

    // Associar sapatilha a todos os treinos e calcular km total
    let kmTotalSapatilha = sapatilha.km_acumulados;
    todosTreinos.forEach(t => {
        t.sapatilha_id = sapatilha.id;
        if (t.status === 'concluido') {
            kmTotalSapatilha += t.distancia_total;
        }
    });
    sapatilha.km_acumulados = kmTotalSapatilha;

    // Guardar no localStorage
    localStorage.setItem('corridas_sapatilhas', JSON.stringify([sapatilha]));
    localStorage.setItem('corridas_treinos', JSON.stringify(todosTreinos));

    console.log('Dados importados com sucesso!');
}

// Executar a importação
importarDadosIniciais();