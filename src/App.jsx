import { lazy, Suspense } from 'react';
import Layout from './app/layout';
import LoadingIndicator from './components/ui/LoadingIndicator/LoadingIndicator';

const HomePage = lazy(() => import('./app/page/Home'));

function App() {
  return (
    <Layout>
      <Suspense fallback={<LoadingIndicator isInitialLoading={true} />}>
        <HomePage />
      </Suspense>
    </Layout>
  );
}

export default App;
