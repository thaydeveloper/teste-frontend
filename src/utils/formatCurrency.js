export const formatCurrency = value => {
  if (value === undefined || value === null) {
    return 'R$ 0,00';
  }

  const numValue =
    typeof value === 'string'
      ? parseFloat(value.replace(/[^\d,.-]/g, '').replace(',', '.'))
      : Number(value);

  if (isNaN(numValue)) {
    console.warn(`Valor inválido passado para formatCurrency: ${value}`);
    return 'R$ 0,00';
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numValue);
};
