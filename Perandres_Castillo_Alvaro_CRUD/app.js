//INPUTS DEL CONTROL DE FORMLARIOS
const b_añadir = document.querySelector("#m_añadir");
const b_buscar = document.querySelector("#m_buscar");

//FORMULARIOS
const form_añadir = document.querySelector("#libro-formu");
const form_buscar = document.querySelector("#libro-busqueda");
const form_editar = document.querySelector("#libro-editar");

//INPUTS DEL FORMULARIO DE NUEVO LIBRO
const titulo = document.querySelector("#titulo");
const autor = document.querySelector("#autor");
const precio = document.querySelector("#precio");
const portada = document.querySelector("#portada");
const comprar = document.querySelector("#comprar");
const b_nuevo = document.querySelector("#nuevo");


//DIV DEL MODAL BOOSTRAP PARA PODER QUITARLO Y PONERLO
const editar_modal = document.querySelector("#editarModal");

//INPUTS DEL FORMULARIO DE EDITAR LIBRO
const editar_titulo = document.querySelector("#editarTitulo");
const editar_autor = document.querySelector("#editarAutor");
const editar_precio = document.querySelector("#editarPrecio");
const editar_portada = document.querySelector("#editarPortada");
const editar_comprar = document.querySelector("#editarComprar");
const editar_clave_libro = document.querySelector("#claveLibro")
const b_editar = document.querySelector("#editar");


//INPUTS DEL FORMULARIO DE BUSCAR
const busqueda = document.querySelector("#busqueda");
const buscar = document.querySelector("#buscar");
const criterio = document.querySelector("#criterio");

//INPUTS DE ORDENACION
const ord_desc_titulo = document.querySelector("#ordenar_desc");
const ord_asc_precio = document.querySelector("#ordenar_asc");

//TABLA DE LIBROS
const tabla_libros = document.querySelector("#libro-list");

//CONTROL DE FORMULARIOS
b_añadir.addEventListener("click",
	() => {
		if (form_añadir.classList.contains("d-none")) {
			form_buscar.classList.add("d-none");
			form_añadir.classList.remove("d-none");
			b_buscar.disabled = "disabled";
			b_añadir.value = "Quitar formulario";
		} else {
			form_añadir.classList.add("d-none");
			b_buscar.disabled = "";
			b_añadir.value = "Añadir movil";
		}
	});

b_buscar.addEventListener("click",
	() => {
		if (form_buscar.classList.contains("d-none")) {
			form_añadir.classList.add("d-none");
			form_buscar.classList.remove("d-none");
			b_añadir.disabled = "disabled";
			b_buscar.value = "Quitar formulario";
		} else {
			form_buscar.classList.add("d-none");
			b_añadir.disabled = "";
			b_buscar.value = "Buscar movil";
		}
	});

//GESTION DE BUSQUEDA
buscar.addEventListener("click",
	(evento) => {
		evento.preventDefault();

		const libros=Object.values(sessionStorage).map(
			(libro)=>{
				return JSON.parse(libro);
			}
		);
		const libros_filtrados=libros.filter(
			(libro)=>{
				return libro[criterio.value].
				       includes(busqueda.value.trim());
			}
		);
		//VACIAR LA TABLA	
		tabla_libros.innerHTML="";
		libros_filtrados.forEach(
			(libro)=>{
				tabla_libros.appendChild(nuevoLibro(libro));
			}
		)

	});


//GESTION DE ORDENACION

ord_asc_precio.addEventListener("click",
	(evento) => {
		evento.preventDefault();

		//PASAR EL SESSIONSTORAGE A UN ARRAY DE OBJETOS JSON
		const libros=Object.values(sessionStorage).map(
			(libro)=>{
				return JSON.parse(libro);
			}
		);
		//FILTRADO
		const libros_filtrados=libros.filter(
			(libro)=>{
				return libro[criterio.value].
				       includes(busqueda.value.trim());
			}
		);
		//ORDENACION
		const libros_ordenados=libros_filtrados.sort(
			(a,b)=>{
				return a["precio"]-b["precio"];
			}
		)

		//VACIAR LA TABLA	
		tabla_libros.innerHTML="";
		libros_ordenados.forEach(
			(libro)=>{
				tabla_libros.appendChild(nuevoLibro(libro));
			}
		)
	});


