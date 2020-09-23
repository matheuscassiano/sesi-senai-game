import { drag, dragstart, dragend, dragover } from './drag.js';
import { createItem, cloneItem } from './items.js';
import { validateEmail, saveEmail } from './email.js';
import { shelfItems, emojiLIst, questionList, characterList } from './lists.js';

import Keyboard from './keyboard.js';

const mainBtn = document.querySelector('#mainBtn');
mainBtn.addEventListener('click', start);

const status = {
    trash: 0,
}

function start() {
    Keyboard.init();
    const email = document.querySelector('#userEmail');
    const keyboard = document.querySelector('.keyboard');
    
    if (!validateEmail(email.value)) {
        return false;
    } else {
        saveEmail(email.value);
        setShelfElements();
        mainBtn.href = '#titleTrash';
        mainBtn.removeEventListener('click', start);
        Keyboard.close();
        keyboard.classList.add('keyboard--hidden');
        setTimeout(() => { keyboard.style.display = 'none' }, 1000);
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
    const emojiObject = emojiLIst[randomNumber(0, 5)] || { img: 'src/assets/img/emojis/P03.png', choices: ['Mecânicaa','Informática'], response: 'Informática' };
    
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
    const text = document.querySelector('#gameQuestion .text-card-content');
    const choices = document.querySelectorAll('#gameQuestion .choices a span');
    const questionObject = questionList[randomNumber(0, 5)] || { question: 'FICAR SEM COMER EMAGRECE??', choices: ['Mito','É verdade'], response: 'Mito' };
    
    setTimeout(() => {
        const response = questionObject.response;
        text.innerHTML = questionObject.question;
    
        choices.forEach( (choice, index) => {
            choice.innerHTML = questionObject.choices[index];

            choice.addEventListener('click', ({ target }) => {
                if (checkQuestion(target, response)) {
                    setTimeout(() => { 
                        changePage('titleCharacter');
                        setCharacterElement() ;
                    }, 500);
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
    
        console.log(response)

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

function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function changePage(page, time = 2000) {
    setTimeout(() => { location.href = `#${page}` }, time);
}

function onDragover({ target }) {
    const modal = document.querySelector('#gameTrash .modal-container');
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
                // modal.classList.add('show');
                changePage('titleEmoji');
            });
        }
    }
}
