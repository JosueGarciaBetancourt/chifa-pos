export function seed(db) {
  console.log('[SEEDER] Insertando detalles_pedidos...');

  const stmt = db.prepare(`
    INSERT INTO detalles_pedidos (
      id, pedido_id, producto_id, cantidad, precio_unitario, estado_id, observaciones
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const detalles_pedidos = [
    [1, 1, 1, 2, 25.0, 1, 'Sin cebolla'],
    [2, 1, 36, 3, 5.0, 1, null],
    [3, 1, 50, 1, 1.5, 1, null],
    [4, 2, 3, 1, 22.0, 1, null],
    [5, 2, 8, 1, 28.0, 1, null],
    [6, 2, 37, 2, 5.0, 1, null],
    [7, 2, 50, 1, 1.5, 1, null],
    [8, 3, 2, 1, 18.0, 1, null],
    [9, 3, 4, 1, 20.0, 1, null],
    [10, 3, 48, 1, 4.0, 1, null],
    [11, 4, 6, 1, 45.0, 1, null],
    [12, 4, 7, 1, 21.0, 1, null],
    [13, 4, 40, 1, 8.0, 1, null],
    [14, 4, 41, 1, 7.0, 1, null],
    [15, 4, 47, 2, 3.0, 1, null],
    [16, 4, 50, 2, 1.5, 1, null],
    [17, 5, 5, 2, 22.0, 1, null],
    [18, 5, 27, 1, 15.0, 1, null],
    [19, 5, 45, 2, 12.0, 1, null],
    [20, 5, 38, 4, 3.0, 1, null],
    [21, 5, 50, 3, 1.5, 1, null],
    [22, 6, 1, 2, 25.0, 1, null],
    [23, 6, 7, 1, 21.0, 1, null],
    [24, 6, 40, 1, 8.0, 1, null],
    [25, 6, 50, 2, 1.5, 1, null],
    [26, 7, 3, 1, 22.0, 1, null],
    [27, 7, 8, 1, 28.0, 1, null],
    [28, 7, 50, 1, 2.5, 1, 'Extra salsa'],
    [29, 8, 20, 1, 12.0, 1, null],
    [30, 8, 21, 1, 12.0, 1, null],
    [31, 8, 36, 1, 5.0, 1, null],
    [32, 8, 50, 1, 1.5, 1, null],
    [33, 9, 6, 2, 45.0, 1, 'Con piel crocante'],
    [34, 9, 50, 2, 1.5, 1, null],
    [35, 9, 40, 1, 8.0, 1, null],
    [36, 9, 41, 1, 7.0, 1, null],
    [37, 10, 3, 1, 22.0, 1, null],
    [38, 10, 4, 1, 20.0, 1, null],
    [39, 10, 38, 2, 3.0, 1, null],
    [40, 10, 50, 3, 1.5, 1, null],
    [41, 11, 1, 1, 25.0, 1, 'Con ajo'],
    [42, 11, 2, 1, 18.0, 1, null],
    [43, 11, 50, 1, 2.5, 1, null],
    [44, 12, 5, 2, 22.0, 1, null],
    [45, 12, 36, 2, 5.0, 1, null],
    [46, 12, 50, 2, 1.5, 1, null],
    [47, 13, 3, 2, 22.0, 1, null],
    [48, 13, 50, 1, 12.0, 1, null],
    [49, 13, 41, 1, 7.0, 1, null],
    [50, 13, 50, 2, 1.5, 1, null],
    [51, 14, 22, 2, 12.0, 1, null],
    [52, 14, 36, 1, 5.0, 1, null],
    [53, 14, 50, 1, 1.5, 1, null],
    [54, 15, 1, 1, 25.0, 1, null],
    [55, 15, 3, 1, 22.0, 1, null],
    [56, 15, 8, 1, 28.0, 1, null],
    [57, 15, 36, 2, 5.0, 1, null],
    [58, 15, 37, 2, 5.0, 1, null],
    [59, 15, 50, 2, 1.5, 1, null],
    [60, 16, 6, 1, 45.0, 1, null],
    [61, 16, 7, 1, 21.0, 1, null],
    [62, 16, 50, 2, 1.5, 1, null],
    [63, 17, 3, 1, 22.0, 1, null],
    [64, 17, 4, 1, 20.0, 1, null],
    [65, 17, 38, 2, 3.0, 1, null],
    [66, 17, 50, 2, 1.5, 1, null],
    [67, 18, 21, 1, 12.0, 1, null],
    [68, 18, 20, 1, 12.0, 1, null],
    [69, 18, 50, 1, 1.5, 1, null],
    [70, 18, 36, 1, 5.0, 1, null],
    [71, 18, 37, 1, 8.0, 1, 'Botella grande'],
    [72, 19, 1, 2, 25.0, 1, null],
    [73, 19, 4, 1, 20.0, 1, null],
    [74, 19, 40, 1, 8.0, 1, null],
    [75, 19, 50, 2, 3.0, 1, null],
    [76, 20, 5, 2, 22.0, 1, null],
    [77, 20, 49, 1, 4.0, 1, null],
    [78, 20, 36, 3, 5.0, 1, null],
    [79, 20, 50, 3, 1.5, 1, null],
    [80, 21, 2, 1, 18.0, 1, null],
    [81, 21, 3, 1, 22.0, 1, null],
    [82, 21, 36, 1, 5.0, 1, null],
    [83, 21, 50, 2, 1.5, 1, null],
    [84, 21, 38, 1, 3.0, 1, null],
    [85, 22, 24, 1, 14.0, 1, null],
    [86, 22, 25, 1, 15.0, 1, null],
    [87, 22, 36, 2, 5.0, 1, null],
    [88, 22, 50, 2, 1.5, 1, 'Sin picante'],
    [89, 23, 26, 1, 16.0, 1, null],
    [90, 23, 27, 1, 15.0, 1, null],
    [91, 23, 40, 1, 8.0, 1, null],
    [92, 23, 41, 1, 7.0, 1, null],
    [93, 23, 50, 3, 1.5, 1, null]
  ];

  const insertMany = db.transaction((detalles_pedidos) => {
    for (const dp of detalles_pedidos) {
      try {
        stmt.run(dp);
      } catch (e) {
        console.error('X Error insertando detalle_pedido:', dp, e.message);
        throw e;
      }
    }
  });

  insertMany(detalles_pedidos);
  console.log(`[SEEDER] ${detalles_pedidos.length} detalles_pedidos insertados`);
}
