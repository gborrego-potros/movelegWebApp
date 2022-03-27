class BusquedaPacientes extends HTMLElement {

    #urlService = 'http://localhost:3000/api/';
    #urlPacientes = this.#urlService + 'pacientes/';
    #urlUsers = this.#urlService + 'users/';

    constructor() {
        super();
    }
    connectedCallback() {
        let pacienteId = this.getAttribute("pacienteId");
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
        <div id="divPrincipal">
            <div id="busquedaPacienteEntrada">        
                <label for="busquedaPacienteEtiqueta">Buscar por:</label> 
                <input type="text" id="busquedaPacienteEntrada">
                <button id="botonBuscarPaciente">Buscar</button>
            </div>
            <p></p>
            <div id="periodoPaciente">        
                <label for="busquedaPacienteEtiqueta">Periodo:</label>
                <button id="botonFechaInicio">Fecha Inicio</button> 
                <button id="botonFechaFin">Fecha fin</button>
            </div>
            <div id="tablaPacientesDiv">
                <section>
                <table id="">
                <tr>
                    <td>Paciente</td>
                    <td>Fecha Inicio</td>
                    <td>Fecha Fin</td>
                    <td>Prox. Sesión</td>
                    <td>Avance</td>
                    <td></td>
                    <td></td>
                </tr>
                <tbody id ="tablaPacientes">

                </tbody>
                <div id="divPaarrafoPacientes"></div>
            </table>
                </section>
            </div>
            </div>`;

        this.#agregarEstilo();
        this.#getPacientes(pacienteId);
    }

    #agregarEstilo() {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "../css/busquedaPacientes.css");
        this.shadowRoot.appendChild(link);
    }

    #getPacientes(pacienteId) {
        let tablaPacientes = this.shadowRoot.querySelector('#tablaPacientes');
        let botonBuscarPaciente = this.shadowRoot.querySelector('#botonBuscarPaciente');
        let busquedaPacienteEntrada = this.shadowRoot.querySelector('#busquedaPacienteEntrada');
        let parrafoDatosPaciente = this.shadowRoot.querySelector('#divPaarrafoPacientes');
        botonBuscarPaciente.addEventListener('click', function () {
            fetch("http://localhost:3000/api/pacientes/" , {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then(function (data) {
                    console.log(data);
                    let pacientes = data.results;
                    parrafoDatosPaciente.innerHTML =`
                    <p>${pacientes}</p>
                    `
                    //let pacientes = data['data'];
                    /*
                    for (let s of pacientes) {
                        tablaPacientes.innerHTML = `
                    <tr>
                        <td>${nombre}</td>         
                        <td>${fechaInicioTerapia}</td>
                        <td>${fechaFinTerapia}2</td>
                        <td>${proximaSesion}</td>         
                        <td>${avance}/td>
                        <td><a>Ver más<a></td>
                        <td>Borrar</td>
                    </tr>
                    `
                    }*/
                });
        })

    }
}

window.customElements.define("busquedapacientes-info", BusquedaPacientes);