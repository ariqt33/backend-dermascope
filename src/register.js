import React, { useState } from 'react';
import axios from 'axios';
import './register.css'; // Optional: if you have custom styling

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword, termsAccepted } = formData;

    if (!termsAccepted) {
      alert('Please accept the terms and conditions.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/register', {
        name,
        email,
        password
      });

      alert(response.data.message);
      // Clear form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false
      });
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <section className="register-section">
      <form className="register-form" onSubmit={handleSubmit}>
        <button className="register-top-btn" disabled>REGISTER</button>
        <h2>Keep up-to-date with your skin health journey.</h2>

        <input
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <label className="terms">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
            required
          />
          I accept the Terms of Use and Privacy Policy
        </label>

        <button type="submit" className="register-submit">Register</button>
      </form>
    </section>
  );
}

export default Register;
