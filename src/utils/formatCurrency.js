/**
 * Formata um valor para exibição como moeda brasileira (BRL)
 * @param {number|string} value - Valor a ser formatado
 * @returns {string} Valor formatado como moeda
 */
export const formatCurrency = value => {
  // Retornar direto se o valor for undefined ou null
  if (value === undefined || value === null) {
    return 'R$ 0,00';
  }

  // Garantir que o valor seja um número
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
