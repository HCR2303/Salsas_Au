//Elementos que serán utilizados para acciones
const menus=document.querySelectorAll(".header__iconMenu, .header__iconCart");
const desplegables=document.querySelectorAll(".cart, .menu");
const closeImgMenus= document.querySelectorAll(".menuClose, .cartClose");
const selectedProducts=document.querySelector(".cart__container");
const carrito=menus[1];
const buyButtons=document.querySelectorAll("a");

//Abrir y cerrar menu
menus.forEach(opcion=>{
    
    opcion.addEventListener("click",function(){//Se requiere function en lugar de función flecha por el contexto que se requiere para "this"
        const nombre=this.dataset.target;
        const mostrar = document.querySelector("."+nombre);
        desplegables.forEach(opcion=>{
            if (opcion!==mostrar){
                opcion.classList.add("oculted");
            }            
        })
        mostrar.classList.toggle("oculted");        
    })    
})

//cerrar menus desde icono de X
closeImgMenus.forEach(imgIcon=>{
    const cerrar=imgIcon.parentElement.parentElement;
    imgIcon.addEventListener("click",()=>{
        cerrar.classList.add("oculted")
    })
})

//Función para verificar el contenido del carrito
function verificarCarrito(){
    
    const compras= selectedProducts.childElementCount;
    if (compras==0){
        carrito.nextElementSibling.textContent="";
    }else{
        carrito.nextElementSibling.textContent=compras;
    }
}
verificarCarrito();

//borrar articulos del carrito
selectedProducts.addEventListener("click",(evento)=>{//se utilizó la delegación de eventos para no discutir la cantidad de íconos para borrar
    if (evento.target.classList.contains("cart__iconDelete")){
        const borrar=evento.target.closest("div");
        borrar.remove();
        verificarCarrito();
    }
})


//Agregar articulos a carrito
const addToCart=(product)=>{

    //obtencion de carácteristicas del producto
    const imagen=product.querySelector(".card-img-top");
    const imagenSrc=imagen.src;
    const imagenAlt=imagen.alt;
    const imgCreada=document.createElement("img");
    imgCreada.src=imagenSrc;
    imgCreada.alt=imagenAlt;
    const cantidad=product.querySelector(".cantidad").textContent;
    const precio=product.querySelector(".precio").textContent;
    const tipo=product.querySelector(".tipo").textContent;
    const picor=product.querySelector(".picor").textContent;

    //Creación y adaptación a configuración en el carrito
    const divProducto=document.createElement("div");
    divProducto.appendChild(imgCreada);
    const featuresProducto=document.createElement("p")
    featuresProducto.textContent=`Salsa macha ${tipo} ${cantidad} picor ${picor}`;
    featuresProducto.classList.add("cart__product");
    divProducto.appendChild(featuresProducto);

    const precioProducto=document.createElement("p");
    precioProducto.classList.add("cart__pice");
    precioProducto.textContent=`${precio} mnx`;    
    divProducto.appendChild(precioProducto);

    const newDeleteIcon= document.createElement("i");    
    const newDeleteImg=document.createElement("img");
    newDeleteImg.src="img/Eliminar.png";
    newDeleteImg.alt="Icono quitar";
    newDeleteImg.classList.add("cart__iconDelete");
    newDeleteIcon.appendChild(newDeleteImg);
    divProducto.appendChild(newDeleteIcon);     

    // añadir a carrito
    selectedProducts.appendChild(divProducto);   

}

buyButtons.forEach(button=>{
    button.addEventListener("click",()=>{
        const producto=button.parentElement.parentElement;
        addToCart(producto)
        verificarCarrito()
    })
})