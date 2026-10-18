// componentes/tarjeta-producto.js
// Práctica de laboratorio · Construye <tarjeta-producto> (Actividad 8 de las diapositivas)
// Emprendimiento: Tienda de Discos de Vinilo (RetroGroove Records)

// ───────── PASO 2 · Plantilla con Shadow DOM y slots ─────────
// Una sola plantilla, declarada fuera de la clase.
const plantilla = document.createElement("template");
plantilla.innerHTML = `
  <style>
    /* PASO 3 · Estilos del componente:
       - :host con display y borde leyendo var(--color-marca, respaldo)
       - ::slotted(...) para la foto y el nombre
       - RETO EXTRA · :host([destacado]) que cambia el borde */
    :host {
      display: block;
      border: 2px solid var(--color-marca, #d97706);
      border-radius: 14px;
      background: #141417;
      color: #f4f4f5;
      overflow: hidden;
      font-family: inherit;
      box-sizing: border-box;
    }

    /* Reto extra: cambia el borde cuando tiene el atributo destacado */
    :host([destacado]) {
      border: 3px solid var(--color-marca, #d97706);
      box-shadow: 0 0 14px rgba(245, 158, 11, 0.35);
    }

    /* Foto en el slot 'foto' */
    ::slotted([slot="foto"]) {
      width: 100%;
      aspect-ratio: 1 / 1;
      object-fit: cover;
      display: block;
    }

    .cuerpo {
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }

    /* Título en el slot 'nombre' */
    ::slotted([slot="nombre"]) {
      margin: 0;
      font-size: 1.2rem;
      font-weight: 700;
      color: #ffffff;
      line-height: 1.3;
    }

    /* Descripción en el slot por defecto */
    ::slotted(p), .descripcion {
      margin: 0;
      font-size: 0.9rem;
      color: #a1a1aa;
      line-height: 1.45;
    }

    .precio-caja {
      margin-top: 0.5rem;
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--color-marca, #d97706);
    }
  </style>

  <!-- PASO 2 · Estructura con slots -->
  <article>
    <slot name="foto"></slot>
    <div class="cuerpo">
      <slot name="nombre"></slot>
      <div class="descripcion">
        <slot>Sin descripción</slot>
      </div>
      <div class="precio-caja">
        $<span id="precio">0.00</span>
      </div>
    </div>
  </article>
`;

export class TarjetaProducto extends HTMLElement {

  // PASO 3 · Indica qué atributos observa el componente.
  static get observedAttributes() {
    return ["precio"];
  }

  constructor() {
    super();
    // PASO 2 · Crea el Shadow DOM en modo "open".
    // Recuerda: aquí no se leen atributos ni se dibuja HTML.
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    // PASO 2 · Agrega al Shadow DOM una COPIA de la plantilla con cloneNode(true).
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(plantilla.content.cloneNode(true));
    }
    // PASO 3 · Muestra el precio inicial.
    this._actualizarPrecio(this.getAttribute("precio"));
  }

  attributeChangedCallback(nombre, anterior, valor) {
    // PASO 3 · Cuando cambie "precio", actualiza lo que se ve en pantalla.
    // Ojo: si el atributo ya viene escrito en el HTML, este método se ejecuta
    // ANTES que connectedCallback; comprobamos que la plantilla ya esté clonada.
    if (nombre === "precio" && anterior !== valor) {
      this._actualizarPrecio(valor);
    }
  }

  // Método auxiliar para actualizar el precio en el Shadow DOM
  _actualizarPrecio(valor) {
    const elementoPrecio = this.shadowRoot ? this.shadowRoot.querySelector("#precio") : null;
    if (elementoPrecio) {
      elementoPrecio.textContent = (valor !== null && valor !== undefined && valor !== "") ? valor : "0.00";
    }
  }

  // PASO 3 · La propiedad lee y escribe el atributo, así quedan sincronizados.
  get precio() {
    return Number(this.getAttribute("precio")) || 0;
  }

  set precio(valor) {
    if (valor !== null && valor !== undefined) {
      this.setAttribute("precio", valor);
    } else {
      this.removeAttribute("precio");
    }
  }
}

// ───────── PASO 1 · Registra el componente ─────────
// Escribe aquí customElements.define(...) con una etiqueta que tenga guion.
customElements.define("tarjeta-producto", TarjetaProducto);
