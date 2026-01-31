import { test, expect } from "@playwright/test"
import { InicioPage } from '../../../pages/Front/InicioPage';
import { ProductosPage } from '../../../pages/Front/ProductosPage';
import { CarritoPage } from '../../../pages/Front/CarritoPage';
test("Compra de múltiples productos exitosa", async ({ page }) => {
  const inicio = new InicioPage(page);
  const productos = new ProductosPage(page);
  const carrito = new CarritoPage(page);

  await inicio.abrirDemoBlaze();
  await inicio.seleccionarCategoria("Monitors");
  await inicio.irADetalleProducto("Apple monitor 24");
  await productos.validarProductoVisible("Apple monitor 24");
  const precioDetalleMonitores = await productos.obtenerPrecioProducto();
  await productos.agregarAlCarrito();
  await productos.inirAlInicio();

  await inicio.seleccionarCategoria("Phones");
  await inicio.irADetalleProducto("Nexus 6");
  await productos.validarProductoVisible("Nexus 6");
  const precioDetalleCelulares = await productos.obtenerPrecioProducto();
  await productos.agregarAlCarrito();
  const totalEsperado = precioDetalleMonitores + precioDetalleCelulares;

  await productos.irAlCarrito();
  await carrito.validarProductoEnCarrito("Apple monitor 24");
  await carrito.validarProductoEnCarrito("Nexus 6");
  await carrito.validarTotal(totalEsperado);

  await carrito.abrirModalCompra();
  await carrito.llenarFormularioCompra({
    nombre: "Fabian",
    pais: "Colombia",
    ciudad: "Medellín",
    tarjeta: "4111111111111111",
    mes: "05",
    año: "1997",
  })
  await carrito.validarCompraExitosa(totalEsperado);



});
