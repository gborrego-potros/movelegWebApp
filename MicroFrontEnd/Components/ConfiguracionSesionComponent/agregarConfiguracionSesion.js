class AgregarConfiguracionSesion extends HTMLElement {

    #urlService = 'http://localhost:3000/api/';
    #urlPacientes = this.#urlService + 'pacientes/';
    #urlUsers = this.#urlService + 'users/';
    #terapia = null;
    
    constructor() {
        super();
    }
    connectedCallback() {
        //let pacienteId = this.getAttribute("pacienteId");
        const shadow = this.attachShadow({ mode: "open" });
        
        this.#render(shadow);
        this.#agregarEstilo();
        this.#agregarNombrePaciente();
        this.#clickAgregarTerapia();

    }
    #render(shadow){
        shadow.innerHTML = `
        <div id="divPrincipal">
        <h1 id="calibracionTitulo">Calibracion</h1>

            <label for="nombrePaciente">Nombre</label>
            <input style="width:70%;" type="text" id="nombrePaciente">

        <div id="tobilloRodilla">
            <h2 id="configuracionTobilloRodilla">Configuración</h2>  

            <label for="nRepeticionesTobillo">Número. repeticiones tobillo:</label>
            <input style="width:70%;" type="text" id="nRepeticionesTobillo">


            <label for="nRepeticionesRodilla">Número. repeticiones rodilla:</label>
            <input style="width:70%;" type="text" id="nRepeticionesRodilla">

  
            <label for="pDisminucionRodillaD">Porcentaje Disminución rodilla d:</label>
            <input style="width:70%;" type="text" id="pDisminucionRodillaD">


            <label for="pDisminucionTobilloD">Porcentaje Disminución tobillo d:</label>
            <input style="width:70%;" type="text" id="pDisminucionTobilloD">

            <label for="porcentajeDisminucionRodillaV">Porcentaje Disminución rodilla v:</label>
            <input style="width:70%;" type="text" id="pDisminucionRobillaV">


            <label for="porcentajeDisminucionTobilloV">Porcentaje Disminución tobillo v:</label>
            <input style="width:70%;" type="text" id="pDisminucionTobilloV">

        </div>

        <div id="botonesCrearTerapias2">
        <button style="width:25%; display: inline; margin-left: 100px;" id="cancelarRegistroTerapiaPaciente2">Cancelar</button>
        <button style="width:25%; display: inline; margin-left: 15px;" id="guardarRegistroTerapiaPaciente">Guardar</button>
        </div>
        </div>
        `;
    }
    #agregarEstilo() {
        let link = document.createElement("link");
        link.setAttribute("id", "pagestyle");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "../css/pico-master/css/pico.min.css");
        this.shadowRoot.appendChild(link);
    }

    #agregarNombrePaciente(){
        this.#terapia = JSON.parse(sessionStorage.getItem('terapia'));
        this.shadowRoot.querySelector("#nombrePaciente").value = this.#terapia.nombrePaciente;
        this.shadowRoot.querySelector("#nombrePaciente").disabled = true;
    }
    
    #clickAgregarTerapia(){
        const btnAgregarTerapia = this.shadowRoot.querySelector("#guardarRegistroTerapiaPaciente");
        btnAgregarTerapia.addEventListener('click',(e) => this.#agregarTerapia()) 
    }

    #agregarTerapia() {
        const numeroRepeticionesTobillo = this.shadowRoot.querySelector("#nRepeticionesTobillo");
        const numeroRepeticionesRodilla = this.shadowRoot.querySelector("#nRepeticionesRodilla");
        const pDisminucionRodillaD = this.shadowRoot.querySelector("#pDisminucionRodillaD");
        const pDisminucionTobilloD = this.shadowRoot.querySelector("#pDisminucionTobilloD");
        const pDisminucionRobillaV = this.shadowRoot.querySelector("#pDisminucionRobillaV");
        const pDisminucionTobilloV = this.shadowRoot.querySelector("#pDisminucionTobilloV");
        console.log(pDisminucionRodillaD.value.type);
            fetch("http://localhost:3000/api/configuracionsesiones/" , { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "idTerapia": this.#terapia.idTerapia,
                    "numRepeticionesTobillo": numeroRepeticionesTobillo.value,
                    "numRepeticionesRodilla": numeroRepeticionesRodilla.value,
                    "porcentajeDisminucionRD": pDisminucionRodillaD.value,
                    "porcentajeDisminucionTD": pDisminucionTobilloD.value,
                    "porcentajeDisminucionTV": pDisminucionRobillaV.value,
                    "porcentajeDisminucionRV": pDisminucionTobilloV.value
                })
            })
            .then(response => response.json())
                .then(data =>{
                    alert("Se ha guardado con éxito la configuración");
                    this.#validarPantalla();
                }).catch(function (error) {
                    console.warn("Hubo algun error", error)
                })

        }

    //Esta función permite identificar de que pantalla proviene el usuario y redireccionar a la pantalla correcta.
    #validarPantalla(){
        if(sessionStorage.getItem('pantalla')){
            sessionStorage.clear();
            window.open("../views/busquedaPacientes.html");
            window.close(this);
        }else{
            window.open("../views/datosPaciente.html");
            window.close(this);
        }
    }

    
}

window.customElements.define("agregarconfiguracionsesion-info", AgregarConfiguracionSesion);