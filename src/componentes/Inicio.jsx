import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

function Inicio() {
  const [filmes, setFilmes] = useState([]);
  const [erro, setErro] = useState('');
  const [busca, setBusca] = useState('');

  useEffect(() => {
    api.get('/filmes')
      .then(res => setFilmes(res.data))
      .catch(err => {
        console.log(err);
        setErro('Não foi possível carregar os filmes.');
      });
  }, []);

  const filmesFiltrados = filmes.filter(f =>
    (f.nome || '').toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="container mt-4 pagina-filmes">
      <header className="cabecalho-filmes">
        <h1>Catálogo de Filmes</h1>
        <p>Explore os filmes disponíveis no catálogo.</p>
      </header>

      {erro && (
        <div className="alert alert-danger">
          {erro}
        </div>
      )}

      <input
        type="text"
        className="campo-alterar mb-4"
        placeholder="Buscar filme pelo nome..."
        value={busca}
        onChange={e => setBusca(e.target.value)}
      />

      <div className="lista-filmes">
        {filmesFiltrados.map(f => (
          <Link
            key={f.id}
            to={`/ler/${f.id}`}
            className="item-filme"
          >
            <div>
              <span className="filme-id">FILME #{f.id}</span>
              <h2>{f.nome}</h2>
            </div>

            <span className="seta-filme">→</span>
          </Link>
        ))}

        {filmes.length === 0 && !erro && (
          <p className="mensagem-vazia">
            Nenhum filme cadastrado.
          </p>
        )}

        {filmes.length > 0 && filmesFiltrados.length === 0 && (
          <p className="mensagem-vazia">
            Nenhum filme encontrado para "{busca}".
          </p>
        )}
      </div>
    </div>
  );
}

export default Inicio;