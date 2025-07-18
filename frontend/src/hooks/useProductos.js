import { useEffect, useState } from "react";

export default function useProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.electronAPI
      .getProductos()
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error al cargar productos:", err))
      .finally(() => setLoading(false));
  }, []);

  return { productos, loading };
}
