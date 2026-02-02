# QA Automation – Frontend (E2E) & Backend (API)

##  Descripción del proyecto

Este repositorio contiene una solución de automatización de pruebas para **Frontend (E2E)** y **Backend (API)**, diseñada para garantizar la calidad de flujos críticos de negocio, especialmente el proceso de compra de productos y la estabilidad de los servicios backend.

El objetivo principal es detectar fallos de forma temprana (shift-left testing), reducir riesgos en producción y garantizar la estabilidad tanto de la capa UI como de los servicios backend.

La solución fue desarrollada pensando en mantenibilidad, escalabilidad y fácil integración en CI/CD, siguiendo buenas prácticas de automatización.

---

##  Tecnologías utilizadas

- **Playwright**: Framework de automatización para pruebas E2E y API.
- **TypeScript**: Tipado estático para mejorar mantenibilidad y detección temprana de errores.
- **Node.js**: Runtime de ejecución.
- **Page Object Model (POM)**: Patrón de diseño para desacoplar lógica de pruebas y UI.
- **GitHub Actions**: Integración continua para ejecución automática de pruebas.
- **dotenv**: Manejo de variables de entorno por ambiente.

## Como ejecutar el proyecto

# Requisitos

- node.JS mayor a la version 18
- npm
- git
  
## Clonar repositorio
- git clone https://github.com/fabianrestrepo123/Argos.git
- 
## Instalar dependencias
- npm install
 Instalar los navegadores requeridos por Playwright para la automatizacion
- npx playwright install

## Para la ejecucion de las pruebas APIs
- npx playwright test tests/specs/APIs
## Para la ejecucion de las pruebas Front
- npx playwright test tests/specs/E2E
Para ejectuar los spect de forma indivudal, dejo el ejemploo :
- npx playwright test tests/specs/E2E/CarritoPersistencia.spec.ts
## Para ejectuar todas la suites
- npx playwright test tests/specs/E2E/CarritoPersistencia.spec.ts
## Despues de cada ejecucion en Playwright este genera un reporte HTML, para abrirlo colocamos el siguiente comando:
-npx playwright show-report


