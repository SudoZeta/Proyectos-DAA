# Gestor de Solicitudes

![Made by Vercel](https://img.shields.io/badge/Made%20by-Vercel-black?logo=vercel)
![Framework](https://img.shields.io/badge/Framework-Next.js-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Yes-blue?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-LTS-green?logo=node.js)
![Architecture](https://img.shields.io/badge/Architecture-3%20Layers-blue)
![Approach](https://img.shields.io/badge/Approach-Serverless-purple)
![Status](https://img.shields.io/badge/Status-En%20desarrollo-yellow)
![License](https://img.shields.io/badge/License-MIT-brightgreen)

Plataforma web desarrollada con **Next.js** para la gestión de solicitudes de soporte, permisos y requerimientos.
Este proyecto forma parte de un ejercicio académico orientado al diseño y desarrollo de aplicaciones web modernas bajo una **arquitectura de tres capas** y un **enfoque serverless**.

---

## Descripción del proyecto

El **Gestor de Solicitudes** tiene como objetivo proporcionar una base funcional para que los usuarios puedan:

* Registrar solicitudes de soporte o requerimientos.
* Consultar el estado de sus solicitudes.
* Gestionar solicitudes según roles definidos.
* Comprender la estructura de una aplicación web moderna con separación de responsabilidades.

El proyecto se desarrolla de manera incremental, comenzando con el **diseño y construcción del frontend base**.

---

## Alcance

* Frontend base con navegación
* Pantallas de autenticación:

  * Inicio de sesión (Login)
  * Registro de usuarios
* Pantallas iniciales para gestión de solicitudes
* Implementación de arquitectura de tres capas:

  * Presentación
  * Lógica de negocio
  * Acceso a datos (preparado para servicios)
* Enfoque serverless para futuras integraciones

---

## Tecnologías utilizadas

* **Next.js**
* **React**
* **TypeScript**
* **Node.js**

---

## Estado del proyecto

**Semana 1 – Diseño y Frontend base**

* Estructura inicial del proyecto
* Configuración del entorno
* Definición de rutas y páginas
* Componentes base de la interfaz
* Preparación para integración con servicios backend

---

## Requisitos previos

Antes de ejecutar el proyecto, asegúrate de contar con:

* Node.js (versión LTS recomendada)
* Un gestor de paquetes:

  * npm
  * o yarn / pnpm / bun
* Un editor de código (recomendado: Visual Studio Code)

---

## Creación del proyecto con Next.js

Este proyecto fue inicializado utilizando el generador oficial de Next.js:

* [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app)

Ejemplo de comando utilizado:

```bash
npx create-next-app@latest gestor-solicitudes
```

Durante la configuración inicial se recomienda:

* TypeScript: Sí
* App Router: Sí
* ESLint: Sí

---

## Instalación de dependencias

Una vez descargado el proyecto, ubícate en la carpeta raíz y ejecuta:

```bash
npm install
```

También puedes usar otros gestores de paquetes:

```bash
yarn install
pnpm install
bun install
```

---

## Ejecución del servidor de desarrollo

Para levantar el servidor en entorno local, ejecuta:

```bash
npm run dev
```

O bien:

```bash
yarn dev
pnpm dev
bun dev
```

Luego abre tu navegador y accede a la siguiente dirección:

```
http://localhost:3000
```

La aplicación se actualizará automáticamente al realizar cambios en el código.

---

## Estructura básica del proyecto

El archivo principal de inicio se encuentra en:

```
app/page.tsx
```

Desde este archivo se construye la vista principal y se integran los componentes del sistema.
La estructura está pensada para facilitar la separación entre vistas, lógica y servicios.

---

## Arquitectura del proyecto

El proyecto sigue el modelo de **tres capas**:

* **Capa de presentación**
  Componentes y páginas desarrolladas con React y Next.js.

* **Capa de lógica de negocio**
  Manejo de reglas, validaciones y flujos de la aplicación (preparada para APIs).

* **Capa de datos**
  Preparada para consumir servicios serverless o bases de datos no relacionales.

---

## Recursos de aprendizaje

* Documentación oficial de Next.js
  [https://nextjs.org/docs](https://nextjs.org/docs)

* Tutorial interactivo de Next.js
  [https://nextjs.org/learn](https://nextjs.org/learn)

* Repositorio oficial de Next.js
  [https://github.com/vercel/next.js](https://github.com/vercel/next.js)

---

## Despliegue

La forma recomendada de desplegar una aplicación Next.js es utilizando **Vercel**, plataforma optimizada para este framework.

Más información en:
[https://nextjs.org/docs/app/building-your-application/deploying](https://nextjs.org/docs/app/building-your-application/deploying)

---

## Notas finales

Este repositorio sirve como **base de desarrollo** y será extendido progresivamente conforme avance el proyecto, incorporando autenticación, servicios backend y persistencia de datos.
