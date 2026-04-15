// 1. CONFIGURAÇÕES INICIAIS E PERSISTÊNCIA
if (!localStorage.getItem('exp_num')) {
    localStorage.setItem('exp_num', 847);
}

if (!localStorage.getItem('db_historico_exp')) {
    localStorage.setItem('db_historico_exp', JSON.stringify([]));
}

// 2. BANCO DE DADOS DE SECRETARIAS E DEPENDÊNCIAS
const dadosVinculados = {
    "GABINETE": [
        "Assessoria de Relações Institucionais", "Assessoria de Gabinete",
        "Ouvidoria", "Assessoria de Comunicação",
        "Controladoria Geral do Município"
    ],
    "SECRETARIA MUNICIPAL DE ADMINISTRAÇÃO": [
        "Almoxarifado Central", "Diretoria de Recursos Humanos",
        "Departamento de Transporte - Garagem", "Departamento de Licitações e Compras",
        "Banco do Povo", "Arquivo Morto", "Protocolos",
        "Setor de Patrimônio", "Telefonia PABX", "Diretoria de Tecnologia da Informação"
    ],
    "SECRETARIA MUNICIPAL DE PLANEJAMENTO E GOVERNO": [""],
    "SECRETARIA MUNICIPAL DA FAZENDA": [
        "Departamento de Contabilidade", "Tesouraria",
        "Departamento de Divida Ativa", "Departamento de Cadastro Imobiliário",
        "Departamento de Fiscalização Tributária"
    ],
    "SECRETARIA MUNICIPAL DA JUSTIÇA E CIDADANIA": ["PROCON", "Procuradoria Geral do Município"],
    "SECRETARIA MUNICIPAL DE ESPORTE": ["Espaço Poliesportivo Cultural - EPEC"],
    "SECRETARIA MUNICIPAL DE URBANISMO, MEIO AMBIENTE E SERVIÇOS PÚBLICOS": [
        "Departamento de Serviços Municipais - DSM", "Departamento de Meio Ambiente",
        "Parque Ecológico Mirante dos Ipês", "Administração do Cemitério - Santa Rita",
        "Cemitério Pio XII"
    ],
    "SECRETARIA MUNICIPAL DE DESENVOLVIMENTO SOCIAL E DA MULHER": [
        "CRAS Santa Rita", "CRAS Vila Mariana", "CRAS Itaguaçú",
        "CREAS", "Casa de Passagem - Albergue", "CECOM - Terceira Idade"
    ],
    "SECRETARIA MUNICIPAL DE SEGURANÇA PÚBLICA E TRÂNSITO": [
        "Departamento de Trânsito", "JARI Municipal",
        "Guarda Civil Municipal", "Corpo de Bombeiros", "Defesa Civil"
    ],
    "SECRETARIA MUNICIPAL DE OBRAS": ["Fiscalização de Obras - Fiscais de Postura"],
    "SECRETARIA MUNICIPAL DE INDÚSTRIA E COMÉRCIO": ["SEBRAE"],
    "SECRETARIA MUNICIPAL DE TURISMO": ["Centro de Apoio ao Turista - CAT"],
    "SECRETARIA MUNICIPAL DE CULTURA": ["Museu Municipal", "Biblioteca Municipal"],
    "SECRETARIA MUNICIPAL DE EDUCAÇÃO": [
        "Creche Prof.ª Maristela Jacob de Souza", "Creche Silvana Bombachi",
        "Creche Escola Santa Terezinha", "Creche Oswaldo Moraes de Castro",
        "EMEI Creche Vera Lúcia Chagas Bourabebi", "EMEI Creche Santa Luzia",
        "EMEI Creche Prof.ª Maria da Glória Freitas", "EMEF Prof.ª Maria Aparecida Encarnação",
        "EMEI Dom Carlinhos", "EMEI Criança Feliz",
        "EMEFEP Prof.ª Virgulina Marcondes de Moura Fázzeri", "EMEF Prof. Anísio Novaes",
        "EMEF Comendador Salgado", "EMEI José do Prado",
        "EMEF Integral Prof. Aureliano Paixão", "EMEF Prof.ª Heloisa de Castro Encarnação Pinto Barboza",
        "EMEF Integral Maria Helena Camargo Lourenço Barbosa", "EMEIEF Prefeito José Geraldo Lemes Valadão",
        "EMEF Chagas Pereira", "EMEF Prefeito Sólon Pereira",
        "EMEF Prof.ª Marieta Vilela da Costa Braga", "EMEF Integral Manoel Ignácio de Moraes",
        "EMEF Prof.ª Maria Conceição Pires do Rio", "EMEI Creche Escola Terezinha Vilela de Lima",
        "EMEI Dona Francisca de Lima Jorge", "Colégio Técnico Municipal Profª. Mathilde Fázzeri",
        "Polo UNIVESP", "CEJA - CEMEP", "Projeto Espaço Alternativo",
        "Cozinha Piloto", "CEMAEE"
    ],
    "SECRETARIA MUNICIPAL DE SAÚDE": [
        "ESF Vila Mariana", "ESF Santa Terezinha", "ESF São Roque",
        "ESF Ponte Alta", "ESF Santa Luzia", "ESF São Sebastião",
        "USF Sagrada Face", "ESF Itaguaçú", "SAMU", "CAPS",
        "CEMOF", "Ambulatório de Saúde da Mulher", "Vigilância Epidemiológica",
        "UPA/Centro de Imagem", "Central de Vagas/Regulação",
        "Vigilância Sanitária", "Controle de Vetores", "Fisioterapia", "Ouvidoria de Saúde"
    ],
    "SECRETARIA MUNICIPAL DE TECNOLOGIA DA INFORMAÇÃO": [
        "Diretoria de Tecnologia", "Unidades de TI"
    ]
};



