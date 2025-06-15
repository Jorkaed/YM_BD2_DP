const { Client } = require('pg');

const ventas = [
  {
    idusuario: 3,
    idbolsa: 1,
    productos: [
      { idinventario: 1, cantidad: 2 },
      { idinventario: 5, cantidad: 1 }
    ],
    idestado: 1
  },
  {
    idusuario: 3,
    idbolsa: 2,
    productos: [
      { idinventario: 12, cantidad: 1 },
      { idinventario: 18, cantidad: 3 }
    ],
    idestado: 2
  },
  {
    idusuario: 3,
    idbolsa: 3,
    productos: [
      { idinventario: 25, cantidad: 2 },
      { idinventario: 30, cantidad: 1 },
      { idinventario: 35, cantidad: 1 }
    ],
    idestado: 2
  }
];

(async () => {
  const cliente = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'ymdb',
    password: '123456',
    port: 5432
  });

  try {
    await cliente.connect();

    for (const venta of ventas) {
      try {
        // Crear bolsa
        const queryBolsa = `
          INSERT INTO bolsas (idusuario, idestado)
          VALUES ($1, $2)
          RETURNING idbolsa;
        `;

        const resBolsa = await cliente.query(queryBolsa, [venta.idusuario, venta.idestado]);
        const idbolsa = resBolsa.rows[0].idbolsa;

        // Insertar productos en la bolsa
        for (const producto of venta.productos) {
          const queryProductoBolsa = `
            INSERT INTO productos_bolsa (idbolsa, idinventario, cantidad, idestado)
            VALUES ($1, $2, $3, $4);
          `;

          await cliente.query(queryProductoBolsa, [
            idbolsa,
            producto.idinventario,
            producto.cantidad,
            venta.idestado
          ]);
        }

        // Solo insertar la venta si el idestado es 0
        if (venta.idestado === 2) {
          const queryVenta = `
            INSERT INTO ventas (idusuario, idbolsa)
            VALUES ($1, $2);
          `;

          await cliente.query(queryVenta, [venta.idusuario, idbolsa]); // Aquí puedes usar 1 si es estado 'Pagada' o lo que aplique
        }

        console.log(`✅ Venta creada para usuario ${venta.idusuario} con bolsa ${idbolsa}`);
      } catch (err) {
        console.error(`❌ Error en venta para usuario ${venta.idusuario}:`, err.message);
      }
    }
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error.message);
  } finally {
    await cliente.end();
    console.log('🔒 Conexión cerrada.');
  }
})();

