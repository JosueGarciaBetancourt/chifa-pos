import React from 'react';

const SalesByHour = ({ hour, amount, orders }) => {
  return (
    <div className="flex items-center justify-between py-3 px-2 border-b border-gray-100 last:border-b-0">
      <div className="text-left">
        <p className="text-lg font-semibold text-gray-900">{hour}</p>
      </div>
      <div className="text-right">
        <p className="text-lg font-bold text-gray-900">{amount}</p>
        <p className="text-sm text-gray-500">{orders} pedidos</p>
      </div>
    </div>
  );
};

export default SalesByHour;