import ScrollToTop from '../../components/ui/ScrollToTop/ScrollToTop';
import PwaInstallPrompt from '../../components/ui/PwainstallPrompt/PwaInstallPrompt';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-md py-4 sticky top-0 z-10">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-800">📱 Catálogo de Smartphones</h1>
        </div>
      </header>

      {children}

      <PwaInstallPrompt />
      <ScrollToTop />

      <footer className="bg-gray-800 text-white py-6 mt-auto">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center md:text-left">
            © 2025 Catálogo de Produtos • Desenvolvido para teste Esapiens
          </p>
        </div>
      </footer>
    </div>
  );
}
