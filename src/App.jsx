import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import AddStudentForm from './components/AddStudentForm';
import StudentCard from './components/StudentCard';
import './App.css';

const INITIAL_STUDENTS = [
  { id: 1, name: 'Ram Ghimire', course: 'Computer Science', grade: 94, isPresent: true },
  { id: 2, name: 'Shyam Pokhrel', course: 'Management', grade: 82, isPresent: false },
  { id: 3, name: 'Hari Rijal', course: 'Management', grade: 91, isPresent: true },
  { id: 4, name: 'Sita Neupane', course: 'HM', grade: 84, isPresent: false },
]
function App() {
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');
  const [viewMode, setViewMode] = useState('grid');
  const [currentView, setCurrentView] = useState('directory'); // 'directory' or 'add'

  const handleAddStudent = (newStudent) => {
    setStudents(prev => [{ ...newStudent, id: Date.now(), isPresent: true }, ...prev]);
    setCurrentView('directory'); // Navigate back after adding
  };

  const handleDeleteStudent = (id) => setStudents(prev => prev.filter(s => s.id !== id));
  
  const handleToggleStatus = (id) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, isPresent: !s.isPresent } : s));
  };

  const filteredAndSortedStudents = useMemo(() => {
    return students
      .filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             student.course.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterBy === 'all' || 
                             (filterBy === 'present' && student.isPresent) || 
                             (filterBy === 'absent' && !student.isPresent);
        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
        if (sortBy === 'grade-desc') return b.grade - a.grade;
        if (sortBy === 'grade-asc') return a.grade - b.grade;
        return 0;
      });
  }, [students, searchQuery, filterBy, sortBy]);

  return (
    <div className="app-container">
      <Header 
        onNavigateAdd={() => setCurrentView('add')} 
        showAddButton={currentView === 'directory'} 
      />
      
      <main className="container">
        {currentView === 'add' ? (
          <AddStudentForm 
            onAddStudent={handleAddStudent} 
            onCancel={() => setCurrentView('directory')} 
          />
        ) : (
          <>
            <Toolbar 
              searchQuery={searchQuery} onSearchChange={setSearchQuery}
              filterBy={filterBy} onFilterChange={setFilterBy}
              sortBy={sortBy} onSortChange={setSortBy}
              viewMode={viewMode} onViewModeToggle={setViewMode}
            />
            <div className={`student-list ${viewMode}`}>
              {filteredAndSortedStudents.length > 0 ? (
                filteredAndSortedStudents.map(student => (
                  <StudentCard key={student.id} student={student} 
                    onDelete={handleDeleteStudent} onToggleStatus={handleToggleStatus} viewMode={viewMode} />
                ))
              ) : (
                <div className="empty-state"><h3>No students found</h3></div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
