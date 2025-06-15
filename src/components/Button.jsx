import './Button.css';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false,
  loading = false,
  type = 'button',
  className = '',
  ...props 
}) => {
  const buttonClasses = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    loading && 'btn-loading',
    disabled && 'btn-disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <span className="btn-spinner"></span>
          Cargando...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;