import React from "react";
import { Home, ShoppingCart, FileText, Settings, LogOut } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gradient-to-b from-blue-800 to-blue-600 text-white flex flex-col">
      <div className="p-6 text-center font-bold text-2xl border-b border-blue-400">
        🍜 Chifa
      </div>
      <nav className="flex-1 p-4 space-y-4">
        <div className="flex items-center gap-3 hover:bg-blue-700 p-2 rounded cursor-pointer">
          <Home size={20} /> Inicio
        </div>
        <div>
          <p className="text-sm uppercase font-semibold text-gray-300">Ventas</p>
          <div className="ml-2 mt-1">
            <div className="flex items-center gap-3 hover:bg-blue-700 p-2 rounded cursor-pointer">
              <ShoppingCart size={20} /> Realizar Venta
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 hover:bg-blue-700 p-2 rounded cursor-pointer">
          <FileText size={20} /> Reportes
        </div>
        <div className="flex items-center gap-3 hover:bg-blue-700 p-2 rounded cursor-pointer">
          <Settings size={20} /> Gestionar
        </div>
      </nav>
      <div className="p-4 border-t border-blue-400 flex items-center gap-2 hover:bg-blue-700 cursor-pointer">
        <LogOut size={20} /> Salir
      </div>
    </div>
  );
};

export default Sidebar;
