import { useHomeContainer } from '../../hooks/useHomeContainer';
import PriceFilter from '../../components/products/PriceFilter/PriceFilter';
import ErrorMessage from '../../components/ui/Errors/ErrorMessage';
import LoadingIndicator from '../../components/ui/LoadingIndicator/LoadingIndicator';
import SearchBar from '../../components/ui/SearchBar/SearchBar';
import ProductsList from '../../components/products/ProductsList/ProductsList';

export default function HomePage() {
  const {
    products,
    searchTerm,
    priceFilter,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    error,
    displayTotalProducts,
    refetch,
    handleSearch,
    handlePriceFilterChange,
    lastProductRef,
  } = useHomeContainer();

  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <section aria-labelledby="filter-heading" className="mb-8">
        <h2 id="filter-heading" className="sr-only">
          Filtros de produto
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <SearchBar
              onSearch={handleSearch}
              initialValue={searchTerm}
              label="Buscar produtos"
              placeholder="Digite o nome do produto..."
            />
          </div>
          <div>
            <PriceFilter
              value={priceFilter}
              onChange={handlePriceFilterChange}
              label="Filtrar por preço"
            />
          </div>
        </div>

        {!isLoading && !isError && (
          <div className="mt-4 flex items-center flex-wrap" role="status" aria-live="polite">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {displayTotalProducts > 0
                ? `${displayTotalProducts} produto${displayTotalProducts !== 1 ? 's' : ''} encontrado${displayTotalProducts !== 1 ? 's' : ''}`
                : 'Nenhum produto encontrado'}
            </span>

            {searchTerm && (
              <button
                onClick={() => handleSearch('')}
                className="ml-2 text-sm text-gray-500 hover:text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-label="Limpar busca"
              >
                Limpar busca
              </button>
            )}
            {priceFilter !== 'all' && (
              <button
                onClick={() => handlePriceFilterChange('all')}
                className="ml-2 text-sm text-gray-500 hover:text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-label="Limpar filtro de preço"
              >
                Limpar filtro de preço
              </button>
            )}
          </div>
        )}
      </section>

      {isError && (
        <ErrorMessage
          message={error?.message || 'Erro ao carregar produtos. Tente novamente mais tarde.'}
          onRetry={() => refetch()}
        />
      )}

      <section aria-label="Resultados dos produtos">
        {isLoading ? (
          <LoadingIndicator isInitialLoading={true} />
        ) : (
          <>
            {!isError && <ProductsList products={products} lastProductRef={lastProductRef} />}

            {isFetchingNextPage && (
              <div aria-live="polite" className="mt-4">
                <LoadingIndicator />
              </div>
            )}

            {!hasNextPage && products.length > 0 && !isError && (
              <p
                className="text-center text-gray-500 py-6 mt-4 bg-gray-50 border-t rounded-lg"
                role="status"
                aria-live="polite"
              >
                Não há mais produtos para carregar.
              </p>
            )}
          </>
        )}
      </section>
    </main>
  );
}
