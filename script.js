let minValue;
let maxValue;
let answerNumber;
let orderNumber;
let gameRun;

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

newGame();

document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
           loose();
        } else {
            minValue = answerNumber  + 1;
           next();
           
        }
    }
})

document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
           loose();
        } else {
            maxValue = answerNumber  - 1;
            next();
        }
    }
})

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){
        answerField.innerText = getRandomText([
            `Я всегда угадываю\n\u{1F60E}`,
            `Ура! Я угадал! \n\u{1F60A}`,
            `Какой я умный! \n\u{1F61C}`,
            `Магия! \n\u{1F631}`
        ]);
        `Я всегда угадываю\n\u{1F60E}`
        gameRun = false;
    }
})

document.getElementById('btnRetry').addEventListener('click', newGame)

function newGame(){
    minValue = readNumber('Минимальное знание числа для игры','0');
    if (minValue < -999) {
        minValue = -999
    }
    maxValue = readNumber('Максимальное знание числа для игры','100');
    if (maxValue > 999) {
        maxValue = 999
    }


    alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
    answerNumber  = Math.floor((minValue + maxValue) / 2);
    orderNumber = 1;
    gameRun = true;

    orderNumberField.innerText = orderNumber;
    answerField.innerText = `Вы загадали число ${answerNumber }?`;
}

function getRandomText(textArray){
    const index = Math.floor(Math.random()*textArray.length);
    return textArray[index]
}

function loose() {
    const answerPhrase = getRandomText([
        `Вы загадали неправильное число!\n\u{1F914}`,
        `Я сдаюсь..\n\u{1F92F}`]);

    answerField.innerText = answerPhrase;
    gameRun = false;
}

function next() {
    answerNumber  = Math.floor((minValue + maxValue) / 2);

    const answerNumberText = getAnswerNumberText(answerNumber);
    orderNumber++;
    orderNumberField.innerText = orderNumber;
    answerField.innerText = getRandomText([
        `Вы загадали число ${answerNumberText }?`,
        `Да это легко! Ты загадал ${answerNumberText }?`,
        `Наверное, это число ${answerNumberText }?`,
        `Скорее всего это число ${answerNumberText }?`,
        `Уверен, это число ${answerNumberText }?`,
        `Может быть это число ${answerNumberText }?`
    ]);

}

function readNumber(title, defaultValue) {
    const result = parseInt(prompt(title, defaultValue));
    return isNaN(result) ? defaultValue : result;
}

function getAnswerNumberText(number) {
    const text = "Триста восемьдесят шесть";
    //todo: преобразовать number  в число прописью и записать в текст

    return (text.length > 20) ? number : text;

}