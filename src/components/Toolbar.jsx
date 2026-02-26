import Input from './Input';
import Button from './Button';
import './Toolbar.css';

const Toolbar = ({ searchQuery, onSearchChange, filterBy, onFilterChange, sortBy, onSortChange, viewMode, onViewModeToggle }) => (
  <div className="toolbar">
    <Input value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} placeholder="Search students..." className="search-input" />
    <div className="toolbar-controls">
      <select value={filterBy} onChange={(e) => onFilterChange(e.target.value)} className="select-field">
        <option value="all">All Status</option>
        <option value="present">Present</option>
        <option value="absent">Absent</option>
      </select>
      <select value={sortBy} onChange={(e) => onSortChange(e.target.value)} className="select-field">
        <option value="name-asc">Name (A-Z)</option>
        <option value="grade-desc">Grade (High-Low)</option>
      </select>
      <Button variant="outline" onClick={() => onViewModeToggle(viewMode === 'grid' ? 'list' : 'grid')}>
        {viewMode === 'grid' ? 'List View' : 'Grid View'}
      </Button>
    </div>
  </div>
);

export default Toolbar;
