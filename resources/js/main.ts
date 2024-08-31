class Calculator {
    current: string;
    previous: string;
    operator: string;
    bttnNumber: NodeListOf<Element>;
    operatorBttn: NodeListOf<Element>;
    display: HTMLInputElement | null;
    clearHistoryBttn: NodeListOf<Element>;
    historyList: HTMLElement | null;
    resultBttn: NodeListOf<Element>;
    deleteAll: NodeListOf<Element>;

    constructor() {        
        this.current = '';
        this.previous = '';
        this.operator = '';
        this.bttnNumber = document.querySelectorAll('.number');
        this.operatorBttn = document.querySelectorAll('.operator');
        this.display = document.getElementById('result') as HTMLInputElement;
        this.clearHistoryBttn = document.querySelectorAll('.clearHistory');  
        this.historyList = document.getElementById('historyList');
        this.resultBttn = document.querySelectorAll('.resultBttn');
        this.deleteAll = document.querySelectorAll('.deleteAll');
    }
    
    handleButtonClick() {
        this.clearHistoryBttn.forEach(button => { 
            button.addEventListener('click', () => this.clearHistory()); 
        });
        
        this.resultBttn.forEach(button => { 
            button.addEventListener('click', () => {
                if (isNaN(Number(this.previous)) || this.operator === '' || isNaN(Number(this.current))) return; 
                if (this.previous === '' || this.current === '') return;
                const prev = this.current;
                this.current = this.handleOperation();
                const result = this.current;
                this.addToHistory(prev, result);
                this.updateDisplay();
            });
        });

        this.deleteAll.forEach(button => { 
            button.addEventListener('click', () => this.clearAll());
        });

        this.operatorBttn.forEach(button => { 
            button.addEventListener('click', () => {
                this.operator = (button.innerHTML)
                this.prepareOperation();
            })
        });

        this.bttnNumber.forEach(button => { 
            button.addEventListener('click', () => {
                this.current += (button as HTMLElement).innerHTML;
                this.updateDisplay();
            });
        });
    }

    handleOperation(): string {
        const operations: { [key: string]: (a: number, b: number) => number | string } = {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
            'x': (a, b) => a * b,
            '/': (a, b) => b !== 0 ? a / b : 'Error'
        };

        if (this.previous === '' && this.operator === '' && this.current === '') return this.current;
        
        const prev = parseFloat(this.previous);
        const curr = parseFloat(this.current);
        const operation = operations[this.operator];
        return operation ? operation(prev, curr).toString() : curr.toString();                
    }

    prepareOperation() {
        if (this.current !== '' || isNaN(Number(this.current))) {
            this.previous = this.current;
        }
        this.current = '';        
    }

    updateDisplay() {
        if (this.display) {
            this.display.value = this.current;
        }
    }

    clearAll() {
        this.current = '';
        this.operator = '';
        this.previous = '';
        this.updateDisplay();
    }

    addToHistory(prev: string, result: string) {
        if (this.historyList) {
            const li = document.createElement('li');    
            li.textContent = `${this.previous} ${this.operator} ${prev} = ${result}`;
            this.historyList.appendChild(li);
        }
    }

    clearHistory() { 
        if (this.historyList) {
            while (this.historyList.firstChild) {
                this.historyList.removeChild(this.historyList.firstChild);
            }
        }
    }
}

// Run the object
let calc = new Calculator();
calc.handleButtonClick();
