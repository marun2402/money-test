import './index.scss'

let currentElement = 0
let moneyTest = document.querySelector('.money-test')
let elements = document.querySelectorAll('.questions__item')
elements[currentElement].classList.add('active')
let button = document.querySelector('.btn')
let radio = document.querySelectorAll('input[name="radio"]')
let count = document.getElementById('count')
button.disabled = true
let maxIndex = 0

let answers = {
    column1: [0, 0, 0, 0],
    column2: [0, 0, 0, 0],
    column3: [0, 0, 0, 0],
    column4: [0, 0, 0, 0],
    column5: [0, 0, 0, 0],
    column6: [0, 0, 0, 0],
    column7: [0, 0, 0, 0],
    column8: [0, 0, 0, 0],
    column9: [0, 0, 0, 0],
    column10: [0, 0, 0, 0],
    column11: [0, 0, 0, 0],
    column12: [0, 0, 0, 0],
    column13: [0, 0, 0, 0],
    column14: [0, 0, 0, 0],
    column15: [0, 0, 0, 0],
    column16: [0, 0, 0, 0]
}

let resultValue = []
let resultTypeIndex = []
let resultType = ['Спонсор', 'Игрок', 'Активист', 'Звезда', 'Дружище', 'Банкир', 'Шопоголик', 'Шеф']

count.textContent = `${currentElement+1} вопрос из ${elements.length}`

const getTemplate = () => { 
    return `
        <div class="result">
            <div class="result__item">${resultType[resultTypeIndex[0]]}</div>
            <div class="result__item">${resultType[resultTypeIndex[1]]}</div>
            <div class="result__item">${resultType[resultTypeIndex[2]]}</div>
        </div> 
        <div class="caption">
            <p> Поздравляю теперь ты осознан по поводу своих денежных архетипов. Для того чтобы узнать побольше об архетипах,
            исследовать их подробнее, переходи по ссылке в чат где мы вместе разберемся. </p>
        </div>
        <div class="message">        
            <a href="https://api.whatsapp.com/send?phone=79524371550" target="_blank" title="Написать в Whatsapp" rel="noopener noreferrer">
                <img src="assets/img/whatsapp.png">
            </a>
        </div>
    `
}

function result() {    
    count.textContent = ''
    for (let i = 1; i < 17; i++) {
        answers['column' + i] = answers['column' + i].reduce((accumulator, currentValue) => accumulator + currentValue)
    }
    for (let i = 0; i < 8; i++) {
        resultValue[i] = answers[`column${i+1}`] + answers[`column${i+9}`]         
    }
    for (let i = 0; i < 3; i++) {
        maxIndex = resultValue.indexOf(Math.max.apply(null, resultValue))
        resultTypeIndex[i] = maxIndex
        resultValue[maxIndex] = 0
    }
    moneyTest.innerHTML = getTemplate()
}


document.querySelector('.radio').onchange = () => {    
    button.disabled = false
    if (currentElement === elements.length - 1) {
        button.textContent = 'результат'
    }
}

button.onclick = () => {
    let element = document.querySelector('.active')
    let [column, question] = element.dataset.column.split('-')
    
    for (let i = 0; i < radio.length; i++)
        if (radio[i].checked) {
            answers['column'+column][question-1] = Number(radio[i].value)            
            radio[i].checked = false
            button.disabled = true
        }
    if (elements[currentElement+1]) {
        elements[currentElement].classList.remove('active')
        currentElement++    
        elements[currentElement].classList.add('active')
        count.textContent = `${currentElement+1} вопрос из ${elements.length}`
    } else {
        result()        
    }
}
