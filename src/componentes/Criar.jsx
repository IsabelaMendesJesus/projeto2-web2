
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

function Criar() {
  const [valores, setValores] = useState({
    nome: '',
    genero: '',
    ano: ''
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    api.post('/filmes', valores)
      .then(() => navigate('/'))
      .catch(err => console.log(err));
  };

  return (
    <div className="fundo-catalogo">
      <main className="pagina-alterar pagina-criar">

        <header className="cabecalho-alterar">
          <span className="etiqueta-alterar">
            GERENCIAR CATÁLOGO
          </span>

          <h1>Novo filme</h1>

          <p>
            Adicione um novo título à sua coleção de filmes.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="formulario-criar">

          <div className="campo-grupo-criar">
            <label htmlFor="nome" className="label-alterar">
              Nome do filme
            </label>

            <input
              id="nome"
              type="text"
              className="campo-alterar"
              placeholder="Ex.: Interestelar"
              required
              value={valores.nome}
              onChange={e =>
                setValores({ ...valores, nome: e.target.value })
              }
            />
          </div>

          <div className="campo-grupo-criar">
            <label htmlFor="genero" className="label-alterar">
              Gênero
            </label>

            <input
              id="genero"
              type="text"
              className="campo-alterar"
              placeholder="Ex.: Ficção científica"
              required
              value={valores.genero}
              onChange={e =>
                setValores({ ...valores, genero: e.target.value })
              }
            />
          </div>

          <div className="campo-grupo-criar">
            <label htmlFor="ano" className="label-alterar">
              Ano de lançamento
            </label>

            <input
              id="ano"
              type="number"
              className="campo-alterar"
              placeholder="Ex.: 2025"
              required
              value={valores.ano}
              onChange={e =>
                setValores({ ...valores, ano: e.target.value })
              }
            />
          </div>

          <div className="acoes-alterar">
            <button type="submit" className="botao-vermelho">
              Criar filme
            </button>

            <Link to="/" className="botao-secundario">
              Cancelar
            </Link>
          </div>

        </form>
      </main>
    </div>
  );
}

export default Criar;
