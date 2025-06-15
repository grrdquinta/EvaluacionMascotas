import './Card.css';

const Card = ({ 
  children, 
  className = '', 
  padding = 'medium', 
  shadow = 'medium',
  hoverEffect = 'lift', // 'lift', 'scale', 'glow', 'none'
  border = 'none', // 'none', 'thin', 'thick'
  accent = 'none', // 'none', 'top', 'bottom', 'left', 'full'
  ...props 
}) => {
  const cardClasses = [
    'card',
    `card-padding-${padding}`,
    `card-shadow-${shadow}`,
    `card-hover-${hoverEffect}`,
    `card-border-${border}`,
    `card-accent-${accent}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

export default Card;