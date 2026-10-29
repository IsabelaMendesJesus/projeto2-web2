
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

function Alterar() {
  const [idBusca, setIdBusca] = useState('');
  const [valores, setValores] = useState(null);
  const [status, setStatus] = useState('inicial');
  const navigate = useNavigate();

  const handleIdChange = (e) => {
    setIdBusca(e.target.value);
    setStatus('inicial');
    setValores(null);
  };

  const procurar = () => {
    api.get(`/filmes/${idBusca.trim()}`)
      .then(res => {
        setValores(res.data);
        setStatus('achou');
      })
      .catch(() => {
        setValores(null);
        setStatus('naoachou');
      });
  };

  const alterar = (e) => {
    e.preventDefault();
    api.put(`/filmes/${valores.id}`, valores)
      .then(() => navigate('/'))
      .catch(err => console.log(err));
  };

  return (
    <div className="fundo-catalogo">
      <main className="pagina-alterar">
        <header className="cabecalho-alterar">
          <span className="etiqueta-alterar">GERENCIAR CATÁLOGO</span>
          <h1>Editar filme</h1>
          <p>Pesquise um filme pelo ID e atualize suas informações.</p>
        </header>

        <section className="busca-filme">
          <label htmlFor="id" className="label-alterar">
            Identificação do filme
          </label>

          <input
            id="id"
            type="text"
            className="campo-alterar"
            placeholder="Digite o ID do filme"
            value={idBusca}
            onChange={handleIdChange}
          />

          <div className="acoes-alterar">
            <button
              className="botao-vermelho"
              onClick={procurar}
              disabled={!idBusca.trim()}
            >
              Procurar filme
            </button>

            <Link to="/" className="botao-secundario">
              Cancelar
            </Link>
          </div>
        </section>

        {status === 'naoachou' && (
          <div className="mensagem-erro-alterar">
            <strong>Filme não encontrado</strong>
            <p>Verifique o ID informado e tente novamente.</p>
            <button
              className="botao-secundario"
              onClick={() => {
                setStatus('inicial');
                setIdBusca('');
              }}
            >
              Tentar novamente
            </button>
          </div>
        )}

        {status === 'achou' && valores && (
          <form onSubmit={alterar} className="formulario-alterar">
            <div className="divisor-alterar">
              <span>INFORMAÇÕES DO FILME</span>
            </div>

            <div className="mb-3">
              <label htmlFor="nome" className="label-alterar">
                Nome do filme
              </label>
              <input
                id="nome"
                type="text"
                className="campo-alterar"
                required
                value={valores.nome ?? ''}
                onChange={e =>
                  setValores({ ...valores, nome: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label htmlFor="genero" className="label-alterar">
                Gênero
              </label>
              <input
                id="genero"
                type="text"
                className="campo-alterar"
                required
                value={valores.genero ?? ''}
                onChange={e =>
                  setValores({ ...valores, genero: e.target.value })
                }
              />
            </div>

            <div className="mb-4">
              <label htmlFor="ano" className="label-alterar">
                Ano de lançamento
              </label>
              <input
                id="ano"
                type="number"
                className="campo-alterar"
                required
                value={valores.ano ?? ''}
                onChange={e =>
                  setValores({ ...valores, ano: e.target.value })
                }
              />
            </div>

            <div className="acoes-alterar">
              <button type="submit" className="botao-vermelho">
                Salvar alterações
              </button>

              <Link to="/" className="botao-secundario">
                Cancelar
              </Link>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}

export default Alterar;
