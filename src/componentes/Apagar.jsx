
import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

function Apagar() {
  const [idBusca, setIdBusca] = useState('');
  const [filme, setFilme] = useState(null);
  const [status, setStatus] = useState('inicial');

  const handleIdChange = (e) => {
    setIdBusca(e.target.value);
    setStatus('inicial');
    setFilme(null);
  };

  const procurar = () => {
    api.get(`/filmes/${idBusca.trim()}`)
      .then(res => {
        setFilme(res.data);
        setStatus('achou');
      })
      .catch(() => {
        setFilme(null);
        setStatus('naoachou');
      });
  };

  const apagar = () => {
    api.delete(`/filmes/${filme.id}`)
      .then(() => {
        setFilme(null);
        setStatus('apagado');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="fundo-catalogo">
      <main className="pagina-alterar pagina-apagar">

        <header className="cabecalho-alterar">
          <span className="etiqueta-alterar">
            GERENCIAR CATÁLOGO
          </span>

          <h1>Excluir filme</h1>

          <p>
            Pesquise pelo ID para localizar o filme que deseja remover.
          </p>
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

            <p>
              Não encontramos um filme com esse ID.
              Confira o número e tente novamente.
            </p>

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

        {status === 'achou' && filme && (
          <section className="cartao-exclusao">
            <div className="icone-exclusao">
              !
            </div>

            <span className="etiqueta-exclusao">
              CONFIRMAÇÃO DE EXCLUSÃO
            </span>

            <h2>{filme.nome}</h2>

            <div className="detalhes-filme">
              <div>
                <span>GÊNERO</span>
                <strong>{filme.genero}</strong>
              </div>

              <div>
                <span>ANO</span>
                <strong>{filme.ano}</strong>
              </div>

              <div>
                <span>ID</span>
                <strong>{filme.id}</strong>
              </div>
            </div>

            <p className="aviso-exclusao">
              Tem certeza de que deseja excluir este filme?
              Essa ação não poderá ser desfeita.
            </p>

            <div className="acoes-alterar">
              <button
                className="botao-excluir"
                onClick={apagar}
              >
                Excluir filme
              </button>

              <Link to="/" className="botao-secundario">
                Manter filme
              </Link>
            </div>
          </section>
        )}

        {status === 'apagado' && (
          <div className="mensagem-sucesso">
            <div className="icone-sucesso">✓</div>

            <h2>Filme excluído!</h2>

            <p>
              O filme foi removido do catálogo com sucesso.
            </p>

            <Link to="/" className="botao-vermelho">
              Voltar ao catálogo
            </Link>
          </div>
        )}

      </main>
    </div>
  );
}

export default Apagar;
