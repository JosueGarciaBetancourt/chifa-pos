import { useEffect, useState } from 'react';
import { api } from './services/electronAPI';

function App() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('Verificando electronAPI...');

        if (!api) {
          throw new Error('electronAPI no está disponible');
        }

        // Cargar productos de platos principales
        const productosData = await api.getProductosByCategoria('platos_principales');
        console.log('Productos cargados:', productosData);

        setProductos(productosData);

      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">🥢 Menú del Chifa</h1>
        <p>Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">🥢 Menú del Chifa</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p><strong>Error:</strong> {error}</p>
          <p className="text-sm mt-2">Revisa la consola de DevTools para más detalles</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-red-600">🥢 Menú del Chifa</h1>

      <h2 className="text-xl font-semibold mb-4">Platos Principales</h2>

      {productos.length === 0 ? (
        <p className="text-gray-500">No se encontraron productos</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {productos.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg text-gray-800">{item.nombre}</h3>
              {item.descripcion && (
                <p className="text-gray-600 text-sm mt-1">{item.descripcion}</p>
              )}
              <p className="text-red-600 font-bold text-xl mt-2">S/. {item.precio.toFixed(2)}</p>
              <button className="mt-3 w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors cursor-pointer">
                Agregar al Pedido
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 text-center text-gray-500">
        <p>Total de productos: {productos.length}</p>
      </div>
    </div>
  );
}

export default App;
