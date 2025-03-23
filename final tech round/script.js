class Calculator {
    constructor() {
        this.previousOperand = ''
        this.currentOperand = '0'
        this.operation = undefined
    }

    clear() {
        this.previousOperand = ''
        this.currentOperand = '0'
        this.operation = undefined
    }

    delete() {
        if (this.currentOperand === '0') return
        this.currentOperand = this.currentOperand.slice(0, -1)
        if (this.currentOperand === '') this.currentOperand = '0'
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number
        } else {
            this.currentOperand += number
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return

        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '×':
                computation = prev * current
                break
            case '÷':
                if (current === 0) {
                    alert('Cannot divide by zero!')
                    return
                }
                computation = prev / current
                break
            default:
                return
        }

        this.currentOperand = computation.toString()
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        document.querySelector('.current-operand').textContent = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            document.querySelector('.previous-operand').textContent =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            document.querySelector('.previous-operand').textContent = ''
        }
    }
}

const calculator = new Calculator()

document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

document.querySelector('.equals').addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

document.querySelector('.clear').addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

document.querySelector('.delete').addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})
