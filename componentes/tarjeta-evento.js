

// ───────── Plantilla con Shadow DOM y slots ─────────
const plantilla = document.createElement("template");
plantilla.innerHTML = `
  <style>
    :host {
      display: block;
      border: 2px solid var(--color-marca, #d97706);
      border-radius: 14px;
      background: #141417;
      color: #f4f4f5;
      overflow: hidden;
      font-family: inherit;
      box-sizing: border-box;
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }

    :host(:hover) {
      transform: translateY(-4px);
      box-shadow: 0 10px 24px rgba(245, 158, 11, 0.22);
    }

    /* Reto extra: borde resaltado cuando tiene el atributo destacado */
    :host([destacado]) {
      border: 3px solid var(--color-marca, #d97706);
      box-shadow: 0 0 16px rgba(245, 158, 11, 0.35);
    }

    .cabecera {
      position: relative;
    }

    /* Imagen del evento o álbum temático en el slot 'portada' */
    ::slotted([slot="portada"]) {
      width: 100%;
      aspect-ratio: 16 / 9;
      object-fit: cover;
      display: block;
    }

    .chip-fecha {
      position: absolute;
      top: 0.75rem;
      left: 0.75rem;
      background: rgba(20, 20, 23, 0.9);
      color: var(--color-marca, #f59e0b);
      border: 1px solid rgba(245, 158, 11, 0.35);
      font-size: 0.85rem;
      font-weight: 700;
      padding: 0.35rem 0.8rem;
      border-radius: 10px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .cuerpo {
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    /* Nombre de la sesión en el slot 'titulo' */
    ::slotted([slot="titulo"]) {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 700;
      color: #ffffff;
      line-height: 1.3;
    }

    /* Información y ubicación en el slot por defecto */
    ::slotted(p), .descripcion {
      margin: 0;
      font-size: 0.9rem;
      color: #a1a1aa;
      line-height: 1.5;
    }

    .datos-adicionales {
      margin-top: 0.5rem;
      padding-top: 0.75rem;
      border-top: 1px solid #27272a;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.85rem;
    }

    .dato-item {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }

    .dato-valor {
      font-weight: 700;
      color: var(--color-marca, #f59e0b);
      font-size: 1.05rem;
    }

    .dato-etiqueta {
      font-size: 0.72rem;
      color: #71717a;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  </style>

  <article>
    <div class="cabecera">
      <slot name="portada"></slot>
      <span class="chip-fecha" id="fecha">Próximamente</span>
    </div>
    <div class="cuerpo">
      <slot name="titulo"></slot>
      <div class="descripcion">
        <slot>Sin información disponible</slot>
      </div>
      <div class="datos-adicionales">
        <div class="dato-item">
          <span class="dato-valor" id="hora">--</span>
          <span class="dato-etiqueta">Hora</span>
        </div>
        <div class="dato-item">
          <span class="dato-valor" id="cupos">--</span>
          <span class="dato-etiqueta">Cupos</span>
        </div>
      </div>
    </div>
  </article>
`;

export class TarjetaEvento extends HTMLElement {
  static get observedAttributes() {
    return ["fecha", "hora", "cupos"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(plantilla.content.cloneNode(true));
    }
    this._actualizarAtributo("fecha", this.getAttribute("fecha") || "Próximamente");
    this._actualizarAtributo("hora", this.getAttribute("hora") || "Por definir");
    this._actualizarAtributo("cupos", this.getAttribute("cupos") || "N/D");
  }

  attributeChangedCallback(nombre, anterior, valor) {
    if (anterior !== valor) {
      this._actualizarAtributo(nombre, valor);
    }
  }

  _actualizarAtributo(nombre, valor) {
    if (!this.shadowRoot) return;
    const elemento = this.shadowRoot.querySelector(`#${nombre}`);
    if (elemento) {
      elemento.textContent = (valor !== null && valor !== undefined && valor !== "") ? valor : "--";
    }
  }

  // Getters y Setters sincronizados con atributos
  get fecha() {
    return this.getAttribute("fecha") || "";
  }
  set fecha(valor) {
    this.setAttribute("fecha", valor);
  }

  get hora() {
    return this.getAttribute("hora") || "";
  }
  set hora(valor) {
    this.setAttribute("hora", valor);
  }

  get cupos() {
    return this.getAttribute("cupos") || "";
  }
  set cupos(valor) {
    this.setAttribute("cupos", valor);
  }
}

// Registro del Custom Element
customElements.define("tarjeta-evento", TarjetaEvento);