// componentes/tarjeta-producto.js
// Práctica de laboratorio · Construye <tarjeta-producto> (Actividad 8 de las diapositivas)
// Completa cada PASO. Los números son los mismos de la diapositiva y de la tarea en Moodle.

// ───────── PASO 2 · Plantilla con Shadow DOM y slots ─────────
// Una sola plantilla, declarada fuera de la clase.
const plantilla = document.createElement("template");
plantilla.innerHTML = `
  <style>
    /* PASO 3 · Escribe aquí los estilos del componente:
       - :host con display y un borde
       - el color de marca leído con var(--color-marca, un-color-de-respaldo)
       - ::slotted(...) para la foto y el nombre que llegan de la página
       RETO EXTRA · :host([destacado]) que cambie el borde */
    :host {
      display:block;
      background-color:#111114;
      color: #f4f4f5;
      border: 2px solid var(--color-marca,#f59e0b);
      border-radius:14px;
      padding: 1.25rem;
      font-family:inherit;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
    }
    h2 {
      margin: 0 0 0.5rem;
      font-size:1.2rem;
      color: var(--color-marca,#f59e0b);
    }
    .descripcion {
      margin: 0 0 0.75rem;
      font-size:0.9rem;
      color:#d4d4d8;
    }
    hr {
      border:none;
      border-top: 1px solid var(--color-marca, #f59e0b);
      opacity:0.5;
      margin: 0 0 0.75rem;
    }
    .zona-datos {
      display:grid;
      grid-template-columns: 30% 20% 50%;
      gap:0.75rem;
      margin-bottom: 0.75rem;
      font-size:0.85rem;
      color: #d4d4d8;
    }
    .zona-datos .dato {
      min-width: 0;
      overflow-wrap:anywhere;
    }
    .zona-datos .dato strong {
      display: block;
      margin-bottom:0.15rem;
      font-size: 0.7rem;
      text-transform:uppercase;
      letter-spacing: 0.06em;
      color:white;
    }
    .zona-foto {
      width: 100%;
      min-width:0;
    }
    ::slotted(img) {
      width: 100%;
      height:auto;
      border-radius:8px;
      display: block;
    }
    .precio {
      margin-top:0.75rem;
      text-align:right;
      font-size:1.8rem;
      font-weight: 800;
      color: var(--color-marca, #f59e0b);
    }
  </style>
  <!-- PASO 2 · Escribe aquí:
       - un slot con nombre "foto"
       - un slot con nombre "nombre"
       - un slot sin nombre, con un texto de respaldo
       - un lugar donde se vea el precio (por ejemplo un <span id="precio">) -->

  <h2><slot name="nombre">Nombre del accesorio</slot></h2>

  <p class="descripcion"><slot>Descripción del accesorio</slot></p>

  <hr>

  <div class="zona-datos">
    <div class="dato">
      <strong>Medidas:</strong> <slot name="medidas"></slot>
    </div>
    <div class="dato">
      <strong>Peso:</strong> <slot name="peso"></slot>
    </div>
    <div class="dato">
      <strong>Compatibilidad:</strong> <slot name="compatibilidad"></slot>
    </div>
  </div>
<hr>
  <div class="zona-foto">
    <slot name="foto"></slot>
  </div>

  <div class="precio"><span id="precio">$0.00</span></div>
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
    this.attachShadow({ mode:"open"});
  }
  connectedCallback() {
    // PASO 2 · Agrega al Shadow DOM una COPIA de la plantilla con cloneNode(true).
    this.shadowRoot.appendChild(plantilla.content.cloneNode(true));
    // PASO 3 · Muestra el precio inicial.
    this.actualizarPrecio();
  }
  attributeChangedCallback(nombre, anterior, valor) {
    // PASO 3 · Cuando cambie "precio", actualiza lo que se ve en pantalla.
    // Ojo: si el atributo ya viene escrito en el HTML, este método se ejecuta
    // ANTES que connectedCallback; comprueba que la plantilla ya esté clonada.
    if (nombre !=="precio") return;
    if (!this.shadowRoot || !this.shadowRoot.querySelector("#precio")) return;
    this.actualizarPrecio();
  }
  formatearPrecio(valor) {
    const numero = Number.parseFloat(valor);
    if (Number.isNaN(numero)) return "$0.00";
    return "$" + numero.toFixed(2);
  }
  actualizarPrecio() {
    const elemento = this.shadowRoot.querySelector("#precio");
    if (elemento) {
      elemento.textContent = this.formatearPrecio(this.precio);
    }
  }
   // PASO 3 · La propiedad lee y escribe el atributo, así quedan sincronizados.
  get precio() {
    return this.getAttribute("precio") || 0;
  }
  set precio(valor) {
    this.setAttribute("precio", valor);
  }
}
// ───────── PASO 1 · Registra el componente ─────────
// Escribe aquí customElements.define(...) con una etiqueta que tenga guion.
customElements.define("tarjeta-accesorio", TarjetaProducto);
