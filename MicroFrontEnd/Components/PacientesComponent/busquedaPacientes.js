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
                <p></p>
                <label for="fechaInicio">Fecha de Inicio:</label>
                <input type="date" id="fechaInicio">
                <label for="fechaFin">Fecha de Fin:</label>
                <input type="date" id="fechaFin">
            </div>
            <p></p>
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
            </table>
                </section>
            </div>
            </div>`;

        this.#agregarEstilo();
        this.#getPacientes(pacienteId);
        //this.#getFechas(pacienteId);      
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
                   /* 
                    tablaPacientes.innerHTML = ''
                    for (let valor of data) {
                        tablaPacientes.innerHTML += `
                        <tr>
                        <td>${valor.nombre}</td> 
                        <td>${valor.fechaInicio}</td>    
                        </tr>                  
                    `;
                    
                    }*/

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
                        <td>${valor.fechaInicio}</td>  
                        <td>${valor.fechaFin}</td>   
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