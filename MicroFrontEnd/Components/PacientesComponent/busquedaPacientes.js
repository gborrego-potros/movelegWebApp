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
            <div>        
                <label for="busquedaPacienteEtiqueta">Buscar por Nombre:</label> 
                <input style="width:50%;" type="text" id="busquedaPacienteEntrada">
                
            </div>
            <p></p>
            <div id="periodoPaciente">        
                <h3 for="busquedaPacienteEtiqueta">Periodo:</h3>
                <p></p>
                <label style="width:25%; display: inline;" for="fechaInicio">Fecha de Inicio:</label>
                <label style="width:25%; display: inline; margin-left: 200px" for="fechaFin">Fecha de Fin:</label>
                <p></p>
                <input style="width:25%; display: inline;" type="date" id="fechaInicio">
                <input style="width:25%; display: inline; margin-left: 50px" type="date" id="fechaFin">
            </div>
            <button style="width:50%; margin-left: 200px;" id="botonBuscarPaciente">Buscar</button>
            <p></p>
            <div id="tablaPacientesDiv">
                <section>
                <table role="grid">
                <tr>
                    <td>Paciente</td>
                    <td>Fecha Inicio</td>
                    <td>Fecha Fin</td>
                    <td></td>
                </tr>
                <tbody id ="tablaPacientes">
                </tbody>
            </table>
                </section>
            </div>
            </div>`;

        this.#agregarEstilo();
        this.#getPacientes();
        //this.#getFechas(pacienteId);      
    }

    #agregarEstilo() {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "https://unpkg.com/@picocss/pico@latest/css/pico.min.css");
        this.shadowRoot.appendChild(link);
    }

    #getPacientes() {
        let tablaPacientes = this.shadowRoot.querySelector('#tablaPacientes');
        let botonBuscarPaciente = this.shadowRoot.querySelector('#botonBuscarPaciente');
        let busquedaPacienteEntrada = this.shadowRoot.querySelector('#busquedaPacienteEntrada');
        let datosPaciente;
        botonBuscarPaciente.addEventListener('click', function () {
            fetch("http://localhost:3000/api/pacientes/", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    }
                })
                .then(response => response.json())
                .then(data => {
                    datosPaciente = data;
                });
                fetch("http://localhost:3000/api/terapias/", {
                     method: 'GET',
                    headers: {
                       'Content-Type': 'application/json',
                    }
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    let contador =0;
                    tablaPacientes.innerHTML = ''
                    for (let valor of data) { 
                        terapiaInfo:
                        tablaPacientes.innerHTML += `
                        <tr>
                        <td>${datosPaciente[contador].nombre}</td> 
                        <td>${valor.fechaInicio.substring(0, 10)}</td>  
                        <td>${valor.fechaFin.substring(0, 10)}</td> 
                        <td><a href="../views/datosPaciente.html" onClick="sessionStorage.setItem('idPaciente',${valor.idPaciente})">ver mas</a></td>
                        </tr>                  
                    `;
                    contador = contador+1;
                    }

                });
        })
    }

    #getPacientesNombre() {
        let tablaPacientes = this.shadowRoot.querySelector('#tablaPacientes');
        let botonBuscarPaciente = this.shadowRoot.querySelector('#botonBuscarPaciente');
        let busquedaPacienteEntrada = this.shadowRoot.querySelector('#busquedaPacienteEntrada');
        let datosPaciente;
        botonBuscarPaciente.addEventListener('click', function () {
            fetch("http://localhost:3000/api/pacientes/", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    }
                })
                .then(response => response.json())
                .then(data => {
                    datosPaciente = data;
                });
                fetch("http://localhost:3000/api/terapias/", {
                     method: 'GET',
                    headers: {
                       'Content-Type': 'application/json',
                    }
                })
                .then(response => response.json())
                .then(data => {
                    let contador =0;
                    tablaPacientes.innerHTML = ''
                    for (let valor of data) {   
                        tablaPacientes.innerHTML += `
                        <tr>
                        <td>${datosPaciente[contador].nombre}</td> 
                        <td>${valor.fechaInicio.substring(0, 10)}</td>  
                        <td>${valor.fechaFin.substring(0, 10)}</td> 
                        <td>ver mas</td>
                        </tr>                  
                    `;
                    contador = contador+1;
                    }

                });
        })
        

    }
    /*
    #getFechas(pacienteId){
        let tablaPacientes = this.shadowRoot.querySelector('#tablaPacientes');
        botonBuscarPaciente.addEventListener('click', function () {
        fetch("http://localhost:3000/api/terapias/" ,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data =>{
            console.log(data);
            for(let valor of data){
                tablaPacientes.innerHTML += `
                        <tr>
                        <td>${valor.fechaInicio}</td>  
                        <td>${valor.fechaFin}</td>   
                        <td>hola</td>     
                        </tr>                  
                    `
            }
            
        })
    })
}*/
}

window.customElements.define("busquedapacientes-info", BusquedaPacientes);