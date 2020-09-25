import { createItem, cloneItem } from './items.js';
import { validateEmail, saveEmail } from './email.js';
import { drag, dragstart, dragend, dragover } from './drag.js';
import { shelfItems, emojiList, questionList, characterList } from './lists.js';

import Keyboard from './keyboard.js';

const status = {
    trash: 0,
    emoji: 0,
    question: 0,
    character: 0,
    fullscreen: false
}

function sizeScreen () {
    if (!status.fullscreen) {
        document.documentElement.requestFullscreen()
    } else {
        document.exitFullscreen();
    }
    status.fullscreen = !status.fullscreen;
}

function start() {
    const email = document.querySelector('#userEmail');
    // const minLogo = document.querySelector('.min-logo');
    
    if (!validateEmail(email.value)) {
        return false;
    } else {
        saveEmail(email.value);
        setShelfElements();
        mainBtn.href = '#titleTrash';
        mainBtn.removeEventListener('click', start);
        Keyboard.close();
    }
}

function setShelfElements() {
    const itemList = [];
    const place = document.querySelector('.shelf');
    
    shelfItems.forEach( item => {
        const element = createItem(item, place);
        itemList.push(element);
    });
    
    itemList.forEach( item => {
        const cloned = cloneItem(item, place);
        
        cloned.addEventListener('touchstart', dragstart);
        cloned.addEventListener('touchmove', drag);
        cloned.addEventListener('touchmove', onDragover);
        cloned.addEventListener('touchend', dragend);
    });

    itemList.forEach( item => item.remove());
}

function setEmojiElement() {
    const numbers = randomNumbers(0, emojiList.length - 2);
    const backup = [
        { img: 'src/assets/img/emojis/P04.png', choices: ['Informática','Mecânica'], response: 'Mecânica' },
        { img: 'src/assets/img/emojis/P05.png', choices: ['Petróleo e Gás','Confeitaria'], response: 'Petróleo e Gás' },
    ];
    
    numbers.forEach((num, numIndex) => {
        const image = document.querySelector(`#gameEmoji0${numIndex + 1} .emoji`);
        const choices = document.querySelectorAll(`#gameEmoji0${numIndex + 1} .choices a span`);

        const item = emojiList[num] || backup[numIndex];
        image.src = item.img;
        
        choices.forEach( (choice, cIndex) => {
            choice.innerHTML = item.choices[cIndex];
            choice.addEventListener('click', ({ target }) => { 
                if(checkQuestion(target, item.response)){
                    status.emoji++;
                }
                if (checkQuestion(target, item.response) && status.emoji === 2) {
                    setQuestionElement();
                    changePage('titleQuestion');
                } else if (checkQuestion(target, item.response) && status.emoji < 2) {
                    changePage('gameEmoji02');
                }

            });
        });
    });
}

function setQuestionElement() {
    const numbers = randomNumbers(0, questionList.length - 2);
    const backup = [
        { question: 'EXISTEM ALIMENTOS COM FUNÇÕES ESPECÍFICAS PARA PERDA DE PESO?', choices: ['Mito','É verdade'], response: 'Mito', reason:'Não existe um alimento especifico, a perda de peso acontece com déficit calórico. ' },
        { question: 'O OVO AUMENTA O COLESTEROL?', choices: ['Mito','É verdade'], response: 'Mito', reason:'O colesterol elevado geralmente está ligado as complicações hereditárias e maus hábitos alimentares.' },
    ];

    numbers.forEach((num, numIndex) => {
        const text = document.querySelector(`#gameQuestion0${numIndex + 1} h3`);
        const reason = document.querySelector(`#gameQuestion0${numIndex + 1} .text-reason`);
        const choices = document.querySelectorAll(`#gameQuestion0${numIndex + 1} .choices a span`);
        const question = document.querySelector(`#gameQuestion0${numIndex + 1} .text-card-content`);

        const item = questionList[num] || backup[numIndex];
        question.innerHTML = item.question;
        reason.innerHTML = item.reason;
        
        choices.forEach( (choice, cIndex) => {
            choice.innerHTML = item.choices[cIndex];
            choice.addEventListener('click', ({ target }) => { 
                if(checkQuestion(target, item.response)){
                    status.question++;
                }
                
                if (checkQuestion(target, item.response) && status.question === 2) {
                    setCharacterElement();
                    console.log('WIN Question')
                    changePage('titleCharacter', 5000);
                } else if (checkQuestion(target, item.response) && status.question < 2) {
                    changePage('gameQuestion02', 5000);
                }
                reason.classList.remove('hidden');
                text.classList.add('hidden');
            });
        });
    });
}

