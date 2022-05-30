class AgregarCalibracionAngulos extends HTMLElement {

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

        <h1 id="calibracionTitulo">Calibracion</h1>

            <label for="nombrePaciente">Nombre</label>
            <input style="width:50%;" type="text" id="nombrePaciente" name="nombrepaciente">

        <div id="angulos">
            <h2 id="angulosTitulo">Ángulos</h2>

            <label for="anguloFlexionCadera">Ángulo flexión de cadera:</label>
            <input style="width:50%;" type="number" id="anguloFlexionCadera">

            <label for="anguloFlexionRodilla">Ángulo flexión de rodilla:</label>
            <input style="width:50%;" type="number" id="anguloFlexionRodilla">

            <label for="anguloDorsiflexion">Ángulo de dorsiflexión:</label>
            <input style="width:50%;" type="number" id="anguloDorsiflexion">

            <label for="anguloPlantarFlexion">Ángulo plantar flexión:</label>
            <input style="width:50%;" type="number" id="anguloPlantarFlexion">

        </div>
        <div id="botonesCrearTerapias2">
        <button style="width:25%; display: inline; margin-left: 100px;" id="cancelarRegistroTerapiaPaciente2">Cancelar</button>
        <button style="width:25%; display: inline; margin-left: 15px;" id="guardarRegistroTerapiaPaciente">Guardar</button>
        </div>
        `;

        this.#agregarEstilo();
        this.#agregarNombrePaciente();
        this.#agregarTerapia();

    }

    #agregarEstilo() {
        let link = document.createElement("link");
        link.setAttribute("id", "pagestyle");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "https://unpkg.com/@picocss/pico@latest/css/pico.min.css");
        this.shadowRoot.appendChild(link);
    }

    #agregarNombrePaciente(){
        //sessionStorage.setItem('nombrePaciente', 'daniel reyes');
        let nombrePaciente = sessionStorage.getItem('nombrePaciente')
        this.shadowRoot.querySelector("#nombrePaciente").value = nombrePaciente;
        this.shadowRoot.querySelector("#nombrePaciente").disabled = true;
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
                    "idTerapia": sessionStorage.getItem('idTerapia'),
                    "anguloFlexionCadera": anguloFlexionCadera.value,
                    "anguloFlexionRodilla": anguloFlexionRodilla.value,
                    "anguloDorsiflexion": anguloDorsiflexion.value,
                    "anguloPlantarFlexion": anguloPlantarFlexion.value
                })

            })
                .then(response => response.json())
                .then(function (data) {
                    alert("Se ha guardado con éxito la calibración");
                    window.open("../views/configuracionSesion.html");
                    window.close(this);
                }).catch(function (error) {
                    console.warn("Hubo algun error", error)
                })
        })

    }

}

window.customElements.define("agregarcalibracionangulos-info", AgregarCalibracionAngulos);