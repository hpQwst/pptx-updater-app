# Especificação de Mapeamento: Excel para PPTX

## Resumo Executivo

A aplicação deve automatizar a atualização de uma apresentação PowerPoint com dados provenientes de uma planilha Excel. O mapeamento é baseado em padrões de identificação de dados (ex: "NPS", "Regional", "Base Abs.") nas abas do Excel e correspondência com elementos do PPTX (tabelas, gráficos, textos).

## Estrutura do Excel

O arquivo `TIM_EXP_TB_PREVIA_a2026m02_v01.xlsx` contém 28 abas com dados organizados da seguinte forma:

| Aba | Título | Tipo de Dado | Estrutura |
|-----|--------|--------------|-----------|
| Index | Metadados | Índice | Cabeçalho do estudo |
| 2 | NPS por segmento - base | Tabela | Base de respondentes por operadora |
| 3 | NPS por segmento | Tabela | Valores de NPS por operadora |
| 4 | NPS mês a mês - base | Série temporal | Base ao longo dos meses |
| 5 | NPS mês a mês - NPS | Série temporal | Valores NPS ao longo dos meses |
| 6 | NPS por regional - base | Tabela regional | Base por região (10 regionais) |
| 7 | NPS por regional | Tabela regional | Valores NPS por região |
| 8-9 | NPS REDE por regional | Tabela regional | NPS específico de rede por região |
| 10-14 | Contribuição (segmentos) | Tabela de contribuição | Percentuais de REDE, OFERTAS, ATENDIMENTO, OUTROS |
| 15-19 | Contribuição (segmentos) | Tabela de contribuição | Variações QoQ |
| 20-23 | Contribuição QoQ/YTD | Tabela de análise | Análises comparativas |
| 24-28 | CSAT | Tabela CSAT | Dados de satisfação do cliente |

## Padrões de Identificação

### Padrão de Localização de Dados

Cada aba contém metadados nas primeiras linhas:

```
Linha 1: Título da aba (ex: "01.11 NPS por regional")
Linha 2: Filtro aplicado
Linha 3: Peso utilizado
Linha 4: Base de cálculo
Linhas 5+: Dados estruturados
```

### Estrutura de Dados Típica

```
Linha com cabeçalho: "Média Scores", "Regional", "Cliente PRINCIPAL da Operadora"
Linha com operadora: "TIM", "Vivo", "Claro"
Linha com segmento: "Total", "Pré pago", "Pós Total", etc
Dados numéricos: Valores de NPS ou percentuais
Linha de base: "Base Abs." com contagens
```

## Mapeamento para PPTX

### Slides com Tabelas

| Slide | Descrição | Aba Excel | Elemento PPTX | Lógica |
|-------|-----------|-----------|---------------|--------|
| 8 | NPS Regional TOTAL | 7 + 21 | Tabela 134 | Valores 4Q25 vs 1Q26 por regional |
| 9 | Contribuição Regional | 21 | Tabela 3 | Percentuais de REDE, OFERTAS, ATENDIMENTO |
| 12 | Histórico NPS Regional | 7 | Tabela com regionais | Valores NPS por regional (TIM, Vivo, Claro) |
| 13 | NPS Regional REDE | 9 | Tabela com regionais | Valores NPS REDE por regional |
| 15-18 | NPS Segmentos | 3, 7 | Múltiplas tabelas | Valores por segmento (Total, Pré, Pós) |

### Slides com Gráficos

| Slide | Tipo de Gráfico | Aba Excel | Dados |
|-------|-----------------|-----------|-------|
| 3-6 | Linha (Line Chart) | 4-5 | Série temporal de NPS mês a mês |
| 5-6 | Coluna (Column Chart) | 2-3 | Comparação entre operadoras |
| 8-9 | Linha | 21 | Histórico de NPS por regional |

## Algoritmo de Mapeamento Automático

### Fase 1: Análise do Excel

1. Ler todas as abas do Excel
2. Para cada aba, extrair:
   - Título (célula B1)
   - Estrutura de dados (cabeçalhos, dimensões)
   - Dados brutos (valores numéricos)
3. Identificar padrões:
   - Presença de "Regional", "NPS", "Base Abs.", "Contribuição"
   - Dimensionalidade (1D, 2D, 3D)
   - Tipo de métrica (NPS, percentual, contagem)

### Fase 2: Análise do PPTX

1. Para cada slide, identificar:
   - Tabelas (nome, dimensões, conteúdo de células)
   - Gráficos (tipo, série de dados, categorias)
   - Textos (placeholders, caixas de texto)
2. Extrair dados subjacentes de gráficos (se disponível)

### Fase 3: Mapeamento

1. Correlacionar abas Excel com slides PPTX baseado em:
   - Palavras-chave (ex: "Regional" em ambos)
   - Dimensionalidade (ex: 10 regionais em ambos)
   - Posição de dados (ex: "Base Abs." sempre na última linha)
2. Para cada elemento PPTX, identificar:
   - Aba Excel de origem
   - Intervalo de células (ex: A15:Q26)
   - Tipo de transformação (cópia direta, agregação, cálculo)

### Fase 4: Atualização

1. Extrair dados do Excel conforme mapeamento
2. Atualizar tabelas no PPTX
3. Atualizar dados subjacentes de gráficos
4. Manter formatação original (cores, fontes, estilos)

## Regras de Negócio

- **Valores NPS**: Arredondados para 1 casa decimal
- **Percentuais**: Mantêm símbolo '%'
- **Deltas**: Incluem sinal '+' ou '-'
- **Bases**: Valores inteiros (sem decimais)
- **Datas**: Formato "Mês/Ano" (ex: "Fev'26")

## Estrutura de Dados para Armazenamento

### Mapeamento (salvo no banco)

```json
{
  "id": "uuid",
  "pptxFileName": "Préviamensal_Experiência1Q26(Fev26)_v01.pptx",
  "excelFileName": "TIM_EXP_TB_PREVIA_a2026m02_v01.xlsx",
  "mappings": [
    {
      "slideNumber": 8,
      "elementType": "table",
      "elementName": "Tabela 134",
      "excelSheet": "7",
      "excelRange": "A15:Q26",
      "transformationType": "direct_copy",
      "description": "NPS Regional - TOTAL"
    },
    {
      "slideNumber": 3,
      "elementType": "chart",
      "elementName": "Gráfico 18",
      "excelSheet": "4",
      "excelRange": "A4:M10",
      "transformationType": "series_update",
      "description": "NPS Mês a Mês - Base"
    }
  ]
}
```

### Histórico de Atualização (salvo no banco)

```json
{
  "id": "uuid",
  "userId": "user-id",
  "timestamp": "2026-03-16T20:45:00Z",
  "excelFileName": "TIM_EXP_TB_PREVIA_a2026m02_v01.xlsx",
  "pptxFileName": "Préviamensal_Experiência1Q26(Fev26)_v01.pptx",
  "status": "completed",
  "mappingsCount": 15,
  "elementsUpdated": 18,
  "outputFileUrl": "s3://...",
  "errors": []
}
```
