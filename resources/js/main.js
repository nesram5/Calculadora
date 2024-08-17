//Object Calculator
const Calculator = {
    current: '',
    previous: '',
    operator: '',
    display: document.getElementById('result'),    
    buttons: document.querySelectorAll('button'),

    handleButtonClick: (element) => {
        const value = element.innerHTML;
        
        if (value === 'Limpiar Historial'){
                Calculator.clearHistory();
        }
        else if(element.classList.contains('number') ) {
                Calculator.current += value;
                Calculator.updateDisplay();
        }
        else if(value === '=') {     
                if (Calculator.previous && Calculator.operator && Calculator.current){
                    let prev = Calculator.current;
                    Calculator.current = Calculator.handleOperation();
                    let result = Calculator.current;
                    Calculator.addToHistory(prev,result);
                    Calculator.updateDisplay();
                }
        }
        else if(value === 'C'){
                Calculator.clearAll();
        }
        else {
            Calculator.prepareOperation(element);
        }
          
     },

    handleOperation: () => {
        if (Calculator.previous != '' && Calculator.operator != '' && Calculator.current != ''){
            const prev = parseFloat(Calculator.previous);
            const curr = parseFloat(Calculator.current);
            switch (Calculator.operator) {
                case '+': return prev + curr;
                case '-': return prev - curr;
                case 'x': return prev * curr;
                case '/': return curr !== 0 ? prev / curr : 'Error';
                default: return curr;
            } 
        }           
    },

    prepareOperation: (element) => {
        if (Calculator.current != ''){
            Calculator.previous = Calculator.current;
        };
        Calculator.current = '';
        Calculator.operator = element.innerHTML;        
    },

    updateDisplay: () => {
        Calculator.display.value = Calculator.current;
    },

    clearAll: () => {
        Calculator.current = '';
        Calculator.operator = '';
        Calculator.previous= '';
        Calculator.updateDisplay();
    },

    addToHistory: (prev, result) => {
        let historyList = document.getElementById('historyList');
        const li = document.createElement('li');    
        li.textContent = `${Calculator.previous} ${Calculator.operator} ${prev} = ${result}` ;
        historyList.appendChild(li);
        
    },

    clearHistory: () => { 
        const lista_historial = document.getElementById('historyList');
        while (lista_historial.firstChild) {
            lista_historial.removeChild(lista_historial.firstChild);
        }
    }

};

//Run the object
Calculator.buttons.forEach(button => {
    button.addEventListener('click', () => Calculator.handleButtonClick(button));
});