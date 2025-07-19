import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import productosUnifiedService from '../services/productosUnifiedService';

const VentaForm = () => {

  
  const [busqueda, setBusqueda] = useState("");
  const [productos, setProductos] = useState([]);

  const buscarProducto = async () => {
    try {
      const resultados = await productosUnifiedService.buscarProductosPorNombre(busqueda);
      console.log("BD buscarProductosPorNombre:", resultados);
      setProductos(resultados);
    } catch (error) {
      console.error("Error al buscar productos:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Buscador y productos */}
      <div className="col-span-2 space-y-4">
        {/* Buscar Producto */}
        <div className="bg-white p-4 border rounded">
          <h3 className="text-lg font-bold text-blue-800 mb-2">Buscar Producto</h3>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Ingrese Nombre del Producto"
              className="w-full"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <Button onClick={buscarProducto}>Buscar</Button>

          </div>
          <div className="overflow-auto max-h-48 border p-2">
            <table className="w-full text-sm">
              <thead className="text-gray-600">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {productos.length > 0 ? (
                  productos.map((prod) => (
                    <tr key={prod.id}>
                      <td>{prod.id}</td>
                      <td>{prod.nombre}</td>
                      <td>{prod.descripcion}</td>
                      <td>{prod.precio}</td>
                    </tr>
                  ))
                ) : (
                  <tr className="text-center text-gray-500">
                    <td colSpan="4">Sin resultados</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lista de Pedido */}
        <div className="bg-white p-4 border rounded">
          <h3 className="text-lg font-bold text-blue-800 mb-4">Productos en el Pedido</h3>
          <div className="overflow-auto max-h-60">
            <table className="w-full text-sm mb-4">
              <thead className="text-gray-600">
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Cantidad</th>
                  <th>Unitario</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center text-gray-500">
                  <td colSpan="5">Sin productos agregados</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Totales */}
        <div className="bg-white p-4 border rounded">
          <h3 className="text-lg font-bold text-blue-800 mb-2">Totales</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm">Subtotal</label>
              <Input value="S/ 0.00" readOnly disabled className="bg-gray-100" />
            </div>
            <div>
              <label className="block text-sm">Descuento</label>
              <Input value="S/ 0.00" readOnly disabled className="bg-gray-100" />
            </div>
            <div>
              <label className="block text-sm font-semibold">Total</label>
              <Input value="S/ 0.00" readOnly disabled className="bg-gray-100 font-bold" />
            </div>
          </div>
        </div>
      </div>

      {/* Panel lateral */}
      <div className="space-y-4">
        <div className="bg-white p-4 border rounded">
          <h3 className="text-lg font-bold text-blue-800 mb-2">Comprobante de Venta</h3>
          <p className="text-sm">R.U.C. 20603417985</p>
          <div className="mt-2">
            <label className="block text-sm text-gray-600">Nº</label>
            <Input value="28" readOnly className="bg-gray-100" />
          </div>
          <div className="mt-2">
            <label className="block text-sm text-gray-600">Usuario</label>
            <Input value="Israel Garcia" readOnly className="bg-gray-100" />
          </div>
        </div>

        <div className="bg-white p-4 border rounded">
          <h3 className="text-lg font-bold text-blue-800 mb-2">Cantidad</h3>
          <Input placeholder="Ingrese Cantidad" />
          <Button className="mt-2 w-full">Agregar Producto</Button>
        </div>

        <div className="bg-white p-4 border rounded">
          <h3 className="text-lg font-bold text-blue-800 mb-2">Método de Pago</h3>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" name="pago" /> Yape
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="pago" defaultChecked /> Efectivo
            </label>
          </div>
          <Button className="mt-4 w-full">Realizar Venta</Button>
        </div>
      </div>
    </div>
  );
};

export default VentaForm;
