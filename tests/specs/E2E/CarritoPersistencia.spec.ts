import { test, expect } from "@playwright/test"
import { InicioPage } from '../../../pages/Front/InicioPage';
import { ProductosPage } from '../../../pages/Front/ProductosPage';
import { CarritoPage } from '../../../pages/Front/CarritoPage';

test("Persistencia del carrito con múltiples productos y recarga", async ({ page }) => {
  const inicio = new InicioPage(page);
  const productos = new ProductosPage(page);
  const carrito = new CarritoPage(page);

  await inicio.abrirDemoBlaze();
  await inicio.seleccionarCategoria("Monitors");
  
  await inicio.irADetalleProducto("Apple monitor 24");
  await productos.validarProductoVisible("Apple monitor 24");
  const precioDetalleMonitores = await productos.obtenerPrecioProducto();
  await productos.agregarAlCarrito();
  await page.reload();
  await productos.inirAlInicio();

  await inicio.seleccionarCategoria("Phones");
  await inicio.irADetalleProducto("Nexus 6");
  await productos.validarProductoVisible("Nexus 6");
  const precioDetalleCelulares = await productos.obtenerPrecioProducto();
  await productos.agregarAlCarrito();
  await page.reload();
  await productos.inirAlInicio();

  await inicio.seleccionarCategoria("Laptops");
  await inicio.irADetalleProducto("MacBook air");
  await productos.validarProductoVisible("MacBook air");
  const precioDetalleLaptops= await productos.obtenerPrecioProducto();
  await productos.agregarAlCarrito();
  await page.reload();
  const totalEsperado = precioDetalleMonitores + precioDetalleCelulares + precioDetalleLaptops;

  await productos.irAlCarrito();
  await carrito.validarProductoEnCarrito("Apple monitor 24");
  await carrito.validarProductoEnCarrito("Nexus 6");
  await carrito.validarProductoEnCarrito("MacBook air");
  await carrito.validarTotal(totalEsperado);
  
});
