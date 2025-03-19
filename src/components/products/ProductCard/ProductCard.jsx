import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../ui/Modal/Modal';

function ProductCard({ product, index }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { name, productName, image, imageUrl, price, description, shortDescription } = product;

  const displayName = name || productName || 'Produto';
  const displayImage = imageUrl || image || 'https://via.placeholder.com/300x200?text=Sem+Imagem';
  const displayDescription = description || shortDescription || 'Sem descrição disponível';

  const formattedPrice =
    typeof price === 'number'
      ? price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      : price;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <article
        className="h-full flex flex-col border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
        aria-labelledby={`product-${index}-name`}
      >
        <div className="relative pt-[75%] bg-gray-100">
          <img
            src={displayImage}
            alt={`Imagem do produto ${displayName}`}
            className="absolute top-0 left-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <h3
            id={`product-${index}-name`}
            className="text-lg font-medium text-gray-900 line-clamp-2 h-14 mb-1"
          >
            {displayName}
          </h3>

          <div className="flex-grow min-h-[3rem] mb-3">
            <p
              className="text-sm text-gray-600 line-clamp-3"
              aria-label="Descrição do produto"
              title={displayDescription}
            >
              {displayDescription}
            </p>
          </div>

          <div className="mt-auto flex justify-between items-center">
            <p className="text-lg font-bold text-blue-600" aria-label="Preço do produto">
              {formattedPrice}
            </p>

            <button
              type="button"
              onClick={openModal}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-label={`Ver detalhes do produto ${displayName}`}
            >
              Detalhes
            </button>
          </div>
        </div>
      </article>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={displayName} size="lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={displayImage}
              alt={`Imagem do produto ${displayName}`}
              className="absolute top-0 left-0 w-full h-full object-contain"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{displayName}</h3>

            <p className="text-2xl font-bold text-blue-600 mb-4">{formattedPrice}</p>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Descrição</h4>
              <p className="text-gray-700">{displayDescription}</p>
            </div>

            {product.specs && (
              <div className="mt-6 border-t border-gray-200 pt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Especificações</h4>
                <dl>
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="py-2 flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">{key}</dt>
                      <dd className="text-sm text-gray-900">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            <div className="mt-6">
              <button
                type="button"
                className="w-full inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={closeModal}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    productName: PropTypes.string,
    image: PropTypes.string,
    imageUrl: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    description: PropTypes.string,
    shortDescription: PropTypes.string,
    specs: PropTypes.object,
  }).isRequired,
  index: PropTypes.number,
  totalProducts: PropTypes.number,
};

export default memo(ProductCard);
