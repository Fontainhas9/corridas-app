// Gerenciamento de dados com localStorage

const STORAGE_KEYS = {
    treinos: 'corridas_treinos',
    sapatilhas: 'corridas_sapatilhas',
    metas: 'corridas_metas'
};

class StorageManager {
    static getTreinos() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.treinos)) || [];
    }

    static salvarTreinos(treinos) {
        localStorage.setItem(STORAGE_KEYS.treinos, JSON.stringify(treinos));
    }

    static getTreinoPorId(id) {
        const treinos = this.getTreinos();
        return treinos.find(t => t.id === id) || null;
    }

    static adicionarTreino(treino) {
        const treinos = this.getTreinos();
        treinos.push(treino);
        this.salvarTreinos(treinos);
        return treino;
    }

    static atualizarTreino(id, dadosAtualizados) {
        const treinos = this.getTreinos();
        const index = treinos.findIndex(t => t.id === id);
        if (index !== -1) {
            treinos[index] = { ...treinos[index], ...dadosAtualizados };
            this.salvarTreinos(treinos);
            return treinos[index];
        }
        return null;
    }

    static removerTreino(id) {
        let treinos = this.getTreinos();
        treinos = treinos.filter(t => t.id !== id);
        this.salvarTreinos(treinos);
    }

    static getSapatilhas() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.sapatilhas)) || [];
    }

    static salvarSapatilhas(sapatilhas) {
        localStorage.setItem(STORAGE_KEYS.sapatilhas, JSON.stringify(sapatilhas));
    }

    static adicionarSapatilha(sapatilha) {
        const sapatilhas = this.getSapatilhas();
        sapatilhas.push(sapatilha);
        this.salvarSapatilhas(sapatilhas);
        return sapatilha;
    }

    static atualizarSapatilha(id, dados) {
        const sapatilhas = this.getSapatilhas();
        const index = sapatilhas.findIndex(s => s.id === id);
        if (index !== -1) {
            sapatilhas[index] = { ...sapatilhas[index], ...dados };
            this.salvarSapatilhas(sapatilhas);
            return sapatilhas[index];
        }
        return null;
    }

    static removerSapatilha(id) {
        let sapatilhas = this.getSapatilhas();
        sapatilhas = sapatilhas.filter(s => s.id !== id);
        this.salvarSapatilhas(sapatilhas);
    }

    static getSapatilhaPorId(id) {
        const sapatilhas = this.getSapatilhas();
        return sapatilhas.find(s => s.id === id) || null;
    }

    static atualizarKmSapatilha(sapatilhaId, kmAdicionados) {
        const sapatilha = this.getSapatilhaPorId(sapatilhaId);
        if (sapatilha) {
            sapatilha.km_acumulados = (sapatilha.km_acumulados || 0) + kmAdicionados;
            this.atualizarSapatilha(sapatilhaId, sapatilha);
        }
    }

    static getMetas() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.metas)) || [];
    }

    static salvarMetas(metas) {
        localStorage.setItem(STORAGE_KEYS.metas, JSON.stringify(metas));
    }
}