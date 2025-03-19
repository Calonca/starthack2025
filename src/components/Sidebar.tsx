export function Sidebar() {
  return (
    <div className="w-64 bg-[#1f2027] h-screen fixed left-0 border-r border-gray-800">
      <div className="flex items-center gap-2 p-4 border-b border-gray-800">
        <div className="w-8 h-8 bg-white rounded-lg"></div>
        <span className="text-xl font-semibold text-white">Lovable</span>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-white px-4 py-2 rounded-lg hover:bg-[#2a2b36]">
              <span>🏠</span>
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-3 text-white bg-[#2a2b36] px-4 py-2 rounded-lg">
              <span>📋</span>
              Workflows
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-white px-4 py-2 rounded-lg hover:bg-[#2a2b36]">
              <span>🤖</span>
              AI Models
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-white px-4 py-2 rounded-lg hover:bg-[#2a2b36]">
              <span>📊</span>
              Analytics
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
} 