import { Page, expect } from '@playwright/test';

export class InicioPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async abrirDemoBlaze(): Promise<void> {
    if (!process.env.URL) {
      throw new Error('La variable de entorno URL no está definida');
    }
    await this.page.goto(process.env.URL);
  }

  async seleccionarCategoria(nombre: string): Promise<void> {
    
    await this.page.getByRole('link', { name: nombre }).click();
     
  }

  async irADetalleProducto(nombre: string): Promise<void> {

    await this.page.getByRole('link', { name: nombre }).click();
    await this.page
  }

  


}