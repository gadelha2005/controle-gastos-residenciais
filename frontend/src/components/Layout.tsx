import { NavLink, Outlet } from 'react-router-dom'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `px-4 py-2 rounded-card text-sm font-medium ${
    isActive ? 'bg-accent text-white' : 'text-muted-2 hover:text-text'
  }`

export function Layout() {
  return (
    <div className="min-h-screen bg-bg">
      <header className="sticky top-0 z-10 border-b border-border bg-bg/90 px-10 h-15 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-heading text-lg font-extrabold text-text">Controle de Gastos</span>
        </div>
        <nav className="flex gap-2">
          <NavLink to="/pessoas" className={linkClass}>Pessoas</NavLink>
          <NavLink to="/transacoes" className={linkClass}>Transações</NavLink>
          <NavLink to="/totais" className={linkClass}>Totais</NavLink>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto p-10">
        <Outlet />
      </main>
    </div>
  )
}