import React from 'react';
import { Clock } from 'lucide-react';

const PeakNote = ({ timeRange, note }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-l-red-500">
      <div className="flex items-center justify-between mb-2">
        <Clock className="text-red-600" size={20} />
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">{timeRange}</p>
          <p className="text-sm text-gray-500 mt-1">{note}</p>
        </div>
      </div>
      <h3 className="text-sm font-medium text-gray-600">Hora Pico</h3>
    </div>
  );
};

export default PeakNote;