import Badge from './badge';
import Button from './button';
import './StudentCard.css';

const StudentCard = ({ student, onToggleStatus, onDelete, viewMode }) => {
    if (!student) return null; 
  const isTopPerformer = student.grade >= 90;
  return (
    <div className={`student-card ${viewMode === 'list' ? 'card-list-row' : ''}`}>
      <div className="card-header">
        <div className="avatar">{student.name.charAt(0)}</div>
        <div className="student-info">
          <h4>{student.name}</h4>
          <p>{student.course}</p>
          <p>Grade: {student.grade}</p>
          
        </div>
        <div className="status-badges">
          {isTopPerformer && <Badge type="warning">Top Performer</Badge>}
          <Badge type={student.isPresent ? 'success' : 'neutral'}>
            {student.isPresent ? 'Present' : 'Absent'}
          </Badge>
        </div>
      </div>
      <div className="card-actions">
        <Button variant="outline" onClick={() => onToggleStatus(student.id)}>
          {student.isPresent ? 'Mark Absent' : 'Mark Present'}
        </Button>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
        <Button variant="danger" onClick={() => onDelete(student.id)}>Delete</Button>
      </div>
    </div>
  );
};
export default StudentCard;
