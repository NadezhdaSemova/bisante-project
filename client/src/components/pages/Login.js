// src/components/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/admin.css'

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔒 Симулирана проверка
    if (form.username === 'admin' && form.password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      setError('Невалидни данни за вход');
    }
  };

  return (
    <div className="login-page">
      <h2>Админ Вход</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          name="username"
          placeholder="Потребителско име"
          value={form.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Парола"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit">Вход</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
