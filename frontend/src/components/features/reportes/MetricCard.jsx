import React from 'react';
import { DollarSign, FileText, Calculator, Users } from 'lucide-react';

const MetricCard = ({ title, value, secondaryValue, variant = 'default', icon }) => {
  const getIcon = () => {
    switch (icon) {
      case 'dollar':
        return <DollarSign className="text-green-600" size={20} />;
      case 'orders':
        return <FileText className="text-blue-600" size={20} />;
      case 'average':
        return <Calculator className="text-purple-600" size={20} />;
      case 'tables':
        return <Users className="text-orange-600" size={20} />;
      default:
        return null;
    }
  };

  const getBorderColor = () => {
    switch (variant) {
      case 'sales':
        return 'border-l-green-500';
      case 'orders':
        return 'border-l-blue-500';
      case 'average':
        return 'border-l-purple-500';
      case 'tables':
        return 'border-l-orange-500';
      default:
        return 'border-l-gray-300';
    }
  };

  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm border-l-4 ${getBorderColor()}`}>
      <div className="flex items-center justify-between mb-2">
        {getIcon()}
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {secondaryValue && (
            <p className="text-sm text-gray-500 mt-1">{secondaryValue}</p>
          )}
        </div>
      </div>
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
    </div>
  );
};

export default MetricCard;