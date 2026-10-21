# Práctica de laboratorio · Web Components: Side B

Programación Integrativa de Componentes Web · Unidad 1: Web Components

| Dato | Completa |
|---|---|
| Emprendimiento | Side B (Venta de Discos de Vinilo) |
| Estudiantes (Apellido Nombre) | Jhaldry Peñaherrera, Diego Pinto, Israel Segovia, Santiago Nogales |
| NRC | 36642 |
| Fecha | 20 de Octubre 2026 |
| Enlace del repositorio | https://github.com/SantyRojas-2005/Web-Components-Grupo3.git |

## Propuesta del emprendimiento

- **Nombre del emprendimiento:** Side B
- **Problema que resuelve:** En la era de la música digital por streaming, se ha perdido la calidez acústica del audio analógico y el valor tangible de coleccionar arte en gran formato. Side B facilita el acceso a ediciones exclusivas y reediciones en vinilo de 180 gramos, accesorios especializados para su cuidado y sesiones de escucha comunitarias para disfrutar de una reproducción fiel y de alta calidad sonora.
- **Cliente al que se dirige:** Coleccionistas de música, audiófilos, personas aficionadas al formato físico y jóvenes interesados en la cultura del vinilo y el sonido analógico.

## Cómo abrir el proyecto

1. Abre la carpeta en Visual Studio Code.
2. Clic derecho sobre `index.html` → **Open with Live Server**. Los módulos JavaScript no cargan mediante protocolo `file://` por restricciones de CORS.
3. Abre las herramientas del navegador (`F12`) y deja visible la pestaña **Consola** para verificar que no existan errores de carga.

---

## Registro de los pasos

### Paso 1 · index.html, arquitectura modular y Custom Elements

- **Etiquetas registradas en el proyecto:**
  - `<tarjeta-producto>`: Catálogo de discos de vinilo de alta fidelidad.
  - `<tarjeta-artista>`: Perfiles y discografía de artistas destacados.
  - `<tarjeta-accesorio>`: Artículos de cuidado, exhibición y mantenimiento.
  - `<tarjeta-evento>`: Sesiones de escucha (*Listening Parties*) y lanzamientos.
- **¿Por qué el nombre debe llevar guion?:** La especificación estándar del W3C exige obligatoriamente que todo Custom Element contenga al menos un guion (`-`). Esto previene colisiones de nombres con etiquetas nativas de HTML presentes y futuras (como `article`, `header`, `audio`, etc.).
- **Importación centralizada con `app.js`:** Para mantener un código limpio y escalable, los 4 componentes se centralizan en `./app.js` y se importan al final del `<body>` en `index.html` mediante:
  ```html
  <script type="module" src="./app.js"></script>
  ```

### Paso 2 · Plantillas, Shadow DOM y Slots

- **Encapsulación con Shadow DOM:** Cada componente inicializa su propio Shadow DOM en modo `open` (`this.attachShadow({ mode: "open" })`), garantizando el aislamiento de estilos y estructura.
- **Slots implementados por componente:**
  - `<tarjeta-producto>`: `slot="foto"`, `slot="nombre"`, y slot por defecto para la descripción.
  - `<tarjeta-artista>`: `slot="foto"`, `slot="nombre"`, y slot por defecto para la biografía.
  - `<tarjeta-accesorio>`: `slot="foto"`, `slot="nombre"`, `slot="medidas"`, `slot="peso"`, `slot="compatibilidad"`, y slot por defecto.
  - `<tarjeta-evento>`: `slot="portada"`, `slot="titulo"`, y slot por defecto para detalles de la sesión.
- **Texto de respaldo (fallback):** Si el usuario no proporciona contenido en el slot por defecto, los componentes cuentan con textos de respaldo automáticos como `Sin descripción` o `Sin biografía disponible`.
- **¿Por qué usamos `cloneNode(true)`?:** Si no se realiza un clonado profundo (`cloneNode(true)`), el nodo de la plantilla se movería físicamente a la primera instancia del componente en el DOM, vaciando la plantilla para las siguientes tarjetas. `cloneNode(true)` asegura que cada tarjeta instanciada reciba una copia idéntica e independiente.

### Paso 3 · Atributos reactivos, ciclo de vida y estilos con Custom Properties

- **Método de reactividad:** `attributeChangedCallback(nombre, anterior, valor)` escucha activamente los cambios registrados en `observedAttributes` (como `precio`, `oyentes`, `genero`, `fecha`, etc.) y actualiza inmediatamente el contenido del Shadow DOM sin recargar la página.
- **Color de marca (`--color-marca`) y variables CSS:** Definido globalmente en `estilos.css` bajo los selectores de los componentes con valor `#f59e0b` (ámbar vintage):
  ```css
  tarjeta-producto,
  tarjeta-artista,
  tarjeta-accesorio,
  tarjeta-evento {
    --color-marca: #f59e0b;
  }
  ```
