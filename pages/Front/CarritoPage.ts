import { Page, expect } from "@playwright/test";

export class CarritoPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async validarPrecioProducto(
    nombre: string,
    precioEsperado: number
  ): Promise<void> {
    const filaProducto = this.page.locator("tr", {
      has: this.page.locator("td", { hasText: nombre }),
    });

    await expect(filaProducto).toBeVisible();

    const precioEnCarrito = Number(
      await filaProducto.locator("td").nth(2).innerText()
    );

    expect(precioEnCarrito).toBe(precioEsperado);
  }

  async abrirModalCompra(): Promise<void> {
    await this.page.getByRole("button", { name: "Place Order" }).click();
  }

  async llenarFormularioCompra(datos: {
    nombre: string;
    pais: string;
    ciudad: string;
    tarjeta: string;
    mes: string;
    año: string;
  }): Promise<void> {
    await this.page.fill("#name", datos.nombre);
    await this.page.fill("#country", datos.pais);
    await this.page.fill("#city", datos.ciudad);
    await this.page.fill("#card", datos.tarjeta);
    await this.page.fill("#month", datos.mes);
    await this.page.fill("#year", datos.año);
    await this.page.getByRole("button", { name: "Purchase" }).click();

  }

  async validarCompraExitosa(precioEsperado: number): Promise<void> {
    const modal = this.page.locator(".sweet-alert");

    await expect(modal).toBeVisible();
    await expect(modal.getByText("Thank you for your purchase!")).toBeVisible();

    const texto = await modal.locator("p").innerText();
    const match = texto.match(/Amount:\s*(\d+)/);

    if (!match) {
      throw new Error("No se encontró el monto en el modal");
    }

    expect(Number(match[1])).toBe(precioEsperado);
  }

  async validarProductoEnCarrito(nombre: string): Promise<void> {
    const producto = this.page.locator('td', { hasText: nombre });
    await expect(producto).toBeVisible();
  }

  async validarTotal(totalEsperado: number): Promise<void> {
    const totalTexto = await this.page.locator('#totalp').innerText();
    const totalActual = Number(totalTexto);
  
    expect(totalActual).toBe(totalEsperado);
  }

  async eliminarProducto(nombre: string): Promise<void> {
    const filaProducto = this.page.locator('tr', { hasText: nombre });
    await filaProducto.getByRole('link', { name: 'Delete' }).click();
  }

  async validarCarritoVacio(): Promise<void> {
    const filas = this.page.locator('#tbodyid tr');
    await expect(filas).toHaveCount(0);
  }

  async botonComprar(): Promise<void> {
    await this.page.getByRole("button", { name: "Purchase" }).click();
  }


}
