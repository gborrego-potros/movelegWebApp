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
        <div id="divAgregarPaciente">
        <h3>Agregar Nuevo Paciente</h3>
            <label for="name">Nombre del Paciente:</label>
            <input type="text" id="nombrePaciente">
        <p></p>
        <label for="fechaNacimiento">Fecha de Nacimiento:</label>
        <input type="date" id="fechaNacimiento">
        <p></p>
        <button id="agregarPaciente">Agregar</button>
        </div>
        <div id="divNombrePaciente">
            <h3>Buscar Paciente</h3>
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
        this.#agregarPaciente();
        const nombrePaciente = this.shadowRoot.querySelector("#eNombrePaciente");
        this.#getPacientes();
        let fechaInicio = this.shadowRoot.querySelector('#fechaInicio');
        let fechaFin = this.shadowRoot.querySelector('#fechaFin');
        this.#enviarFechas(fechaInicio, fechaFin)

    }

    #agregarEstilo() {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "../css/crearTerapia.css");
        this.shadowRoot.appendChild(link);
    }

    #agregarPaciente() {
        const botonAgregarPaciente = this.shadowRoot.querySelector("#agregarPaciente");
        const nombre = this.shadowRoot.querySelector("#nombrePaciente");
        const fechaNacimiento = this.shadowRoot.querySelector("#fechaNacimiento");
        botonAgregarPaciente.addEventListener('click', function () {
            fetch("http://localhost:3000/api/pacientes/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'aplication/json',
                },
                body: JSON.stringify(
                    {
                        "nombre": nombre.value,
                        "fechaNacimiento": "10/11/1998",            
                })
            })
            .then(response => response.json())
            .then(function (data) {
                alert("Se ha guardado con exito el paciente");
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
                        <th>${valor.nombre}</th>
                    </tr>
                    `
                        }
                    });
            });

        }
    #enviarFechas(fechaInicio, fechaFin){
            let botoncontinuarRegistroTerapiaPaciente = this.shadowRoot.querySelector('#continuarRegistroTerapiaPaciente');
            botoncontinuarRegistroTerapiaPaciente, this.addEventListener('click', function () {

            })
        }
}

window.customElements.define("crearterapias-info", CrearTerapias);