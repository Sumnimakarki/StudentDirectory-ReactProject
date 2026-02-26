import Button from './button';
import './Header.css';

const Header = ({ onNavigateAdd, showAddButton }) => (
  <header className="main-header">
    <div className="container header-content">
      <div className="logo">
        <span className="logo-icon">🎓</span>
        <div className="logo-text">
          <h1>Student Directory</h1>
        </div>
      </div>
      {showAddButton && (
        <Button onClick={onNavigateAdd}>Add Student</Button>
      )}
    </div>
  </header>
);

export default Header;
