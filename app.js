// Estado inicial puzzle
var EstadoInicial = [];
var EstadoFinal = [];

//Estado inicial variables
    let in1 = document.getElementById("i1");
    let in2 = document.getElementById("i2");
    let in3 = document.getElementById("i3");
    let in4 = document.getElementById("i4");
    let in5 = document.getElementById("i5");
    let in6 = document.getElementById("i6");
    let in7 = document.getElementById("i7");
    let in8 = document.getElementById("i8");
    let in9 = document.getElementById("i9");
  
//Estado final variables

   let fn1 = document.getElementById("f1");
   let fn2 = document.getElementById("f2");
   let fn3 = document.getElementById("f3");
   let fn4 = document.getElementById("f4");
   let fn5 = document.getElementById("f5");
   let fn6 = document.getElementById("f6");
   let fn7 = document.getElementById("f7");
   let fn8 = document.getElementById("f8");
   let fn9 = document.getElementById("f9");
   

let guardarInicial = function(){

     EstadoInicial = [
        in1.value, in2.value, in3.value,
        in4.value, in5.value, in6.value, // 0 Para nulo
        in7.value, in8.value, in9.value 
    ];
    var EI = [];
    for (var i = 0; i < EstadoInicial.length; i++){
        EI.push(parseInt(EstadoInicial[i]));
    }
    console.log(EI);
    return EI;
}

function guardarFinal(){
    EstadoFinal = [
        fn1.value, fn2.value, fn3.value,
        fn4.value, fn5.value, fn6.value,
        fn7.value, fn8.value, fn9.value
    ];
    var EF = [];
    for (var i = 0; i < EstadoFinal.length; i++){
        EF.push(parseInt(EstadoFinal[i]));
    }
    console.log(EF);
    return EF;
}
/*let Ini = [
    1, 0, 4,
    2, 6, 3, // 0 para nulo
    8, 5, 7
];
console.log(Ini);

let Fin = [
    1, 6, 4,
    2, 3, 7,
    8, 5, 0
];
console.log(Fin);*/
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
    var x = guardarFinal();
    var Ef = x;
    // valor es una matriz
    if (JSON.stringify(Ef).indexOf(JSON.stringify(value)) >= 0) {
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

//console.log(EstadoInicial);
//console.log(EstadoFinal);

function main () {
    //guardar(); 
    
    var y = guardarInicial();
    var Ei = y;
    // Agregando inicial a la cola 
    Cola.push(Ei);
    console.log(Cola);
    let index = Cola[0].indexOf(0);
    let moves = MovimientosPos(index);

    // Obteniendo nodos hijos
    let childNodes = moves.map(item => {
        let temp = [...Cola[0]];
        return swap(temp, index, item.swap);
    });

    childNodes.forEach(item => {
        if (JSON.stringify(Cola).indexOf(JSON.stringify(item)) == -1) {
            // Si no esta en la cola, se inserta en cola y los que no en visitados 
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
        
        let EstTotales = '';
        EstTotales += '<div class = "Totales">'; 
        EstTotales += '<p>Estados Totales: </p>' + NodosVisitados.length + '</div>';

        NumeroEstadosTotales.innerHTML = EstTotales;

        console.log(NodosVisitados.length);
        return;
    } else {
        main();
    }
}