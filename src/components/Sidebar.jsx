import { signOut } from '@aws-amplify/auth';
import { Link, useLocation } from 'react-router-dom';
import useAlertScheduler from '../hooks/useAlertScheduler';
import logo from './../assets/images/logo.png';

const navItems = [
  { path: '/', label: 'Início' },
  { path: '/meta-agua', label: 'Meta de Água' },
];

export default function Sidebar() {
  const location = useLocation();
  const { blockNotificacao } = useAlertScheduler();
  return (
    <aside className="w-64 bg-white border-r border-gray-300 p-4 shadow-sm">
      <h2 className="text-xl font-bold mb-6 text-center">
        <img src={logo} alt="ReLembre" className="mx-auto mb-2 w-[80px] h-[80px]" />
        ReLembre
        </h2>
      <nav className="flex flex-col gap-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`px-4 py-2 rounded hover:bg-gray-100 text-center ${
              location.pathname === item.path ? 'bg-gray-200 font-medium' : ''
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <button
        onClick={() => {
          blockNotificacao();
          signOut();
        }}
        className="mt-4 px-4 py-2 cursor-pointer rounded hover:bg-gray-100 w-full "
      >
        Sair
      </button>
    </aside>
  );
}
