class BPacientes extends HTMLElement {
	#urlService = 'http://localhost:3000/api';
	#urlComments = '/terapias/';
    #terapias = null;

    constructor() {
		super();
	}
	
    connectedCallback() {
		const shadow = this.attachShadow({ mode: "open" });		 
		this.#agregaEstilo(shadow);	
		this.#render(shadow);
		this.#getPacientes(shadow);
	}		
	#agregaEstilo(shadow){
		let link = document.createElement("link");
		link.setAttribute("rel","stylesheet");
		link.setAttribute("href","https://unpkg.com/@picocss/pico@latest/css/pico.min.css");		
		shadow.appendChild(link);	
	}
	#render(shadow){
		shadow.innerHTML += `
        <div id="divPrincipal">
        <div>        
            <label for="busquedaPacienteEtiqueta">Buscar por Nombre:</label> 
            <input style="width:50%;" type="text" id="busquedaPacienteEntrada">   
        </div>
        <p></p>
        <div id="periodoPaciente">        
            <h3 for="busquedaPacienteEtiqueta">Periodo:</h3>
            <p></p>
            <label style="width:25%; display: inline;" for="fechaInicio">Fecha de Inicio:</label>
            <label style="width:25%; display: inline; margin-left: 200px" for="fechaFin">Fecha de Fin:</label>
            <p></p>
            <input style="width:25%; display: inline;" type="date" id="fechaFin">
            <input style="width:25%; display: inline; margin-left: 185px" type="date" id="fechaFin">
        </div>
        <button style="width:50%; margin-left: 200px;" id="botonBuscarPaciente">Buscar</button>
        <p></p>

        <div id="cantidad"></div>	  
        <div id="divComments" class="comments">
            <table role="grid">

            <tr>
                <td>Paciente</td>
                <td>Fecha Inicio</td>
                <td>Fecha Fin</td>
                <td></td>
            </tr>
            <tbody id="tablaPacientes">
            </tbody>
            </table> 
        </div>
			<template id="tmpComment">
                <tr>
                    <td id="Paciente"></td>
                    <td id="FechaInicio"></td>
                    <td id="FechaFin"></td>
                    <td id="VerMas"></td>
                </tr>         
			</template>	
        </div>      		
		`;		
	}

    #getPacientes(shadow) {  
        let botonBuscarPaciente = this.shadowRoot.querySelector('#botonBuscarPaciente');
        let busquedaPacienteEntrada = this.shadowRoot.querySelector('#busquedaPacienteEntrada');
        let datosPaciente;
        botonBuscarPaciente.addEventListener('click',(e) => this.#clickBusquedaPacientes(e,shadow))
    }

	#clickBusquedaPacientes(e, shadow){
		fetch(this.#urlService+this.#urlComments)
		  .then(response => response.json())
		  .then(comments => {
            this.#terapias = comments;
			console.log(this.#terapias);
            let span = shadow.querySelector("#cantidad");
			//span.innerHTML = comments.length;
			let div = shadow.querySelector("#tablaPacientes");
			let tmp = shadow.querySelector("#tmpComment");
			comments.forEach(c => this.#despliegaTabla(tmp,div,c));
		  });	
	}

	#despliegaTabla(tmp,div,comment){
		let clone = tmp.content.cloneNode(true);		 
		let element = clone.querySelector("#Paciente");
		element.innerHTML=comment.id;
		element = clone.querySelector("#FechaInicio");
		element.innerHTML=comment.fechaInicio.substring(0, 10);
        element = clone.querySelector("#FechaFin");
        element.innerHTML=comment.fechaFin.substring(0, 10);
        element = clone.querySelector("#VerMas");
        let linkTerapiaPaciente = document.createElement("a");
        linkTerapiaPaciente.innerHTML="Ver mas";
        linkTerapiaPaciente.id=comment.id-1;
        element.appendChild(linkTerapiaPaciente);
        linkTerapiaPaciente.addEventListener('click',(e) => this.#setJsonTerapia(e));
		div.appendChild(clone);
	}

    #setJsonTerapia(e){
        let idLink = e.currentTarget.id;
        console.log(idLink);
        let terapia = JSON.stringify(this.#terapias[idLink]);
        console.log(terapia);
        sessionStorage.setItem('terapia', terapia);
        window.open("../views/datosPaciente.html");
        window.close();
    }
    
}

window.customElements.define('bpacientes-info', BPacientes);