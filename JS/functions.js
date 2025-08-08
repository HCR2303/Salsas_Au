//Elementos que serán utilizados para acciones
const menus=document.querySelectorAll(".header__iconMenu, .header__iconCart");
const desplegables=document.querySelectorAll(".cart, .menu");
const closeImgMenus= document.querySelectorAll(".menuClose, .cartClose");
const selectedProducts=document.querySelector(".cart__container");
const contador=document.querySelector("#contador");

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
        carrito.nextElementSibling.classList.add("none");
    }else{
        carrito.nextElementSibling.classList.remove("none");
        carrito.nextElementSibling.textContent=compras;
    }
   
}
verificarCarrito();


//borrar articulos del carrito
selectedProducts.addEventListener("click",(evento)=>{//se utilizó la delegación de eventos para no discutir la cantidad de íconos para borrar
    
    if (evento.target.classList.contains("cart__iconMenos")){
        const contadorMenos=evento.target.nextElementSibling;
        let numero=parseInt(contadorMenos.value);
        numero--; 
        contadorMenos.value=numero;      
        if (contadorMenos.value==0){
            console.log("si está el if")
            const elemento=contadorMenos.closest("div");
            console.log(elemento)            
            elemento.remove();
        }        
    }else if(evento.target.classList.contains("cart__iconMas")){
        const contadorMas=evento.target.previousElementSibling;
        let numero=parseInt(contadorMas.value);
        numero++;
        contadorMas.value=numero;
    }
    
    verificarCarrito();
})


//Agregar articulos a carrito
function addToCart(product) {

    //obtencion de carácteristicas del producto
    const nameProduct=product.className;
    const imagen = product.querySelector(".card-img-top");
    const imagenSrc = imagen.src;
    const imagenAlt = imagen.alt;
    const imgCreada = document.createElement("img");
    imgCreada.src = imagenSrc;
    imgCreada.alt = imagenAlt;
    const cantidad = product.querySelector(".cantidad").textContent;
    const precio = product.querySelector(".precio").textContent;
    const tipo = product.querySelector(".tipo").textContent;
    const picor = product.querySelector(".picor").textContent;

    //Creación y adaptación a configuración en el carrito
    const divProducto = document.createElement("div");
    divProducto.appendChild(imgCreada);
    const featuresProducto = document.createElement("p");
    featuresProducto.textContent = `Salsa macha ${tipo} ${cantidad} picor ${picor}`;
    featuresProducto.classList.add("cart__product");
    divProducto.appendChild(featuresProducto);

    const precioProducto = document.createElement("p");
    precioProducto.classList.add("cart__pice");
    precioProducto.textContent = `${precio} mnx`;
    divProducto.appendChild(precioProducto);

    const cantidadIcon = document.createElement("i");

    const menosImg = document.createElement("img");
    menosImg.src = "img/Minus.png";
    menosImg.alt = "Icono menos";
    menosImg.classList.add("cart__iconMenos");
    cantidadIcon.appendChild(menosImg);

    const numeros=document.createElement("input");
    numeros.type="number";
    numeros.value=1;
    numeros.min=1;
    numeros.max=99;
    numeros.id="contador";
    cantidadIcon.appendChild(numeros);

    const masImg = document.createElement("img");
    masImg.src = "img/Plus.png";
    masImg.alt = "Icono mas";
    masImg.classList.add("cart__iconMas");
    cantidadIcon.appendChild(masImg);

    divProducto.appendChild(cantidadIcon);
    divProducto.classList.add(nameProduct);

    //Se establece contador para productos similares
    let productoFound=false;
    if (selectedProducts.querySelector("div")){
        const contenidoCart=selectedProducts.querySelectorAll("div");
        
        contenidoCart.forEach(elemento=>{
            
            if(elemento.className==nameProduct){
                productoFound=true;
                let nProductActual=elemento.querySelector("#contador").value;
                nProductActual=parseInt(nProductActual);
                if (elemento.querySelector("#contador")){                    
                    nProductActual++;
                    elemento.querySelector("#contador").value=nProductActual;
                }
            }
        });
        
    }
    //si no existen productos similares simplemente se añade
    if (!productoFound){
        selectedProducts.appendChild(divProducto);
    }     
}

//
//if (selectedProducts.childElementCount!=0){
    
//}

//Acción para botones de comprar
buyButtons.forEach(button=>{
    button.addEventListener("click",()=>{
        const producto=button.parentElement.parentElement;
        const nameProduct=producto.className;        
        addToCart(producto)
        verificarCarrito()
    })
})