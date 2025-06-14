// Servicio para manejar los datos de los reportes
export const getDataForPeriod = (period) => {
  const data = {
    today: {
      metrics: [
        { 
          title: "Total Ventas", 
          value: "S/ 4121.50", 
          secondaryValue: "+12% vs ayer", 
          variant: "sales",
          icon: "dollar"
        },
        { 
          title: "Total Pedidos", 
          value: "188", 
          secondaryValue: "+8% vs ayer", 
          variant: "orders",
          icon: "orders"
        },
        { 
          title: "Ticket Promedio", 
          value: "S/ 21.92", 
          secondaryValue: "+5% vs ayer", 
          variant: "average",
          icon: "average"
        },
        { 
          title: "Mesas Atendidas", 
          value: "68", 
          secondaryValue: "85% ocupación", 
          variant: "tables",
          icon: "tables"
        }
      ],
      salesByHour: [
        { hour: "12:00", amount: "S/ 150.50", orders: 8 },
        { hour: "13:00", amount: "S/ 280.75", orders: 15 },
        { hour: "14:00", amount: "S/ 420.25", orders: 22 },
        { hour: "15:00", amount: "S/ 195.00", orders: 12 },
        { hour: "16:00", amount: "S/ 310.80", orders: 18 },
        { hour: "17:00", amount: "S/ 245.60", orders: 14 }
      ],
      popularProducts: [
        { 
          name: "Arroz Chaufa de Pollo", 
          units: 45, 
          total: "S/ 810.00", 
          average: "S/ 18.00 promedio" 
        },
        { 
          name: "Tallarín Saltado de Carne", 
          units: 38, 
          total: "S/ 760.00", 
          average: "S/ 20.00 promedio" 
        },
        { 
          name: "Pollo Chi Jau Kay", 
          units: 32, 
          total: "S/ 800.00", 
          average: "S/ 25.00 promedio" 
        }
      ],
      salesTypes: [
        { name: "Para llevar", orders: 85, amount: 1250.50, total: "S/ 1250.50" },
        { name: "Mesa", orders: 68, amount: 1890.75, total: "S/ 1890.75" },
        { name: "Delivery", orders: 35, amount: 980.25, total: "S/ 980.25" }
      ]
    },
    week: {
      metrics: [
        { 
          title: "Total Ventas", 
          value: "S/ 28849.50", 
          secondaryValue: "+18% vs sem. anterior", 
          variant: "sales",
          icon: "dollar"
        },
        { 
          title: "Total Pedidos", 
          value: "1316", 
          secondaryValue: "+12% vs sem. anterior", 
          variant: "orders",
          icon: "orders"
        },
        { 
          title: "Ticket Promedio", 
          value: "S/ 21.92", 
          secondaryValue: "+3% vs sem. anterior", 
          variant: "average",
          icon: "average"
        },
        { 
          title: "Mesas Atendidas", 
          value: "476", 
          secondaryValue: "82% ocupación promedio", 
          variant: "tables",
          icon: "tables"
        }
      ],
      salesByHour: [
        { hour: "12:00", amount: "S/ 1053.50", orders: 56 },
        { hour: "13:00", amount: "S/ 1965.25", orders: 105 },
        { hour: "14:00", amount: "S/ 2941.75", orders: 154 },
        { hour: "15:00", amount: "S/ 1365.00", orders: 84 },
        { hour: "16:00", amount: "S/ 2175.60", orders: 126 },
        { hour: "17:00", amount: "S/ 1719.20", orders: 98 }
      ],
      popularProducts: [
        { 
          name: "Arroz Chaufa de Pollo", 
          units: 315, 
          total: "S/ 5670.00", 
          average: "S/ 18.00 promedio" 
        },
        { 
          name: "Tallarín Saltado de Carne", 
          units: 266, 
          total: "S/ 5320.00", 
          average: "S/ 20.00 promedio" 
        },
        { 
          name: "Pollo Chi Jau Kay", 
          units: 224, 
          total: "S/ 5600.00", 
          average: "S/ 25.00 promedio" 
        }
      ],
      salesTypes: [
        { name: "Para llevar", orders: 595, amount: 8754.50, total: "S/ 8754.50" },
        { name: "Mesa", orders: 476, amount: 13235.25, total: "S/ 13235.25" },
        { name: "Delivery", orders: 245, amount: 6861.75, total: "S/ 6861.75" }
      ]
    },
    month: {
      metrics: [
        { 
          title: "Total Ventas", 
          value: "S/ 123456.00", 
          secondaryValue: "+22% vs mes anterior", 
          variant: "sales",
          icon: "dollar"
        },
        { 
          title: "Total Pedidos", 
          value: "5632", 
          secondaryValue: "+15% vs mes anterior", 
          variant: "orders",
          icon: "orders"
        },
        { 
          title: "Ticket Promedio", 
          value: "S/ 21.92", 
          secondaryValue: "+6% vs mes anterior", 
          variant: "average",
          icon: "average"
        },
        { 
          title: "Mesas Atendidas", 
          value: "2040", 
          secondaryValue: "80% ocupación promedio", 
          variant: "tables",
          icon: "tables"
        }
      ],
      salesByHour: [
        { hour: "12:00", amount: "S/ 4512.00", orders: 240 },
        { hour: "13:00", amount: "S/ 8421.50", orders: 450 },
        { hour: "14:00", amount: "S/ 12608.25", orders: 660 },
        { hour: "15:00", amount: "S/ 5850.00", orders: 360 },
        { hour: "16:00", amount: "S/ 9324.00", orders: 540 },
        { hour: "17:00", amount: "S/ 7362.40", orders: 420 }
      ],
      popularProducts: [
        { 
          name: "Arroz Chaufa de Pollo", 
          units: 1350, 
          total: "S/ 24300.00", 
          average: "S/ 18.00 promedio" 
        },
        { 
          name: "Tallarín Saltado de Carne", 
          units: 1140, 
          total: "S/ 22800.00", 
          average: "S/ 20.00 promedio" 
        },
        { 
          name: "Pollo Chi Jau Kay", 
          units: 960, 
          total: "S/ 24000.00", 
          average: "S/ 25.00 promedio" 
        }
      ],
      salesTypes: [
        { name: "Para llevar", orders: 2548, amount: 37536.50, total: "S/ 37536.50" },
        { name: "Mesa", orders: 2040, amount: 56721.00, total: "S/ 56721.00" },
        { name: "Delivery", orders: 1044, amount: 29198.50, total: "S/ 29198.50" }
      ]
    }
  };
  return data[period];
};

// Datos estáticos para resumen operativo y análisis financiero
export const getOperationalSummary = () => [
  { label: "Primer Pedido", value: "11:30 AM" },
  { label: "Último Pedido", value: "21:45 PM" },
  { label: "Tiempo Promedio Preparación", value: "12 minutos" },
  { label: "Pedidos Cancelados", value: "3" },
  { label: "Satisfacción Cliente", value: "4.8/5", isHighlight: true }
];

export const getFinancialAnalysis = () => [
  { label: "Ingresos Brutos", value: "S/ 4121.50" },
  { label: "Costo de Ingredientes", value: "S/ 1236.45" },
  { label: "Margen Bruto", value: "70%", isHighlight: true },
  { label: "Propinas", value: "S/ 245.80" },
  { label: "Ganancia Neta", value: "S/ 2885.05", isProfit: true }
];