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
                <input style="width:50%;" type="text" id="nombrePaciente">
                <p></p>
                <label>Avance: 70% </label>
                <p></p>
                <label style="width:25%; display: inline; for="fechaInicio">Fecha Inicio:</label>
                <label style="width:25%; display: inline; margin-left: 130px" for="fechaFinal">Fecha Final:</label>
                <p></p>
                <input type="text" style="width:25%;  display: inline; id="fechaInicioTerapiaPaciente">
                <input type="text" style="width:25%;  display: inline; margin-left:50px" id="fechaFinTerapiaPaciente">
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
        let tablaDatosSesiones = this.shadowRoot.querySelector('#tablaPaciente');
        let parrafoDatosPaciente = this.shadowRoot.querySelector("#datosPaciente");
        let campoNombrePaciente = this.shadowRoot.querySelector('#nombrePaciente');
        let campoFechaInicio = this.shadowRoot.querySelector('#fechaInicioTerapiaPaciente');
        let campoFechaFin = this.shadowRoot.querySelector('#fechaFinTerapiaPaciente');
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
            //window.addEventListener('load', function(){
                console.log(data);
                console.log(data.fechaInicio);
                console.log(data.fechaFin);
                let primeraFecha = data.id;
                let segundaFecha = data.fechaFin;
                campoFechaInicio.value = primeraFecha;
                campoFechaFin.value = segundaFecha;
            //})
                //console.log(data);

                /*
                let pacientes = data.results;
                parrafoDatosPaciente.innerHTML =`
                    <p>${pacientes}</p>
                    `
                //let sesiones = data['data'];
  
                //for(let s of sesiones){
                    
                    
                    tablaDatosSesiones.innerHTML += `
                    <tr>
                        <td>${numSesion}</td>         
                        <td>${numRepeticiones}</td>
                        <td>${repeticiones}</td>
                        <td>${pDisminucion}</td>         
                        <td>Borrar</td>
                        <td><a>Ver más<a></td>
                    </tr>
                    `*/
                });
            //});
            
    }
}

window.customElements.define("datospaciente-info", DatosPaciente);