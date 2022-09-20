console.log("Calculator")
// after clicking any number dispaly is append with that number

const calculator = document.querySelector('.calculator');
const key = calculator.querySelector('.calculator_key');
const displays = document.querySelector('.display');
key.addEventListener('click', e => {
    //console.log("Clicked");
    if (e.target.matches('button')) {
        //console.log("display");
        const keys = e.target;
        const action = keys.dataset.action;
        const keycontent = keys.textContent;
        const displayedNum = displays.textContent;
        //console.log(displayedNum)
        //console.log(action)
        //console.log(keycontent)
        //console.log(keys)

        // to remove the pressed state on action button

        Array.from(keys.parentNode.children)
            .forEach(k => k.classList.remove('is-depressed'));

        // after operator

        let previousKeyType = calculator.dataset.previousKeyType;
        if (!action) { 

            if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType==='calculate') {
                displays.textContent = keycontent;
                
                //console.log(" operator")
            } else {
                displays.textContent = displayedNum + keycontent;
            }
            calculator.dataset.previousKeyType = 'number';
        }
        //decimal is pressed check for previous decimal if present no action and if 
        //pressed after a operator display chane to 0.

        if (action === 'decimal') {
            // do nothing if decimal is pressed more than once
            if (!displayedNum.includes('.')) {
                displays.textContent = displayedNum + '.';

            }
            if (previousKeyType === 'operator') {
                displays.textContent = '0.';
            }
            if(previousKeyType==='calculate'){
                displays.textContent=displayedNum+'.';
                
            }
            calculator.dataset.previousKeyType = 'decimal';
        }
        if (action === 'divide') {
            keys.classList.add('dividesize');
        }

        

        // calculation part
        const calculate = (n1, operator, n2) => {
            let result = '';
            switch (operator) {
                case 'add':
                    result = parseFloat(n1) + parseFloat(n2);
                    break;
                case 'subtract':
                    result = parseFloat(n1) - parseFloat(n2);
                    break;
                case 'multiply':
                    result = parseFloat(n1) * parseFloat(n2);
                    break;
                case 'divide':
                    result = parseFloat(n1) / parseFloat(n2);
                    break;
                default:
                    break;
            }
            return result;
        }
        if (action === 'calculate') {
            const secondValue = displayedNum;
            let firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;

            if(firstValue&&previousKeyType!=='calculate')
            {displays.textContent = calculate(firstValue, operator, secondValue);
            }
            calculator.dataset.previousKeyType = 'calculate';
            calculator.dataset.modValue=secondValue;


        }
        // when operator keys are pressed

        if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
            if(displays.textContent.includes('.')){
                const firstValue = calculator.dataset.firstValue;
                const operator = calculator.dataset.operator;
                const secondValue = displayedNum;

                if(firstValue && operator && previousKeyType !== 'operator' && previousKeyType!=='calculate'
                && previousKeyType!=='clear'){
                    const calValue=calculate(firstValue,operator,secondValue);
                    displays.textContent=calValue;
                    calculator.dataset.firstValue= calValue;
                }else{
                    calculator.dataset.firstValue = displayedNum;
                }
            }
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;
            //calculate only one time not multiple time itself after clicking action
            //button or calculate when action button is pressed after second value
            //no action when action button is pressed multiple time
            if(firstValue && operator && previousKeyType !== 'operator' && previousKeyType!=='calculate'
            && previousKeyType!=='clear'){
                const calValue=calculate(firstValue,operator,secondValue);
                displays.textContent=calValue;
                calculator.dataset.firstValue= calValue;
            }else{
                calculator.dataset.firstValue = displayedNum;
            }
            
            keys.classList.add('is-depressed');
            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.operator = action;
            


      

        }
        //if clear key is not pressed
        if(action!=='clear'){
            const clearbtn=calculator.querySelector('[data-action=clear]');
            clearbtn.textContent='CE'
        }
        //if clear key is pressed
        if(action==='clear'){
            calculator.dataset.firstValue = '';
             if(keys.textContent==='AC'){
                calculator.dataset.firstValue = '';
                calculator.dataset.previousKeyType = '';
                calculator.dataset.operator = '';
             }else{
                keys.textContent='AC';
                
             }
             displays.textContent=0;
             calculator.dataset.previousKeyType='clear';


        }


    }
})