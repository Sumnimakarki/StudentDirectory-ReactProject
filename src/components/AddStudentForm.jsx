import React, { useState } from 'react';
import Input from './Input';
import Button from './button';
import './AddStudentForm.css';

const AddStudentForm = ({ onAddStudent, onCancel }) => {
  const [formData, setFormData] = useState({ name: '', course: '', grade: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === "grade") {
      const num = Number(value);

      if (value !== "" && (num < 0 || num > 100)) {
        setError("Grade must be between 0 and 100");
      } else {
        setError("");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const grade = Number(formData.grade);

    if (grade < 0 || grade > 100) {
      setError("Grade must be between 0 and 100");
      return;
    }

    onAddStudent({ ...formData, grade });
    setError("");
  };

  return (
    <div className="full-page-form-wrapper">
      <form className="add-student-form larger-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h2 className="form-title">Add New Student</h2>
          <p className="form-subtitle">
            Enter details to register a new student in the directory.
          </p>
        </div>

        <div className="form-grid">
          <Input label="Student Name" name="name" value={formData.name} onChange={handleChange} required />
          <Input label="Course" name="course" value={formData.course} onChange={handleChange} required />
          <Input label="Grade (0-100)" name="grade" type="number" value={formData.grade} onChange={handleChange} required />
        </div>

        {error && <p style={{ color: "red", marginTop: "8px" }}>{error}</p>}

        <div className="form-actions">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button type="submit">Register Student</Button>
        </div>
      </form>
    </div>
  );
};

export default AddStudentForm;