class DatosPaciente extends HTMLElement {

    #urlService = 'http://localhost:3000/api/';
    #urlPacientes = this.#urlService + 'pacientes/';
    #urlUsers = this.#urlService + 'users/';
    #terapia = null;

    constructor() {
        super();
    }
    connectedCallback() {
        let pacienteId = this.getAttribute("pacienteId");
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
        <div id="divPrincipal">
            <div id="busquedaPacienteEntrada">        
                <label>Paciente: </label>
                <input style="width:50%;" type="text" id="nombrePaciente" disabled>
                <p></p>
                <label>Avance: 70% </label>
                <p></p>
                <label style="width:25%; display: inline; for="fechaInicio">Fecha Inicio:</label>
                <label style="width:25%; display: inline; margin-left: 130px" for="fechaFinal">Fecha Final:</label>
                <p></p>
                <input style="width:25%; type="text" display: inline; id="fechaInicioTerapia" disabled>
                <input style="width:25%; type="text" display: inline; margin-left:70px" id="fechaFinTerapia" disabled>
            </div>
            <p>
            <hr></hr>
            </p>
            <h3>Sesiones</h3>
            <div id="tablaPacientesDiv">
                <section style="overflow:auto; width:100%; height:500px;">
                <table>
                <thead>
                <tr>
                    <th>Sesion</th>
                    <th># Repeticiones Rodilla</th>
                    <th># Repeticiones Tobillo</th>
                    <th>% Disminucion Rodilla Derecha</th>
                    <th>% Disminucion Tobillo Derecho</th>
                    <th>% Disminucion Rodilla Izquierda</th>
                    <th>% Disminucion Tobillo Izquierdo</th>
                </tr>
                </thead>

                <tbody id ="tablaConfiguracionPaciente">

                </tbody>
            </table>
                </section>
            </div>
            <div id="botonesAgregarSesionesPaciente">
            <button style="width:25%; display: inline;" id="botonAgregarConfiguracion">Agregar Configuración</button> 
            <button style="width:25%; display: inline; margin-left: 15px;" id="botonGenerarReporte">Generar Reporte</button> 
            <button style="width:25%; display: inline; margin-left: 15px;" id="botonAgregarSesion">Agregar Sesión</button>
            </div> 
            </div>`;
        
        this.#agregarEstilo();
        this.#getDatosTerapia();
        this.#cambiarPantalla();    
    }
    
    #agregarEstilo() {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "https://unpkg.com/@picocss/pico@latest/css/pico.min.css");
        this.shadowRoot.appendChild(link);
    }
    
    #getDatosTerapia() {
        let campoFechaInicio = this.shadowRoot.querySelector('#fechaInicioTerapia');
        let campoFechaFin = this.shadowRoot.querySelector('#fechaFinTerapia');
        let tablaDatosSesiones = this.shadowRoot.querySelector('#tablaConfiguracionPaciente');
        let campoNombrePaciente = this.shadowRoot.querySelector('#nombrePaciente');
        this.#terapia = JSON.parse(sessionStorage.getItem('terapia'));
        fetch("http://localhost:3000/api/configuracionsesiones/terapia/",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "terapia": this.#terapia.id
            })

        })
            .then(response => response.json())
            .then(data => 
            {   
                //Asignar valores a los campos de las fechas
                console.log(data);
                let primeraFecha = this.#terapia.fechaInicio.substring(0, 10);
                let segundaFecha = this.#terapia.fechaFin.substring(0, 10);
                campoFechaInicio.value = primeraFecha;
                campoFechaFin.value = segundaFecha;
                // let idPaciente = data.idPaciente;
                // sessinStorage.setItem('idPaciente', idPaciente);
                let i=0;
                for (let j = 0; j < 100; j++) {
                    tablaDatosSesiones.innerHTML += `
                        <tr>
                        <td>${data[i].id}</td>
                        <td>${data[i].numRepeticionesRodilla}</td>
                        <td>${data[i].numRepeticionesTobillo}</td>
                        <td>${data[i].porcentajeDisminucionRD}</td>
                        <td>${data[i].porcentajeDisminucionTD}</td>
                        <td>${data[i].porcentajeDisminucionTV}</td>
                        <td>${data[i].porcentajeDisminucionRV}</td>
                        </tr>   
                    `; 
                }
               
            });  

            /*numRepeticionesTobillo
            numRepeticionesRodilla
            porcentajeDisminucionRD
            porcentajeDisminucionTD
            porcentajeDisminucionTV
            porcentajeDisminucionRV */
                    
    }

    #cambiarPantalla(){
        let botonAgregarConfiguracion = this.shadowRoot.querySelector("#botonAgregarConfiguracion");
        botonAgregarConfiguracion.addEventListener('click' , function(){
            sessionStorage.setItem('pantalla', true);
            window.open("../views/agregarConfiguracionSesion.html");
            window.close(this);
        })
    }
}

window.customElements.define("datospaciente-info", DatosPaciente);