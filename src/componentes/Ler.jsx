
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api';

function Ler() {
  const { id } = useParams();
  const [filme, setFilme] = useState(null);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    api.get(`/filmes/${id}`)
      .then(res => setFilme(res.data))
      .catch(() => setErro(true));
  }, [id]);

  return (
    <div className="pagina-ler">
      <div className="card-ler">
        <h2 className="titulo-ler">Detalhes do Filme</h2>

        {erro && (
          <div className="alerta-ler">
            Filme não encontrado.
          </div>
        )}

        {filme && (
          <div className="detalhes-filme">
            <p>
              <strong>ID:</strong>
              <span>{filme.id}</span>
            </p>

            <p>
              <strong>Nome:</strong>
              <span>{filme.nome}</span>
            </p>

            <p>
              <strong>Gênero:</strong>
              <span>{filme.genero}</span>
            </p>

            <p>
              <strong>Ano:</strong>
              <span>{filme.ano}</span>
            </p>
          </div>
        )}

        {!filme && !erro && (
          <p className="carregando-ler">
            Carregando detalhes do filme...
          </p>
        )}

        <div className="acoes-ler">
          <Link to="/" className="botao-secundario">
            Voltar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Ler;
