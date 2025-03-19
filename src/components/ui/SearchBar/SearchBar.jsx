import { useState, useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';

function SearchBar({
  onSearch,
  initialValue = '',
  placeholder = 'Buscar produtos...',
  label = 'Buscar',
  debounceTime = 300,
}) {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const debounceTimerRef = useRef(null);
  const inputRef = useRef(null);
  const id = useRef(`search-${Math.random().toString(36).substring(2, 11)}`);

  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  const handleChange = e => {
    const value = e.target.value;
    setSearchTerm(value);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      onSearch(value);
    }, debounceTime);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
    inputRef.current.focus();
  };

  return (
    <div className="relative">
      <label htmlFor={id.current} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          id={id.current}
          ref={inputRef}
          type="text" // Alterado de 'search' para 'text' para evitar botão nativo de limpar
          value={searchTerm}
          onChange={handleChange}
          className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder={placeholder}
          aria-label={label}
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            aria-label="Limpar busca"
          >
            <svg
              className="h-5 w-5 text-gray-400 hover:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  initialValue: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  debounceTime: PropTypes.number,
};

export default memo(SearchBar);
