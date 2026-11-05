import { useState } from 'react'
import { isSupabaseConfigured, supabase } from './lib/supabase.js'

const navigation = [
  { id: 'inicio', label: 'Visão geral', icon: '⌂' },
  { id: 'cadastro', label: 'Cadastro de nome', icon: '＋' },
  { id: 'atividade', label: 'Atividades', icon: '◷' },
  { id: 'configuracoes', label: 'Configurações', icon: '⚙' },
]

export default function App() {
  const [activePage, setActivePage] = useState('cadastro')
  const [name, setName] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [saving, setSaving] = useState(false)

  const activeItem = navigation.find((item) => item.id === activePage)

  async function handleSubmit(event) {
    event.preventDefault()
    const normalizedName = name.trim()

    if (!normalizedName) {
      setFeedback({ type: 'error', message: 'Digite um nome antes de salvar.' })
      return
    }

    if (!isSupabaseConfigured) {
      setFeedback({
        type: 'warning',
        message: 'Interface pronta! Configure as variáveis do Supabase para habilitar a gravação.',
      })
      return
    }

    setSaving(true)
    setFeedback(null)

    const { error } = await supabase.from('nomes_teste').insert({ nome: normalizedName })

    if (error) {
      setFeedback({ type: 'error', message: error.message })
    } else {
      setName('')
      setFeedback({ type: 'success', message: 'Nome salvo no Supabase com sucesso!' })
    }

    setSaving(false)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => setActivePage('inicio')} aria-label="Ir para início">
          <span className="brand-mark">OC</span>
          <span className="brand-copy">
            <strong>Oficina Conexão</strong>
            <small>Ambiente de testes</small>
          </span>
        </button>

        <div className="topbar-right">
          <span className="environment"><i /> Ambiente de desenvolvimento</span>
          <div className="avatar" title="Usuário de teste">JL</div>
        </div>
      </header>

      <div className="workspace">
        <aside className="sidebar">
          <div className="sidebar-label">MENU PRINCIPAL</div>
          <nav aria-label="Menu principal">
            {navigation.map((item) => (
              <button
                key={item.id}
                className={`nav-link ${activePage === item.id ? 'active' : ''}`}
                onClick={() => {
                  setActivePage(item.id)
                  setFeedback(null)
                }}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
                {activePage === item.id && <span className="active-indicator" />}
              </button>
            ))}
          </nav>

          <div className="sidebar-bottom">
            <div className="connection-card">
              <span className="connection-dot" />
              <div>
                <strong>{isSupabaseConfigured ? 'Supabase configurado' : 'Aguardando conexão'}</strong>
                <small>{isSupabaseConfigured ? 'Cliente inicializado' : 'Adicione as chaves do projeto'}</small>
              </div>
            </div>
          </div>
        </aside>

        <main className="main-content">
          <div className="breadcrumb"><span>Workspace</span><b>/</b><strong>{activeItem?.label}</strong></div>

          <section className="page-heading">
            <div>
              <span className="eyebrow">ESPAÇO DE TESTES</span>
              <h1>{activePage === 'cadastro' ? 'Cadastro de nome' : activeItem?.label}</h1>
              <p>
                {activePage === 'cadastro'
                  ? 'Um formulário simples para validar a comunicação com o banco de dados.'
                  : 'Esta seção é demonstrativa e faz parte da navegação de teste.'}
              </p>
            </div>
            <span className="page-tag">MOCK UI <span>•</span> V1.0</span>
          </section>

          {activePage === 'cadastro' ? (
            <section className="form-card">
              <div className="card-heading">
                <div className="card-icon">✎</div>
                <div>
                  <h2>Novo registro</h2>
                  <p>Preencha o campo abaixo para testar a inserção no Supabase.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nome</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Digite um nome..."
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  maxLength={120}
                  autoComplete="name"
                />
                <div className="form-footer">
                  <span className="helper-text">Até 120 caracteres</span>
                  <button className="submit-button" type="submit" disabled={saving}>
                    {saving ? 'Salvando...' : 'Salvar nome'}
                    <span>→</span>
                  </button>
                </div>
                {feedback && <div className={`feedback ${feedback.type}`} role="status">{feedback.message}</div>}
              </form>
            </section>
          ) : (
            <section className="placeholder-card">
              <div className="placeholder-symbol">{activeItem?.icon}</div>
              <h2>{activeItem?.label}</h2>
              <p>Item de navegação mockado. A funcionalidade será implementada em uma próxima etapa.</p>
              <button onClick={() => setActivePage('cadastro')}>Voltar ao cadastro <span>→</span></button>
            </section>
          )}

          <div className="info-strip">
            <span className="info-icon">i</span>
            <p><strong>Projeto de demonstração.</strong> O menu é navegável, mas somente o cadastro de nome executa uma operação real no banco de dados.</p>
          </div>
        </main>
      </div>

      <footer className="footer">
        <span>© 2026 Oficina Conexão <span className="footer-separator">·</span> Aplicativo de teste</span>
        <nav aria-label="Navegação do rodapé">
          <button onClick={() => setActivePage('inicio')}>Início</button>
          <button onClick={() => setActivePage('cadastro')}>Cadastro</button>
          <button onClick={() => setActivePage('configuracoes')}>Configurações</button>
        </nav>
        <span className="footer-status"><i /> Sistema operacional</span>
      </footer>
    </div>
  )
}