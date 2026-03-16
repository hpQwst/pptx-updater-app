import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Upload, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [pptxFile, setPptxFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const uploadExcelMutation = trpc.update.uploadExcel.useMutation();
  const uploadPPTXMutation = trpc.update.uploadPPTX.useMutation();
  const historyQuery = trpc.update.getHistory.useQuery(undefined, { enabled: isAuthenticated });

  const handleExcelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.endsWith(".xlsx")) {
      setExcelFile(file);
    } else {
      setMessage({ type: "error", text: "Por favor, selecione um arquivo .xlsx" });
    }
  };

  const handlePPTXChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.endsWith(".pptx")) {
      setPptxFile(file);
    } else {
      setMessage({ type: "error", text: "Por favor, selecione um arquivo .pptx" });
    }
  };

  const handleProcess = async () => {
    if (!excelFile || !pptxFile) {
      setMessage({ type: "error", text: "Por favor, selecione ambos os arquivos" });
      return;
    }

    setIsProcessing(true);
    setMessage(null);

    try {
      const excelBuffer = await excelFile.arrayBuffer();
      const pptxBuffer = await pptxFile.arrayBuffer();

      await uploadExcelMutation.mutateAsync({
        fileName: excelFile.name,
        fileBuffer: Buffer.from(excelBuffer),
      });

      await uploadPPTXMutation.mutateAsync({
        fileName: pptxFile.name,
        fileBuffer: Buffer.from(pptxBuffer),
      });

      setMessage({ type: "success", text: "Arquivos processados com sucesso!" });
      setExcelFile(null);
      setPptxFile(null);
      historyQuery.refetch();
    } catch (error) {
      setMessage({
        type: "error",
        text: `Erro ao processar: ${error instanceof Error ? error.message : "Erro desconhecido"}`,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>PPTX Auto-Updater</CardTitle>
            <CardDescription>Automatize a atualização de suas apresentações</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-slate-600 mb-6">
              Faça login para começar a atualizar seus arquivos PowerPoint com dados do Excel automaticamente.
            </p>
            <a href={getLoginUrl()}>
              <Button className="w-full">Fazer Login</Button>
            </a>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">PPTX Auto-Updater</h1>
          <p className="text-slate-600">Bem-vindo, {user?.name}! Atualize suas apresentações automaticamente.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Arquivo Excel
              </CardTitle>
              <CardDescription>Selecione o arquivo .xlsx com os dados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-slate-400 transition">
                <input
                  type="file"
                  accept=".xlsx"
                  onChange={handleExcelChange}
                  className="hidden"
                  id="excel-input"
                />
                <label htmlFor="excel-input" className="cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                  <p className="text-sm font-medium text-slate-700">
                    {excelFile ? excelFile.name : "Clique para selecionar"}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">ou arraste um arquivo</p>
                </label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Arquivo PowerPoint
              </CardTitle>
              <CardDescription>Selecione o arquivo .pptx a ser atualizado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-slate-400 transition">
                <input
                  type="file"
                  accept=".pptx"
                  onChange={handlePPTXChange}
                  className="hidden"
                  id="pptx-input"
                />
                <label htmlFor="pptx-input" className="cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                  <p className="text-sm font-medium text-slate-700">
                    {pptxFile ? pptxFile.name : "Clique para selecionar"}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">ou arraste um arquivo</p>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>

        {message && (
          <Card className={`mb-8 ${message.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
            <CardContent className="pt-6 flex items-center gap-3">
              {message.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
              <p className={message.type === "success" ? "text-green-800" : "text-red-800"}>{message.text}</p>
            </CardContent>
          </Card>
        )}

        <div className="mb-8">
          <Button
            onClick={handleProcess}
            disabled={!excelFile || !pptxFile || isProcessing}
            className="w-full h-12 text-base"
            size="lg"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processando...
              </>
            ) : (
              "Processar Arquivos"
            )}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Histórico de Atualizações</CardTitle>
            <CardDescription>Últimas atualizações realizadas</CardDescription>
          </CardHeader>
          <CardContent>
            {historyQuery.isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
              </div>
            ) : historyQuery.data?.updates && historyQuery.data.updates.length > 0 ? (
              <div className="space-y-4">
                {historyQuery.data.updates.map((update) => (
                  <div key={update.id} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-slate-900">{update.pptxFileName}</p>
                        <p className="text-sm text-slate-600">{update.excelFileName}</p>
                        <p className="text-xs text-slate-500 mt-1">
                          {new Date(update.createdAt).toLocaleDateString("pt-BR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            update.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : update.status === "failed"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {update.status === "completed" ? "Concluído" : update.status === "failed" ? "Erro" : "Processando"}
                        </span>
                      </div>
                    </div>
                    {update.outputFileUrl && (
                      <a href={update.outputFileUrl} download className="text-sm text-blue-600 hover:underline mt-2 inline-block">
                        Baixar arquivo atualizado
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-slate-500 py-8">Nenhuma atualização realizada ainda</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