ord_desc_titulo.addEventListener("click",
	(evento) => {
		evento.preventDefault();

		//PASAR EL SESSIONSTORAGE A UN ARRAY DE OBJETOS JSON
		const libros=Object.values(sessionStorage).map(
			(libro)=>{
				return JSON.parse(libro);
			}
		);
		//FILTRADO
		const libros_filtrados=libros.filter(
			(libro)=>{
				return libro[criterio.value].
				       includes(busqueda.value.trim());
			}
		);
		//ORDENACION
		const libros_ordenados=libros_filtrados.sort(
			(a,b)=>{
				return b["titulo"].localeCompare(a["titulo"]);
			}
		)

		//VACIAR LA TABLA	
		tabla_libros.innerHTML="";
		libros_ordenados.forEach(
			(libro)=>{
				tabla_libros.appendChild(nuevoLibro(libro));
			}
		)
	});

//GESTION DE LA TABLA	
const borrarLibro = (clave_libro) => {
	return () => {
		const fila_a_borrar = document.querySelector("#" + clave_libro)
		fila_a_borrar.remove();
		sessionStorage.removeItem(clave_libro);
	}
}

const modalEditarLibro = (clave_libro) => {
	return () => {
		const libro=JSON.parse(sessionStorage.getItem(clave_libro));
		editar_titulo.value=libro["titulo"];
		editar_autor.value=libro["autor"];
		editar_precio.value=libro["precio"];
		editar_portada.value=libro["portada"];
		editar_comprar.value=libro["comprar"];
		editar_clave_libro.value=clave_libro;		

		$(editar_modal).modal("toggle");
	}
}

const nuevoLibro = (json) => {
	let nueva_fila = document.createElement("tr");
	nueva_fila.id = "ID_" + json["titulo"].toUpperCase().replaceAll(" ", "");

	//CREA LA CELDA CON EL TITULO
	let td_titulo = document.createElement("td");
	td_titulo.innerText = json["titulo"];
	td_titulo.classList.add("text-center");
	nueva_fila.appendChild(td_titulo);

	//CREA LA CELDA CON EL AUTOR
	let td_autor = document.createElement("td");
	td_autor.innerText = json["autor"];
	td_autor.classList.add("text-center");
	nueva_fila.appendChild(td_autor);

	//CREA LA CELDA CON EL PRECIO
	let td_precio = document.createElement("td");
	td_precio.innerText = json["precio"] + "€";
	td_precio.classList.add("text-center");
	nueva_fila.appendChild(td_precio);

	//CREA LA CELDA CON LA PORTADA
	let portada = document.createElement("img");
	portada.src = json["portada"];
	portada.classList.add("w-25");
	let td_portada = document.createElement("td");
	portada.classList.add("w-25");
	td_portada.appendChild(portada);
	td_portada.classList.add("text-center");
	nueva_fila.appendChild(td_portada);

	//CREA LA CELDA CON EL ENLACE DE COMPRA
	let enlace_comprar = document.createElement("a");
	enlace_comprar.innerText = "Comprar";
	enlace_comprar.href = json["comprar"];
	enlace_comprar.classList.add("btn", "btn-outline-dark");
	let td_comprar = document.createElement("td");
	td_comprar.classList.add("text-center");
	td_comprar.appendChild(enlace_comprar);
	nueva_fila.appendChild(td_comprar);

	//CREA EL BOTON DE EDITAR
	let editar = document.createElement("a");
	editar.innerText = "Editar";
	editar.href = "#";

	//MANEJAR EVENTO DE CLICK SOBRE EL BOTON
	console.log(nueva_fila.id);
	editar.addEventListener("click", modalEditarLibro(nueva_fila.id))
	editar.classList.add("btn", "btn-success");

	let td_editar = document.createElement("td");
	td_editar.appendChild(editar);
	td_editar.classList.add("text-center");
	nueva_fila.appendChild(td_editar);

	//============================================================================================	
	//CREA EL BOTON DE BORRADO
	let borrar = document.createElement("a");
	borrar.innerText = "Eliminar";
	borrar.href = "#";
	borrar.classList.add("btn", "btn-danger");

	//MANEJAR EVENTO DE CLICK SOBRE EL BOTON
	borrar.addEventListener("click", borrarLibro(nueva_fila.id))
	let td_borrar = document.createElement("td");
	td_borrar.appendChild(borrar);
	td_borrar.classList.add("text-center");
	nueva_fila.appendChild(td_borrar);
	//================================================================================================
	return nueva_fila;
}

