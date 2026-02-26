import './Badge.css';

const Badge = ({ children, type = 'neutral' }) => (
  <span className={`badge badge-${type}`}>{children}</span>
);
export default Badge;
