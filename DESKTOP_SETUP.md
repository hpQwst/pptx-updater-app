# PPTX Auto-Updater - Guia de Instalação Desktop

## Visão Geral

O PPTX Auto-Updater agora está disponível como aplicação desktop para Windows com suporte a atualização automática via GitHub.

## Instalação

### Opção 1: Instalador NSIS (Recomendado)

1. Baixe o instalador `PPTX-Auto-Updater-Setup.exe` da página de [Releases](https://github.com/seu-usuario/pptx-updater-app/releases)
2. Execute o instalador
3. Siga as instruções do assistente de instalação
4. A aplicação será instalada em `C:\Program Files\PPTX Auto-Updater`
5. Um atalho será criado no menu Iniciar e na área de trabalho

### Opção 2: Versão Portável

1. Baixe `PPTX-Auto-Updater-portable.exe` da página de Releases
2. Execute o arquivo - não requer instalação
3. A aplicação iniciará imediatamente

## Atualização Automática

A aplicação verifica automaticamente por atualizações a cada vez que é iniciada:

1. **Verificação**: A aplicação verifica se há uma nova versão disponível no GitHub
2. **Download**: Se houver atualização, o arquivo é baixado automaticamente em background
3. **Notificação**: Uma notificação aparece quando a atualização está pronta
4. **Instalação**: Clique em "Instalar e Reiniciar" para aplicar a atualização

### Verificação Manual

Para verificar manualmente por atualizações:
1. Abra o menu "Ajuda" na aplicação
2. Clique em "Verificar Atualizações"

## Configuração do GitHub

Para que as atualizações funcionem corretamente, configure o arquivo `electron-builder.yml`:

```yaml
publish:
  provider: github
  owner: seu-usuario-github
  repo: pptx-updater-app
```

Substitua `seu-usuario-github` pelo seu usuário do GitHub.

## Processo de Release

Para publicar uma nova versão:

1. **Atualizar versão** no `package.json`:
   ```json
   "version": "1.1.0"
   ```

2. **Fazer commit e criar tag**:
   ```bash
   git add .
   git commit -m "Release v1.1.0"
   git tag v1.1.0
   git push origin main --tags
   ```

3. **GitHub Actions** irá automaticamente:
   - Compilar a aplicação para Windows
   - Gerar o instalador NSIS
   - Criar um Release no GitHub com os arquivos

4. **Usuários** receberão notificação de atualização na próxima vez que abrirem a aplicação

## Requisitos do Sistema

- Windows 7 ou superior
- 100 MB de espaço em disco
- Conexão com a internet (para autenticação e atualização)

## Troubleshooting

### A aplicação não inicia
- Verifique se o Windows Defender ou outro antivírus não está bloqueando
- Tente desinstalar e reinstalar

### Atualização não funciona
- Verifique sua conexão com a internet
- Verifique se o repositório GitHub está acessível
- Verifique o arquivo `electron-builder.yml` está configurado corretamente

### Erro ao instalar
- Execute o instalador como Administrador
- Desative temporariamente o antivírus
- Tente a versão portável como alternativa

## Desinstalação

### Instalador NSIS
1. Abra "Adicionar ou remover programas" no Windows
2. Procure por "PPTX Auto-Updater"
3. Clique em "Desinstalar"

### Versão Portável
- Simplesmente delete o arquivo `.exe`

## Desenvolvimento

Para desenvolver e testar localmente:

```bash
# Instalar dependências
pnpm install

# Executar em modo desenvolvimento
pnpm dev:electron

# Compilar para Windows
pnpm build:win

# Executar aplicação compilada
pnpm start
```

## Suporte

Para reportar bugs ou solicitar features, abra uma issue no [GitHub](https://github.com/seu-usuario/pptx-updater-app/issues).
