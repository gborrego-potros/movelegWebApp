class CrearTerapias2 extends HTMLElement {

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
        <div id="angulos">
            <h2 id="angulosTitulo">Configuración</h2>
            <p>
                <hr>
            </p>
            <div id="numeroRepeticionesTobillo">
            <label for="nRepeticionesTobillo">Núm. repeticiones tobillo:</label>
            <input type="text" id="nRepeticionesTobillo">
            </div>
            <div id="numeroRepeticionesRodilla">
            <label for="nRepeticionesRodilla">Núm. repeticiones rodilla:</label>
            <input type="text" id="nRepeticionesRodilla">
            </div>
            <div id="porcentajeDisminucionRodillaD">
            <label for="pDisminucionRodillaD">% Disminución rodilla d:</label>
            <input type="text" id="pDisminucionRodillaD">
            </div>
            <div id="porcentajeDisminucionTobilloD">
            <label for="pDisminucionTobilloD">% Disminución tobillo d:</label>
            <input type="text" id="pDisminucionTobilloD">
            </div>
            <div id="porcentajeDisminucionRodillaV">
            <label for="porcentajeDisminucionRodillaV">% Disminución rodilla v:</label>
            <input type="text" id="pDisminucionRobillaV">
            </div>
            <div id="porcentajeDisminucionTobilloV">
            <label for="porcentajeDisminucionTobilloV">% Disminución tobillo v:</label>
            <input type="text" id="pDisminucionTobilloV">
            </div>
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
        link.setAttribute("href", "../css/crearTerapia2.css");
        this.shadowRoot.appendChild(link);
    }
    #agregarTerapia() {
        const btnAgregarTerapia = this.shadowRoot.querySelector("#guardarRegistroTerapiaPaciente");
        const numeroRepeticionesTobillo = this.shadowRoot.querySelector("nRepeticionesTobillo");
        const numeroRepeticionesRodilla = this.shadowRoot.querySelector("nRepeticionesRodilla");
        const pDisminucionRodillaD = this.shadowRoot.querySelector("pDisminucionRodillaD");
        const pDisminucionTobilloD = this.shadowRoot.querySelector("pDisminucionTobilloD");
        const pDisminucionRobillaV = this.shadowRoot.querySelector("pDisminucionRobillaV");
        const pDisminucionTobilloV = this.shadowRoot.querySelector("pDisminucionTobilloV");

        btnAgregarTerapia.addEventListener('click', function () {
            fetch("http://localhost:3000/api/terapias/" , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "terapia": {
                        "idPaciente": 1,
                        "fechaInicio": "25/03/2022",
                        "fechaFin": "25/09/2022",
                    }
                    
                    /*
                    "numeroRepeticionesTobillo": numeroRepeticionesTobillo.value,
                    "numeroRepeticionesRodilla": numeroRepeticionesRodilla.value,
                    "pDisminucionRodillaD": pDisminucionRodillaD.value,
                    "pDisminucionTobilloD": pDisminucionTobilloD.value,
                    "pDisminucionRobillaV": pDisminucionRobillaV.value,
                    "pDisminucionTobilloV": pDisminucionTobilloV.value,
                    */
                })

            })
                .then(response => response.json())
                .then(function (data) {
                    alert("Se ha guardado con exito el sorteo");
                }).catch(function (error) {
                    console.warn("Hubo algun error", error)
                })
        })

    }
}

window.customElements.define("crearterapias2-info", CrearTerapias2);