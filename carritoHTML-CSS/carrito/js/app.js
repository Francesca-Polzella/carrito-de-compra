
const ListaCursos = document.querySelector ('#lista-cursos');//este ayuda a seleccionar una parte de la pantalla 
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const carrito = document.querySelector('#carrito');
const ContenedorCarrito = document.querySelector('#lista-carrito tbody');
let articuloCarrito=[]; // esto se declara que esta vacio este arreglo



//3. definir eventos
CargarEventListener()
function CargarEventListener() {
    // esto ayuda hacer una una funcion 
    // click al boton de agregar carrito
    //es importante poner la palabra Listerner
    ListaCursos.addEventListener('click',agregarCurso)
    carrito.addEventListener('click',eliminarCurso)
    vaciarCarritoBtn.addEventListener('click',vaciarCarrito)
    vaciarCarritoBtn.addEventListener("click",()=>{
     articuloCarrito=[]
         vaciarCarritoBtn() 
     })
    
}


function agregarCurso(e) {
    e.preventDefault()
    //console.log("ingrese a la funcion agregar curso")
    if(e.target.classList.contains('agregar-carrito')){
        const curso= e.target.parentElement.parentElement
        leerDatoCurso(curso)
    }//esta ayuda para buscar una clase dentro del html en un aspecto en especifico en el e.target
    
}



function leerDatoCurso(curso){
     console.log(curso)
     const infoCurso={
         Image: curso.querySelector('img').src,
         nombre: curso.querySelector('h4').textContent,
         precio: curso.querySelector('.precio span').textContent,
         id: curso.querySelector('a').getAttribute('data-id'),
         cantidad:1 
         //todo los de arriba es para extraer la informacion del html
        }
     console.log(infoCurso)

      //console.log('1'===1)

     if(articuloCarrito.some(curso=>curso.id===infoCurso.id)){
         //caso que exiten un curso en el arreglo de articuloCarrito
         const curso = articuloCarrito.map(curso=>{
             if(curso.id===infoCurso.id){
                 //itero, visto cada posicion y si encuntro el id,
                 //entonces aumento en 1 la cantidad
                 curso.cantidad++;
                 return curso;
                 // debo retonar la posicion completa
                 //porque el arreglo map requiere que retorne un arreglo 
             } else{
                 return curso
             }
         })
         articuloCarrito=[...curso]
          //console.log(curso)
         
     }else{ // no tengo el curso agragado
         articuloCarrito= [...articuloCarrito,infoCurso]
         //console.log(articuloCarrito)
        
        }
    CarritoHTML()
} 
  
function CarritoHTML(){
    vaciarCarrito()
     articuloCarrito.forEach(curso=> {
      const row= document.createElement('tr');
      row.innerHTML =
      `
      <td><img src= "${curso.Image}" width=100></td>
      <td>${curso.nombre}</td>
      <td>${curso.precio}</td>
      <td>${curso.cantidad}</td>
      <td><a herf="#" data-id=${curso.id} class="borrar-curso">X</a></td>
      `

      ContenedorCarrito.appendChild(row);
    })
    // los td son las columnas de demostracion 
}
    
 function vaciarCarrito() {
     while(ContenedorCarrito.firstChild){
         ContenedorCarrito.removeChild(ContenedorCarrito.firstChild) 
       }
 }
  //ContenedorCarrito.innerHTML='' 
  //esta es la version lenta

  

   function eliminarCurso(e){
    e.preventDefault()
    if(e.target.classList.contains('borrar-curso')){
        const cursoId= e.target.getAttribute('data-id');

        const existe= articuloCarrito.some(curso=>curso.id===cursoId)
        if(existe){
            console.log(cursoId)
            
            const curso= articuloCarrito.map(curso=>{
                console.log(curso.id)
                if(curso.id===cursoId){
                    if(curso.cantidad>1) {
                        curso.cantidad--;
                        return curso
                    }else{
                        articuloCarrito=articuloCarrito.filter(curso=>curso.id !== cursoId)
                        return curso
                    }
                }
            })
        }
        CarritoHTML()
    }
   }
    
