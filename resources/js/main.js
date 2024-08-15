const Calculator = {
    current: '',
    previous: '',
    operator: '',    
    bttn: document.querySelectorAll('button'),

    Operation: () => {
        if (Calculator.previous != '' && Calculator.operator != '' && Calculator.current != ''){
            switch (Calculator.operator) {
                case '+':
                    return parseFloat(Calculator.previous) + parseFloat(Calculator.current);
                case '-':
                    return parseFloat(Calculator.previous) - parseFloat(Calculator.current);
                case 'x':
                    return parseFloat(Calculator.previous) * parseFloat(Calculator.current);                    
                case '/':
                    return parseFloat(Calculator.previous) / parseFloat(Calculator.current);
                default:
                    return;
            } 
        }           
    },

    SelectOperation: (element) => {
        if (Calculator.current != ''){
            Calculator.previous = Calculator.current;
        };
        Calculator.current = '';
        Calculator.operator = element.innerHTML;
        console.log(Calculator.operator);
        
    },

    UpdateScreen: () => {
        document.getElementById('result').value = Calculator.current;
    },

    ClearScreen: () => {
        Calculator.current = '';
        Calculator.operator = '';
        Calculator.previous= '';
        Calculator.UpdateScreen();
    },

    SaveHistory: (prev, result) => {

        let lista_historial = document.getElementById('lista-historial');
        const li = document.createElement('li');    
        li.textContent = Calculator.previous + ' ' + Calculator.operator + ' ' + prev + ' = ' + result ;
        //insertar en el HYML
        lista_historial.appendChild(li);

    }
}

Calculator.bttn.forEach(element => {
    element.addEventListener("click", function(e){

       let check = parseInt(element.innerHTML) / 2;

       if(check >= 0 ) {
            Calculator.current += element.innerHTML;
            Calculator.UpdateScreen();
       }

       else if(element.innerHTML === '=') {        
        
            if (Calculator.previous != '' && Calculator.operator != '' && Calculator.current != ''){
                let prev = Calculator.current;
                Calculator.current = Calculator.Operation();
                let result = Calculator.current;
                Calculator.SaveHistory(prev,result);
                Calculator.UpdateScreen();
            }
            
       }

       else if(element.innerHTML === 'C'){
            Calculator.ClearScreen();
       }

       else {
            Calculator.SelectOperation(element);
        };
       

       
    });
});




/*
function seleccionar_numero(numero) {
    //almacenar numero seleccionado en una variable
    elemento_actual += numero;
    actualizar_pantalla();
}

function seleccionar_operacion(op) {
    //comprobar que no este vacia las variable antes de utilizar
    if (elemento_actual === '') return;
    if (elemento_anterior !== '') {
        calcular();
    }
    //vaciar variables
    operador = op;
    elemento_anterior = elemento_actual;
    elemento_actual = '';
}

function calcular() {
    //verificar que no este vacia la variable
    if (elemento_actual === '' || elemento_anterior === '') return;
    let resultado;
    //convirtiendo a float para manejar decimales
    const elem_ant = parseFloat(elemento_anterior);
    const elem_act = parseFloat(elemento_actual);
    
    switch (operador) {
        case '+':
            resultado = elem_ant + elem_act;
            break;
        case '-':
            resultado = elem_ant - elem_act;
            break;
        case '*':
            resultado = elem_ant * elem_act;
            break;
        case '/':
            resultado = elem_ant / elem_act;
            break;
        default:
            return;
    }
    //guardar operacion en el historial
    agregar_a_historial(`${elemento_anterior} ${operador} ${elemento_actual} = ${resultado}`);
    elemento_actual = resultado.toString();
    //vaciar variables
    operador = '';
    elemento_anterior = '';
    actualizar_pantalla();
}

function borrar_pantalla() {
    //vaciar variables
    elemento_actual = '';
    operador = '';
    elemento_anterior = '';
    actualizar_pantalla();
}

function actualizar_pantalla() {
    document.getElementById('result').value = elemento_actual;
}

function agregar_a_historial(operacion) {
    //crear elemento HTML de lista y darle un contenido
    const li = document.createElement('li');    
    li.textContent = operacion;
    //insertar en el HYML
    lista_historial.appendChild(li);
}
*/