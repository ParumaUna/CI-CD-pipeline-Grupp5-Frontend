import React, { useState } from 'react';
import './styles/CreateActivityForm.css'

interface ICreateActivityFormProps {
  onActivitySubmit: (formData: any) => void;
}

const CreateActivityForm: React.FC<ICreateActivityFormProps> = ({ onActivitySubmit }) => {
  const [formData, setFormData] = useState({
    nameOfActivity: '',
    week: 0,
    startTime: null,
    stopTime: null,
    day: [] as string[],
    comment: '',
  });

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      let updatedDays = formData.day.slice();

      if (checked) {
        updatedDays.push(name);
      } else {
        updatedDays = updatedDays.filter((day) => day !== name);
      }

      setFormData({
        ...formData,
        day: updatedDays,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onActivitySubmit(formData);
    // Clear the form data after submission (if needed)
    setFormData({
      nameOfActivity: '',
      week: 0,
      startTime: null,
      stopTime: null,
      day: [] as string[],
      comment: '',
    });
  };

  return (
    <aside id="aside-section">
      <h2>Create New Activity</h2>
      <form role="form" onSubmit={handleSubmit} className="activity-form">
        <div className="form-group">
          <label>
            Activity Name:
            <br />
            <input
              type="text"
              name="nameOfActivity"
              value={formData.nameOfActivity}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Week:
            <br />
            <input
              type="number"
              name="week"
              value={formData.week}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Comment:
            <br />
            <input
              type="text"
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="form-group">
          <fieldset className="days-fieldset">
            <legend>Select Days:</legend>
            {daysOfWeek.map((day) => (
              <label key={day}>
                <input
                  type="checkbox"
                  name={day}
                  checked={formData.day.includes(day)}
                  onChange={handleInputChange}
                />
                {day}
              </label>
            ))}
          </fieldset>
        </div>
        <button type="submit" className="submit-button">
          Add Activity
        </button>
      </form>
    </aside>
  );
};

export default CreateActivityForm;
