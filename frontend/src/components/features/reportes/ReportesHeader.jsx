import React from "react";
import { ArrowLeft, BarChart3, Download } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate de React Router

const ReportesHeader = ({ selectedPeriod, onPeriodChange }) => {
  const navigate = useNavigate(); // Usa el hook useNavigate para obtener la función de navegación

  const periods = [
    { key: "today", label: "Hoy" },
    { key: "week", label: "Esta Semana" },
    { key: "month", label: "Mes" },
  ];

  const handleBackClick = () => {
    navigate("/"); // Redirige al dashboard
  };

  return (
    <div className="bg-indigo-600 text-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBackClick}
            className="flex items-center gap-2 hover:bg-indigo-700 px-3 py-2 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="flex items-center gap-3">
            <BarChart3 size={24} />
            <h1 className="text-xl font-semibold">Reportes - Chifa Imperio</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-indigo-700 rounded-lg p-1">
            {periods.map((period) => (
              <button
                key={period.key}
                onClick={() => onPeriodChange(period.key)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  selectedPeriod === period.key
                    ? "bg-white text-indigo-600 font-medium"
                    : "text-indigo-200 hover:text-white"
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 bg-indigo-700 hover:bg-indigo-800 px-4 py-2 rounded-lg transition-colors">
            <Download size={16} />
            <span className="text-sm">Exportar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportesHeader;
