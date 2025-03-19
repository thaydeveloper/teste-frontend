import mockProductsData from '../mocks/products.json';

const parsePrice = priceString => {
  if (!priceString || typeof priceString !== 'string') return 0;

  try {
    return parseFloat(priceString.replace(/[^\d,]/g, '').replace(',', '.'));
  } catch (e) {
    console.error('Erro ao parsear preço:', priceString);
    return 0;
  }
};

export const MockApiService = {
  getProducts: async ({ page = 1, limit = 10, search = '', priceFilter = 'all' }) => {
    await new Promise(resolve => setTimeout(resolve, 300));

    let filteredProducts = [...mockProductsData];

    if (search?.trim()) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        product =>
          product.productName?.toLowerCase().includes(searchLower) ||
          product.productDescription?.toLowerCase().includes(searchLower)
      );
    }

    if (priceFilter !== 'all') {
      filteredProducts = filteredProducts.filter(product => {
        const price = parsePrice(product.productPrice);

        switch (priceFilter) {
          case 'under50':
            return price < 50;
          case '50to100':
            return price >= 50 && price <= 100;
          case 'over100':
            return price > 100;
          default:
            return true;
        }
      });
    }

    const total = filteredProducts.length;
    const startIndex = (page - 1) * limit;
    const endIndex = Math.min(startIndex + limit, total);
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    const totalPages = Math.ceil(total / limit);

    return {
      products: paginatedProducts,
      total,
      page,
      totalPages,
      hasMore: page < totalPages,
    };
  },
};
