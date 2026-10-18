# CONTC-DOC Práctica de laboratorio: Propuesta de un emprendimiento de libre elección y construcción de su interfaz

**PROGRAMACIÓN INTEGRATIVA DE COMPONENTES WEB · UNIDAD 1: WEB COMPONENTS**  
**Práctica de laboratorio:** Construye `<tarjeta-producto>`

## 1. Información General

* **Técnica y ponderación:** Práctica de laboratorio · 5 puntos del primer parcial.
* **Temas:** 1.2.1 Custom elements · 1.2.2 Shadow DOM · 1.2.3 ES Modules · 1.2.4 HTML Templates
* **Modalidad:** En equipo, hasta 4 integrantes (el mismo equipo del emprendimiento). Un integrante entrega por todos.
* **Calificación:** Rúbrica de 4 criterios × 5 puntos = 20 puntos.
* **Tiempo y herramientas:** 40 minutos en clase y 2 horas de trabajo autónomo. Visual Studio Code con la extensión Live Server, un navegador con herramientas de desarrollo, Git y GitHub.
* **Archivo de trabajo:** `Laboratorio_tarjeta-producto_kit.zip`, adjunto a esta tarea.

### Qué vas a lograr
Vas a presentar la propuesta de tu emprendimiento y a construir `<tarjeta-producto>`, el primer componente de su interfaz, y lo vas a dejar funcionando en el repositorio del equipo. Al terminar podrás:
- Registrar un elemento personalizado en su propio módulo ES.
- Encapsular su estructura y sus estilos con Shadow DOM y una plantilla `<template>`.
- Recibir contenido de la página con slots.
- Hacer que la vista reaccione cuando cambia el atributo precio.
- Dejar que la página cambie el color de marca con una variable CSS, sin tocar el resto del componente.

> **Tu emprendimiento, tus productos:** Los nombres, fotos, descripciones y precios son los de tu proyecto. Si tu emprendimiento ofrece servicios, cada tarjeta muestra un servicio.

---

## 2. Ejemplo de la diapositiva
Estos son los ejemplos de la sesión 1.2. Tu componente sigue la misma forma.

**Uso en la página · slots**
```html
<tarjeta-producto>
  <img slot="foto" src="x">
  <h3 slot="nombre">Café</h3>
  <p>Tostado artesanal</p>
</tarjeta-producto>
```

**Plantilla del componente**
```html
<slot name="foto"></slot>
<slot name="nombre"></slot>
<slot>Sin descripción</slot>
```

**Una sola plantilla, una copia por instancia**
```javascript
const t = document.createElement("template");
t.innerHTML = `
  <style>h3 { color: green }</style>
  <h3><slot name="nombre"></slot></h3>`;

// dentro de connectedCallback
this.shadowRoot.append(
  t.content.cloneNode(true)
);
```

**Atributo y propiedad sincronizados**
```javascript
get precio() { return Number(this.getAttribute("precio")); }
set precio(v) { this.setAttribute("precio", v); }
```

**Estilos: `:host` y variables CSS**
```css
/* Dentro del componente */
:host {
  display: block;
  border: 1px solid var(--borde, #ccc);
}

/* En la página */
tarjeta-producto {
  --borde: gold; --titulo: navy;
}
```

---

## 3. Si ya empezaste con la diapositiva
Si tu equipo avanzó la Actividad 8 en clase, no empieces de nuevo:
- Conserva tu `tarjeta-producto.js` y ubícalo en la carpeta `componentes/`.
- Copia a tu proyecto el archivo `README.md` del kit y complétalo.
- Revisa los cinco pasos de la sección 5 y termina lo que te falte.
- Comprueba la lista de la sección 7 antes de enviar.

---

## 4. Cómo usar el archivo de trabajo
Descarga `Laboratorio_tarjeta-producto_kit.zip`, descomprímelo y abre la carpeta en Visual Studio Code. Esa carpeta es la raíz del repositorio del equipo.

**Empieza por la propuesta:** La primera sección del `README.md` es la propuesta de tu emprendimiento: nombre, problema que resuelve y cliente. Complétala antes de programar.

### Contenido del kit
```text
proyecto/
├─ index.html                  (la página: usa la tarjeta tres veces)
├─ estilos.css                 (estilos de la página y color de marca)
├─ README.md                   (aquí registras cada paso)
├─ img/                        (imágenes de ejemplo; cámbialas por las tuyas)
└─ componentes/
   └─ tarjeta-producto.js      (el módulo que vas a completar)
```
- Los comentarios `PASO 1` a `PASO 4` de los archivos indican dónde escribir.
- Abre `index.html` con clic derecho → **Open with Live Server**. Los módulos no cargan al abrir el archivo con `file://`.
- Mantén abierta la consola del navegador (`F12`) mientras trabajas.
- Al inicio verás el texto de los productos sin formato: es lo esperado hasta que registres el componente.

---

## 5. Pasos
Son los cinco pasos de la Actividad 8.

**1. Crea index.html y un módulo tarjeta-producto.js.**
- El módulo va en `componentes/tarjeta-producto.js` y exporta la clase `TarjetaProducto`.
- Registra la etiqueta con `customElements.define(...)`. El nombre lleva guion.
- La página lo carga con `<script type="module" src="./componentes/tarjeta-producto.js">`.
> *Registra en README.md:* la etiqueta que registraste, por qué el nombre lleva guion y cómo importa la página el módulo.

