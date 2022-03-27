class Menu extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {

        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
        <div id="barraNavegacion">
            <img src="logo-moveleg.PNG">      
            <button id="botonMenuInicio">Inicio</button>
            <button id="botonMenuTerapia">Terapia</button>
            <button id="botonMenuSobreNostros">Sobre Nosotros</button>
            <img src="icono-perfil.png">   
        </div>    
        `;

        this.#agregarEstilo();

    }

    #agregarEstilo() {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "../css/BarraNav.css");
        this.shadowRoot.appendChild(link);
    }

}

window.customElements.define("menu-info", Menu);