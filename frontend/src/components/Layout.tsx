import { NavLink, Outlet } from 'react-router-dom'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `px-4 py-2 rounded ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`

export function Layout() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <nav className="flex gap-2 mb-6 border-b pb-4">
        <NavLink to="/pessoas" className={linkClass}>Pessoas</NavLink>
        <NavLink to="/transacoes" className={linkClass}>Transações</NavLink>
        <NavLink to="/totais" className={linkClass}>Totais</NavLink>
      </nav>
      <Outlet />
    </div>
  )
}