// 3. FUNÇÕES DE INICIALIZAÇÃO E INTERFACE
function init() {
    carregarSecretarias();
    document.getElementById('campo-expedicao').value = localStorage.getItem('exp_num');
}

function carregarSecretarias() {
    const selectSecretaria = document.getElementById('secretaria');
    selectSecretaria.innerHTML = '<option value="">Selecione a Secretaria</option>';
    Object.keys(dadosVinculados).forEach(nome => {
        let option = document.createElement('option');
        option.value = nome;
        option.text = nome;
        selectSecretaria.appendChild(option);
    });
}

function atualizarDependencias() {
    const secretariaSel = document.getElementById('secretaria').value;
    const comboDependencia = document.getElementById('dependencia');
    comboDependencia.innerHTML = '<option value="">Selecione a Dependência</option>';

    if (secretariaSel && dadosVinculados[secretariaSel]) {
        dadosVinculados[secretariaSel].forEach(dep => {
            let option = document.createElement('option');
            option.value = dep;
            option.text = dep;
            comboDependencia.appendChild(option);
        });
    }
}

function adicionarLinha() {
    const wrapper = document.getElementById('items-wrapper');
    const div = document.createElement('div');
    div.className = 'item-row'; // Esta classe garante o alinhamento do CSS
    div.innerHTML = `
        <input type="text" placeholder="Descrição do Equipamento" class="item-desc">
        <input type="text" placeholder="Número de Série" class="item-serie">
        <input type="text" placeholder="Nº Patrimônio" class="item-patrimonio">
        <input type="number" placeholder="Qtd" class="item-qtd" value="1">
        <button class="btn btn-remove" title="Remover" onclick="this.parentElement.remove()">✕</button>`;
    wrapper.appendChild(div);
}

// 4. LÓGICA DE DADOS (SALVAR)
function salvarDados() {
    const numAtual = localStorage.getItem('exp_num');
    const dados = {
        exp: numAtual,
        nfe: document.getElementById('nfe').value,
        chave: document.getElementById('chave').value.replace(/\s/g, ''),
        proc: document.getElementById('proc_adm').value,
        mod: document.getElementById('modalidade').value,
        desc: document.getElementById('descritivo').value,
        dt_rec: document.getElementById('dt_rec').value,
        dt_exp: document.getElementById('dt_exp').value,
        sec: document.getElementById('secretaria').value,
        dep: document.getElementById('dependencia').value,
        status: 'Entregue',
        data_registro: new Date().toLocaleString(),
        itens: Array.from(document.querySelectorAll('.item-row')).map(row => ({
            d: row.querySelector('.item-desc').value,
            s: row.querySelector('.item-serie').value,
            p: row.querySelector('.item-patrimonio').value, // NOVO
            q: row.querySelector('.item-qtd').value
        })).filter(i => i.d !== "")
    };

    if (!dados.sec) { alert("Selecione a Secretaria."); return; }

    let historico = JSON.parse(localStorage.getItem('db_historico_exp') || '[]');
    historico.push(dados);
    localStorage.setItem('db_historico_exp', JSON.stringify(historico));
    
    alert(`Registro #${numAtual} salvo com sucesso!`);

    const proximo = parseInt(numAtual) + 1;
    localStorage.setItem('exp_num', proximo);
    document.getElementById('campo-expedicao').value = proximo;

    renderizarImpressao(dados);
}

