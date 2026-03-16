# Troubleshooting - Erros Comuns no Windows

## Erro: "concurrently não é reconhecido como comando interno"

**Causa:** O comando `concurrently` não está no PATH ou não foi instalado corretamente.

**Solução:**

```powershell
# Limpar cache do pnpm
pnpm store prune

# Reinstalar dependências
pnpm install

# Tentar novamente
pnpm dev:web
```

Se persistir:

```powershell
# Instalar globalmente
pnpm add -g concurrently

# Ou usar com npx
npx concurrently "pnpm dev:web" "pnpm dev:server"
```

---

## Erro: "electron/*.ts não encontrado"

**Causa:** Os arquivos TypeScript do Electron não foram compilados corretamente.

**Solução:**

```powershell
# Compilar manualmente os arquivos Electron
npx tsc electron/main.ts electron/preload.ts --outDir dist/electron --module commonjs --target es2020

# Depois tentar o build
pnpm build:win
```

---

## Erro: "vite não é reconhecido"

**Causa:** Vite não está instalado ou o PATH está incorreto.

**Solução:**

```powershell
# Reinstalar dependências
pnpm install

# Usar com npx
npx vite build

# Ou usar pnpm diretamente
pnpm build:renderer
```

---

## Erro: "esbuild não encontrado"

**Causa:** esbuild não foi instalado corretamente.

**Solução:**

```powershell
pnpm add -D esbuild
pnpm build:server
```

---

## Build falha com erro de permissão

**Causa:** Arquivo está em uso ou permissões insuficientes.

**Solução:**

1. **Feche a aplicação** se estiver rodando
2. **Execute como Administrador:**
   - Clique com botão direito no PowerShell
   - Selecione "Executar como Administrador"
3. **Limpe o cache:**
   ```powershell
   rm -r dist
   rm -r node_modules/.vite
   pnpm build:win
   ```

---

## Erro: "cross-env não é reconhecido"

**Causa:** cross-env não está instalado (necessário para Windows).

**Solução:**

```powershell
pnpm add -D cross-env
pnpm install
```

---

## Arquivo .exe muito grande (200+ MB)

**Isso é normal!** O instalador inclui:
- Node.js runtime (~150 MB)
- Electron (~50 MB)
- Dependências da aplicação (~20 MB)

Para reduzir tamanho:
- Use a versão portável em vez do instalador
- Remova dependências não utilizadas
- Configure `electron-builder.yml` para compressão

---

## Antivírus bloqueia o instalador

**Causa:** Alguns antivírus alertam sobre arquivos auto-extraíveis.

**Solução:**

1. Adicione exceção no antivírus para a pasta do projeto
2. Desative temporariamente o antivírus durante o build
3. Assine o executável (requer certificado)

---

## Erro ao executar `pnpm dev:electron`

**Causa:** Porta 5173 já está em uso ou Electron não consegue conectar.

**Solução:**

```powershell
# Matar processo na porta 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Ou usar porta diferente
cross-env VITE_PORT=5174 pnpm dev:web
```

---

## Erro: "Cannot find module 'electron'"

**Causa:** Electron não foi instalado corretamente.

**Solução:**

```powershell
pnpm add -D electron
pnpm install
```

---

## Build completa mas instalador não é criado

**Causa:** electron-builder não encontrou os arquivos compilados.

**Solução:**

```powershell
# Verificar se dist existe
dir dist

# Se não existir, compilar manualmente
pnpm build

# Depois tentar electron-builder
npx electron-builder --win
```

---

## Como Verificar Instalação

Para garantir que tudo está instalado corretamente:

```powershell
# Verificar Node.js
node --version

# Verificar pnpm
pnpm --version

# Verificar dependências instaladas
pnpm list electron
pnpm list electron-builder
pnpm list concurrently

# Verificar que os arquivos Electron existem
dir electron

# Verificar TypeScript
npx tsc --version
```

---

## Passos para Reconstruir do Zero

Se nada funcionar, tente reconstruir tudo:

```powershell
# 1. Limpar tudo
rm -r node_modules
rm -r dist
rm pnpm-lock.yaml

# 2. Reinstalar
pnpm install

# 3. Tentar build novamente
pnpm build:win
```

---

## Ainda não funciona?

Se os problemas persistirem:

1. **Verifique a versão do Node.js:** `node --version` (deve ser 18+)
2. **Verifique a versão do pnpm:** `pnpm --version` (deve ser 10+)
3. **Verifique espaço em disco:** Precisa de ~2GB para build
4. **Desative antivírus temporariamente** durante o build
5. **Tente em outro diretório** (sem espaços ou caracteres especiais no caminho)

---

## Suporte

Para mais ajuda:
- Verifique `GUIA_RAPIDO.md` para instruções básicas
- Verifique `INSTALACAO_LOCAL.md` para guia completo
- Consulte documentação do Electron: https://www.electronjs.org/docs
- Abra uma issue no GitHub do projeto
