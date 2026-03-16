import { useState, useEffect } from 'react';
import { useElectronUpdater } from '@/hooks/useElectronUpdater';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Download, CheckCircle2 } from 'lucide-react';

export function UpdateNotification() {
  const { updateAvailable, updateDownloaded, installUpdate } = useElectronUpdater();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (updateAvailable || updateDownloaded) {
      setIsVisible(true);
    }
  }, [updateAvailable, updateDownloaded]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <Card className={`border-2 ${updateDownloaded ? 'border-green-200 bg-green-50' : 'border-blue-200 bg-blue-50'}`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              {updateDownloaded ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <Download className="w-5 h-5 text-blue-600" />
              )}
              <CardTitle className={updateDownloaded ? 'text-green-900' : 'text-blue-900'}>
                {updateDownloaded ? 'Atualizacao Pronta' : 'Atualizacao Disponivel'}
              </CardTitle>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              X
            </button>
          </div>
          <CardDescription className={updateDownloaded ? 'text-green-700' : 'text-blue-700'}>
            {updateDownloaded
              ? 'Uma nova versao foi baixada. Reinicie para instalar.'
              : 'Uma nova versao esta sendo baixada...'}
          </CardDescription>
        </CardHeader>
        {updateDownloaded && (
          <CardContent>
            <Button onClick={installUpdate} className="w-full" size="sm">
              Instalar e Reiniciar
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
