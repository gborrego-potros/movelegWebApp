class ConfiguracionSesion extends HTMLElement {

    #urlService = 'http://localhost:3000/api/';
    #urlPacientes = this.#urlService + 'pacientes/';
    #urlUsers = this.#urlService + 'users/';

    constructor() {
        super();
    }
    connectedCallback() {
        //let pacienteId = this.getAttribute("pacienteId");
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
        <div id="divPrincipal">
        <h1 id="calibracionTitulo">Calibracion</h1>

            <label for="nombrePaciente">Terapia</label>
            <input type="text" id="nombrePaciente">

        <div id="tobilloRodilla">
            <h2 id="configuracionTobilloRodilla">Configuración</h2>  

            <label for="nRepeticionesTobillo">Núm. repeticiones tobillo:</label>
            <input type="text" id="nRepeticionesTobillo">


            <label for="nRepeticionesRodilla">Núm. repeticiones rodilla:</label>
            <input type="text" id="nRepeticionesRodilla">

  
            <label for="pDisminucionRodillaD">% Disminución rodilla d:</label>
            <input type="text" id="pDisminucionRodillaD">


            <label for="pDisminucionTobilloD">% Disminución tobillo d:</label>
            <input type="text" id="pDisminucionTobilloD">

            <label for="porcentajeDisminucionRodillaV">% Disminución rodilla v:</label>
            <input type="text" id="pDisminucionRobillaV">


            <label for="porcentajeDisminucionTobilloV">% Disminución tobillo v:</label>
            <input type="text" id="pDisminucionTobilloV">

        </div>

        <div id="botonesCrearTerapias2">
        <button id="cancelarRegistroTerapiaPaciente2">Cancelar</button>
        <button id="guardarRegistroTerapiaPaciente">Guardar</button>
        </div>
        </div>
        `;

        this.#agregarEstilo();
        this.#agregarTerapia();

    }

    #agregarEstilo() {
        let link = document.createElement("link");
        link.setAttribute("id", "pagestyle");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "../css/pico-master/css/pico.min.css");
        this.shadowRoot.appendChild(link);
    }
    #agregarTerapia() {
        const btnAgregarTerapia = this.shadowRoot.querySelector("#guardarRegistroTerapiaPaciente");
        const numeroRepeticionesTobillo = this.shadowRoot.querySelector("#nRepeticionesTobillo");
        const numeroRepeticionesRodilla = this.shadowRoot.querySelector("#nRepeticionesRodilla");
        const pDisminucionRodillaD = this.shadowRoot.querySelector("#pDisminucionRodillaD");
        const pDisminucionTobilloD = this.shadowRoot.querySelector("#pDisminucionTobilloD");
        const pDisminucionRobillaV = this.shadowRoot.querySelector("#pDisminucionRobillaV");
        const pDisminucionTobilloV = this.shadowRoot.querySelector("#pDisminucionTobilloV");
        
        

        btnAgregarTerapia.addEventListener('click', function () {
            console.log(pDisminucionRodillaD.value.type);
            fetch("http://localhost:3000/api/configuracionsesiones/" , { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "idTerapia": 2,
                    "numRepeticionesTobillo": numeroRepeticionesTobillo.value,
                    "numRepeticionesRodilla": numeroRepeticionesRodilla.value,
                    "porcentajeDisminucionRD": pDisminucionRodillaD.value,
                    "porcentajeDisminucionTD": pDisminucionTobilloD.value,
                    "porcentajeDisminucionTV": pDisminucionRobillaV.value,
                    "porcentajeDisminucionRV": pDisminucionTobilloV.value
                })
            })
            .then(response => response.json())
                .then(function (data) {
                    alert("Se ha guardado con exito la configuración");
                    window.open("../views/busquedaTerapias.html");
                }).catch(function (error) {
                    console.warn("Hubo algun error", error)
                })

        })

    }
    
}

window.customElements.define("configuracionsesion-info", ConfiguracionSesion);