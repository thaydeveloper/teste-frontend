export const parsePrice = priceString => {
  if (!priceString || typeof priceString !== 'string') return 0;

  try {
    return parseFloat(priceString.replace(/[^\d,]/g, '').replace(',', '.'));
  } catch (e) {
    console.error('Erro ao parsear preço:', priceString);
    return 0;
  }
};

export const filterProductsBySearch = (products, searchTerm) => {
  if (!searchTerm?.trim()) return products;

  const searchLower = searchTerm.toLowerCase();
  return products.filter(
    product =>
      product.productName?.toLowerCase().includes(searchLower) ||
      product.productDescription?.toLowerCase().includes(searchLower)
  );
};

export const filterProductsByPrice = (products, priceFilter) => {
  if (priceFilter === 'all') return products;

  return products.filter(product => {
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
};

export const formatPrice = value => {
  if (value === undefined || value === null) return 'R$ 0,00';

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const paginateProducts = (products, page = 1, limit = 10) => {
  const total = products.length;
  const startIndex = (page - 1) * limit;
  const endIndex = Math.min(startIndex + limit, total);
  const paginatedProducts = products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(total / limit);

  return {
    products: paginatedProducts,
    total,
    page,
    totalPages,
    hasMore: page < totalPages,
  };
};