**2. Define la plantilla con Shadow DOM y slots foto y nombre.**
- En el constructor: `super()` y `attachShadow({ mode: "open" })`. Ahí no se dibuja HTML.
- Declara una sola plantilla fuera de la clase y agrégala en `connectedCallback` con `cloneNode(true)`.
- Incluye los slots `foto` y `nombre`, y un slot sin nombre con un texto de respaldo.
> *Registra en README.md:* los slots de tu plantilla, el texto de respaldo y qué pasaría si no clonaras la plantilla.

**3. Agrega el atributo precio y estilos con :host que lean var(--color-marca).**
- Declara `precio` en `observedAttributes` y actualiza la vista en `attributeChangedCallback`.
- Sincroniza la propiedad precio con el atributo usando `get` y `set`.
- En los estilos del componente usa `:host` con display y lee el color con `var(--color-marca, respaldo)`.
- En `estilos.css` asigna a `--color-marca` el color de tu emprendimiento.
> *Registra en README.md:* el método que reacciona al cambio de precio, tu color de marca y el valor de respaldo.

**4. Úsala tres veces con productos de tu emprendimiento.**
- En `index.html` cambia foto, nombre, descripción y precio de las tres tarjetas.
- Cada imagen lleva un texto alternativo en `alt`.
- Cambia el título de la página por el nombre de tu emprendimiento.
> *Registra en README.md:* los tres productos con su precio.

**5. Sube el componente al repositorio del equipo (Avance 1).**
- Crea el repositorio del equipo en GitHub, público o con acceso para el docente.
- Sube la carpeta completa con el `README.md` lleno.
- Este repositorio es el mismo del Avance 1: aquí crecerá el kit de componentes.
> *Registra en README.md:* el enlace del repositorio y qué hizo cada integrante.

⭐ **Reto extra (opcional, no cambia la nota):** Un atributo destacado que cambie el borde con `:host([destacado])`.

---

## 6. Qué entregar
**Entrega un integrante por todo el equipo:**
- **Texto en línea:** el enlace al repositorio con `<tarjeta-producto>` funcionando.
- **Archivo:** una captura de la página con las tres tarjetas y la consola abierta, llamada `Laboratorio_Apellido_Nombre.png` con los datos de quien entrega.
- El `README.md` completo va dentro del repositorio, no se sube aparte.

---

## 7. Antes de enviar, verifica
Los tres primeros puntos son la lista «Verifica» de la diapositiva.
- [ ] La etiqueta tiene guion.
- [ ] La página solo cambia lo que el componente expone con `var()`.
- [ ] `setAttribute` cambia el precio en pantalla.
- [ ] La consola no muestra errores.
- [ ] El enlace del repositorio abre en una ventana de incógnito.
- [ ] El `README.md` tiene la propuesta del emprendimiento, los integrantes, los cinco registros y la declaración de uso de IA.

**Prueba en la consola del navegador:**
```javascript
document.querySelector("tarjeta-producto").setAttribute("precio", "25");
```

---

## 8. Rúbrica
**Total: 20 puntos.** El trabajo es del equipo y todos los integrantes reciben la misma nota.

| Criterio | Insuficiente · 0 | En proceso · 2 | Bueno · 4 | Excelente · 5 |
| :--- | :--- | :--- | :--- | :--- |
| **Módulo ES, etiqueta y repositorio** | No hay enlace, el repositorio no abre o el componente no se registra. | El componente se registra, pero su código está dentro de `index.html` o la consola muestra errores. | Módulo propio en `componentes/`, etiqueta válida y carga con `type="module"`; al README le falta la propuesta o un registro, o falta la captura. | Módulo propio, etiqueta válida, consola sin errores, repositorio accesible y README completo, con la propuesta del emprendimiento y lo que hizo cada integrante. |
| **Plantilla, Shadow DOM y slots** | No usa Shadow DOM ni plantilla. | Usa Shadow DOM, pero no clona una plantilla o no tiene slots con nombre. | Plantilla clonada con los slots foto y nombre; falta el slot sin nombre o su texto de respaldo. | Una sola plantilla fuera de la clase, clonada con `cloneNode(true)`, con slots foto y nombre y slot sin nombre con respaldo. |
| **Atributo precio y productos del emprendimiento** | La tarjeta no muestra el precio. | Muestra el precio, pero no cambia con `setAttribute`. | El precio cambia con `setAttribute`; falta la propiedad precio o hay menos de tres productos propios. | Precio observado y sincronizado con su propiedad; tres tarjetas con productos reales del emprendimiento. |
| **Estilos con `:host` y variables CSS** | El componente no tiene estilos propios. | Tiene estilos dentro del Shadow DOM, pero sin `:host` o sin variables CSS. | Usa `:host` y `var(--color-marca)`; falta el valor de respaldo o la página no define la variable. | `:host` con display, `var(--color-marca)` con respaldo y color de marca definido en `estilos.css`; la página no cambia nada más. |

---

## 9. Recuerda
- **Uso de IA:** puedes usarla para consultar y depurar, y lo declaras en el `README`. No puede responder por ti: cada integrante explica su código.
- Si el atributo precio ya viene escrito en el HTML, `attributeChangedCallback` se ejecuta antes que `connectedCallback`. Comprueba que la plantilla ya esté clonada antes de escribir el precio.
- El texto de respaldo de un slot solo aparece cuando no recibe nada. Un salto de línea o un espacio entre las etiquetas también cuenta como contenido.
- Un elemento personalizado es *inline* mientras `:host` no defina `display`.
- **Lectura previa para la siguiente sesión:** MDN Web Docs, «Using templates and slots», y Lit, «Components overview» (lit.dev).