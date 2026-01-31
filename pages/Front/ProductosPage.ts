import { Page, expect } from '@playwright/test';

export class ProductosPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async validarProductoVisible(nombre: string) {
    await expect(this.page.getByRole('heading', { name: nombre })).toBeVisible();
  }
  
  async agregarAlCarrito() {
    await this.page.getByRole('link', { name: 'Add to cart' }).click();
    
  }

  async irAlCarrito() {
    await this.page.getByRole('link', { name: 'Cart' }).nth(0).click();
    await this.page.on('dialog', dialog => dialog.accept());
  }

  async obtenerPrecioProducto(): Promise<number> {
    const priceLocator = this.page.locator('.price-container');
  
    await expect(priceLocator).toBeVisible();
  
    const textoPrecio = await priceLocator.innerText();
    const match = textoPrecio.match(/\d+/);
  
    if (!match) {
      throw new Error(`No se pudo obtener el precio desde: ${textoPrecio}`);
    }
  
    return Number(match[0]);
  }

  async inirAlInicio() {
    await this.page.getByRole('link', { name: 'Home ' }).click();
  }

}