import { useEffect, useState } from 'react';

interface ElectronAPI {
  onUpdateAvailable: (callback: () => void) => void;
  onUpdateDownloaded: (callback: () => void) => void;
  restartApp: () => void;
}

declare global {
  interface Window {
    electron?: ElectronAPI;
  }
}

export function useElectronUpdater() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updateDownloaded, setUpdateDownloaded] = useState(false);

  useEffect(() => {
    if (!window.electron) return;

    window.electron.onUpdateAvailable(() => {
      setUpdateAvailable(true);
    });

    window.electron.onUpdateDownloaded(() => {
      setUpdateDownloaded(true);
    });
  }, []);

  const installUpdate = () => {
    if (window.electron) {
      window.electron.restartApp();
    }
  };

  return {
    updateAvailable,
    updateDownloaded,
    installUpdate,
  };
}
