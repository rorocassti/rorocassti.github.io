
let operaciones = document.querySelectorAll(".op");
let botones = document.querySelectorAll(".numeros button");
let parrafo = document.getElementById("pepa");
let primero = true;
let yt = document.getElementById("yt")

//numeros
let num1 = "";
let num2 = "";
let resultado = "";
let ope = "";

//borrar gral
function borrar() {
    parrafo.innerText = `0`;
    num1 = "";
    num2 = "";
    ope = "";
    resultado = "";
    primero = true;
    yt.style.display = "none";
}

document.addEventListener('keydown', (event) => {
    const tecla = event.key;
    const botonesTexto = Array.from(botones).map(b => b.innerText);

    if (botonesTexto.includes(tecla) || tecla === 'Enter' || tecla === 'Backspace' || tecla === 'l' || tecla === 'L') {
        botones.forEach(b => {
            if (b.innerText === tecla || (tecla === 'Enter' && b.innerText === '=')) {
                b.click();
            }
        });
        
        if (tecla === 'Enter') {
            borrarUltimo(); // Borra un número
        }

        if (tecla.toLowerCase() === 'l') {
            borrar(); // Borra todo si presionás L o l
        }
    }
});



//operaciones
botones.forEach(function (boton) {
    boton.addEventListener('click', function () {
        let valor = boton.innerText;

        //borrar ultimo
        if(valor === 'Ce'){
            let texto = parrafo.innerText;
            if (texto.length > 0) {
                let parrafoNuevo = texto.slice(0, -1);
                parrafo.innerText = parrafoNuevo;

                if (primero) {
                    num1 = num1.slice(0, -1);
                    if(texto.length == 1){
                        parrafo.innerText = `0`;
                    }
                } else if (num2 !== "") {
                    num2 = num2.slice(0, -1);
                } else if (ope !== "") {
                    ope = "";
                    primero = true;
                }
            }
            return; // Salir de la función después de borrar
        }


        //validacion
        if (!isNaN(valor)) {
            if (primero) {
                num1 += valor;

                parrafo.innerText = `${num1}`;
            } else {
                num2 += valor;
                parrafo.innerText = `${num1} ${ope} ${num2}`;
            }

            //operador
        } else if (valor === '+' || valor === '-' || valor === '*' || valor === '/') {
            if (num1 !== "") {
                ope = valor;
                primero = false;
                parrafo.innerText = `${num1} ${ope}`;
            }
        }


        //resultado

        if (valor === '=') {
            num1 = Number(num1);
            num2 = Number(num2);
            if (ope === '+') {
                resultado = num1 + num2;
                parrafo.innerText = `${num1} ${ope} ${num2} = ${resultado}`;
            } else if (ope === '-') {
                resultado = num1 - num2;
                parrafo.innerText = `${num1} ${ope} ${num2} = ${resultado}`;
            } else if (ope === '*') {
                resultado = num1 * num2;
                parrafo.innerText = `${num1} ${ope} ${num2} = ${resultado}`;
            } else if (ope === '/') {
                if (num2 !== 0) {
                    resultado = num1 / num2;
                    parrafo.innerText = `${num1} ${ope} ${num2} = ${resultado}`;
                } else {
                    parrafo.innerText = `Error. `;
                    yt.style.display = "block";
                    num2 = "";
                    ope = "";
                    primero = true;
                    return;
                }
            } else {
                return;
            }
            parrafo.innerText = `${num1} ${ope} ${num2} = ${resultado}`;
            num1 = resultado.toString();
            num2 = "";
            ope = "";
            primero = true;

        }



    })


});

