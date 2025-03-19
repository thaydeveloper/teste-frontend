import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductCard from '../components/products/ProductCard';

describe('ProductCard Component', () => {
  it('renderiza corretamente o card de produto com todas as informações', () => {
    const mockProduct = {
      name: 'Sony Xperia 10 II',
      description: 'Sony Xperia 10 II com 128GB',
      image:
        'https://st2.depositphotos.com/1017228/9399/i/450/depositphotos_93990140-stock-photo-cheerful-woman-showing-blank-smartphone.jpg',
      price: 390.0,
    };

    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Sony Xperia 10 II')).toBeInTheDocument();
    expect(screen.getByText('Sony Xperia 10 II com 128GB')).toBeInTheDocument();

    expect(
      screen.getByText(content => {
        return content.includes('R$') && content.includes('390');
      })
    ).toBeInTheDocument();

    expect(screen.getByRole('img')).toHaveAttribute('src', mockProduct.image);

    expect(screen.getByRole('img')).toHaveAttribute('alt', mockProduct.name);

    expect(screen.getByRole('button')).toHaveTextContent('Ver detalhes');
  });
});
