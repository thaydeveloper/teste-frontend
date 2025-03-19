import { registerSW } from 'virtual:pwa-register';

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const updateSW = registerSW({
        immediate: true,
        onNeedRefresh() {
          if (confirm('Nova versão disponível! Clique OK para atualizar.')) {
            updateSW(true);
          }
        },
        onRegistered(registration) {
          if (registration && registration.active) {
            setInterval(
              () => {
                registration.update();
              },
              60 * 60 * 1000
            );
          }
        },
        onRegisterError(error) {
          console.error('Erro ao registrar service worker:', error);
        },
      });

      return updateSW;
    } catch (error) {
      console.error('Erro ao registrar service worker:', error);
    }
  } else {
    console.warn('Service workers não são suportados neste navegador.');
  }
}
