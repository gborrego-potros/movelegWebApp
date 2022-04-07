class Menu extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {

        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
        <div id="divPrincipal">
        <ul id="barraNavegacion">
            <li><img src="../img/logo-moveleg.PNG" id="imagenMoveleg"></li>  
            <div id="divBotonesMenu">
            <li><button id="botonMenuInicio" onclick="location.href='inicio.html'">Inicio</button></li>

            <li><button id="botonMenuTerapia" data-toggle="dropdown" class="btn btn-default dropdown-toggle">Terapia
            <span class="caret"></span></button></li>

            <li><button id="botonMenuSobreNostros" onclick="location.href='sobreNosotros.html'">Sobre Nosotros</button></li>
            </div>
            <li><img src="../img/icono-perfil.png" id="imagenPerfil"></li>
        </ul>   
        </div> 
        `;

        this.#agregarEstilo();

    }

    #agregarEstilo() {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "../css/BarraNav.css");
        //link.setAttribute("href", "../pico-master/css/pico.min.css");
        this.shadowRoot.appendChild(link);
    }

}

window.customElements.define("menu-info", Menu);