import { memo } from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../ProductCard/ProductCard';

function ProductsList({ products = [], lastProductRef }) {
  if (!Array.isArray(products)) {
    console.error('ProductsList recebeu um valor não-array:', products);
    return null;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 rounded-lg" role="status" aria-live="polite">
        <p className="text-lg text-gray-600">Nenhum produto encontrado.</p>
        <p className="text-sm text-gray-500 mt-2">Tente ajustar seus filtros de busca.</p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 xl:gap-5"
      role="region"
      aria-label="Lista de produtos"
    >
      {products.map((product, index) => {
        const isLastProduct = index === products.length - 1;
        return (
          <div
            key={product.id || `product-${index}-${product.name}`}
            ref={isLastProduct ? lastProductRef : null}
            className="transition-all duration-300 ease-in hover:scale-[1.02]"
          >
            <ProductCard product={product} index={index} totalProducts={products.length} />
          </div>
        );
      })}
    </div>
  );
}

ProductsList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      productName: PropTypes.string,
    })
  ),
  lastProductRef: PropTypes.func,
};

export default memo(ProductsList);