function setCharacterElement() {
    const numbers = randomNumbers(0, characterList.length - 2);
    const backup = [
        { img: 'src/assets/img/characters/CH04.png', choices: ['MEIO AMBIENTE','Mecânica'], response: 'Mecânica' },
        { img: 'src/assets/img/characters/CH03.png', choices: ['ELETRICISTA','MODA E VESTUÁRIO'], response: 'ELETRICISTA' },
    ];
    
    numbers.forEach((num, numIndex) => {
        const image = document.querySelector(`#gameCharacter0${numIndex + 1} .character`);
        const choices = document.querySelectorAll(`#gameCharacter0${numIndex + 1} .choices a span`);

        const item = characterList[num] || backup[numIndex];
        image.src = item.img;
        console.log(item.response)
        
        choices.forEach( (choice, cIndex) => {
            choice.innerHTML = item.choices[cIndex];
            choice.addEventListener('click', ({ target }) => { 
                if(checkQuestion(target, item.response)){
                    status.character++;
                    
                    if (checkQuestion(target, item.response) && status.character === 2) {
                        finishScreen();
                        changePage('finish', 500);
                    } else if (checkQuestion(target, item.response) && status.character < 2) {
                        changePage('gameCharacter02');
                    }
                }
            });
        });
    });
}

function setCharacterElementr() {
    const image = document.querySelector('#gameCharacter .character');
    const choices = document.querySelectorAll('#gameCharacter .choices a span');
    const characterObject = characterList[randomNumbers(0, 5)] || { img: 'src/assets/img/characters/CH01.png', choices: ['Confeitaria','PETRÓLEO E GÁS'], response: 'Confeitaria' };
    
    setTimeout(() => {
        const response = characterObject.response;
        image.src = characterObject.img;
    
        choices.forEach( (choice, index) => {
            choice.innerHTML = characterObject.choices[index];
            choice.addEventListener('click', ({ target }) => { 
                if (checkQuestion(target, response)) {
                    setTimeout(() => { 
                        changePage('finish');
                        finishScreen();
                    }, 500);
                }
            });
        });
    });
}

function finishScreen() {
    const finish = document.querySelector('#finish');
    finish.addEventListener('click', () => {
        location = '/viloes-da-saude/';
    });
}

function checkQuestion(target, response) {
    target.parentElement.classList.remove('yellow');

    if (target.innerHTML.toLowerCase() === response.toLowerCase()) {
        target.parentElement.classList.add('flat-green');
        return true;
    } else {
        target.parentElement.classList.add('flat-red');
        setTimeout(() => {
            target.parentElement.classList.remove('flat-red');
            target.parentElement.classList.add('yellow');
        }, 900);
        return false;
    }
}

function onDragover({ target }) {
    const trash = document.querySelector('.trash');
    const type = target.attributes['data-healthy'].value;
    
    if (!dragover(trash)){
        trash.classList.remove('closed');
        return;
    } else if (type === 'true' && dragover(trash)) {
        trash.classList.add('closed');
    } else {
        status.trash++;
        target.style.display = 'none';
        if (status.trash >= 3) {
            setTimeout(() => {
                setEmojiElement();
                changePage('titleEmoji');
            });
        }
    }
}

function randomNumbers(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const num1 = Math.floor(Math.random() * (max - min + 1)) + min;
    const num2 = Math.floor(Math.random() * (max - min + 1)) + min;

    if (num1 !== num2) {
        return [num1, num2];
    } else if (num1 === num2) {
        return randomNumbers(0, 5);
    }
}

function changePage(page, time = 2000) {
    setTimeout(() => { location.href = `#${page}` }, time);
}

const mainBtn = document.querySelector('#mainBtn');
mainBtn.addEventListener('click', start);

const sizeBtn = document.querySelector('#sizeBtn');
sizeBtn.addEventListener('click', sizeScreen);
