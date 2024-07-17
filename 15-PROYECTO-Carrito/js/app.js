//Proyecto de un carrito de compras

//Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const notificacionCarrito = document.getElementById('notificacion-carrito')
let articulosCarrito = [];

añadirNotificacion(articulosCarrito.length);
cargarEventListeners();

//Funciones
function cargarEventListeners(){
    //Agregando un curso al presionar un boton 'Agregar al carrito'
    listaCursos.addEventListener('click', agregarCurso);

    //Eliminar cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar todo el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        //Actualizar el carrito y las notificaciones del carrito
        LimpiarHTML();
        añadirNotificacion(articulosCarrito.length);
    });
}

//Agregar curso al carrito
function agregarCurso(e){
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
    añadirNotificacion(articulosCarrito.length);
}

//Eliminar el curso del carrito
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        //Eliminar del arreglo todos menos el que se desea eliminar
        //articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );
        articulosCarrito = articulosCarrito.filter( curso => {
            if (curso.id === cursoId) {
                if(curso.cantidad > 1){
                    curso.cantidad--;
                    return curso;
                }
            }else{
                return curso;
            }
        } );
        //Actualizar el carrito y las notificaciones del carrito
        carritoCompras();
        añadirNotificacion(articulosCarrito.length);
    }
}

//Numero de articulos en el carrito
function añadirNotificacion(cantidad) {
    if (cantidad !== 0) {
        notificacionCarrito.dataset.cantidadnotificacion = articulosCarrito.length;
        notificacionCarrito.classList.add('notificacion-carrito--visible');
    } else if (cantidad === 0) {
        notificacionCarrito.classList.remove('notificacion-carrito--visible');
    }
}

//Lee el contenido del curso HTML al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso){
    //console.log(curso);
    //Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1 
    }

    //Revisar si ya existe el elemento en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);

    //Validamos para actualizar la cantidad
    if (existe){
        const cursos = articulosCarrito.map( curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //Retorna el objeto actualizado
            } else {
                return curso; //Retorna los objeto no actualizados
            }
        })
    } else {
    //Agregar elementos al carrito
    articulosCarrito = [...articulosCarrito, infoCurso]; 
    }
    console.log();
    carritoCompras();
}

//Mostrar el carrito de compras en HTML
function carritoCompras (){
    //Limpiar HTML
    LimpiarHTML();

    //Recorre el carrito y genera HTML
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML =  `
            <td> 
                <img src = "${curso.imagen}" width="150">
            </td>
            <td> ${titulo} </td>
            <td> ${precio} </td>
            <td> ${cantidad} </td>
            <td> 
                <a href = "#" class = "borrar-curso" data-id="${id}"> X </a>
            </td>
        `;

        //Agregando el HTML al  tbody
        contenedorCarrito.appendChild(row);
        console.log();
    });
}

//Elimina los cursos del body
function LimpiarHTML(){
    //Forma lenta
    //contenedorCarrito.innerHTML = '';

    //Forma rapida
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}