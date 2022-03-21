// Estado inicial puzzle
let iniciales = [];
let finales = [];

function setEstados(){
    var in1 = document.getElementById('i1').value;
    var in2 = document.getElementById('i2').value;
    var in3 = document.getElementById('i3').value;
    var in4 = document.getElementById('i4').value;
    var in5 = document.getElementById('i5').value;
    var in6 = document.getElementById('i6').value;
    var in7 = document.getElementById('i7').value;
    var in8 = document.getElementById('i8').value;
    var in9 = document.getElementById('i9').value;
    iniciales.push(in1);
    iniciales.push(in2);
    iniciales.push(in3);
    iniciales.push(in4);
    iniciales.push(in5);
    iniciales.push(in6);
    iniciales.push(in7);
    iniciales.push(in8);
    iniciales.push(in9);
   console.log(iniciales);

   var fn1 = document.getElementById('f1').value;
   var fn2 = document.getElementById('f2').value;
   var fn3 = document.getElementById('f3').value;
   var fn4 = document.getElementById('f4').value;
   var fn5 = document.getElementById('f5').value;
   var fn6 = document.getElementById('f6').value;
   var fn7 = document.getElementById('f7').value;
   var fn8 = document.getElementById('f8').value;
   var fn9 = document.getElementById('f9').value;
   finales.push(fn1);
   finales.push(fn2);
   finales.push(fn3);
   finales.push(fn4);
   finales.push(fn5);
   finales.push(fn6);
   finales.push(fn7);
   finales.push(fn8);
   finales.push(fn9);
   console.log(finales);
}

let EstadoInicial = [
    iniciales[0], iniciales[1], iniciales[2],
    iniciales[3], iniciales[4], iniciales[5], // 0 Para nulo
    iniciales[6], iniciales[7], iniciales[8]
];

let EstadoFinal = [
    finales[0], finales[1], finales[2],
    finales[3], finales[4], finales[5],
    finales[6], finales[7], finales[8]
];

//Nodos
let allNodes = {};

// Funciones de Movimiento
function swap(value, swapfrom, swapto) {
    let temp = value[swapto];
    value[swapto] = 0;
    value[swapfrom] = temp;
    return value;
}


function checkEstadoFinal(value) {
    // valor es una matriz
    if (JSON.stringify(EstadoFinal).indexOf(JSON.stringify(value)) >= 0) {
        return true;
    } else {
        return false;
    }
}

// Obteniendo posibles movimientos
function MovimientosPos(value) {
    let mid = {
        0: [{ swap: 1 }, { swap: 3 }],
        1: [{ swap: 2 }, { swap: 4 }, { swap: 0 }],
        2: [{ swap: 5 }, { swap: 1 }],
        3: [{ swap: 0 }, { swap: 4 }, { swap: 6 }],
        4: [{ swap: 1 }, { swap: 5 }, { swap: 7 }, { swap: 3 }],
        5: [{ swap: 2 }, { swap: 8 }, { swap: 4 }],
        6: [{ swap: 3 }, { swap: 7 }],
        7: [{ swap: 4 }, { swap: 8 }, { swap: 6 }],
        8: [{ swap: 5 }, { swap: 7 }]
        
    }
    
    console.log(mid);
    return mid[value];
   
};

let NodosVisitados = [];
let Cola = [];

// Agregando inicial a la cola 
Cola.push(EstadoInicial);

let main = function () {
    let index = Cola[0].indexOf(0);
    let moves = MovimientosPos(index);

    // Obteniendo nodos hijos
    let childNodes = moves.map(item => {
        let temp = [...Cola[0]];
        return swap(temp, index, item.swap);
    });

    childNodes.forEach(item => {
        if (JSON.stringify(Cola).indexOf(JSON.stringify(item)) == -1) {
            // Si no esta en la cola, se inserta en cola y en los no visitados 
            if (JSON.stringify(NodosVisitados).indexOf(JSON.stringify(item)) == -1) {
                Cola.push(item);
                console.log(Cola);
            }
        }
    });

    let visitados = Cola.splice(0, 1)[0];
    
    console.log(visitados); 
    NodosVisitados.push(visitados);

    if (checkEstadoFinal(visitados)) {
        console.log("ENCONTRADO");
        console.log(NodosVisitados);

        let output = document.getElementById("output");

        let t = '';
        NodosVisitados.forEach((item) => {

            t += '<div class="node">';
            item.forEach(value => {
                t += '<div class="node_item">' + value + '</div>';
            });
            t += '<div class="right_arrow">&rarr;</div>';
            t += '</div>';
        });

        output.innerHTML = t;

        console.log(NodosVisitados.length);

        return;
    } else {
        main();
    }
}
//window.addEventListener('load', main);