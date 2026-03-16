# Guia: Lançar Seu Primeiro Release

Parabéns! Sua aplicação está pronta. Aqui está como lançar o primeiro release no GitHub com atualização automática funcionando.

## Passo 1: Preparar o Código Localmente

No seu Windows, abra PowerShell na pasta do projeto:

```powershell
cd C:\Users\seu-usuario\Documents\pptx-updater-app
```

## Passo 2: Atualizar Versão

Edite `package.json` e altere a versão:

```json
"version": "1.0.0"
```

## Passo 3: Fazer Commit

```powershell
git add .
git commit -m "Release v1.0.0"
git tag v1.0.0
git push origin main --tags
```

## Passo 4: GitHub Actions Gera Automaticamente

1. Vá para: https://github.com/hpQwst/pptx-updater-app/actions
2. Você verá um workflow "Build and Release" rodando
3. Aguarde até completar (leva ~5-10 minutos)
4. Quando terminar, vá para: https://github.com/hpQwst/pptx-updater-app/releases

## Passo 5: Compartilhar com Usuários

Você terá dois arquivos disponíveis:
- `PPTX-Auto-Updater-Setup.exe` - Instalador (recomendado)
- `PPTX-Auto-Updater-portable.exe` - Versão portável

**Compartilhe o link do Release:**
```
https://github.com/hpQwst/pptx-updater-app/releases/tag/v1.0.0
```

Ou copie o arquivo `.exe` e distribua diretamente via:
- Email
- Google Drive
- Dropbox
- WhatsApp
- Qualquer plataforma

## Passo 6: Usuários Instalam

Quando as pessoas receberem o arquivo:

1. Clicam duas vezes no `PPTX-Auto-Updater-Setup.exe`
2. Seguem o assistente de instalação
3. Pronto! A aplicação está instalada

## Passo 7: Atualização Automática Funciona

Quando você lançar uma nova versão:

1. Faça alterações no código
2. Atualize versão em `package.json`
3. Faça commit e tag:
   ```powershell
   git add .
   git commit -m "Release v1.0.1"
   git tag v1.0.1
   git push origin main --tags
   ```
4. GitHub Actions gera o novo instalador automaticamente
5. Usuários recebem notificação na próxima vez que abrem a aplicação
6. Clicam "Instalar e Reiniciar" e pronto!

## Checklist Antes do Primeiro Release

- [ ] Testou `pnpm build:win` localmente e gerou o `.exe`?
- [ ] Testou instalar o `.exe` em uma pasta vazia?
- [ ] Testou a aplicação após instalação?
- [ ] Atualizou versão em `package.json`?
- [ ] Fez commit e tag no Git?
- [ ] Fez push para GitHub?
- [ ] Verificou que GitHub Actions completou com sucesso?
- [ ] Baixou o `.exe` do Release e testou?

## Troubleshooting

### GitHub Actions não roda
- Verifique que `.github/workflows/release.yml` existe
- Verifique que você fez push da tag: `git push origin main --tags`
- Vá para: https://github.com/hpQwst/pptx-updater-app/actions

### Arquivo não aparece no Release
- Aguarde GitHub Actions terminar (pode levar 10 minutos)
- Recarregue a página do Release
- Se ainda não aparecer, verifique os logs do workflow

### Atualização automática não funciona
- Verifique que `electron-builder.yml` tem:
  ```yaml
  owner: hpQwst
  repo: pptx-updater-app
  ```
- Verifique que o Release foi criado corretamente
- Verifique que o arquivo `.exe` está no Release

## Dicas Importantes

1. **Sempre use tags semânticas:** v1.0.0, v1.0.1, v1.1.0, v2.0.0
2. **Atualize CHANGELOG:** Documente o que mudou em cada versão
3. **Teste antes de lançar:** Sempre teste localmente com `pnpm build:win`
4. **Comunique com usuários:** Avise quando há atualizações importantes
5. **Mantenha backup:** Guarde cópias dos `.exe` importantes

## Próximos Passos

Após o primeiro release funcionar:

1. **Criar ícone profissional:** Adicione `assets/icon.png` (256x256)
2. **Adicionar CHANGELOG.md:** Documente mudanças em cada versão
3. **Criar README.md:** Explique como usar a aplicação
4. **Configurar GitHub Pages:** Crie um site para a aplicação
5. **Adicionar mais features:** Implemente as funcionalidades faltantes

## Suporte

Se encontrar problemas:

1. Consulte `TROUBLESHOOTING_WINDOWS.md` para erros de build
2. Consulte `GUIA_RAPIDO.md` para instruções básicas
3. Consulte `INSTALACAO_LOCAL.md` para guia completo
4. Abra uma issue no GitHub: https://github.com/hpQwst/pptx-updater-app/issues

---

**Parabéns! Você está pronto para lançar sua primeira versão!** 🎉
