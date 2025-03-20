'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/workflows', icon: '📋', label: 'Workflows' },
    { href: '/workflows/create', icon: '➕', label: 'Create Workflow' },
    { href: '/analytics', icon: '📊', label: 'Analytics' },
    { href: '/settings', icon: '⚙️', label: 'Settings' }
  ];

  return (
    <div className="w-64 bg-[#1f2027] h-screen fixed left-0 border-r border-gray-800">
      <Link href="/" className="flex items-center gap-2 p-4 border-b border-gray-800">
        <div className="w-8 h-8 bg-purple-500/20 rounded-lg"></div>
        <span className="text-xl font-semibold text-purple-500">Financial AI</span>
      </Link>

      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${pathname === item.href
                  ? 'text-purple-500 bg-purple-600/20'
                  : 'text-gray-400 hover:text-purple-500 hover:bg-[#2a2b36]'
                  }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-purple-600/20" />
          <div>
            <p className="text-sm font-medium text-gray-300">User Name</p>
            <p className="text-xs text-gray-500">user@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar; 