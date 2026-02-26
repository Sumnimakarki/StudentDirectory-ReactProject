import './Button.css';

const Button = ({ children, onClick, variant = 'primary', type = 'button', className = '' }) => (
  <button type={type} onClick={onClick} className={`btn btn-${variant} ${className}`}>
    {children}
  </button>
);
export default Button;
