import React, { useState } from 'react';
import './FormValidation.css';

const FormValidation = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.email.includes('@')) newErrors.email = 'Input requires standard email format.';
    if (formData.password.length < 6) newErrors.password = 'Key must be minimum 6 characters.';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Real-time clear errors on fix attempt
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitted(false);
    } else {
      setErrors({});
      setIsSubmitted(true);
      // Reset form logic
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <div className="react-card">
      <h2>Secure React Form</h2>
      <p className="sub-text">Managed controlled input component with defensive validation object mappings.</p>
      
      <form onSubmit={handleSubmit} className="v-form">
        <div className="form-field">
          <label>Work Email</label>
          <input 
            type="text" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'input-err' : ''}
          />
          {errors.email && <span className="err-txt">{errors.email}</span>}
        </div>

        <div className="form-field">
          <label>Auth Key</label>
          <input 
            type="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'input-err' : ''}
          />
          {errors.password && <span className="err-txt">{errors.password}</span>}
        </div>

        <button type="submit" className="btn-submit">Authorize</button>
      </form>

      {isSubmitted && <div className="success-banner">🎉 Authorization Granted Successfully!</div>}
    </div>
  );
};

export default FormValidation;
