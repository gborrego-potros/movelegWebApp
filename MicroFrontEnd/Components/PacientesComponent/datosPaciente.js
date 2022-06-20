class DatosPaciente extends HTMLElement {

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
                <label>Paciente: </label>
                <input style="width:50%;" type="text" id="nombrePaciente" disabled>
                <p></p>
                <label>Avance: 70% </label>
                <p></p>
                <label style="width:25%; display: inline; for="fechaInicio">Fecha Inicio:</label>
                <label style="width:25%; display: inline; margin-left: 130px" for="fechaFinal">Fecha Final:</label>
                <p></p>
                <input style="width:25%; type="text" display: inline; id="fechaInicioTerapia" disabled>
                <input style="width:25%; type="text" display: inline; margin-left:50px" id="fechaFinTerapia" disabled>
            </div>
            <p>
            <hr></hr>
            </p>
            <h3>Sesiones</h3>
            <div id="tablaPacientesDiv">
                <section>
                <table >
                <tr>
                    <th>Sesion</th>
                    <th>Núm. Repeticiones</th>
                    <th>Repeticiones</th>
                    <th>% Disminucion</th>
                    <th></th>
                    <th></th>
                </tr>
            
                <tbody id ="tablaPaciente">

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
        let tablaDatosSesiones = this.shadowRoot.querySelector('#tablaPaciente');
        let campoNombrePaciente = this.shadowRoot.querySelector('#nombrePaciente');
        let idTerapia = sessionStorage.getItem('idTerapia');

        console.log(idTerapia);
        fetch("http://localhost:3000/api/terapias/" + idTerapia ,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }, 
        })
            .then(response => response.json())
            .then(data => 
            {   
                //Asignar valores a los campos de las fechas
                let primeraFecha = data.fechaInicio.substring(0, 10);
                let segundaFecha = data.fechaFin.substring(0, 10);
                campoFechaInicio.value = primeraFecha;
                campoFechaFin.value = segundaFecha;
                let idPaciente = data.idPaciente;
                sessionStorage.setItem('idPaciente', idPaciente);
            });

            fetch("http://localhost:3000/api/pacientes/" + sessionStorage.getItem('idPaciente') ,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }, 
            })
                .then(response => response.json())
                .then(data => 
                {   
                    campoNombrePaciente.value = data.nombre;
                }).catch(function (error) {
                    console.warn("Hubo algun error", error)
                });
            
            fetch("http://localhost:3000/api/configuracionsesiones/terapia/" ,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }, 
                    body: JSON.stringify({
                        "terapia": idTerapia
                    })
                })
                    .then(response => response.json())
                    .then(data => 
                    {   
                        console.log(data);
                        tablaDatosSesiones.innerHTML+=`
                        <tr>
                        <td>${data[0].id}</td> 
                        <td>${data[0].numRepeticionesTobillo}</td>  
                        <td>${data[0].numRepeticionesRodilla}</td> 
                        <td>${data[0].porcentajeDisminucionRD}</td>
                        </tr>
                        `;
                    }).catch(function (error) {
                        console.warn("Hubo algun error", error)
                    });   
     
    }
}

window.customElements.define("datospaciente-info", DatosPaciente);