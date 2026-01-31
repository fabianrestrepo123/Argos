import { test, expect } from "@playwright/test";
import { InicioPage } from "../../../pages/Front/InicioPage";
import { ProductosPage } from "../../../pages/Front/ProductosPage";
import { CarritoPage } from "../../../pages/Front/CarritoPage";

test("ECompra con formulario vacio", async ({ page }) => {
  const inicio = new InicioPage(page);
  const productos = new ProductosPage(page);
  const carrito = new CarritoPage(page);

  await inicio.abrirDemoBlaze();
  await productos.irAlCarrito();
  await carrito.abrirModalCompra();
  await carrito.botonComprar();
  await page.waitForTimeout(10000);


  
});