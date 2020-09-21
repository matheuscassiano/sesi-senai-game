import { drag, dragstart, dragend, dragover } from './drag.js';
import { createItem, cloneItem } from './items.js';

const mainBtn = document.querySelector('#mainBtn');
const page = document.querySelector('.screen');

const status = {
    points: 0,
}

const items = [
    { id: 0, img: 'src/assets/img/items/01.svg', healthy: true },
    { id: 1, img: 'src/assets/img/items/02.svg', healthy: false },
    { id: 2, img: 'src/assets/img/items/03.svg', healthy: false },
    { id: 3, img: 'src/assets/img/items/04.svg', healthy: true },
    { id: 4, img: 'src/assets/img/items/05.svg', healthy: true },
    { id: 5, img: 'src/assets/img/items/06.svg', healthy: false },
];

mainBtn.addEventListener('click', start);

function start() {    
    page.classList.remove('wait');
    page.classList.add('start');

    mainBtn.lastChild.innerText = 'Tudo pronto!'
    mainBtn.removeEventListener('click', start);
    setTimeout(() => { mainBtn.href = '#game' }, 500);
    setGameElements();
}

function setGameElements() {
    const itemList = [];
    const place = document.querySelector('.shelf');
    
    items.forEach( item => {
        const element = createItem(item, place);
        itemList.push(element);
    });
    
    itemList.forEach( item => {
        console.log(item)
        const cloned = cloneItem(item, place);
        
        cloned.addEventListener('touchstart', dragstart);
        cloned.addEventListener('touchmove', drag);
        cloned.addEventListener('touchmove', onDragover);
        cloned.addEventListener('touchend', dragend);
    });

    itemList.forEach( item => item.remove());
}

function onDragover({ target }) {
    const trash = document.querySelector('.trash');
    const type = target.attributes['data-healthy'].value;
    
    const screens = document.querySelector('.screen-container');
    const destiny = document.querySelector('#quest01');

    console.dir(destiny.scrollWidth * 3)
    
    if (!dragover(trash)){
        trash.classList.remove('closed')
        return;
    } else if (type === 'true' && dragover(trash)) {
        trash.classList.add('closed')
    } else {
        status.points++;
        target.style.display = 'none';
        if (status.points >= 3) screens.scroll((destiny.scrollWidth * 3), (window.width * 3));
    }
}
