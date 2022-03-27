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
        <div id="divPrincipal">
        <div id="nombrePaciente">
            <label for="name">Nombre del Paciente:</label>
            <input type="text" id="eNombrePaciente">
            <button id="buscarPacientes">Buscar</button>
        </div>
        <div >
        <table border="1" >   
            <thead>
                <tr>
                    <th>Paciente</th>
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
        <button id="continuarRegistroTerapiaPaciente">Continuar</button>
        </div>
        </div>
        `;

        this.#agregarEstilo();
        const nombrePaciente = this.shadowRoot.querySelector("#eNombrePaciente");
        this.#getPacientes(nombrePaciente);
        let fechaInicio = this.shadowRoot.querySelector('#fechaInicio');
        let fechaFin = this.shadowRoot.querySelector('#fechaFin');
        this.#enviarFechas(fechaInicio,fechaFin)

    }

    #agregarEstilo() {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "../css/crearTerapia.css");
        this.shadowRoot.appendChild(link);
    }

    #getPacientes(nombrePaciente) {
        const botonBuscarPaciente = this.shadowRoot.querySelector("#buscarPacientes");
        let tablaPacientes = this.shadowRoot.querySelector('#tablaPacientes');
        botonBuscarPaciente.addEventListener('click', function () {
            fetch(this.#urlService + nombrePaciente, {
                method: 'GET',
                headers: {
                    'Content-Type': 'aplication/json',
                },

            })
                .then((response) => response.json())
                .then(function (data) {
                    let pacientes = data['data'];
                    for (let s of pacientes) {
                        tablaPacientes.innerHTML += `
                    <tr>
                        <th>${nombre}</th>
                    </tr>
                    `
                    }
                });
        });

    }
    #enviarFechas(fechaInicio,fechaFin){
        let botoncontinuarRegistroTerapiaPaciente = this.shadowRoot.querySelector('#continuarRegistroTerapiaPaciente');
        botoncontinuarRegistroTerapiaPaciente,this.addEventListener('click',function(){

        })
    }
}

window.customElements.define("crearterapias-info", CrearTerapias);