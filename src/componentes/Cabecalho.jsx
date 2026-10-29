import { Link, useLocation } from 'react-router-dom';

function Cabecalho() {
  const location = useLocation();

  const linkClasse = (path) => {
    const baseClasse = "nav-link-custom";
    return location.pathname === path ? `${baseClasse} active` : baseClasse;
  };

  return (
    <nav className="header-navegacao">
      <div className="header-menu">
        <Link to="/" className={linkClasse('/')}>Início</Link>
        <Link to="/criar" className={linkClasse('/criar')}>Criar</Link>
        <Link to="/alterar" className={linkClasse('/alterar')}>Alterar</Link>
        <Link to="/apagar" className={linkClasse('/apagar')}>Apagar</Link>
      </div>
    </nav>
  );
}

export default Cabecalho;