// 5. IMPRESSÃO E VISUALIZAÇÃO
function renderizarImpressao(dados) {
    document.getElementById('view-exp').innerText = dados.exp;
    document.getElementById('view-nfe').innerText = dados.nfe;
    document.getElementById('view-chave').innerText = dados.chave;
    document.getElementById('view-proc').innerText = dados.proc;
    document.getElementById('view-mod').innerText = dados.mod;
    document.getElementById('view-desc').innerText = dados.desc;
    document.getElementById('view-dt-rec').innerText = dados.dt_rec ? dados.dt_rec.split('-').reverse().join('/') : '';
    document.getElementById('view-dt-exp').innerText = dados.dt_exp ? dados.dt_exp.split('-').reverse().join('/') : '';
    document.getElementById('view-sec').innerText = dados.dep ? `${dados.sec} / ${dados.dep}` : dados.sec;

    const tbody = document.getElementById('corpo-tabela');
    tbody.innerHTML = "";
    dados.itens.forEach((item, index) => {
        tbody.innerHTML += `<tr>
            <td align="center">${index + 1}</td>
            <td>${item.d}</td>
            <td>${item.s || '-'}</td>
            <td>${item.p || '-'}</td> <td align="right">${String(item.q).padStart(2, '0')} un</td>
        </tr>`;
    });
    // Preenche linhas vazias para manter o layout do papel
    for (let i = dados.itens.length; i < 12; i++) {
        tbody.innerHTML += `<tr><td></td><td></td><td></td><td></td><td></td></tr>`;
    }
}

// 6. BUSCA GLOBAL PROFISSIONAL
function filtrarPesquisa() {
    const termo = document.getElementById('input-busca').value.toLowerCase();
    const historico = JSON.parse(localStorage.getItem('db_historico_exp') || '[]');
    const lista = document.getElementById('lista-resultados');
    lista.innerHTML = "";

    if (termo.length < 2) return;

    const filtrados = historico.filter(r => {
        const matchGeral = r.exp.toString().includes(termo) ||
            r.sec.toLowerCase().includes(termo) ||
            r.dep.toLowerCase().includes(termo);

        const matchItens = r.itens.some(i => 
            i.d.toLowerCase().includes(termo) || 
            i.s.toLowerCase().includes(termo) || 
            (i.p && i.p.toLowerCase().includes(termo)) // BUSCA POR PATRIMÔNIO
        );

        return matchGeral || matchItens;
    });

    filtrados.reverse().forEach(r => {
        const item = document.createElement('div');
        item.className = 'resultado-item';
        item.innerHTML = `
            <div class="res-info">
                <strong>#${r.exp}</strong> - ${r.sec}<br>
                <small>${r.dep} | Itens: ${r.itens.length}</small>
            </div>
            <button onclick='carregarRegistroParaEdicao(${JSON.stringify(r)})' class='btn-carregar'>Carregar</button>
        `;
        lista.appendChild(item);
    });
}

function carregarRegistroParaEdicao(dados) {
    document.getElementById('nfe').value = dados.nfe || "";
    document.getElementById('chave').value = dados.chave || "";
    document.getElementById('proc_adm').value = dados.proc || "";
    document.getElementById('modalidade').value = dados.mod || "";
    document.getElementById('descritivo').value = dados.desc || "";
    document.getElementById('dt_rec').value = dados.dt_rec || "";
    document.getElementById('dt_exp').value = dados.dt_exp || "";
    document.getElementById('secretaria').value = dados.sec || "";
    atualizarDependencias();
    document.getElementById('dependencia').value = dados.dep || "";

    const wrapper = document.getElementById('items-wrapper');
    wrapper.innerHTML = "";
    dados.itens.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item-row';
        div.innerHTML = `
            <input type="text" value="${item.d}" class="item-desc">
            <input type="text" value="${item.s}" class="item-serie">
            <input type="text" value="${item.p || ''}" class="item-patrimonio">
            <input type="number" value="${item.q}" class="item-qtd">
            <button class="btn btn-remove" onclick="this.parentElement.remove()">✕</button>
        `;
        wrapper.appendChild(div);
    });

    renderizarImpressao(dados);
    fecharModalPesquisa();
}

// 7. BACKUP (IMPORT/EXPORT) E MÁSCARA
function exportarBackup() {
    const backup = {
        proximo_numero_expedicao: localStorage.getItem('exp_num'),
        registros: JSON.parse(localStorage.getItem('db_historico_exp') || '[]')
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `backup_ti_aparecida_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
}

function importarBackup(input) {
    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const dados = JSON.parse(e.target.result);
            if (confirm("Deseja restaurar este backup? Isso substituirá os dados atuais.")) {
                localStorage.setItem('db_historico_exp', JSON.stringify(dados.registros));
                localStorage.setItem('exp_num', dados.proximo_numero_expedicao);
                location.reload();
            }
        } catch (err) { alert("Arquivo inválido."); }
    };
    reader.readAsText(input.files[0]);
}

function mascararChave(input) {
    let valor = input.value.replace(/\D/g, '').slice(0, 44);
    input.value = valor.replace(/(\d{4})(?=\d)/g, '$1 ');
}

// 8. CONTROLE DE MODAL E VISUALIZAÇÃO
function abrirModalPesquisa() { document.getElementById('modal-pesquisa').style.display = 'flex'; }
function fecharModalPesquisa() { document.getElementById('modal-pesquisa').style.display = 'none'; }
function toggleVisualizacao() { document.getElementById('documento-final').classList.toggle('visible'); }

window.onload = init;
