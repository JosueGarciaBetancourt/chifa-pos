import React from 'react';
import { Package, AlertTriangle, ShoppingBag, DollarSign } from 'lucide-react';

const InventoryStats = ({ totalProductos, lowStockCount, totalTipos, inventoryValue }) => {
  const stats = [
    {
      title: "Total Productos",
      value: totalProductos,
      color: "blue",
      icon: Package
    },
    {
      title: "Stock Bajo",
      value: lowStockCount,
      color: "red",
      icon: AlertTriangle
    },
    {
      title: "Tipos",
      value: totalTipos,
      color: "green",
      icon: ShoppingBag
    },
    {
      title: "Valor Inventario",
      value: `S/ ${inventoryValue.toFixed(2)}`,
      color: "purple",
      icon: DollarSign
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        border: "border-blue-500",
        text: "text-blue-600",
        icon: "text-blue-500"
      },
      red: {
        border: "border-red-500",
        text: "text-red-600",
        icon: "text-red-500"
      },
      green: {
        border: "border-green-500",
        text: "text-green-600",
        icon: "text-green-500"
      },
      purple: {
        border: "border-purple-500",
        text: "text-purple-600",
        icon: "text-purple-500"
      }
    };
    return colors[color];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const colorClasses = getColorClasses(stat.color);
        const Icon = stat.icon;
        
        return (
          <div key={index} className={`bg-white rounded-lg shadow-sm p-6 border-l-4 ${colorClasses.border}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className={`text-3xl font-bold ${colorClasses.text}`}>{stat.value}</p>
              </div>
              <Icon className={`w-12 h-12 ${colorClasses.icon} opacity-20`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InventoryStats;