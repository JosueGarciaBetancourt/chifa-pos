import React from "react";

const Header = () => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <div className="text-xl font-semibold text-gray-800">Registrar Venta</div>
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-600 text-right">
          <p className="font-medium">Israel Garcia</p>
          <p className="text-xs">Admin</p>
        </div>
        <img
          src="https://i.pravatar.cc/40"
          alt="Avatar"
          className="w-10 h-10 rounded-full border"
        />
      </div>
    </header>
  );
};

export default Header;
