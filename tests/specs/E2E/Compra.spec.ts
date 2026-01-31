import { test, expect } from "@playwright/test"
import { InicioPage } from '../../../pages/Front/InicioPage';
import { ProductosPage } from '../../../pages/Front/ProductosPage';
import { CarritoPage } from '../../../pages/Front/CarritoPage';




test("Compra de un producto exitosa", async ({ page }) => {
  const inicio = new InicioPage(page);
  const productos = new ProductosPage(page);
  const carrito = new CarritoPage(page);

  await inicio.abrirDemoBlaze();
  await inicio.seleccionarCategoria("Laptops");
  await inicio.irADetalleProducto("MacBook Pro");

  await productos.validarProductoVisible("MacBook Pro");
  const precioDetalle = await productos.obtenerPrecioProducto();
  await productos.agregarAlCarrito();
  await productos.irAlCarrito();

  await carrito.validarPrecioProducto("MacBook Pro", precioDetalle);
  await carrito.abrirModalCompra();

  await carrito.llenarFormularioCompra({
    nombre: "Fabian",
    pais: "Colombia",
    ciudad: "Medellín",
    tarjeta: "4111111111111111",
    mes: "05",
    año: "1997",
  })
  await carrito.validarCompraExitosa(precioDetalle);
});
