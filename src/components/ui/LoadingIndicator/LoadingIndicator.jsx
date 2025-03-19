import PropTypes from 'prop-types';

export default function LoadingIndicator({ isInitialLoading = false }) {
  const message = isInitialLoading ? 'Carregando produtos...' : 'Carregando mais produtos...';

  return (
    <div
      className="flex flex-col items-center justify-center py-6"
      role="status"
      aria-live="polite"
    >
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      <span className="sr-only">{message}</span>
      <p className="text-gray-500 mt-3">{message}</p>
    </div>
  );
}

LoadingIndicator.propTypes = {
  isInitialLoading: PropTypes.bool,
};
