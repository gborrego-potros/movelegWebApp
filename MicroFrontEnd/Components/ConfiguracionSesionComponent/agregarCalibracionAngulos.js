class AgregarCalibracionAngulos extends HTMLElement {

    #urlService = 'http://localhost:3000/api/';
    #urlPacientes = this.#urlService + 'pacientes/';
    #urlUsers = this.#urlService + 'users/';
    #terapia = null;

    constructor() {
        super();
    }
    connectedCallback() {
        //let pacienteId = this.getAttribute("pacienteId");
        const shadow  = this.attachShadow({ mode: "open" });
        
        this.#render(shadow);
        this.#agregarEstilo();
        this.#agregarNombrePaciente();
        this.#clickAgregarTerapia();

    }
    #render(shadow){
        shadow.innerHTML = `
        <h1 id="calibracionTitulo">Calibracion</h1>

            <label for="nombrePaciente">Nombre</label>
            <input style="width:50%;" type="text" id="nombrePaciente" name="nombrepaciente">

        <div id="angulos">
            <h2 id="angulosTitulo">Ángulos</h2>

            <label for="anguloFlexionCadera">Ángulo flexión de cadera:</label>
            <input style="width:50%;" type="number" id="anguloFlexionCadera">

            <label for="anguloFlexionRodilla">Ángulo flexión de rodilla:</label>
            <input style="width:50%;" type="number" id="anguloFlexionRodilla">

            <label for="anguloDorsiflexion">Ángulo de dorsiflexión:</label>
            <input style="width:50%;" type="number" id="anguloDorsiflexion">

            <label for="anguloPlantarFlexion">Ángulo plantar flexión:</label>
            <input style="width:50%;" type="number" id="anguloPlantarFlexion">

        </div>
        <div id="botonesCrearTerapias2">
        <button style="width:25%; display: inline; margin-left: 100px;" id="cancelarRegistroTerapiaPaciente2">Cancelar</button>
        <button style="width:25%; display: inline; margin-left: 15px;" id="guardarRegistroTerapiaPaciente">Guardar</button>
        </div>
        `; 
    }
    #agregarEstilo() {
        let link = document.createElement("link");
        link.setAttribute("id", "pagestyle");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "https://unpkg.com/@picocss/pico@latest/css/pico.min.css");
        this.shadowRoot.appendChild(link);
    }

    #agregarNombrePaciente(){
        this.#terapia = JSON.parse(sessionStorage.getItem('terapia'));
        this.shadowRoot.querySelector("#nombrePaciente").value = this.#terapia.nombrePaciente;
        this.shadowRoot.querySelector("#nombrePaciente").disabled = true;
    }
    
    #clickAgregarTerapia() {
        const btnAgregarTerapia = this.shadowRoot.querySelector("#guardarRegistroTerapiaPaciente");
        btnAgregarTerapia.addEventListener('click',(e) => this.#agregarTerapia(e)) 

    }

    #agregarTerapia(e){
        const anguloFlexionCadera = this.shadowRoot.querySelector("#anguloFlexionCadera");
        const anguloFlexionRodilla = this.shadowRoot.querySelector("#anguloFlexionRodilla");
        const anguloDorsiflexion = this.shadowRoot.querySelector("#anguloDorsiflexion");
        const anguloPlantarFlexion = this.shadowRoot.querySelector("#anguloPlantarFlexion");

        fetch("http://localhost:3000/api/calibraciones/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "idTerapia": this.#terapia.idTerapia,
                    "anguloFlexionCadera": anguloFlexionCadera.value,
                    "anguloFlexionRodilla": anguloFlexionRodilla.value,
                    "anguloDorsiflexion": anguloDorsiflexion.value,
                    "anguloPlantarFlexion": anguloPlantarFlexion.value
                })

            })
                .then(response => response.json())
                .then(data => {
                    alert("Se ha guardado con éxito la calibración");
                    this.#validarPantalla(e);
                }).catch(function (error) {
                    console.warn("Hubo algun error", error)
                })
    }


    //Esta función permite identificar de que pantalla proviene el usuario y redireccionar a la pantalla correcta.
    #validarPantalla(e){
        if(sessionStorage.getItem('pantalla')){
            window.open("../views/agregarConfiguracionSesion.html");
            window.close(this);
        }else{
            window.open("../views/datosPaciente.html");
            window.close(this);
        }
    }

}


window.customElements.define("agregarcalibracionangulos-info", AgregarCalibracionAngulos);