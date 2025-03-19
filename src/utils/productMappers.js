export function mapProductsFromPages(pages) {
  if (!pages) return [];

  return pages.flatMap((page, pageIndex) => {
    if (!page?.products?.length) return [];

    return page.products.map((product, index) => ({
      id: `${pageIndex}-${index}`,
      name: product.productName || product.name || 'Sem nome',
      productName: product.productName || product.name || 'Sem nome',
      description: product.productDescription || product.description || 'Sem descrição',
      image: product.productImg || product.image || 'https://via.placeholder.com/150',
      price: parseFloat(
        product.productPrice?.replace('R$ ', '')?.replace(',', '.') || product.price || '0'
      ),
      brand: product.productName?.split(' ')[0] || product.name?.split(' ')[0] || '',
    }));
  });
}

export function getTotalProductsCount(pages) {
  return pages?.[0]?.total || 0;
}
