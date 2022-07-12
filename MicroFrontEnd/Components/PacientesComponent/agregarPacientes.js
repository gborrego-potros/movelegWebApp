class AgregarPaciente extends HTMLElement {

    #urlService = 'http://localhost:3000/api/';
    #urlPacientes = this.#urlService + 'pacientes/';
    #urlUsers = this.#urlService + 'users/';

    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        this.#render(shadow);
        this.#agregarEstilo(shadow);    
        this.#agregarPaciente(shadow);
    }

    #agregarEstilo(shadow) {
        let link = document.createElement("link");
        link.setAttribute("id", "pagestyle");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "https://unpkg.com/@picocss/pico@latest/css/pico.min.css");
        shadow.appendChild(link);
    }
    #render(shadow){
        shadow.innerHTML = `
        <div id="divPrincipal">
        <div id="divAgregarPaciente">
        <h3>Agregar Nuevo Paciente</h3>
            <div class="grid">
                <p>
                <label for="nombre">
                    Nombre
                    </label>
                <input style="width:50%;" type="text" id="nombre" name="nombre" placeholder="Nombre" required>
                
                <label for="piernaAfectada">
                    Pierna Afectada
                </label>
                <input style="width:50%;" type="text" id="piernaAfectada" name="piernaAfectada" placeholder="Pierna Afectada" required>
                </p>
                <p>
                <label style="margin-left:-80px;" for="patologia">
                    Patologia   
                </label>
                <input style="width:50%; margin-left:-80px;" type="text" id="patologia" name="patologia" placeholder="Patologia" required>

                <label style="margin-left:-80px;" for="fechaNacimiento">Fecha de Nacimiento</label>

                <input style="width:50%; margin-left:-80px;" type="date" id="fechaNacimiento" name="fechaNacimiento" required>
                </p>
            </div>  
        <button style="width:50%; margin-left: 200px; " alignt" id="agregarPaciente">Agregar</button>
        </div>
        `;
    }
    #agregarPaciente(shadow) {
        const botonAgregarPaciente = this.shadowRoot.querySelector("#agregarPaciente");
        const nombre = this.shadowRoot.querySelector("#nombre");
        const fechaNacimiento = this.shadowRoot.querySelector("#fechaNacimiento");
        const piernaAfectada = this.shadowRoot.querySelector("#piernaAfectada");
        const patologia = this.shadowRoot.querySelector("#patologia");
        
        //botonAgregarPaciente.addEventListener('click',(e) => this.#clickAgregarPaciente(e, nombre,fechaNacimiento,piernaAfectada,patologia,shadow))
        botonAgregarPaciente.onclick = (e) => this.#clickAgregarPaciente(e, nombre,fechaNacimiento,piernaAfectada,patologia,shadow);
    }


    #clickAgregarPaciente(e, nombre,fechaNacimiento,piernaAfectada,patologia,shadow){
        
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
            .then(response => response.json())
            .then(data => {
                alert("Se ha guardado con éxito el paciente");
                let terapia = this.#crearStringJSON(data.id, data.nombre);
                //sessionStorage.setItem('idPaciente',data.id);
                //sessionStorage.setItem('nombrePaciente',data.nombre);
                sessionStorage.setItem('terapia',terapia);
                window.open("../views/agregarTerapia.html");
                window.close(this);
            }).catch(function (error) {
                console.warn("Hubo algun error", error)
            })
    }

    #crearStringJSON(idPaciente, nombrePaciente){
        let terapia = {};
        terapia.idPaciente=idPaciente;
        terapia.nombrePaciente=nombrePaciente;
        return JSON.stringify(terapia);
    }
}

window.customElements.define("agregarpaciente-info", AgregarPaciente);