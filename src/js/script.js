import { createItem, cloneItem } from './items.js';
import { validateEmail, saveEmail } from './email.js';
import { drag, dragstart, dragend, dragover } from './drag.js';
import { shelfItems, emojiLIst, questionList, characterList } from './lists.js';

import Keyboard from './keyboard.js';

const status = {
    trash: 0,
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
    const minLogo = document.querySelector('.min-logo');
    
    if (!validateEmail(email.value)) {
        return false;
    } else {
        saveEmail(email.value);
        setShelfElements();
        mainBtn.href = '#titleTrash';
        mainBtn.removeEventListener('click', start);
        Keyboard.close();
        minLogo.style.display = 'block';
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
    const image = document.querySelector('#gameEmoji .emoji');
    const choices = document.querySelectorAll('#gameEmoji .choices a span');
    const emojiObject = emojiLIst[randomNumber(0, 5)] || { img: 'src/assets/img/emojis/P03.png', choices: ['Mecânica','Informática'], response: 'Informática' };
    
    setTimeout(() => {
        const response = emojiObject.response;
        image.src = emojiObject.img;
    
        choices.forEach( (choice, index) => {
            choice.innerHTML = emojiObject.choices[index];
            choice.addEventListener('click', ({ target }) => { 
                if (checkQuestion(target, response)) {
                    setQuestionElement();
                    setTimeout(() => { 
                        changePage('titleQuestion');
                    }, 500);
                }
            })
        });
    });
}

function setQuestionElement() {
    const text = document.querySelector('#gameQuestion h3');
    const question = document.querySelector('#gameQuestion .text-card-content');
    const reason = document.querySelector('#gameQuestion .text-reason');
    const choices = document.querySelectorAll('#gameQuestion .choices a span');
    const questionObject = questionList[randomNumber(0, 5)] || { question: 'FICAR SEM COMER EMAGRECE??', choices: ['Mito','É verdade'], response: 'Mito', reason:'Ficar sem se alimentar pode deixar seu metabolismo mais lento, dificultando a eliminação de peso. ' };
    
    setTimeout(() => {
        const response = questionObject.response;
        question.innerHTML = questionObject.question;
        reason.innerHTML = questionObject.reason;
    
        choices.forEach( (choice, index) => {
            choice.innerHTML = questionObject.choices[index];
            choice.addEventListener('click', ({ target }) => {
                if (checkQuestion(target, response)) {
                    setTimeout(() => { 
                        changePage('titleCharacter');
                        setCharacterElement() ;
                    }, 500);
                } else {
                    reason.classList.remove('hidden');
                    text.classList.add('hidden');
                }
            });
        });
    });
}

function setCharacterElement() {
    const image = document.querySelector('#gameCharacter .character');
    const choices = document.querySelectorAll('#gameCharacter .choices a span');
    const characterObject = characterList[randomNumber(0, 5)] || { img: 'src/assets/img/characters/CH01.png', choices: ['Confeitaria','PETRÓLEO E GÁS'], response: 'Confeitaria' };
    
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
        location = '/index.html';
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

function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function changePage(page, time = 2000) {
    setTimeout(() => { location.href = `#${page}` }, time);
}

const mainBtn = document.querySelector('#mainBtn');
mainBtn.addEventListener('click', start);

const sizeBtn = document.querySelector('#sizeBtn');
sizeBtn.addEventListener('click', sizeScreen);
