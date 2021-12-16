'use strict'


function renderGallery() {
    const imgs = getImgsToDisplay();
    const elContainer = document.querySelector('.main-content');
    const strHTMLs = imgs.map(img => `
    <div class="card-gallery" onclick="onImgSelect(${img.id})" > <img src="${img.src}"></div>
    `)
    elContainer.innerHTML = strHTMLs.join('')
}

function onImgSelect(imgId) {
    setImg(imgId);
    onResetMeme()
    onToggleEditor(true)
    renderMeme()
}


function onSetFilter(filterBy) {
    setFilter(filterBy);
    onToggleEditor(false);
    renderGallery();

}

function onNextPage() {
    gPageIdx++;
    document.querySelector('.main-container').classList.add('movefirstpage');
    renderGallery();
}