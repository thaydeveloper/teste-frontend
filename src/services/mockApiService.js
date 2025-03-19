import mockProductsData from '../mocks/products.json';
import {
  filterProductsBySearch,
  filterProductsByPrice,
  paginateProducts,
} from '../utils/productUtils';

export const MockApiService = {
  getProducts: async ({ page = 1, limit = 10, search = '', priceFilter = 'all' }) => {
    await new Promise(resolve => setTimeout(resolve, 300));

    let filteredProducts = [...mockProductsData];

    filteredProducts = filterProductsBySearch(filteredProducts, search);
    filteredProducts = filterProductsByPrice(filteredProducts, priceFilter);

    return paginateProducts(filteredProducts, page, limit);
  },
};
