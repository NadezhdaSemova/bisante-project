import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';

const AdminRegister = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setMessage('Паролите не съвпадат!');
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/admins/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Регистрацията беше успешна!');
        setTimeout(() => navigate('/admin-login'), 1500);
      } else {
        setMessage(data.message || 'Грешка при регистрация');
      }
    } catch (err) {
      setMessage('Сървърна грешка');
    }
  };

  return (
    <div className="login-form">
      <h2>Регистрация на админ</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Потребителско име" value={username} onChange={e => setUsername(e.target.value)} required />
        <input type="password" placeholder="Парола" value={password} onChange={e => setPassword(e.target.value)} required />
        <input type="password" placeholder="Потвърди паролата" value={confirm} onChange={e => setConfirm(e.target.value)} required />
        <button type="submit">Регистрирай</button>
      </form>
      {message && <p style={{ color: message.includes('успешна') ? 'green' : 'red' }}>{message}</p>}
    </div>
  );
};

export default AdminRegister;
