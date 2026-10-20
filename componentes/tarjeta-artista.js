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
      background: linear-gradient(180deg, rgba(245, 158, 11, 0.12) 0%, transparent 100%);
      padding: 1.5rem 1rem 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    /* Foto en formato circular del artista */
    ::slotted([slot="foto"]) {
      width: 140px;
      height: 140px;
      border-radius: 50%;
      object-fit: cover;
      display: block;
      border: 3px solid var(--color-marca, #d97706);
      box-shadow: 0 4px 18px rgba(0, 0, 0, 0.6);
      transition: transform 0.3s ease;
    }

    :host(:hover) ::slotted([slot="foto"]) {
      transform: scale(1.04);
    }

    .etiquetas {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      justify-content: center;
      margin-top: 0.75rem;
      flex-wrap: wrap;
    }

    .chip-genero {
      background: rgba(245, 158, 11, 0.18);
      color: var(--color-marca, #f59e0b);
      border: 1px solid rgba(245, 158, 11, 0.35);
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.25rem 0.75rem;
      border-radius: 999px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .cuerpo {
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      text-align: center;
    }

    /* Nombre del artista en el slot 'nombre' */
    ::slotted([slot="nombre"]) {
      margin: 0;
      font-size: 1.35rem;
      font-weight: 700;
      color: #ffffff;
      line-height: 1.25;
    }

    /* Biografía o descripción en el slot por defecto */
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
      justify-content: space-around;
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
      <slot name="foto"></slot>
      <div class="etiquetas">
        <span class="chip-genero" id="genero">Música</span>
      </div>
    </div>
    <div class="cuerpo">
      <slot name="nombre"></slot>
      <div class="descripcion">
        <slot>Sin biografía disponible</slot>
      </div>
      <div class="datos-adicionales">
        <div class="dato-item">
          <span class="dato-valor" id="oyentes">--</span>
          <span class="dato-etiqueta">Oyentes / Mes</span>
        </div>
        <div class="dato-item">
          <span class="dato-valor" id="vinilos">--</span>
          <span class="dato-etiqueta">Vinilos en Stock</span>
        </div>
      </div>
    </div>
  </article>
`;

export class TarjetaArtista extends HTMLElement {
  static get observedAttributes() {
    return ["genero", "oyentes", "vinilos"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(plantilla.content.cloneNode(true));
    }
    this._actualizarAtributo("genero", this.getAttribute("genero") || "Música");
    this._actualizarAtributo("oyentes", this.getAttribute("oyentes") || "N/D");
    this._actualizarAtributo("vinilos", this.getAttribute("vinilos") || "1");
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
  get genero() {
    return this.getAttribute("genero") || "";
  }
  set genero(valor) {
    this.setAttribute("genero", valor);
  }

  get oyentes() {
    return this.getAttribute("oyentes") || "";
  }
  set oyentes(valor) {
    this.setAttribute("oyentes", valor);
  }

  get vinilos() {
    return this.getAttribute("vinilos") || "";
  }
  set vinilos(valor) {
    this.setAttribute("vinilos", valor);
  }
}

// Registro del Custom Element
customElements.define("tarjeta-artista", TarjetaArtista);
