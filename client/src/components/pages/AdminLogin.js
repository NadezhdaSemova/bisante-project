// src/components/AdminLogin.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/admin.css'

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(username, password);
    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="login-form">
      <h2>Админ Вход</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Потребителско име" value={username} onChange={e => setUsername(e.target.value)} required />
        <input type="password" placeholder="Парола" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Влез</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AdminLogin;
