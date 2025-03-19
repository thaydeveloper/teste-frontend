import { useId } from 'react';
import PropTypes from 'prop-types';

export default function PriceFilter({ value = 'all', onChange, label = 'Filtrar por preço' }) {
  const id = useId();

  const options = [
    { value: 'all', label: 'Todos os preços' },
    { value: 'under50', label: 'Menos de R$50' },
    { value: '50to100', label: 'Entre R$50 e R$100' },
    { value: 'over100', label: 'Mais de R$100' },
  ];

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        aria-label={label}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

PriceFilter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
};
