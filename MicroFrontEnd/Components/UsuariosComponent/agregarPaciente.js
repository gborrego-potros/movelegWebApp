class AgregarPaciente extends HTMLElement {

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
        <form>
            <div class="grid">
                <p>
                <label for="nombre">
                    Nombre
                    <input type="text" id="nombre" name="nombre" placeholder="Nombre" required>
                </label>
                
                <label for="piernaAfectada">
                    Pierna Afectada
                    <input type="text" id="piernaAfectada" name="piernaAfectada" placeholder="Pierna Afectada" required>
                </label>
                </p>
                <p>
                <label for="patologia">
                    Patologia   
                    <input type="text" id="patologia" name="patologia" placeholder="Patologia" required>
                </label>
                <label for="fechaNacimiento">Fecha de Nacimiento</label>
                <input type="date" id="fechaNacimiento" name="fechaNacimiento" required>
                </p>
            </div>  
        <button id="agregarPaciente">Agregar</button>
        <a href='../views/crearTerapia.html'>Siguiente</a>
        </form>
        </div>

        `;

        this.#agregarEstilo();
        this.#agregarPaciente();
        const nombrePaciente = this.shadowRoot.querySelector("#eNombrePaciente");
        //this.#getPacientes();
       
    }

    #agregarEstilo() {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "https://unpkg.com/@picocss/pico@latest/css/pico.min.css");
        this.shadowRoot.appendChild(link);
    }

    #agregarPaciente() {
        const botonAgregarPaciente = this.shadowRoot.querySelector("#agregarPaciente");
        const nombre = this.shadowRoot.querySelector("#nombre");
        const fechaNacimiento = this.shadowRoot.querySelector("#fechaNacimiento");
        const piernaAfectada = this.shadowRoot.querySelector("#piernaAfectada");
        const patologia = this.shadowRoot.querySelector("#patologia");
        botonAgregarPaciente.addEventListener('click', function () {
            fetch("http://localhost:3000/api/pacientes/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({     
                        "nombre": nombre.value,
                        "fechaNacimiento": fechaNacimiento.value,
                        "piernaAfectada": piernaAfectada.value,
                        "patologia": patologia.value 
                })
            })
                .then(response => response.json(console.log()))
                .then(function (data) {
                    alert("Se ha guardado con exito el sorteo");
                }).catch(function (error) {
                    console.warn("Hubo algun error", error)
                })
        }) 
    }
}

window.customElements.define("agregarpaciente-info", AgregarPaciente);