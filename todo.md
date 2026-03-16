# PPTX Auto-Updater - TODO

## Funcionalidades Principais

### Backend & Banco de Dados
- [ ] Criar tabelas de banco de dados (updates, mappings, file_uploads)
- [ ] Implementar procedimento tRPC para upload de arquivos (Excel + PPTX)
- [ ] Implementar análise de estrutura Excel (abas, dados, padrões)
- [ ] Implementar detecção de mapeamentos entre Excel e PPTX
- [ ] Implementar processamento de atualização de PPTX
- [ ] Implementar procedimento tRPC para listar histórico de atualizações
- [ ] Implementar procedimento tRPC para obter detalhes de mapeamentos

### Frontend
- [ ] Página inicial com upload duplo (Excel + PPTX)
- [ ] Componente de preview de mapeamentos identificados
- [ ] Componente de histórico de atualizações
- [ ] Integração com tRPC para upload e processamento
- [ ] Download do arquivo PPTX atualizado
- [ ] Feedback visual durante processamento
- [ ] Tratamento de erros e validações

### Processamento de Arquivos
- [ ] Instalação de dependências (python-pptx, openpyxl, etc)
- [ ] Script de análise de Excel (extração de dados estruturados)
- [ ] Script de análise de PPTX (identificação de tabelas e gráficos)
- [ ] Algoritmo de mapeamento automático
- [ ] Lógica de atualização de tabelas no PPTX
- [ ] Lógica de atualização de gráficos no PPTX
- [ ] Testes de processamento com arquivos reais

## Completadas

### Backend & Banco de Dados
- [x] Criar tabelas de banco de dados (updates, mappings, file_uploads)
- [x] Implementar procedimento tRPC para upload de arquivos (Excel + PPTX)
- [x] Implementar análise de estrutura Excel (abas, dados, padrões)
- [x] Implementar funções de banco de dados para operações CRUD

### Frontend
- [x] Página inicial com upload duplo (Excel + PPTX)
- [x] Componente de histórico de atualizações
- [x] Integração com tRPC para upload
- [x] Feedback visual durante processamento

### Processamento de Arquivos
- [x] Módulo de análise de Excel (excelProcessor.ts)
- [x] Módulo de análise de PPTX (pptxProcessor.ts)
- [x] Script Python para análise de PPTX
- [x] Script Python para atualização de PPTX
- [x] Módulo de mapeamento automático (mappingEngine.ts)


## Desktop/Electron (Concluído)

- [x] Instalar dependências Electron
- [x] Criar main process (electron/main.ts)
- [x] Configurar electron-updater
- [x] Criar arquivo de configuração update (electron-builder.yml)
- [x] Implementar notificações de atualização (UpdateNotification.tsx)
- [x] Criar script de build para Windows (pnpm build:win)
- [x] Configurar GitHub Actions para releases (.github/workflows/release.yml)
- [x] Criar hook useElectronUpdater para integração
- [x] Documentar processo de instalação e atualização (DESKTOP_SETUP.md)
