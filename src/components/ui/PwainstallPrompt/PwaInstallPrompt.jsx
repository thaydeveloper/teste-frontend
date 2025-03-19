import { useState, useEffect } from 'react';

const PwaInstallPrompt = () => {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const hasPromptBeenDismissed = localStorage.getItem('pwaPromptDismissed') === 'true';
    if (hasPromptBeenDismissed) {
      return;
    }

    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      setInstallPrompt(e);

      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    });

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowPrompt(false);
    }

    window.addEventListener('appinstalled', () => {
      setShowPrompt(false);
      console.log('Aplicação instalada com sucesso!');
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', () => {});
      window.removeEventListener('appinstalled', () => {});
    };
  }, []);

  const handleInstallClick = () => {
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          setShowPrompt(false);
        } else {
          localStorage.setItem('pwaPromptDismissed', 'true');
        }
      });
    }
  };

  const closePrompt = () => {
    setShowPrompt(false);
    localStorage.setItem('pwaPromptDismissed', 'true');
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg p-4 z-40 border-t border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="font-medium">Instale este aplicativo</p>
          <p className="text-sm text-gray-600">Instale para acesso rápido</p>
        </div>
        <div className="flex space-x-2">
          <button onClick={closePrompt} className="text-gray-600 px-3 py-1">
            Agora não
          </button>
          <button
            onClick={handleInstallClick}
            className="bg-blue-600 text-white px-3 py-1 rounded-md"
          >
            Instalar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PwaInstallPrompt;
