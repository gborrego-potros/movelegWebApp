class AgregarAngulos extends HTMLElement {

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

        <div id="angulos">
            <h2 id="angulosTitulo">Ángulos</h2>

            <label for="anguloFlexionCadera">Ángulo flexión de cadera:</label>
            <input type="text" id="anguloFlexionCadera">

            <label for="anguloFlexionRodilla">Ángulo flexión de rodilla:</label>
            <input type="text" id="anguloFlexionRodilla">

            <label for="anguloDorsiflexion">Ángulo de dorsiflexión:</label>
            <input type="text" id="anguloDorsiflexion">

            <label for="anguloPlantarFlexion">Ángulo plantar flexión:</label>
            <input type="text" id="anguloPlantarFlexion">

        </div>
        <div id="botonesCrearTerapias2">
        <button id="cancelarRegistroTerapiaPaciente2">Cancelar</button>
        <button id="guardarRegistroTerapiaPaciente">Guardar</button>
        <a href='../views/configuracionSesion.html'>Siguiente</a>
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
        link.setAttribute("href", "https://unpkg.com/@picocss/pico@latest/css/pico.min.css");
        this.shadowRoot.appendChild(link);
    }
    #agregarTerapia() {
        const btnAgregarTerapia = this.shadowRoot.querySelector("#guardarRegistroTerapiaPaciente");
        const anguloFlexionCadera = this.shadowRoot.querySelector("#anguloFlexionCadera");
        const anguloFlexionRodilla = this.shadowRoot.querySelector("#anguloFlexionRodilla");
        const anguloDorsiflexion = this.shadowRoot.querySelector("#anguloDorsiflexion");
        const anguloPlantarFlexion = this.shadowRoot.querySelector("#anguloPlantarFlexion");


        btnAgregarTerapia.addEventListener('click', function () {
            fetch("http://localhost:3000/api/calibraciones/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "idTerapia": 1,
                    "anguloFlexionCadera": anguloFlexionCadera.value,
                    "anguloFlexionRodilla": anguloFlexionRodilla.value,
                    "anguloDorsiflexion": anguloDorsiflexion.value,
                    "anguloPlantarFlexion": anguloPlantarFlexion.value
                })

            })
                .then(response => response.json())
                .then(function (data) {
                    alert("Se ha guardado con exito la configuración");
                }).catch(function (error) {
                    console.warn("Hubo algun error", error)
                })
        })

    }

}

window.customElements.define("agregarangulos-info", AgregarAngulos);