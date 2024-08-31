var Calculator = /** @class */ (function () {
    function Calculator() {
        this.current = '';
        this.previous = '';
        this.operator = '';
        this.bttnNumber = document.querySelectorAll('.number');
        this.operatorBttn = document.querySelectorAll('.operator');
        this.display = document.getElementById('result');
        this.clearHistoryBttn = document.querySelectorAll('.clearHistory');
        this.historyList = document.getElementById('historyList');
        this.resultBttn = document.querySelectorAll('.resultBttn');
        this.deleteAll = document.querySelectorAll('.deleteAll');
    }
    Calculator.prototype.handleButtonClick = function () {
        var _this = this;
        this.clearHistoryBttn.forEach(function (button) {
            button.addEventListener('click', function () { return _this.clearHistory(); });
        });
        this.resultBttn.forEach(function (button) {
            button.addEventListener('click', function () {
                if (isNaN(Number(_this.previous)) || _this.operator === '' || isNaN(Number(_this.current)))
                    return;
                if (_this.previous === '' || _this.current === '')
                    return;
                var prev = _this.current;
                _this.current = _this.handleOperation();
                var result = _this.current;
                _this.addToHistory(prev, result);
                _this.updateDisplay();
            });
        });
        this.deleteAll.forEach(function (button) {
            button.addEventListener('click', function () { return _this.clearAll(); });
        });
        this.operatorBttn.forEach(function (button) {
            button.addEventListener('click', function () {
                _this.operator = (button.innerHTML);
                _this.prepareOperation();
            });
        });
        this.bttnNumber.forEach(function (button) {
            button.addEventListener('click', function () {
                _this.current += button.innerHTML;
                _this.updateDisplay();
            });
        });
    };
    Calculator.prototype.handleOperation = function () {
        var operations = {
            '+': function (a, b) { return a + b; },
            '-': function (a, b) { return a - b; },
            'x': function (a, b) { return a * b; },
            '/': function (a, b) { return b !== 0 ? a / b : 'Error'; }
        };
        if (this.previous === '' && this.operator === '' && this.current === '')
            return this.current;
        var prev = parseFloat(this.previous);
        var curr = parseFloat(this.current);
        var operation = operations[this.operator];
        return operation ? operation(prev, curr).toString() : curr.toString();
    };
    Calculator.prototype.prepareOperation = function () {
        if (this.current !== '' || isNaN(Number(this.current))) {
            this.previous = this.current;
        }
        this.current = '';
    };
    Calculator.prototype.updateDisplay = function () {
        if (this.display) {
            this.display.value = this.current;
        }
    };
    Calculator.prototype.clearAll = function () {
        this.current = '';
        this.operator = '';
        this.previous = '';
        this.updateDisplay();
    };
    Calculator.prototype.addToHistory = function (prev, result) {
        if (this.historyList) {
            var li = document.createElement('li');
            li.textContent = "".concat(this.previous, " ").concat(this.operator, " ").concat(prev, " = ").concat(result);
            this.historyList.appendChild(li);
        }
    };
    Calculator.prototype.clearHistory = function () {
        if (this.historyList) {
            while (this.historyList.firstChild) {
                this.historyList.removeChild(this.historyList.firstChild);
            }
        }
    };
    return Calculator;
}());
// Run the object
var calc = new Calculator();
calc.handleButtonClick();
