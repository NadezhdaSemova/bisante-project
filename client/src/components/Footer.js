
import {Link} from 'react-router-dom'
import '../styles/footer.css';

function Footer() {
  return (
    <footer>
      <p>© 2025 Винарна Бисанте. Всички права запазени.</p>

      {/* Почти невидим бутон */}
      <Link to="/admin-login" className="secret-admin-link">Admin</Link>
    </footer>
  );
}

export default Footer;