class Reportes extends HTMLElement {

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
                <label for="busquedaPacienteEtiqueta">Nombre Paciente:</label> 
                <input type="text" id="busquedaPacienteEntrada">
                <label for="busquedaPacienteEtiqueta">Tipo de Reporte:</label> 
                <input type="text" id="busquedaTipoReporte">
                <label for="busquedaPacienteEtiqueta">Fecha de Sesion:</label> 
                <input type="text" id="fechaAplicacionSesion">
                <button id="botonBuscarPaciente">Buscar</button>
            </div>
            <p></p>
            <div id="periodoPaciente">  
            </div>
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
        this.#getPacientes(pacienteId);
        //this.#getFechas(pacienteId);      
    }

    #agregarEstilo() {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "https://unpkg.com/@picocss/pico@latest/css/pico.min.css");
        this.shadowRoot.appendChild(link);
    }

    #getPacientes(pacienteId) {
        let tablaPacientes = this.shadowRoot.querySelector('#tablaPacientes');
        let botonBuscarPaciente = this.shadowRoot.querySelector('#botonBuscarPaciente');
        let busquedaPacienteEntrada = this.shadowRoot.querySelector('#busquedaPacienteEntrada');
        botonBuscarPaciente.addEventListener('click', function () {
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
                        <td>${valor.idPaciente}</td>  
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

window.customElements.define("reportes-info", Reportes);