- **Valor de respaldo (fallback):** En caso de que la página no defina la variable, los componentes leen por defecto `#d97706` mediante `var(--color-marca, #d97706)`.
- **Reto extra (`:host([destacado])`):** Cuando la tarjeta posee el atributo booleano `destacado`, el selector `:host([destacado])` activa un borde más grueso y un resplandor dorado (`box-shadow: 0 0 16px rgba(245, 158, 11, 0.35)`).

---

### Paso 4 · Catálogo y secciones del emprendimiento

| Sección | Elemento | Items implementados |
|---|---|---|
| **Catálogo de Vinilos** | `<tarjeta-producto>` | • Random Access Memories · Daft Punk ($42.50)<br>• After Hours · The Weeknd ($50.00)<br>• Un Verano Sin Ti · Bad Bunny ($30.00) |
| **Artistas Destacados** | `<tarjeta-artista>` | • The Weeknd (R&B / Synthwave · 114M oyentes)<br>• Daft Punk (French House · 28M oyentes)<br>• CA7RIEL & Paco Amoroso (Trap/Funk · 6.5M oyentes) |
| **Accesorios** | `<tarjeta-accesorio>` | • Soporte de vinilos · Roble macizo ($22.00)<br>• Funda acrílica protectora ($24.00)<br>• Kit completo de limpieza ($20.00) |
| **Sesiones de Escucha** | `<tarjeta-evento>` | • Random Access Memories a oscuras (25 OCT)<br>• After Hours · Listening Party (08 NOV)<br>• Noche Punk en Vinilo (22 NOV) |

---

### Paso 5 · Repositorio y contribución de cada integrante

| Integrante | Componente | Qué hizo en este laboratorio |
|---|---|---|
| **Jhaldry Peñaherrera** | `<tarjeta-producto>` | Creó el módulo `tarjeta-producto.js` con Shadow DOM, slots de foto/nombre y reactividad de precio. Diseñó la arquitectura base de estilos, la centralización modular en `app.js` y la tarjeta de Daft Punk en la rama `feature/jhaldry`. |
| **Diego Pinto** | `<tarjeta-artista>` | Creó el módulo `tarjeta-artista.js` con soporte para foto circular de artista, chip de género musical, contadores de oyentes mensuales y vinilos en stock, integrando a The Weeknd, Daft Punk y CA7RIEL & Paco Amoroso en la rama `feature/diego`. |
| **Israel Segovia** | `<tarjeta-accesorio>` | Creó el módulo `tarjeta-accesorio.js` con slots especializados para ficha técnica (`medidas`, `peso`, `compatibilidad`), atributo reactivo `precio` e integró los artículos de exhibición y cuidado de vinilos en la rama `feature/israel`. |
| **Santiago  Nogales** | `<tarjeta-evento>` | Creó el módulo `tarjeta-evento.js` con slots de portada panorámica 16:9 y título, atributos reactivos de `fecha`, `hora` y `cupos`, implementando las sesiones de escucha comunitarias en la rama `feature/santiago`. |

---

## Verificación

Marca con una `x` lo que ya comprobaste en el navegador:

- [x] Las etiquetas de todos los componentes tienen guion reglamentario (`<tarjeta-*>`).
- [x] La página solo altera la apariencia expuesta mediante Custom Properties (`var(--color-marca)`).
- [x] `setAttribute` actualiza los atributos reactivos en pantalla de forma instantánea.
- [x] La consola de desarrollador (`F12`) no muestra errores de módulos, rutas ni CORS.
- [x] Todas las secciones cuentan con títulos estandarizados y estructura semántica con `<main>` y `<section>`.

### Prueba reactiva en consola:

```js
document.querySelector("tarjeta-producto").setAttribute("precio", "25");
```

**Resultado:** El precio del primer vinilo se actualiza en pantalla de inmediato a `$25.00` gracias al método `attributeChangedCallback`.

| Antes de la prueba | Después del cambio a precio="25" |
| :---: | :---: |
| ![Prueba inicial](./img/prueba1.png) | ![Prueba con precio modificado](./img/prueba2.png) |

---

## Uso de inteligencia artificial

- **Herramienta usada:** Antigravity AI
- **Para qué la consultamos:** El uso de la inteligencia artificial se enfoco principalmente en la corrección de errores y mejora visual con algún estilo. También se utilizo la IA al momento de revisar la correcta estructuración de las tarjetas con el objetivo de lograr un correcto funcionamiento y estructura.
- **Qué comprobamos nosotros:** Se realizo la validación del renderizado de las 4 tarjetas en el navegador, asimismo se valido que cumpla con el comportamiento requerido en la consola. Finalmente se realizo el cargado de las imágenes respectivas y se complementó la información de cada tarjeta.
