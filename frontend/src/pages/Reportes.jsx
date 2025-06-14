import React, { useState } from 'react';
import ReportesHeader from '../components/features/reportes/ReportesHeader';
import MetricCard from '../components/features/reportes/MetricCard';
import PeakNote from '../components/features/reportes/PeakNote';
import ReportTabs from '../components/features/reportes/ReportTabs';
import SalesByHour from '../components/features/reportes/SalesByHour';
import PopularProducts from '../components/features/reportes/PopularProducts';
import SalesTypes from '../components/features/reportes/SalesTypes';
import DayDetails from '../components/features/reportes/DayDetails';
import { getDataForPeriod, getOperationalSummary, getFinancialAnalysis } from '../services/dataService';

const Reportes = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [activeTab, setActiveTab] = useState('sales-by-hour');

  // Obtener datos según el período seleccionado
  const currentData = getDataForPeriod(selectedPeriod);
  const operationalSummary = getOperationalSummary();
  const financialAnalysis = getFinancialAnalysis();

  // Función para manejar cambios de período
  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  // Función para manejar cambios de pestaña
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Función para obtener la hora pico
  const getPeakHour = () => {
    if (!currentData?.salesByHour) return { hour: '14:00', amount: 'S/ 420.25' };
    
    const peakSale = currentData.salesByHour.reduce((max, sale) => {
      const currentAmount = parseFloat(sale.amount.replace('S/ ', '').replace(',', ''));
      const maxAmount = parseFloat(max.amount.replace('S/ ', '').replace(',', ''));
      return currentAmount > maxAmount ? sale : max;
    });
    
    return peakSale;
  };

  // Renderizar contenido principal según la pestaña activa
  const renderMainContent = () => {
    switch (activeTab) {
      case 'sales-by-hour':
        return (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Ventas por Hora</h3>
              <p className="text-sm text-gray-500">Distribución de ventas durante el día</p>
            </div>
            <div className="p-6">
              <div className="space-y-2">
                {currentData.salesByHour.map((sale, index) => (
                  <SalesByHour 
                    key={index} 
                    hour={sale.hour} 
                    amount={sale.amount} 
                    orders={sale.orders} 
                  />
                ))}
              </div>
            </div>
          </div>
        );
      case 'popular-products':
        return <PopularProducts products={currentData.popularProducts} />;
      case 'sales-types':
        return <SalesTypes salesTypes={currentData.salesTypes} />;
      case 'day-details':
        return (
          <DayDetails 
            operationalSummary={operationalSummary} 
            financialAnalysis={financialAnalysis} 
          />
        );
      default:
        return (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Ventas por Hora</h3>
              <p className="text-sm text-gray-500">Distribución de ventas durante el día</p>
            </div>
            <div className="p-6">
              <div className="space-y-2">
                {currentData.salesByHour.map((sale, index) => (
                  <SalesByHour 
                    key={index} 
                    hour={sale.hour} 
                    amount={sale.amount} 
                    orders={sale.orders} 
                  />
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  // Renderizar sidebar con métricas
  const renderSidebar = () => {
    const peakHour = getPeakHour();
    
    return (
      <div className="space-y-6">
        {/* Métricas principales */}
        <div className="grid grid-cols-1 gap-4">
          {currentData.metrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              secondaryValue={metric.secondaryValue}
              variant={metric.variant}
              icon={metric.icon}
            />
          ))}
        </div>

        {/* Nota de hora pico */}
        <PeakNote 
          timeRange={peakHour.hour}
          note={`Ventas máximas: ${peakHour.amount}`}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <ReportesHeader 
        selectedPeriod={selectedPeriod}
        onPeriodChange={handlePeriodChange}
      />

      {/* Contenido principal */}
      <div className="w-full h-screen px-4 py-6">
        <div className="flex gap-8">
          {/* Sidebar con métricas */}
          <div className="w-80 flex-shrink-0">
            {renderSidebar()}
          </div>

          {/* Contenido principal */}
          <div className="flex-1">
            {/* Pestañas */}
            <ReportTabs 
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />

            {/* Contenido dinámico */}
            {renderMainContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reportes;