import React from 'react';
import { Search } from 'lucide-react';

const InventoryFilters = ({ 
  tipos, 
  selectedTipo, 
  setSelectedTipo, 
  searchTerm, 
  setSearchTerm 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar insumos..."
            className="min-w-[200px] w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Tipo Filters */}
        <div className="flex flex-wrap gap-2">
          {tipos.map((tipo) => (
            <button
              key={tipo}
              onClick={() => setSelectedTipo(tipo)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedTipo === tipo
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tipo}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InventoryFilters;