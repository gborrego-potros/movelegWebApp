class AgregarTerapias extends HTMLElement {

    #urlService = 'http://localhost:3000/api/';
    #urlPacientes = this.#urlService + 'pacientes/';
    #urlUsers = this.#urlService + 'users/';
    #terapia = null;

    constructor() {
        super();
    }
    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        
        this.#render(shadow);
        this.#agregarEstilo();
        this.#agregarNombrePaciente();
        //const nombrePaciente = this.shadowRoot.querySelector("#eNombrePaciente");
        this.#getPacientes();
        this.#clickAgregarTerapia();
    }

    #render(shadow){
        shadow.innerHTML = ` 
        <div id="divNombrePaciente">
            <h3>Buscar Paciente</h3>
            <label for="name">Nombre del Paciente:</label>
            <input style="width:50%;" type="text" id="nombrePaciente">
            <button style="width:50%;" id="buscarPacientes">Buscar</button>
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

                <label style="width:25%; display: inline;" for="fechaInicio">Fecha de Inicio:</label>
                <label style="width:25%; display: inline; margin-left: 160px" for="fechaFin">Fecha de Fin:</label>
                <p></p>
                <input style="width:25%; display: inline;" type="date" id="fechaInicio">
                <input style="width:25%; display: inline; margin-left: 15px" type="date" id="fechaFin">

        </div>

        <div id="botonesCrearTerapias">
        <button style="width:25%; display: inline; " id="cancelarRegistroTerapiaPaciente">Cancelar</button>
        <button style="width:25%; display: inline; margin-left: 15px;" id="crearTerapiaButton">Continuar</button>
        </div>
        </div>
        `;
    }
    #agregarEstilo() {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "https://unpkg.com/@picocss/pico@latest/css/pico.min.css");
        this.shadowRoot.appendChild(link);
    }
    
    #agregarNombrePaciente(){
        if(sessionStorage.getItem('terapia')!= null){
            this.#terapia = JSON.parse(sessionStorage.getItem('terapia'));
            this.shadowRoot.querySelector("#nombrePaciente").value =  this.#terapia.nombrePaciente;
            this.shadowRoot.querySelector("#nombrePaciente").disabled = true;
            this.shadowRoot.querySelector("#buscarPacientes").disabled = true;
        }
    }

    #clickAgregarTerapia() {
        const btnAgregarTerapia = this.shadowRoot.querySelector("#crearTerapiaButton");
        btnAgregarTerapia.onclick = (e) => this.#agregarTerapia(e)
    }

    #agregarTerapia(e) {
        const fechaInicio = this.shadowRoot.querySelector("#fechaInicio");
        const fechaFin = this.shadowRoot.querySelector("#fechaFin");

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
            .then(data => {
                alert("Se ha guardado con éxito la terapia");
                this.#terapia.idTerapia = data.id;
                sessionStorage.setItem('terapia', JSON.stringify(this.#terapia));
                sessionStorage.setItem('pantalla', true);
                window.open("../views/agregarCalibracionAngulos.html");
                window.close(this);
            }).catch(function (error) {
                console.warn("Hubo algun error", error)
            })
    }

    //#endregion
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

}

window.customElements.define("agregarterapias-info", AgregarTerapias);