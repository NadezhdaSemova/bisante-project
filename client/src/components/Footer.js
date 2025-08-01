
import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react';
import '../styles/footer.css';

function Footer() {
const [showAdminLink, setShowAdminLink] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'a') {
        setShowAdminLink(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <footer tabIndex="-1">
      <p>© 2025 Винарна Бисанте. Всички права запазени.</p>

      {showAdminLink && (
        <Link to="/admin-login" className="admin-link-visible">
          Admin
        </Link>
      )}
    </footer>
  );
}

export default Footer;