//=========AÑADIR NUEVO LIBRO COMPROBANDO ANTES LOS DATOS=======================
b_nuevo.addEventListener("click",
	(evento) => {
		evento.preventDefault();
		if (titulo.value.trim().length < 4) {
			mensajeError("Nombre incorrecto");
		} else if (autor.value.trim().length < 4) {
			mensajeError("Autor incorrecto");
		} else if (precio.value.trim() === "" || isNaN(precio.value.trim()) || parseInt(precio.value.trim()) <= 0) {
			mensajeError("Precio incorrecto");
		} else if (portada.value.trim() === "") {
			mensajeError("Portada incorrecta");
		} else if (comprar.value.trim() === "") {
			mensajeError("Enlace para comprar incorrecto");
		} else if (sessionStorage.getItem("ID_" + titulo.value.trim().toUpperCase().replaceAll(" ", "")) !== null) {
			mensajeError("El libro ya existe");
		} else {

			const datos_libro = {
				"titulo": titulo.value.trim(),
				"autor": autor.value.trim(),
				"precio": precio.value.trim(),
				"portada": portada.value.trim(),
				"comprar": comprar.value.trim(),
			};
			const nuevo = nuevoLibro(datos_libro);
			tabla_libros.appendChild(nuevo);
			sessionStorage.setItem("ID_" + titulo.value.trim().toUpperCase().replaceAll(" ", ""), JSON.stringify(datos_libro));
			form_añadir.reset();
			document.documentElement.scrollTop = document.documentElement.scrollHeight;
			mensajeOk("Añadido correctamente");
		}
	});

//=========EDITAR UN LIBRO DESDE EL FORMULARIO======================

b_editar.addEventListener("click",
	(evento) => {
		evento.preventDefault();
		const nueva_clave_libro="ID_"+editar_titulo.
									value.
			                        trim().
									toUpperCase().
									replaceAll(" ","");

		if (editar_titulo.value.trim().length < 4) {
			mensajeError("Nombre incorrecto");
		} else if (editar_autor.value.trim().length < 4) {
			mensajeError("Autor incorrecto");
		} else if (editar_precio.value.trim() === "" || isNaN(precio.value.trim()) || parseInt(precio.value.trim()) <= 0) {
			mensajeError("Precio incorrecto");
		} else if (editar_portada.value.trim() === "") {
			mensajeError("Portada incorrecta");
		} else if (editar_comprar.value.trim() === "") {
			mensajeError("Enlace para comprar incorrecto");
	    } else if (editar_clave_libro.value!==nueva_clave_libro
			     && sessionStorage.getItem(nueva_clave_libro)
				                              !== null){
			 	mensajeError("El libro ya existe");
		} else {
			const datos_libro={
				"titulo":editar_titulo.value.trim(),
				"autor":editar_autor.value.trim(),
				"precio":editar_precio.value.trim(),
				"portada":editar_portada.value.trim(),
				"comprar":editar_comprar.value.trim()
			};
			//TR CON LOS NUEVOS DATOS
			const libro_editado=nuevoLibro(datos_libro);
			//TRA ANTERIOR
			const fila_a_editar=document.
			                querySelector("#"+editar_clave_libro.value);
			//COLOCAMOS EN LA POSICION DEL TR ANTERIOR EL NUEVO
			fila_a_editar.replaceWith(libro_editado);
			//ACTUALIZAR EL STORAGE
			sessionStorage.setItem(nueva_clave_libro,
				                   JSON.stringify(datos_libro));
			if(nueva_clave_libro!==editar_clave_libro.value){
			     sessionStorage.removeItem(editar_clave_libro.value);
			}

			form_editar.reset();
			$(editar_modal).modal("toggle");
			mensajeOk("Editado correctamente");
		}
	});

//AÑADIR DATOS INICIALES DE LA BASE DE DATOS AL STORAGE (POR AHORA FICHERO JSON)
//LA PRIMERA VEZ QUE SE INICIE INVENTAR CLAVE PARA RECORDAR QUE HEMOS INICIADO SESION

if (sessionStorage.length===0) {
	moviles.forEach(
		(libro) => {
			sessionStorage.setItem("ID_" + libro["titulo"].
				                   toUpperCase()
								   .replaceAll(" ", ""),
				                   JSON.stringify(libro))
		});
}

//AÑADIR LOS DATOS DEL STORAGE PARA MANEJAR LA APLICACION A TRAVES DE ELLOS Y NO TENER QUE USAR SIEMPRE LA BASE DE DATOS
Object.values(sessionStorage).forEach(
	(libro) => {
		tabla_libros.appendChild(nuevoLibro(JSON.parse(libro)));
	}
)
