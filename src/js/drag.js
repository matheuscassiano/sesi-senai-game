// Move dragged item
function drag({ targetTouches }) {
    const position = targetTouches[0];

    this.style.top = `${position.pageY}px`;
    this.style.left = `${position.pageX}px`;
}

// Add classificartion of dragged item
function dragstart() {
    this.classList.add('is-dragging');
}

// Remove classificartion of dragged item
function dragend() {
    this.classList.remove('is-dragging');
}

// Verify if an item is over the target
function dragover(target) {
    const item = document.querySelector('.is-dragging');
    const targetPosition = {
        minY: target.y, 
        maxY: target.y + target.clientHeight,
        minX: target.x,
        maxX: target.x + target.clientWidth,
    }

    if((item.offsetLeft >= targetPosition.minX && item.offsetLeft <= targetPosition.maxX) && 
       (item.offsetTop >= targetPosition.minY && item.offsetTop <= targetPosition.maxY)) {
        return true;
    }
}

export { drag, dragstart, dragend, dragover };