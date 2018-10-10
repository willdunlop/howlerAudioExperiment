function dragElement(element, type) {

    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (type === "simple") {
        element.onmousedown = dragMouseDown;
        element.addEventListener("touchstart", dragMouseDown);
    } else {
        Object.keys(element.children).forEach(key => {
            if (element.children[key].id === "dragHeader") {
                element.children[key].onmousedown = dragMouseDown;
                element.children[key].addEventListener("touchstart", dragMouseDown);
            }
        });
    }
    function dragMouseDown(e) {
        e = e || window.event;
        // e.target.classList.add('window__header-btn--mousedown')
        // e.preventDefault();  // This will remove focus on banner click
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        document.addEventListener("touchmove", elementDrag, { passive: false });
        document.addEventListener("touchend", closeDragElement);

    }

    function elementDrag(e) {
        e = e || window.event;
        // console.log("e2", e)
        e.preventDefault();
        // calculate the new cursor position:
        if (e.type === 'mousemove') {
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
        } else if (e.type === 'touchmove') {
            pos1 = pos3 - e.touches[0].clientX;
            pos2 = pos4 - e.touches[0].clientY;
            pos3 = e.touches[0].clientX;
            pos4 = e.touches[0].clientY;

        }
        // set the element's new position:
        const elementHalfWidth = (element.offsetWidth / 2);
        const elementHalfHeight = (element.offsetHeight / 2);
        let calculatedTopPos = element.offsetTop - pos2;
        let calculatedLeftPos = element.offsetLeft - pos1;
        const topLimit = window.outerHeight - elementHalfHeight;
        const leftLimit = window.outerWidth - elementHalfWidth;
        if (calculatedLeftPos <= leftLimit && calculatedLeftPos >= -elementHalfWidth) element.style.left = calculatedLeftPos + "px";
        if (calculatedTopPos <= topLimit && calculatedTopPos >= -elementHalfHeight) element.style.top = calculatedTopPos + "px";
    }

    function closeDragElement(e) {
        document.onmouseup = null;
        document.onmousemove = null;
        // element.removeEventListener("touchstart", dragMouseDown);
        document.removeEventListener("touchend", closeDragElement);
        document.removeEventListener("touchmove", elementDrag);
    }
}