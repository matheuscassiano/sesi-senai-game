function createItem(item, place) {
    const element = document.createElement('div');

    element.classList.add('item');
    element.setAttribute('id', item.id);
    element.setAttribute('data-healthy', item.healthy);
    element.style.backgroundImage = `url('${item.img}')`;
    
    place.appendChild(element);
    return element;
}

function cloneItem(item, place) {
    const clone = item.cloneNode(true);
    
    clone.classList.add('clone');
    clone.style.position = 'absolute';
    clone.style.width = `${item.clientWidth}px`;
    clone.style.height = `${item.clientHeight}px`;
    clone.style.top = `${item.offsetTop + (item.clientHeight / 2)}px`;
    clone.style.left = `${item.offsetLeft + (item.clientWidth / 2)}px`;
    place.appendChild(clone);

    return clone;
}

export { createItem, cloneItem }