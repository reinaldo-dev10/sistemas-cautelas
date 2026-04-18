# 📑 Sistema de Expedição Digital - TI Aparecida

O **Sistema de Expedição Digital** é uma ferramenta de uso interno da **Diretoria de Tecnologia da Informação (DTI)** da Prefeitura Municipal de Aparecida. Este sistema foi desenvolvido para padronizar e automatizar a emissão de termos de entrega de equipamentos, periféricos e insumos tecnológicos para as diversas secretarias do município.

O foco central do projeto é a substituição de processos manuais por um fluxo digital que garante a **integridade dos dados** (especialmente números de série e chaves de NF-e) e mantém um **histórico local rastreável**.

---

## 🚀 Funcionalidades Principais

* **Gerador de Termos de Expedição:** Interface dinâmica para preenchimento de ativos com geração de layout para impressão em formato oficial (A4).
* **Banco de Dados Inteligente:** Menu dinâmico vinculado a todas as Secretarias e Dependências (Escolas, ESFs, CRAS, etc.) da administração municipal.
* **Segurança de Dados Fiscais:** Máscara automática para a **Chave de Acesso da NF-e (44 dígitos)**, mitigando erros de digitação e facilitando auditorias.
* **Persistência Local (LocalStorage):** O sistema salva o progresso e o histórico de registros diretamente no navegador, permitindo consultas sem dependência de internet.
* **Módulo de Backup (JSON):** Ferramenta de exportação e importação de dados para garantir a portabilidade entre máquinas e a segurança contra limpeza de cache.
* **Gestão de Status:** Controle do ciclo de vida do equipamento (*Configurando*, *Em Trânsito* ou *Entregue*).

---

## 🛠️ Tecnologias Utilizadas

Este é um projeto **Full-Frontend**, otimizado para rodar em servidores locais ou diretamente em estações de trabalho:

* **HTML5 & CSS3:** Interface moderna utilizando Flexbox e variáveis CSS (`:root`) para fácil manutenção.
* **JavaScript (Vanilla):** Lógica pura para manipulação de DOM, cálculos de expedição e persistência.
* **LocalStorage API:** Utilizada como banco de dados NoSQL persistente no navegador.
* **FileReader API:** Implementada no módulo de importação de backups para leitura de arquivos JSON.

---

## 📖 Como Utilizar

* Preenchimento: Insira os dados da Nota Fiscal e o Processo Administrativo correspondente.
Destino: Selecione a Secretaria. O campo "Dependências" será filtrado automaticamente (ex: ao selecionar Educação, apenas escolas aparecerão).
Itens: Adicione os itens com seus respectivos Números de Série (obrigatórios para controle patrimonial).

        Ações:
          - Salvar: Registra a expedição no histórico local.
          - Visualizar: Abre o layout oficial para conferência.
          - Gerar Impressão: Abre a caixa de diálogo do sistema para impressão física ou salvar em PDF.
          - Backup: Recomenda-se realizar uma Exportação (JSON) ao final de cada semana para segurança.

## ⚖️ Conformidade Técnica
* O sistema foi desenvolvido seguindo as necessidades técnicas de auditoria da prefeitura, garantindo que cada número de série esteja vinculado corretamente a uma NF-e e a um destino final, facilitando o trabalho do Setor de Patrimônio.

## 📁 Estrutura do Projeto

```text
/
├── index.html          # Interface principal e estrutura do documento
├── css/
│   └── style.css       # Estilização do painel e regras de @media print
├── js/
│   └── script.js       # Motor do sistema (Lógica e Dados das Secretarias)
├── imgs/
│   ├── brasão.png      # Identidade institucional da Prefeitura
│   └── logo ti.png     # Identidade do departamento
└── README.md           # Documentação técnica e operacional# cautela-digital
# cautela-digital
