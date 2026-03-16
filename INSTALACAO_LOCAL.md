# Guia Completo: Instalar Localmente e Gerar Instalador

## Pré-requisitos

Antes de começar, você precisa ter instalado no seu Windows:

1. **Node.js** (versão 18 ou superior)
   - Baixe em: https://nodejs.org/
   - Escolha a versão LTS
   - Durante a instalação, marque "Add to PATH"

2. **pnpm** (gerenciador de pacotes)
   - Abra o PowerShell como Administrador
   - Execute: `npm install -g pnpm`

3. **Git** (para clonar o repositório)
   - Baixe em: https://git-scm.com/
   - Use as configurações padrão

## Passo 1: Clonar o Repositório

Abra o PowerShell ou CMD no diretório onde deseja salvar o projeto:

```powershell
git clone https://github.com/hpQwst/pptx-updater-app.git
cd pptx-updater-app
```

## Passo 2: Instalar Dependências

```powershell
pnpm install
```

Este comando irá baixar todas as dependências necessárias (pode levar alguns minutos na primeira vez).

## Passo 3: Testar Localmente (Opcional)

Antes de gerar o instalador, você pode testar a aplicação:

### Modo Desenvolvimento Web
```powershell
pnpm dev:web
```
Acesse http://localhost:5173 no navegador.

### Modo Desenvolvimento Desktop (Electron)
```powershell
pnpm dev:electron
```
A aplicação desktop abrirá automaticamente.

## Passo 4: Gerar o Instalador

### Opção A: Instalador NSIS (Recomendado)

```powershell
pnpm build:win
```

Este comando irá:
1. Compilar a aplicação React
2. Compilar o backend Node.js
3. Compilar o Electron main process
4. Gerar o instalador NSIS

**Resultado:** Arquivo `PPTX-Auto-Updater-Setup.exe` na pasta `dist`

### Opção B: Versão Portável (Sem Instalação)

```powershell
pnpm build:win
```

O comando acima gera também:
- `PPTX-Auto-Updater-portable.exe` - versão portável

## Passo 5: Localizar os Instaladores

Após o build, os arquivos estarão em:

```
seu-projeto\dist\
├── PPTX-Auto-Updater-Setup.exe      (Instalador NSIS)
├── PPTX-Auto-Updater-portable.exe   (Versão Portável)
└── (outros arquivos de build)
```

## Passo 6: Distribuir para Outras Pessoas

### Opção 1: Via GitHub Releases (Automático)

1. **Atualizar versão** no `package.json`:
   ```json
   "version": "1.0.1"
   ```

2. **Fazer commit e criar tag**:
   ```powershell
   git add .
   git commit -m "Release v1.0.1"
   git tag v1.0.1
   git push origin main --tags
   ```

3. **GitHub Actions** irá automaticamente:
   - Compilar a aplicação
   - Gerar o instalador
   - Criar um Release com os arquivos

3. **Compartilhar link**: Envie o link do Release para as pessoas
   ```
   https://github.com/hpQwst/pptx-updater-app/releases/tag/v1.0.1
   ```

### Opção 2: Distribuição Manual

1. **Copie o arquivo** `PPTX-Auto-Updater-Setup.exe` da pasta `dist`

2. **Compartilhe via**:
   - Google Drive
   - Dropbox
   - OneDrive
   - Email
   - Servidor web

3. **Instruções para o usuário**:
   - Baixe o arquivo
   - Execute `PPTX-Auto-Updater-Setup.exe`
   - Siga o assistente de instalação
   - A aplicação será instalada e um atalho criado no menu Iniciar

## Configuração para Atualização Automática
Para que a atualização automática funcione, o arquivo `electron-builder.yml` já está configurado corretamente:

```yaml
publish:
  provider: github
  owner: hpQwst
  repo: pptx-updater-app
  releaseType: release
```

## Troubleshooting

### Erro: "pnpm: comando não encontrado"
- Instale pnpm globalmente: `npm install -g pnpm`
- Reinicie o PowerShell

### Erro: "node: comando não encontrado"
- Instale Node.js: https://nodejs.org/
- Reinicie o PowerShell após a instalação

### Build falha com erro de permissão
- Execute o PowerShell como Administrador
- Tente novamente: `pnpm build:win`

### Arquivo .exe muito grande
- É normal ter 150-200 MB (inclui Node.js, Electron, dependências)
- Versão portável é um arquivo único

### Antivírus bloqueia o instalador
- Alguns antivírus podem alertar sobre arquivos auto-extraíveis
- Isso é normal e seguro
- Adicione à exceção do antivírus se necessário

## Próximas Atualizações

Quando quiser lançar uma nova versão:

1. Faça as alterações no código
2. Atualize a versão em `package.json`
3. Commit e tag: `git tag v1.0.2`
4. Push: `git push origin main --tags`
5. GitHub Actions gera automaticamente o novo instalador

## Suporte

Para dúvidas ou problemas:
- Verifique a documentação em `DESKTOP_SETUP.md`
- Abra uma issue no GitHub
- Consulte a documentação do Electron: https://www.electronjs.org/docs

---

**Dica**: Mantenha o arquivo `electron-builder.yml` atualizado com suas informações do GitHub para que a atualização automática funcione corretamente para seus usuários.
