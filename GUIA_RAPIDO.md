# Guia Rápido: Gerar Instalador Windows

## 3 Passos Simples

### 1️⃣ Preparar o Ambiente

Abra o PowerShell como Administrador e execute:

```powershell
# Instalar Node.js (se não tiver)
# Baixe em: https://nodejs.org/ (versão LTS)

# Instalar pnpm
npm install -g pnpm

# Clonar o projeto
git clone https://github.com/seu-usuario/pptx-updater-app.git
cd pptx-updater-app

# Instalar dependências
pnpm install
```

### 2️⃣ Gerar o Instalador

```powershell
pnpm build:win
```

Isso vai levar alguns minutos. Ao final, você terá:
- `dist/PPTX-Auto-Updater-Setup.exe` (instalador)
- `dist/PPTX-Auto-Updater-portable.exe` (versão portável)

### 3️⃣ Distribuir

**Copie o arquivo `PPTX-Auto-Updater-Setup.exe`** e compartilhe:
- Via email
- Google Drive
- Dropbox
- Qualquer plataforma de compartilhamento

**Outras pessoas precisam apenas:**
1. Baixar o arquivo
2. Executar o `.exe`
3. Seguir o assistente de instalação

---

## Atualizar para Nova Versão

Quando quiser lançar uma atualização:

```powershell
# 1. Fazer alterações no código
# 2. Atualizar versão em package.json
# 3. Fazer commit e tag

git add .
git commit -m "v1.0.1"
git tag v1.0.1
git push origin main --tags

# 4. GitHub Actions gera automaticamente o novo instalador
# 5. Compartilhe o link: https://github.com/hpQwst/pptx-updater-app/releases
```

---

## Problemas Comuns

| Problema | Solução |
|----------|---------|
| "pnpm não encontrado" | Execute: `npm install -g pnpm` |
| "node não encontrado" | Instale Node.js: https://nodejs.org/ |
| Build falha | Execute PowerShell como Administrador |
| Arquivo .exe grande (150-200MB) | É normal, inclui Node.js e Electron |

---

## Próximas Etapas

1. Edite `electron-builder.yml` com seu usuário GitHub
2. Crie um ícone: `assets/icon.png` (256x256)
3. Teste localmente: `pnpm dev:electron`
4. Gere o instalador: `pnpm build:win`
5. Distribua para seus usuários!

Mais detalhes em `INSTALACAO_LOCAL.md`
