class CrearTerapias extends HTMLElement {

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
        <div id="divNombrePaciente">
            <h3>Buscar Paciente</h3>
            <label for="name">Nombre del Paciente:</label>
            <input type="text" id="nombrePaciente">
            <button id="buscarPacientes">Buscar</button>
        </div>
        <div>
        
        <table role="grid">   
            <thead>
                <tr> 
                    <th scope="col">Paciente</th>
                </tr>
            </thead>
            <tbody id ="tablaPacientes">

            </tbody>    
        </table>
        <p>
            <hr>
        </p>
        </div>
        
        <div id="fechas">
            <h2 id="fechasTitulo">Fechas</h2>
            <div id="fecha1">
            <label for="fechaInicio">Fecha de Inicio:</label>
            <input type="date" id="fechaInicio">
            </div>
            <div id="fecha2">
            <label for="fechaFin">Fecha de Fin:</label>
            <input type="date" id="fechaFin">
            </div>
        </div>

        <div id="botonesCrearTerapias">
        <button id="cancelarRegistroTerapiaPaciente">Cancelar</button>
        <button id="crearTerapiaButton">Continuar</button>
        <a href='../views/agregarAngulos.html'>Siguiente</a>
        </div>
        </div>
        `;

        this.#agregarEstilo();
        this.#agregarNombrePaciente();
        const nombrePaciente = this.shadowRoot.querySelector("#eNombrePaciente");
        this.#getPacientes();
        let fechaInicio = this.shadowRoot.querySelector('#fechaInicio');
        let fechaFin = this.shadowRoot.querySelector('#fechaFin');
        this.#enviarFechas(fechaInicio, fechaFin)
        this.#agregarTerapia();

    }

    #agregarEstilo() {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "https://unpkg.com/@picocss/pico@latest/css/pico.min.css");
        this.shadowRoot.appendChild(link);
    }
    
    #agregarNombrePaciente(){
        //sessionStorage.setItem('nombrePaciente', 'daniel reyes');
        if(sessionStorage.getItem('nombrePaciente')!= null){
            let nombrePaciente = sessionStorage.getItem('nombrePaciente')
            this.shadowRoot.querySelector("#nombrePaciente").value = nombrePaciente;
            this.shadowRoot.querySelector("#nombrePaciente").disabled = true;
            this.shadowRoot.querySelector("#buscarPacientes").disabled = true;
        }
    }

    #agregarTerapia() {
        const btnAgregarTerapia = this.shadowRoot.querySelector("#crearTerapiaButton");
        const fechaInicio = this.shadowRoot.querySelector("#fechaInicio");
        const fechaFin = this.shadowRoot.querySelector("#fechaFin");

        btnAgregarTerapia.addEventListener('click', function () {
            fetch("http://localhost:3000/api/terapias/" , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "terapia": {
                        "idPaciente": sessionStorage.getItem('idPaciente'),
                        "fechaInicio": fechaInicio.value,
                        "fechaFin": fechaFin.value,
                    }
                })
            })
                .then(response => response.json())
                .then(function (data) {
                    alert("Se ha guardado con éxito la terapia");
                    sessionStorage.setItem('idTerapia',data.id);
                    window.open("../views/agregarCalibracionAngulos.html");
                    window.close(this);
                }).catch(function (error) {
                    console.warn("Hubo algun error", error)
                })
        })

    }

    #getPacientes() {
        const botonBuscarPaciente = this.shadowRoot.querySelector("#buscarPacientes");
        let tablaPacientes = this.shadowRoot.querySelector('#tablaPacientes');
        botonBuscarPaciente.addEventListener('click', function () {
            fetch("http://localhost:3000/api/pacientes/", {
                method: 'GET',
                headers: {
                    'Content-Type': 'aplication/json',
                },

            })
                .then((response) => response.json())
                .then(data => {
                    tablaPacientes.innerHTML = ''
                    for (let valor of data) {
                        tablaPacientes.innerHTML += `
                    <tr>
                        <th scope="row">${valor.nombre}</th>
                    </tr>
                    `
                    }
                });
                
        });

    }

    #enviarFechas(fechaInicio, fechaFin) {
        let botoncontinuarRegistroTerapiaPaciente = this.shadowRoot.querySelector('#continuarRegistroTerapiaPaciente');
        botoncontinuarRegistroTerapiaPaciente, this.addEventListener('click', function () {

        })
    }
}

window.customElements.define("crearterapias-info", CrearTerapias);