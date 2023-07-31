//m-active
/*=================================
    Modal 
=================================*/
const btnModal = document.querySelectorAll("[data-modal-id]");
const cerrarModal = document.querySelectorAll(".cerrar-modal");
const cancelModal = document.querySelectorAll("[data-cancel]");

btnModal.forEach(element => {
    element.addEventListener('click',(evento)=>{
        const modalId = evento.currentTarget.getAttribute('data-modal-id');
        document.getElementById(modalId).classList.add('m-active');
    })
});

cerrarModal.forEach(element => {
    element.addEventListener('click',(e)=>{
       e.target.parentNode.parentNode.parentNode.classList.remove('m-active');
    })
});

window.onclick = function(event) {

    const modal=document.querySelector(".ventana-modal.m-active");
    if (event.target == modal) {
      modal.classList.remove('m-active');
    }
}

cancelModal.forEach(element => {
    element.addEventListener('click',(e)=>{
       e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.classList.remove('m-active');
       //opcional
       e.currentTarget.parentNode.parentNode.reset();

    })
});

// end modal

/*========================================
    VALIDAR FROMULARIO
========================================*/

$(document).ready(function() {
    $("#formUser").validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            nombre: {
                required: true,
                minlength:3
            },
            telefono: {
                required: true
            },
            dni: {
                required: true
            }
        },
        messages : {
            nombre: {
                required: "Por favor ingrese un nombre",
                minlength: "Introduzca al menos 3 caracteres"
            },
            email: {
                required: "Por favor ingrese su correo",
                email: "Por favor, ingrese un correo electrónico válida."
            },
            telefono: {
                required: 'Por favor ingrese un teléfono'
            },
            dni: {
                required: "Por favor ingrese su cedula"
            }
        }
    });
  });

//end validación form


/*========================================
    Subir Imagen
========================================*/
const inputImage=document.querySelectorAll('[data-subir-imagen]');
//const visorImagen=document.querySelector('[data-visor-img]');
const dropImagen=document.querySelectorAll('.dropImagen');


inputImage.forEach(image => {
    image.addEventListener('change',(e)=>{


        if(e.target.parentNode.parentNode.querySelector('.img-error.active')){
            e.target.parentNode.parentNode.removeChild(e.target.parentNode.parentNode.querySelector('.img-error.active'));
        }
        if(e.target.parentNode.parentNode.querySelector('.img-info')){
            e.target.parentNode.parentNode.querySelector('.img-info').parentNode.removeChild(e.target.parentNode.parentNode.querySelector('.img-info'));
        }

        const imagen=e.target.files[0];
        _cargarImagen(imagen,e,false);
    })
});

//ARRASTRAR IMAGEN

dropImagen.forEach(element => {

    element.addEventListener('dragover',(e)=>{
        e.preventDefault();
        element.setAttribute('class','contenedor-img  dropImagen dd-active');
    })

    element.addEventListener('dragleave',()=>{
        element.classList.remove('dd-active');
    })
    
    element.addEventListener('drop',(e)=>{
        e.preventDefault();

        if(e.currentTarget.parentNode.querySelector('.img-error.active')){
            e.currentTarget.parentNode.removeChild(e.currentTarget.parentNode.querySelector('.img-error.active'));
        }

        if(e.currentTarget.querySelector('.img-info')){
            e.currentTarget.querySelector('.img-info').parentNode.removeChild(e.currentTarget.querySelector('.img-info'));
        }
        

        const imagen=e.dataTransfer.files[0];
        _cargarImagen(imagen,e.currentTarget.querySelector('input[type="file"]'),true);
    
    
    })

});



/*===============================================
    Válidamos y cargamos la imagen
================================================*/
function _cargarImagen(imagen,input,tipoInput){

    var eleInput="";
    if(tipoInput==true){
        eleInput=input.parentNode.parentNode;
        var visorImagen=input.parentNode.querySelector('[data-visor-img]');
    }
    else{
        eleInput=input.target.parentNode.parentNode;
        var visorImagen=input.target.parentNode.querySelector('[data-visor-img]');
    }


    eleInput.querySelector('label').classList.remove('dd-active');
    
    //formato permitido
    const formato_imagen= ["image/jpeg","image/png","image/jpg"];
    
    //validamos el tipo de imagen que cargamos
    if(!((imagen["type"]==formato_imagen[0]) || (imagen["type"]==formato_imagen[1]) || (imagen["type"]==formato_imagen[2])))
    {
        _createElErrorImage('<p>Selecciona un archivo de imagen válido</p><p><strong>Nota: </strong>solo jpeg, jpg y png Tipo de imágenes permitidas</p>',eleInput);
        
        return false;

    }else if(imagen["size"] > 2000000){

        _createElErrorImage('<p>La imagen no debe superar los 2MB</p>',eleInput);
        return false;

    }else{


        const datos_imagen = new FileReader();
        	
        //imagen la convertimos en un archivo
        datos_imagen.readAsDataURL(imagen);

        datos_imagen.addEventListener('load',function(e){

            const ruta_imagen=e.target.result;

            //mostramos la imagen en pantalla

            const cImagen=visorImagen.parentElement.parentElement;
            cImagen.style.display="flex";

            const el = document.createElement('div');
            el.className="img-info";
            el.innerHTML='<h4>'+imagen['name'] +'</h4>';
            el.innerHTML+='<p>Tamaño: '+imagen['size'] +'</p>';
            el.innerHTML+='<p>Tipo: '+imagen['type'] +'</p>';
            cImagen.appendChild(el);
            const textDefault = cImagen.nextElementSibling;
            textDefault.style.display="none";
            
            visorImagen.src=ruta_imagen;

        })

        return true;


    }

}

function _createElErrorImage(html,el){

    const app = document.createElement("div");
    app.className="img-error active";
    app.innerHTML=html;
    el.appendChild(app);
   
}